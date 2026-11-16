import { ArrowRight } from "lucide-react"
import { offersSection, partnershipOffers } from "../../data/partnership.mock"
import { sitePath } from "../../lib/site"
import { SectionHeading } from "../SectionHeading"

export function PartnershipOffers() {
  return (
    <section id={offersSection.id} className="eco-section is-canvas" aria-labelledby="hinh-thuc-tieu-de">
      <div className="page-wrap">
        <SectionHeading id="hinh-thuc-tieu-de" title={offersSection.title} subtitle={offersSection.description} />
        <ul className="eco-types">
          {partnershipOffers.map((offer) => (
            <li key={offer.id}>
              <article className="eco-type">
                <div className="eco-type-photo">
                  <img src={sitePath(offer.image)} alt={offer.imageAlt} width={900} height={675} loading="lazy" />
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <a href="#lien-he-hop-tac" className="eco-type-link">
                  Quan tâm hình thức này
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
