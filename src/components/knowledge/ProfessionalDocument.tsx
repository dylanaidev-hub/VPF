import { useState } from "react"
import { Download, FileText } from "lucide-react"
import type { ProfessionalResource } from "../../data/expertise.mock"
import { sitePath } from "../../lib/site"
import { Dialog } from "../Dialog"

/** Chỉ nhận đường dẫn kết thúc bằng .pdf. Mọi đường khác coi như chưa có tệp. */
export function publishedPdf(href: string | undefined) {
  const value = href?.trim() ?? ""
  if (!value) return ""
  const path = value.split(/[?#]/)[0]?.toLowerCase() ?? ""
  return path.endsWith(".pdf") ? value : ""
}

export function ProfessionalDocument({ document }: { document: ProfessionalResource }) {
  const [open, setOpen] = useState(false)
  const pdf = publishedPdf(document.pdfHref)

  return (
    <>
      <article className="rulebook">
        <span className="rulebook-mark" aria-hidden>
          <FileText className="size-5" />
        </span>
        <div className="rulebook-copy">
          <p className="rulebook-category">{document.category}</p>
          <h3 className="rulebook-title">{document.documentTitle}</h3>
          <p className="rulebook-description">{document.documentDescription}</p>
          {pdf ? <p className="rulebook-format">PDF</p> : null}
        </div>
        <div className="rulebook-actions">
          <button type="button" className="rulebook-read" onClick={() => setOpen(true)}>
            {document.readLabel}
          </button>
          {pdf ? (
            <a className="rulebook-download" href={sitePath(pdf)} download>
              <Download className="size-4" aria-hidden />
              {document.downloadLabel}
            </a>
          ) : (
            <p className="rulebook-status">{document.unavailableNote}</p>
          )}
        </div>
      </article>

      <Dialog open={open} title={document.documentTitle} onClose={() => setOpen(false)}>
        <p className="rulebook-reader-note">{document.readerNote}</p>
        <dl className="rulebook-topics">
          {document.topics.map((topic) => (
            <div key={topic.title}>
              <dt>{topic.title}</dt>
              <dd>{topic.text}</dd>
            </div>
          ))}
        </dl>
        {pdf ? (
          <a className="rulebook-download rulebook-reader-download" href={sitePath(pdf)} download>
            <Download className="size-4" aria-hidden />
            {document.downloadLabel}
          </a>
        ) : null}
      </Dialog>
    </>
  )
}
