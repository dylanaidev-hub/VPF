import { useState } from "react"
import { Download, ExternalLink, FileText } from "lucide-react"
import { rulesDocument } from "../../data/expertise.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

export function RulesSection() {
  const { ref, shown } = useReveal<HTMLElement>()
  const [readerOpen, setReaderOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const pdf = rulesDocument.pdfHref?.trim()
  const hasPdf = Boolean(pdf)

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
          <p className="expertise-section-lead">{rulesDocument.intro}</p>
        </div>

        <article className="expertise-doc-card">
          <button
            type="button"
            className="expertise-doc-thumb"
            onClick={() => setReaderOpen(true)}
            aria-label={`${rulesDocument.onlineLabel}: ${rulesDocument.documentLabel} (minh họa)`}
          >
            <span className="expertise-doc-thumb-inner">
              <FileText className="size-5" aria-hidden />
              <span className="expertise-doc-thumb-brand">VPF</span>
              <span className="expertise-doc-thumb-kind">{rulesDocument.documentKind}</span>
            </span>
          </button>

          <div className="expertise-doc-card-body">
            <div className="min-w-0">
              <h3 className="expertise-doc-card-title">{rulesDocument.documentLabel}</h3>
              <p className="expertise-doc-card-desc">{rulesDocument.description}</p>
              <p className="expertise-doc-card-meta">
                {rulesDocument.documentType}
                <span aria-hidden> · </span>
                {rulesDocument.version}
                <span aria-hidden> · </span>
                {rulesDocument.documentKind}
              </p>
              {rulesDocument.illustrative ? (
                <p className="expertise-note">Bản minh họa — không phải văn bản luật chính thức.</p>
              ) : null}
            </div>

            <div className="expertise-rules-actions">
              <button type="button" className="expertise-btn-primary" onClick={() => setReaderOpen(true)}>
                <ExternalLink className="size-4" aria-hidden />
                {rulesDocument.onlineLabel}
              </button>
              {hasPdf && pdf ? (
                <a href={sitePath(pdf)} className="expertise-btn-secondary" download target="_blank" rel="noreferrer">
                  <Download className="size-4" aria-hidden />
                  {rulesDocument.downloadLabel}
                </a>
              ) : (
                <button type="button" className="expertise-btn-secondary" onClick={() => setDownloadOpen(true)}>
                  <Download className="size-4" aria-hidden />
                  {rulesDocument.downloadLabel}
                </button>
              )}
            </div>
          </div>
        </article>
      </div>

      <Dialog open={readerOpen} title={rulesDocument.documentLabel} onClose={() => setReaderOpen(false)}>
        <p className="text-sm font-medium text-brand-strong">Bản đọc online minh họa</p>
        <p className="mt-2 text-sm text-muted">
          {rulesDocument.documentType} · {rulesDocument.version} · {rulesDocument.documentKind}
        </p>
        <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink">
          {rulesDocument.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Dialog>

      <Dialog open={downloadOpen} title={rulesDocument.downloadLabel} onClose={() => setDownloadOpen(false)}>
        <p className="text-[15px] leading-relaxed text-ink">{rulesDocument.downloadNote}</p>
        <button
          type="button"
          className="expertise-btn-primary mt-5"
          onClick={() => {
            setDownloadOpen(false)
            setReaderOpen(true)
          }}
        >
          {rulesDocument.onlineLabel}
        </button>
      </Dialog>
    </section>
  )
}
