import { rulesDocument } from "../../data/expertise.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { ProfessionalDocument } from "./ProfessionalDocument"

export function RulesSection() {
  const { ref, shown } = useReveal<HTMLElement>()

  return (
    <section
      id={rulesDocument.id}
      ref={ref}
      className={cx("expertise-section expertise-rules expertise-rise", shown && "is-in")}
      aria-labelledby="luat-tieu-de"
    >
      <div className="page-wrap">
        <div className="expertise-section-head">
          <h2 id="luat-tieu-de" className="expertise-section-title">
            {rulesDocument.title}
          </h2>
          <p className="expertise-section-lead">{rulesDocument.description}</p>
        </div>
        <ProfessionalDocument document={rulesDocument} />
      </div>
    </section>
  )
}
