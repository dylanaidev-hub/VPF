import { useTranslation } from "../../i18n"
import { useCallback, useEffect, useState } from "react"
import { federationCharter, federationDecision } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"
import { DocumentCard, publishedPdf } from "../DocumentCard"
import { DocumentReader } from "../DocumentReader"

export function FedDecision() {
  const { t } = useTranslation()
  const doc = federationDecision
  const pdf = publishedPdf(doc.documentUrl)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (window.location.hash === `#${doc.id}`) {
      document.getElementById(doc.id)?.scrollIntoView({ block: "start", behavior: "instant" })
    }
  }, [doc.id])

  return (
    <section id={doc.id} className="fed-decree" aria-labelledby="quyet-dinh-tieu-de">
      <div className="page-wrap">
        <h2 id="quyet-dinh-tieu-de" className="vpf-section-title">{t(doc.title)}</h2>
        <DocumentCard
          category={doc.category}
          title={t(doc.title)}
          description={t(doc.description)}
          documentUrl={pdf}
          downloadUrl={doc.downloadUrl}
          availabilityStatus={doc.availabilityStatus}
          onRead={() => setOpen(true)}
        />
      </div>
      {pdf ? (
        <Dialog open={open} title={t(doc.title)} onClose={close}>
          <DocumentReader documentUrl={pdf} downloadUrl={doc.downloadUrl} />
        </Dialog>
      ) : null}
    </section>
  )
}

export function FedCharter() {
  const { t } = useTranslation()
  const reveal = useReveal<HTMLElement>()
  const doc = federationCharter

  return (
    <section
      id={doc.id}
      ref={reveal.ref}
      className={cx("fed-charter fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="tai-lieu-tieu-de"
    >
      <div className="page-wrap fed-charter-grid">
        <div>
          <h2 id="tai-lieu-tieu-de">{t(doc.title)}</h2>
          <p>{t(doc.note)}</p>
        </div>
        <dl>
          <div>
            <dt>{t(doc.typeLabel)}</dt>
            <dd>{t(doc.type)}</dd>
          </div>
          <div>
            <dt>{t(doc.formatLabel)}</dt>
            <dd>{t(doc.format)}</dd>
          </div>
          <div>
            <dt>{t(doc.statusLabel)}</dt>
            <dd>{t(doc.status)}</dd>
          </div>
        </dl>
        <a className="fed-button fed-button-gold" href={sitePath(doc.href)} target="_blank" rel="noreferrer">
          {t(doc.cta)}
        </a>
      </div>
    </section>
  )
}
