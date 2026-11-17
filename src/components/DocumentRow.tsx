import { Download } from "lucide-react"
import { Button } from "./Button"
import "./document-row.css"

type DocumentRowProps = {
  category: string
  title: string
  description?: string
  format?: string
  status: "published" | "draft" | "sample"
  fileUrl?: string
}

export function DocumentRow({ category, title, description, format, status, fileUrl }: DocumentRowProps) {
  const downloadUrl = status === "draft" ? undefined : fileUrl

  return (
    <li className="document-row">
      <div className="document-row-copy">
        <p className="document-row-category">{category}{format ? ` · ${format}` : null}</p>
        <h3 className="document-row-title">{title}</h3>
        {description ? <p className="document-row-description">{description}</p> : null}
      </div>
      {downloadUrl ? (
        <Button variant="primary" className="document-row-download" href={downloadUrl} download aria-label={`Tải xuống: ${title}`}>
          <Download size={16} aria-hidden="true" /> Tải xuống
        </Button>
      ) : null}
    </li>
  )
}
