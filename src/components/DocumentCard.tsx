import { useId } from "react"
import { ArrowRight, Download, FileText } from "lucide-react"
import { Button } from "./Button"

type DocumentCardProps = {
  category: string
  title: string
  description: string
  documentUrl?: string
  downloadUrl?: string
  availabilityStatus?: string
  actionLabel?: string
  onRead?: () => void
  variant?: "card" | "editorial"
}

export function publishedPdf(href?: string) {
  const value = href?.trim() ?? ""
  const path = value.split(/[?#]/)[0] ?? ""
  const safeUrl = /^https?:\/\//i.test(value) || /^\/(?!\/)/.test(value)
  return safeUrl && path.toLowerCase().endsWith(".pdf") ? value : ""
}

export function DocumentCard({
  category, title, description, documentUrl, downloadUrl, availabilityStatus = "PDF chưa được công bố",
  actionLabel = "Đọc tài liệu", onRead, variant = "card",
}: DocumentCardProps) {
  const statusId = useId()
  const pdf = publishedPdf(documentUrl)
  const download = pdf ? publishedPdf(downloadUrl) : ""
  const editorial = variant === "editorial"
  const readLabel = editorial ? `${actionLabel}: ${title}` : undefined
  const readContent = <>{actionLabel}{editorial ? <ArrowRight size={16} aria-hidden="true" /> : null}</>

  return (
    <article className={editorial ? "rulebook rulebook--editorial" : "rulebook"}>
      {!editorial ? <span className="rulebook-mark" aria-hidden="true"><FileText className="size-5" /></span> : null}
      <div className="rulebook-copy">
        <p className="rulebook-category">{category}</p>
        <h3 className="rulebook-title">{title}</h3>
        <p className="rulebook-description">{description}</p>
      </div>
      <div className="rulebook-actions">
        {pdf && !onRead ? (
          <Button className="rulebook-read" href={pdf} target="_blank" rel="noopener noreferrer" aria-label={readLabel}>{readContent}</Button>
        ) : pdf || !editorial ? (
          <Button className="rulebook-read" onClick={onRead} disabled={!pdf} aria-label={readLabel} aria-describedby={!pdf ? statusId : undefined}>
            {readContent}
          </Button>
        ) : null}
        {download ? (
          <Button variant="secondary" className="rulebook-download" href={download} download aria-label={editorial ? `Tải PDF: ${title}` : undefined}>
            <Download size={16} aria-hidden="true" /> Tải PDF
          </Button>
        ) : null}
        {editorial || !pdf ? <p id={statusId} className="rulebook-status">{availabilityStatus}</p> : null}
      </div>
    </article>
  )
}
