import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { federationContact } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"

const icons = {
  address: MapPin,
  hotline: Phone,
  email: Mail,
  hours: Clock,
}

export function FedContact() {
  const reveal = useReveal<HTMLElement>()

  return (
    <section
      id={federationContact.id}
      ref={reveal.ref}
      className={cx("fed-contact fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="lien-he-tieu-de"
    >
      <div className="page-wrap fed-contact-grid">
        <div>
          <h2 id="lien-he-tieu-de">{federationContact.title}</h2>
          <p className="fed-note">{federationContact.note}</p>
          <ul className="fed-contact-list">
            {federationContact.rows.map((row) => {
              const Icon = icons[row.id as keyof typeof icons]
              return (
                <li key={row.id}>
                  <Icon aria-hidden />
                  <span>
                    <span>{row.label}</span>
                    {row.value}
                  </span>
                </li>
              )
            })}
          </ul>
          <a className="fed-button" href={sitePath(federationContact.href)}>
            {federationContact.cta}
          </a>
        </div>
        <div className="fed-map">
          <iframe
            title={federationContact.mapTitle}
            src={federationContact.mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
