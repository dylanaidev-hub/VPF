import type { FederationMilestone } from "../../data/aboutFederation.mock"

type TimelineProps = {
  milestones: readonly FederationMilestone[]
  activeMilestone: string | null
  galleryId: string
  galleryOpen: boolean
  onSelect: (id: string) => void
}

export function Timeline({ milestones, activeMilestone, galleryId, galleryOpen, onSelect }: TimelineProps) {
  return (
    <ol className="fed-track">
      {milestones.map((milestone) => (
        <li key={milestone.id}>
          <button
            type="button"
            className="fed-track-button"
            data-active={activeMilestone === milestone.id || undefined}
            aria-haspopup="dialog"
            aria-expanded={galleryOpen && activeMilestone === milestone.id}
            aria-controls={galleryOpen && activeMilestone === milestone.id ? galleryId : undefined}
            onClick={(event) => {
              event.currentTarget.focus({ preventScroll: true })
              onSelect(milestone.id)
            }}
          >
            <span className="fed-node" aria-hidden="true" />
            <time dateTime={milestone.id}>{milestone.date}</time>
            <span className="fed-track-title">{milestone.title}</span>
            <span className="fed-track-description">{milestone.description}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}
