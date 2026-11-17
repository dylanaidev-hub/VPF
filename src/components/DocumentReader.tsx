import { lazy, Suspense } from "react"
import { Download, SquareArrowOutUpRight } from "lucide-react"
import { sitePath } from "../lib/site"
import { publishedPdf } from "./DocumentCard"

const PdfViewer = lazy(() => import("./PdfViewer"))

export function DocumentReader({ documentUrl, downloadUrl, note }: {
  documentUrl: string
  downloadUrl?: string
  note?: string
}) {
  const pdf = publishedPdf(documentUrl)
  const download = publishedPdf(downloadUrl)
  if (!pdf) return null
  return (
    <div className="doc-reader">
      {note ? <p>{note}</p> : null}
      <div className="doc-reader-actions">
        <a href={sitePath(pdf)} target="_blank" rel="noopener noreferrer"><SquareArrowOutUpRight size={16} aria-hidden="true" /> Mở PDF trong tab mới</a>
        {download ? <a href={sitePath(download)} download><Download size={16} aria-hidden="true" /> Tải PDF</a> : null}
      </div>
      <Suspense fallback={<p role="status">Đang mở trình đọc PDF…</p>}>
        <PdfViewer key={pdf} url={sitePath(pdf)} />
      </Suspense>
    </div>
  )
}
