import { useEffect, useId, useRef } from "react"
import type { MediaAlbum, MediaShot } from "../../data/media.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"

export function AlbumViewer({
  album,
  paused,
  onClose,
  onOpenShot,
}: {
  album: MediaAlbum
  paused: boolean
  onClose: () => void
  onOpenShot: (shot: MediaShot, index: number) => void
}) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (paused) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== "Tab" || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [paused])

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-ink/55" aria-label="Đóng album" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto bg-white sm:max-w-4xl sm:rounded-2xl"
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-white px-5 py-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-ink">
              {album.title}
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{album.description}</p>
            <p className="mt-1 text-sm text-muted">{album.images.length} ảnh · Bộ sưu tập minh họa</p>
          </div>
          <button
            type="button"
            data-autofocus
            className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-line text-sm font-semibold"
            aria-label="Đóng album"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
        <ul className="grid gap-3 p-5 sm:grid-cols-2">
          {album.images.map((shot, index) => (
            <li key={shot.id}>
              <button type="button" className="group block w-full text-left" onClick={() => onOpenShot(shot, index)}>
                <span className="block overflow-hidden rounded-xl">
                  <img
                    src={sitePath(shot.src)}
                    alt={shot.alt}
                    className={cx(
                      "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                      shot.position,
                    )}
                  />
                </span>
                <span className="mt-2 block text-sm text-ink">{shot.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
