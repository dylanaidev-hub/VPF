import { useTranslation } from "../../i18n"
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { ContactInfoItem } from "../ContactInfoItem"
import {
  federationContactInfo,
  federationContactSection,
  phoneTelHref,
} from "../../data/contact"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"

export function FedContact() {
  const { t } = useTranslation()
  const reveal = useReveal<HTMLElement>()
  const info = federationContactInfo
  const showDemo = info.isDemo
  const address = info.address
  const phone = info.phone
  const email = info.email
  const hours = info.workingHours
  const hasRows = Boolean(address || phone || email || hours)

  if (!showDemo && !hasRows && !info.mapEmbedUrl) return null

  return (
    <section
      id={federationContactSection.id}
      ref={reveal.ref}
      className={cx("fed-contact fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="lien-he-tieu-de"
    >
      <div className="page-wrap fed-contact-grid">
        <div className="fed-contact-copy">
          <h2 id="lien-he-tieu-de">{t(federationContactSection.title)}</h2>
          <p className="fed-contact-desc">{t(federationContactSection.description)}</p>
          {showDemo ? <p className="fed-contact-demo-note">{t(info.demoNotice)}</p> : null}

          {hasRows ? (
            <ul className="fed-contact-list">
              {address ? (
                <ContactInfoItem icon={MapPin} label="Địa chỉ" value={address} />
              ) : null}
              {phone ? (
                <ContactInfoItem
                  icon={Phone}
                  label="Hotline"
                  value={phone}
                  href={phoneTelHref(phone)}
                />
              ) : null}
              {email ? (
                <ContactInfoItem
                  icon={Mail}
                  label="Email"
                  value={email}
                  href={`mailto:${email}`}
                />
              ) : null}
              {hours ? (
                <ContactInfoItem icon={Clock} label="Giờ làm việc" value={hours} />
              ) : null}
            </ul>
          ) : null}

          {!showDemo && info.mapDirectionUrl ? (
            <a
              href={info.mapDirectionUrl}
              className="fed-contact-directions"
              target="_blank"
              rel="noreferrer"
            >
              {t("Chỉ đường")}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          ) : null}
        </div>

        {info.mapEmbedUrl ? (
          <div className="fed-map">
            <iframe
              title={t(info.mapTitle)}
              src={info.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
