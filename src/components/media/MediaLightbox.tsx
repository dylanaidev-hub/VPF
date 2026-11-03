import { useEffect, useId, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { MediaShot } from "../../data/media.mock"
import { sitePath } from "../../lib/site"
import { useReducedMotion } from "../../lib/useReducedMotion"

type LightboxShot = MediaShot & { title?: string }

export function MediaLightbox({
  shots,
  index,
  onIndex,
  onClose,
}: {
  shots: LightboxShot[]
  index: number
  onIndex: (index: number) => void
  onClose: () => void
}) {
  const titleId = useId()
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const activeThumbRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const onIndexRef = useRef(onIndex)
  const indexRef = useRef(index)
  const touchX = useRef<number | null>(null)
  onCloseRef.current = onClose
  onIndexRef.current = onIndex
  indexRef.current = index

  const shot = shots[index]
  const total = shots.length
  const multiple = total > 1

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const step = (direction: -1 | 1) => {
      if (total < 2) return
      const current = indexRef.current
      onIndexRef.current((current + direction + total) % total)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        step(-1)
        return
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        step(1)
        return
      }
      if (event.key !== "Tab") return
      const panel = panelRef.current
      if (!panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>("button:not([disabled])"))
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
  }, [total])

  useEffect(() => {
    const thumb = activeThumbRef.current
    const scroller = thumbsRef.current
    if (!thumb || !scroller) return
    const left = thumb.offsetLeft - (scroller.clientWidth - thumb.clientWidth) / 2
    scroller.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" })
  }, [index, reduce])

  if (!shot) return null

  const go = (direction: -1 | 1) => {
    if (!multiple) return
    onIndex((index + direction + total) % total)
  }

  return (
    <div ref={panelRef} className="media-lightbox" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white md:px-6">
        <p className="media-viewer__counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          className="media-viewer__close grid size-11 place-items-center rounded-[10px] border border-white/30"
          aria-label="Đóng ảnh"
          onClick={onClose}
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <div className="media-lightbox-body">
        {multiple ? (
          <button
            type="button"
            className="media-lightbox-nav media-lightbox-nav-prev"
            aria-label="Ảnh trước"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
        ) : null}
        {multiple ? (
          <button
            type="button"
            className="media-lightbox-nav media-lightbox-nav-next"
            aria-label="Ảnh sau"
            onClick={() => go(1)}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        ) : null}
        <div
          className="media-viewer__content"
          onTouchStart={(event) => {
            touchX.current = event.changedTouches[0]?.clientX ?? null
          }}
          onTouchEnd={(event) => {
            const start = touchX.current
            const end = event.changedTouches[0]?.clientX
            touchX.current = null
            if (start == null || end == null) return
            const delta = end - start
            if (Math.abs(delta) < 48) return
            go(delta < 0 ? 1 : -1)
          }}
        >
          <img src={sitePath(shot.src)} alt={shot.alt} className="media-lightbox-photo" />
          <div className="media-viewer__details">
            <p id={titleId} className="media-viewer__title">
              {shot.title ?? shot.caption}
            </p>
            {shot.title ? <p className="media-viewer__description">{shot.caption}</p> : null}
          </div>
          {multiple ? (
            <div ref={thumbsRef} className="media-lightbox-thumbs media-viewer__thumbnails" role="list" aria-label="Ảnh trong bộ">
              {shots.map((item, itemIndex) => {
                const active = itemIndex === index
                return (
                  <button
                    key={item.id}
                    ref={active ? activeThumbRef : undefined}
                    type="button"
                    role="listitem"
                    className="media-lightbox-thumb"
                    aria-current={active ? "true" : undefined}
                    aria-label={`Ảnh ${String(itemIndex + 1).padStart(2, "0")}: ${item.title ?? item.caption}`}
                    onClick={() => onIndex(itemIndex)}
                  >
                    <img src={sitePath(item.src)} alt="" />
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
