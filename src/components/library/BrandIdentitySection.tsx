import { useState } from "react"
import { Download, ExternalLink } from "lucide-react"
import { brandSection } from "../../data/library.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

export function BrandIdentitySection() {
  const { ref, shown } = useReveal<HTMLElement>()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const hasDownload = Boolean(brandSection.downloadHref?.trim())

  return (
    <section
      id={brandSection.id}
      ref={ref}
      className={cx("library-section library-brand library-rise", shown && "is-in")}
      aria-labelledby="bo-nhan-dien-tieu-de"
    >
      <div className="page-wrap library-brand-layout">
        <button
          type="button"
          className="library-brand-preview"
          onClick={() => setPreviewOpen(true)}
          aria-label="Xem lớn logo VPF (minh họa)"
        >
          <img
            src={sitePath(brandSection.logoPreview)}
            alt={brandSection.logoAlt}
            width={588}
            height={219}
            className="library-brand-logo"
          />
          <span className="library-brand-preview-hint">Nhấn để xem lớn</span>
        </button>

        <div className="library-brand-copy min-w-0">
          <h2 id="bo-nhan-dien-tieu-de" className="library-section-title">
            {brandSection.title}
          </h2>
          <p className="library-section-lead">{brandSection.description}</p>
          <p className="library-note">{brandSection.note}</p>

          <ul className="library-brand-resources">
            {brandSection.resources.map((item) => (
              <li key={item.id}>
                <span className="library-brand-resource-label">{item.label}</span>
                <span className="library-brand-resource-detail">{item.detail}</span>
              </li>
            ))}
          </ul>

          <div className="library-actions">
            <button type="button" className="library-btn-primary" onClick={() => setLibraryOpen(true)}>
              <ExternalLink className="size-4" aria-hidden />
              {brandSection.viewLibraryLabel}
            </button>
            {hasDownload && brandSection.downloadHref ? (
              <a
                href={sitePath(brandSection.downloadHref)}
                className="library-btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                <Download className="size-4" aria-hidden />
                {brandSection.downloadLabel}
              </a>
            ) : (
              <button type="button" className="library-btn-secondary" onClick={() => setDownloadOpen(true)}>
                <Download className="size-4" aria-hidden />
                {brandSection.downloadLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={previewOpen} title="Logo VPF" onClose={() => setPreviewOpen(false)}>
        <p className="text-sm font-medium text-brand-strong">Xem trước minh họa</p>
        <img
          src={sitePath(brandSection.logoPreview)}
          alt={brandSection.logoAlt}
          width={588}
          height={219}
          className="mt-4 w-full max-w-md bg-paper p-6"
        />
      </Dialog>

      <Dialog open={libraryOpen} title={brandSection.viewLibraryLabel} onClose={() => setLibraryOpen(false)}>
        <p className="text-[15px] leading-relaxed text-ink">{brandSection.libraryNote}</p>
      </Dialog>

      <Dialog open={downloadOpen} title={brandSection.downloadLabel} onClose={() => setDownloadOpen(false)}>
        <p className="text-[15px] leading-relaxed text-ink">{brandSection.downloadNote}</p>
      </Dialog>
    </section>
  )
}
