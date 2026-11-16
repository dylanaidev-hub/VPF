import { useId, useState } from "react"
import { createPortal } from "react-dom"
import { Images } from "lucide-react"
import type { FederationMilestone } from "../../data/aboutFederation.mock"
import { useRegisterModalPresence } from "../../lib/modalPresence"
import { sitePath } from "../../lib/site"
import { MediaLightbox } from "../media/MediaLightbox"

const PREVIEW_COUNT = 3

export function TimelineGallery({ milestone }: { milestone: FederationMilestone }) {
  const { images } = milestone
  const titleId = useId()
  const [index, setIndex] = useState<number | null>(null)
  useRegisterModalPresence(index !== null)

  const previews = images.slice(0, PREVIEW_COUNT)
  const more = images[PREVIEW_COUNT]
  const remaining = images.length - previews.length
  const hasIllustrations = images.some((image) => image.source !== "official")

  return (
    <section className="fed-history-gallery" aria-labelledby={titleId}>
      <div className="fed-history-gallery-copy">
        <time dateTime={milestone.id}>{milestone.date}</time>
        <h3 id={titleId}>{milestone.title}</h3>
        <p>{milestone.description}</p>
        <div className="fed-history-gallery-count">
          <Images size={16} aria-hidden="true" />
          {images.length} ảnh
        </div>
        {hasIllustrations ? <p className="fed-history-gallery-note">Ảnh minh họa cho mốc thời gian.</p> : null}
      </div>

      {images.length > 0 ? (
        <div className="fed-history-bento">
          {previews.map((shot, position) => (
            <button
              key={shot.id}
              type="button"
              className="fed-history-tile"
              aria-label={`Xem ảnh ${position + 1}: ${shot.alt}${shot.source === "generated" ? " (minh họa AI)" : ""}`}
              onClick={() => setIndex(position)}
            >
              <img src={sitePath(shot.src)} alt={shot.alt} loading="lazy" className={shot.position} />
              {shot.source === "generated" ? <span className="fed-history-ai">Ảnh minh họa AI</span> : null}
            </button>
          ))}
          {more ? (
            <button type="button" className="fed-history-tile fed-history-more" onClick={() => setIndex(PREVIEW_COUNT)}>
              <img src={sitePath(more.src)} alt="" loading="lazy" />
              <span className="fed-history-more-label">
                <strong>+{remaining}</strong>
                <span>Xem tất cả ảnh</span>
              </span>
            </button>
          ) : null}
        </div>
      ) : null}

      {index !== null
        ? createPortal(
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
            />,
            document.body,
          )
        : null}
    </section>
  )
}
