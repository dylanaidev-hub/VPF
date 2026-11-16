import { useId, useState } from "react"
import { federationHistory } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { Timeline } from "./Timeline"
import { TimelineGallery } from "./TimelineGallery"

export function FedTimeline() {
  const reveal = useReveal<HTMLElement>()
  const galleryId = useId()
  const { milestones } = federationHistory
  const [activeMilestone, setActiveMilestone] = useState<string | null>(milestones[0]?.id ?? null)
  const milestone = milestones.find((item) => item.id === activeMilestone)

  return (
    <section
      id={federationHistory.id}
      ref={reveal.ref}
      className={cx("fed-band fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="lich-su-tieu-de"
    >
      <div className="page-wrap">
        <h2 id="lich-su-tieu-de">{federationHistory.title}</h2>
        <p className="fed-note">{federationHistory.note}</p>
        <Timeline
          milestones={milestones}
          activeMilestone={activeMilestone}
          galleryId={galleryId}
          onSelect={(id) => setActiveMilestone((current) => (current === id ? null : id))}
        />
        <div id={galleryId} hidden={!milestone}>
          {milestone ? <TimelineGallery key={milestone.id} milestone={milestone} /> : null}
        </div>
      </div>
    </section>
  )
}
