import { FileText } from "lucide-react"
import { federationCharter, federationDecision } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"

function viewablePdf(file: string) {
  const value = file.trim()
  const path = value.split("?")[0]?.toLowerCase() ?? ""
  return path.endsWith(".pdf") ? value : ""
}

export function FedDecision() {
  const reveal = useReveal<HTMLElement>()
  const doc = federationDecision
  const pdf = viewablePdf(doc.pdf)
  const paperWords = doc.documentTitle.split(/\s+/)
  const paperSplit = Math.ceil(paperWords.length / 2)
  const paperLead = paperWords.slice(0, paperSplit).join(" ")
  const paperRest = paperWords.slice(paperSplit).join(" ")

  return (
    <section
      id={doc.id}
      ref={reveal.ref}
      className={cx("fed-section fed-decree", reveal.shown && "is-in")}
      aria-labelledby="quyet-dinh-tieu-de"
    >
      <div className="page-wrap fed-decree-grid">
        <div className="fed-decree-stage">
          <div className="fed-decree-paper" aria-hidden>
            <div className="fed-decree-dochead">
              <span className="fed-decree-mark">
                <FileText />
              </span>
              <span>PDF</span>
            </div>
            <p>
              {paperLead}
              {paperRest ? (
                <>
                  <br />
                  {paperRest}
                </>
              ) : null}
            </p>
            <div className="fed-decree-lines">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="fed-decree-stamp">{doc.stampLabel}</div>
          </div>
        </div>
        <div className="fed-decree-copy">
          <h2 id="quyet-dinh-tieu-de">{doc.title}</h2>
          <p className="fed-decree-lead">{doc.note}</p>
          <dl className="fed-decree-meta">
            <div>
              <dt>{doc.numberLabel}</dt>
              <dd>{doc.number}</dd>
            </div>
            <div>
              <dt>{doc.dateLabel}</dt>
              <dd>{doc.date}</dd>
            </div>
            <div>
              <dt>{doc.authorityLabel}</dt>
              <dd>{doc.authority}</dd>
            </div>
          </dl>
          {pdf ? (
            <a className="fed-button" href={sitePath(pdf)} target="_blank" rel="noreferrer">
              {doc.cta}
            </a>
          ) : (
            <p className="fed-decree-status">{doc.status}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export function FedCharter() {
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
          <h2 id="tai-lieu-tieu-de">{doc.title}</h2>
          <p>{doc.note}</p>
        </div>
        <dl>
          <div>
            <dt>{doc.typeLabel}</dt>
            <dd>{doc.type}</dd>
          </div>
          <div>
            <dt>{doc.formatLabel}</dt>
            <dd>{doc.format}</dd>
          </div>
          <div>
            <dt>{doc.statusLabel}</dt>
            <dd>{doc.status}</dd>
          </div>
        </dl>
        <a className="fed-button fed-button-gold" href={sitePath(doc.href)} target="_blank" rel="noreferrer">
          {doc.cta}
        </a>
      </div>
    </section>
  )
}
