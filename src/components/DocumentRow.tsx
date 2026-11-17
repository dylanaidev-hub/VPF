import { Download } from "lucide-react"
import { Button } from "./Button"
import "./document-row.css"

const statusLabels = {
  published: "Đã công bố",
  draft: "Chưa công bố",
  sample: "Bản mẫu",
}

type DocumentRowProps = {
  category: string
  title: string
  description?: string
  format?: string
  status: keyof typeof statusLabels
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
      <div className="document-row-actions">
        <p className="document-row-status">{statusLabels[downloadUrl ? status : "draft"]}</p>
        {downloadUrl ? (
          <Button variant="text" className="document-row-download" href={downloadUrl} download aria-label={`Tải xuống: ${title}`}>
            <Download size={16} aria-hidden="true" /> Tải xuống
          </Button>
        ) : null}
      </div>
    </li>
  )
}
