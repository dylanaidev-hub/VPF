import { useTranslation } from "../../i18n"
import { ArrowRight } from "lucide-react"
import { offersSection, partnershipOffers } from "../../data/partnership.mock"
import { sitePath } from "../../lib/site"
import { SectionHeading } from "../SectionHeading"

export function PartnershipOffers() {
  const { t } = useTranslation()
  return (
    <section id={offersSection.id} className="eco-section is-canvas" aria-labelledby="hinh-thuc-tieu-de">
      <div className="page-wrap">
        <SectionHeading id="hinh-thuc-tieu-de" title={t(offersSection.title)} subtitle={t(offersSection.description)} />
        <ul className="eco-types">
          {partnershipOffers.map((offer) => (
            <li key={offer.id}>
              <article className="eco-type">
                <div className="eco-type-photo">
                  <img src={sitePath(offer.image)} alt={t(offer.imageAlt)} width={900} height={675} loading="lazy" />
                </div>
                <h3>{t(offer.title)}</h3>
                <p>{t(offer.description)}</p>
                <a href="#lien-he-hop-tac" className="eco-type-link">
                  {t("Quan tâm hình thức này")}
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
