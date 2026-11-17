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
  const [showUnavailable, setShowUnavailable] = useState(false)
  const downloadLabel = <><Download size={16} aria-hidden="true" /> Tải xuống</>

  return (
    <li className="document-row">
      <div className="document-row-copy">
        <p className="document-row-category">{category}{format ? ` · ${format}` : null}</p>
        <h3 className="document-row-title">{title}</h3>
        {description ? <p className="document-row-description">{description}</p> : null}
      </div>
      {fileUrl ? (
        <Button variant="primary" className="document-row-download" href={fileUrl} download aria-label={`Tải xuống: ${title}`}>
          {downloadLabel}
        </Button>
      ) : (
        <Button variant="primary" className="document-row-download" onClick={() => setShowUnavailable(true)} aria-label={`Tải xuống: ${title}`}>
          {downloadLabel}
        </Button>
      )}
      {showUnavailable && unavailableMessage ? (
        <p className="document-row-notice" role="alert">{unavailableMessage}</p>
      ) : null}
    </li>
  )
}
