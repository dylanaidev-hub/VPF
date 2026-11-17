import { useTranslation } from "../../i18n"
import { partnershipValues, valuesSection } from "../../data/partnership.mock"
import { SectionHeading } from "../SectionHeading"

export function PartnershipValues() {
  const { t } = useTranslation()
  return (
    <section id={valuesSection.id} className="eco-section is-compact" aria-labelledby="gia-tri-hop-tac-tieu-de">
      <div className="page-wrap">
        <SectionHeading id="gia-tri-hop-tac-tieu-de" title={t(valuesSection.title)} className="eco-values-head" />
        <ul className="eco-values">
          {partnershipValues.map((item, index) => (
            <li key={item.id}>
              <span className="eco-value-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{t(item.title)}</h3>
              <p>{t(item.detail)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
