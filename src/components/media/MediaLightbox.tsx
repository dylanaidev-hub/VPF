import { useTranslation } from "../../i18n"
import { useEffect, useId, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { MediaShot } from "../../data/media.mock"
import { useRegisterModalPresence } from "../../lib/modalPresence"
import { sitePath } from "../../lib/site"
import { useReducedMotion } from "../../lib/useReducedMotion"

export type LightboxShot = MediaShot & {
  title?: string
  description?: string
  thumbnail?: string
}

export function MediaLightbox({
  shots,
  index,
  onIndex,
  onClose,
  galleryTitle,
  dismissOnBackdrop = true,
  lockBodyScroll = true,
}: {
  shots: LightboxShot[]
  index: number
  onIndex: (index: number) => void
  onClose: () => void
  /** Kept for callers / a11y label; not rendered in the viewer UI. */
  galleryTitle?: string
  /** Kept for API compatibility; not rendered in the viewer UI. */
  galleryDescription?: string
  dismissOnBackdrop?: boolean
  lockBodyScroll?: boolean
}) {
  const { t } = useTranslation()
  const titleId = useId()
  const reduce = useReducedMotion()
  useRegisterModalPresence(true)
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
  const accessibleTitle =
    galleryTitle?.trim() ||
    shot?.title?.trim() ||
    shot?.caption?.trim() ||
    shot?.alt?.trim() ||
    "Xem ảnh"

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    if (lockBodyScroll) document.body.style.overflow = "hidden"
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
      if (lockBodyScroll) document.body.style.overflow = previousOverflow
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [lockBodyScroll, total])

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
    <div
      ref={panelRef}
      className="media-lightbox"
      data-dismissible={dismissOnBackdrop || undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (!dismissOnBackdrop || !(event.target instanceof Element)) return
        if (!event.target.closest("button, .media-lightbox-photo, .media-lightbox-thumbs, .media-viewer__header")) {
          onClose()
        }
      }}
    >
      <h2 id={titleId} className="sr-only">
        {t(accessibleTitle)}
      </h2>
      {multiple ? (
        <p className="sr-only" aria-live="polite">
          {index + 1} / {total}
        </p>
      ) : null}

      <div className="media-viewer__header">
        <button
          ref={closeRef}
          type="button"
          className="media-viewer__close"
          aria-label={t("Đóng ảnh")}
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
            aria-label={t("Ảnh trước")}
            onClick={() => go(-1)}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
        ) : null}
        {multiple ? (
          <button
            type="button"
            className="media-lightbox-nav media-lightbox-nav-next"
            aria-label={t("Ảnh sau")}
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
          <img key={shot.id} src={sitePath(shot.src)} alt={t(shot.alt)} className="media-lightbox-photo" />

          {multiple ? (
            <div ref={thumbsRef} className="media-lightbox-thumbs media-viewer__thumbnails" role="list" aria-label={t("Ảnh trong bộ")}>
              {shots.map((item, itemIndex) => {
                const active = itemIndex === index
                const thumbSrc = item.thumbnail ?? item.src
                return (
                  <button
                    key={item.id}
                    ref={active ? activeThumbRef : undefined}
                    type="button"
                    role="listitem"
                    className="media-lightbox-thumb"
                    aria-current={active ? "true" : undefined}
                    aria-label={`${t("Ảnh")} ${itemIndex + 1}: ${t(item.title ?? item.caption ?? item.alt)}`}
                    onClick={() => onIndex(itemIndex)}
                  >
                    <img src={sitePath(thumbSrc)} alt="" />
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
