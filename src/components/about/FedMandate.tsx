import { Scale, Shield } from "lucide-react"
import { federationMandate } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"

export function FedMandate() {
  const reveal = useReveal<HTMLElement>()

  return (
    <section
      id={federationMandate.id}
      ref={reveal.ref}
      className={cx("fed-section fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="chuc-nang-tieu-de"
    >
      <div className="page-wrap">
        <h2 id="chuc-nang-tieu-de">{federationMandate.title}</h2>
        <p className="fed-note">{federationMandate.note}</p>
        <div className="fed-mandate">
          <article>
            <h3>
              <Scale aria-hidden />
              {federationMandate.functionsTitle}
            </h3>
            <ul>
              {federationMandate.functions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>
              <Shield aria-hidden />
              {federationMandate.dutiesTitle}
            </h3>
            <ul>
              {federationMandate.duties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
