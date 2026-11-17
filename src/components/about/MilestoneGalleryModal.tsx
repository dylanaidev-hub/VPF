import { useTranslation } from "../../i18n"
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Images, X } from "lucide-react"
import type { FederationMilestone } from "../../data/aboutFederation.mock"
import { useRegisterModalPresence } from "../../lib/modalPresence"
import { useReducedMotion } from "../../lib/useReducedMotion"
import { MediaLightbox } from "../media/MediaLightbox"
import { TimelineGallery } from "./TimelineGallery"

export function MilestoneGalleryModal({ id, milestone, onClose }: {
  id: string
  milestone: FederationMilestone
  onClose: () => void
}) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const photoTrigger = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()
  const descriptionId = useId()
  const reduce = useReducedMotion()
  const [index, setIndex] = useState<number | null>(null)
  const [closing, setClosing] = useState(false)
  const { images } = milestone
  const hasIllustrations = images.some((image) => image.source !== "official")
  useRegisterModalPresence(true)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog.showModal()

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    if (index !== null) return
    photoTrigger.current?.focus({ preventScroll: true })
    photoTrigger.current = null
  }, [index])

  useEffect(() => {
    if (!closing) return
    // Close even if the exit animation is interrupted.
    const timer = window.setTimeout(onClose, reduce ? 0 : 260)
    return () => window.clearTimeout(timer)
  }, [closing, onClose, reduce])

  const requestClose = () => {
    if (index !== null || closing) return
    if (reduce) onClose()
    else setClosing(true)
  }

  return createPortal(
    <dialog
      id={id}
      ref={dialogRef}
      className="fed-history-modal"
      data-closing={closing || undefined}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
      onAnimationEnd={(event) => {
        if (closing && event.animationName === "fed-history-modal-out") onClose()
      }}
    >
      <div className="fed-history-modal-panel" inert={index !== null}>
        <header className="fed-history-modal-header">
          <div>
            <time dateTime={milestone.id}>{milestone.date}</time>
            <h2 id={titleId}>{t(milestone.title)}</h2>
            <p id={descriptionId}>{t(milestone.description)}</p>
          </div>
          <button type="button" className="fed-history-modal-close" aria-label={t("Đóng bộ ảnh")} onClick={requestClose}>
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div className="fed-history-modal-body">
          <TimelineGallery
            images={images}
            onOpenPhoto={(position, trigger) => {
              if (closing) return
              photoTrigger.current = trigger
              setIndex(position)
            }}
          />
          <p className="fed-history-gallery-caption">
            <span className="fed-history-gallery-count"><Images size={16} aria-hidden="true" />{images.length} {t("ảnh")}</span>
            {hasIllustrations ? <span>{t("Ảnh minh họa cho mốc thời gian.")}</span> : null}
          </p>
        </div>
      </div>
      {index !== null ? (
        <MediaLightbox
          shots={images.map((shot) => ({
            ...shot,
            title: milestone.title,
            caption: [
              shot.caption,
              shot.source === "generated" ? "Ảnh minh họa tạo bằng AI." : shot.source === "illustrative" ? "Ảnh minh họa." : "",
            ].filter(Boolean).join(" "),
          }))}
          index={index}
          onIndex={setIndex}
          onClose={() => setIndex(null)}
          dismissOnBackdrop
          lockBodyScroll={false}
        />
      ) : null}
    </dialog>,
    document.body,
  )
}
