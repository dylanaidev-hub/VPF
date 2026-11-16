import type { FederationHistoryImage } from "../../data/aboutFederation.mock"
import { sitePath } from "../../lib/site"

const PREVIEW_COUNT = 3

export function TimelineGallery({ images, onOpenPhoto }: {
  images: readonly FederationHistoryImage[]
  onOpenPhoto: (index: number, trigger: HTMLButtonElement) => void
}) {
  if (images.length === 0) return null

  const previews = images.slice(0, PREVIEW_COUNT)
  const more = images[PREVIEW_COUNT]
  const remaining = images.length - previews.length

  return (
    <div className="fed-history-bento">
      {previews.map((shot, position) => (
        <button
          key={shot.id}
          type="button"
          className="fed-history-tile"
          aria-label={`Xem ảnh ${position + 1}: ${shot.alt}${shot.source === "generated" ? " (minh họa AI)" : ""}`}
          onClick={(event) => onOpenPhoto(position, event.currentTarget)}
        >
          <img src={sitePath(shot.src)} alt={shot.alt} loading="lazy" className={shot.position} />
          {shot.source === "generated" ? <span className="fed-history-ai">Ảnh minh họa AI</span> : null}
        </button>
      ))}
      {more ? (
        <button
          type="button"
          className="fed-history-tile fed-history-more"
          onClick={(event) => onOpenPhoto(PREVIEW_COUNT, event.currentTarget)}
        >
          <img src={sitePath(more.src)} alt="" loading="lazy" />
          <span className="fed-history-more-label">
            <strong>+{remaining}</strong>
            <span>Xem tất cả ảnh</span>
          </span>
        </button>
      ) : null}
    </div>
  )
}
