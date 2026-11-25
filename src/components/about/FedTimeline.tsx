import { useTranslation } from "../../i18n"
import { useId, useState } from "react"
import { federationHistory } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { MediaViewer } from "../media/MediaViewer"
import { Timeline } from "./Timeline"

export function FedTimeline() {
  const { t } = useTranslation()
  const reveal = useReveal<HTMLElement>()
  const galleryId = useId()
  const { milestones } = federationHistory
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const milestone = milestones.find((item) => item.id === activeMilestone)

  return (
    <section
      id={federationHistory.id}
      ref={reveal.ref}
      className={cx("fed-band fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="lich-su-tieu-de"
    >
      <div className="page-wrap">
        <h2 id="lich-su-tieu-de">{t(federationHistory.title)}</h2>
        <p className="fed-note">{t(federationHistory.note)}</p>
        <Timeline
          milestones={milestones}
          activeMilestone={activeMilestone}
          galleryId={galleryId}
          galleryOpen={galleryOpen}
          onSelect={(id) => {
            const next = milestones.find((item) => item.id === id)
            setActiveMilestone(id)
            setGalleryOpen(Boolean(next?.images.length))
          }}
        />
      </div>
      {galleryOpen && milestone && milestone.images.length > 0 ? (
        <MediaViewer
          key={milestone.id}
          items={milestone.images.map((image) => ({
            id: image.id,
            src: image.src,
            alt: image.alt,
            title: image.caption,
            description: image.caption,
            thumbnail: image.src,
          }))}
          title={milestone.title}
          description={`${milestone.date}. ${milestone.description}`}
          onClose={() => setGalleryOpen(false)}
        />
      ) : null}
    </section>
  )
}
