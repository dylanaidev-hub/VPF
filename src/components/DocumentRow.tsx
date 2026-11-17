import { useTranslation } from "../i18n"
import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "./Button"
import "./document-row.css"

type DocumentRowProps = {
  category: string
  title: string
  description?: string
  format?: string
} & (
  | { fileUrl: string; unavailableMessage?: never }
  | { fileUrl?: never; unavailableMessage: string }
)

export function DocumentRow({ category, title, description, format, fileUrl, unavailableMessage }: DocumentRowProps) {
  const { t } = useTranslation()
  const [showUnavailable, setShowUnavailable] = useState(false)
  const downloadLabel = <><Download size={16} aria-hidden="true" /> {t("Tải xuống")}</>

  return (
    <li className="document-row">
      <div className="document-row-copy">
        <p className="document-row-category">{t(category)}{format ? ` · ${format}` : null}</p>
        <h3 className="document-row-title">{t(title)}</h3>
        {description ? <p className="document-row-description">{t(description)}</p> : null}
      </div>
      {fileUrl ? (
        <Button variant="primary" className="document-row-download" href={fileUrl} download aria-label={t("documents.download", { title: t(title) })}>
          {downloadLabel}
        </Button>
      ) : (
        <Button variant="primary" className="document-row-download" onClick={() => setShowUnavailable(true)} aria-label={t("documents.download", { title: t(title) })}>
          {downloadLabel}
        </Button>
      )}
      {showUnavailable && unavailableMessage ? (
        <p className="document-row-notice" role="alert">{t(unavailableMessage)}</p>
      ) : null}
    </li>
  )
}
