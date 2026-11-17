import { useTranslation } from "../i18n"
import { useId } from "react"
import { Download, FileText } from "lucide-react"
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
}

export function publishedPdf(href?: string) {
  const value = href?.trim() ?? ""
  const path = value.split(/[?#]/)[0] ?? ""
  const safeUrl = /^https?:\/\//i.test(value) || /^\/(?!\/)/.test(value)
  return safeUrl && path.toLowerCase().endsWith(".pdf") ? value : ""
}

export function DocumentCard({
  category, title, description, documentUrl, downloadUrl, availabilityStatus = "PDF chưa được công bố",
  actionLabel = "Đọc tài liệu", onRead,
}: DocumentCardProps) {
  const { t } = useTranslation()
  const statusId = useId()
  const pdf = publishedPdf(documentUrl)
  const download = pdf ? publishedPdf(downloadUrl) : ""

  return (
    <article className="rulebook">
      <span className="rulebook-mark" aria-hidden="true"><FileText className="size-5" /></span>
      <div className="rulebook-copy">
        <p className="rulebook-category">{t(category)}</p>
        <h3 className="rulebook-title">{t(title)}</h3>
        <p className="rulebook-description">{t(description)}</p>
      </div>
      <div className="rulebook-actions">
        {pdf && !onRead ? (
          <Button className="rulebook-read" href={pdf} target="_blank" rel="noopener noreferrer">{t(actionLabel)}</Button>
        ) : (
          <Button className="rulebook-read" onClick={onRead} disabled={!pdf} aria-describedby={!pdf ? statusId : undefined}>
            {t(actionLabel)}
          </Button>
        )}
        {download ? (
          <Button variant="secondary" className="rulebook-download" href={download} download>
            <Download size={16} aria-hidden="true" /> {t("Tải PDF")}
          </Button>
        ) : null}
        {!pdf ? <p id={statusId} className="rulebook-status">{t(availabilityStatus)}</p> : null}
      </div>
    </article>
  )
}
