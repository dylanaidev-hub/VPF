import { useState } from "react"
import { Download, ExternalLink } from "lucide-react"
import {
  brandColors,
  brandLogoVersions,
  brandSection,
  brandTypeWeights,
} from "../../data/library.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { vpfStarPaths } from "../vpfStarPaths"
import { Dialog } from "../Dialog"
import { BrandCategoryItem } from "./BrandCategoryItem"
import "./brand-showcase.css"

type BrandPanel = "logo" | "color" | "type" | "usage" | "library" | "download" | null

function BrandStar() {
  return (
    <svg className="brand-stage-star" viewBox="0 0 800 800" fill="none" aria-hidden>
      {vpfStarPaths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export function BrandIdentitySection() {
  const { ref, shown } = useReveal<HTMLElement>()
  const [panel, setPanel] = useState<BrandPanel>(null)
  const [logoTab, setLogoTab] = useState<(typeof brandLogoVersions)[number]["id"]>("horizontal")
  const [copied, setCopied] = useState<string | null>(null)
  const hasDownload = Boolean(brandSection.downloadHref?.trim())
  const activeLogo = brandLogoVersions.find((item) => item.id === logoTab) ?? brandLogoVersions[0]

  async function copyHex(hex: string) {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      return
    } catch {
      const field = document.createElement("textarea")
      field.value = hex
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.left = "-999px"
      document.body.appendChild(field)
      field.select()
      const ok = document.execCommand("copy")
      field.remove()
      setCopied(ok ? hex : null)
    }
  }

  function closePanel() {
    setPanel(null)
    setCopied(null)
  }

  return (
    <section
      id={brandSection.id}
      ref={ref}
      className={cx("library-section library-brand library-rise", shown && "is-in")}
      aria-labelledby="bo-nhan-dien-tieu-de"
    >
      <div className="page-wrap library-brand-layout">
        <div className="brand-stage">
          <BrandStar />
          <button
            type="button"
            className="brand-stage-logo-btn"
            aria-label="Xem các phiên bản logo"
            onClick={() => {
              setLogoTab("white")
              setPanel("logo")
            }}
          >
            <img
              className="brand-stage-logo"
              src={sitePath(brandSection.logoWhite)}
              alt={brandSection.logoAlt}
              width={588}
              height={219}
            />
          </button>
        </div>

        <div className="min-w-0">
          <h2 id="bo-nhan-dien-tieu-de" className="library-section-title">
            {brandSection.title}
          </h2>
          <p className="library-section-lead">{brandSection.description}</p>

          <ul className="brand-categories">
            {brandSection.resources.map((item) => (
              <BrandCategoryItem
                key={item.id}
                index={item.index}
                title={item.label}
                detail={item.detail}
                pressed={panel === item.id}
                onSelect={() => setPanel(item.id)}
              />
            ))}
          </ul>

          <div className="library-actions">
            <button type="button" className="library-btn-primary" onClick={() => setPanel("library")}>
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
              <button type="button" className="library-btn-secondary" onClick={() => setPanel("download")}>
                <Download className="size-4" aria-hidden />
                {brandSection.downloadLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={panel === "logo"} title="Logo" onClose={closePanel}>
        <div className="brand-tabs" role="tablist" aria-label="Phiên bản logo">
          {brandLogoVersions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="brand-tab"
              role="tab"
              aria-selected={logoTab === item.id}
              onClick={() => setLogoTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          className={cx(
            "brand-logo-plate",
            activeLogo.surface === "field" && "is-field",
            activeLogo.id === "mark" && "is-mark",
          )}
          role="tabpanel"
        >
          <img src={sitePath(activeLogo.src)} alt="" width={588} height={219} />
        </div>
        <p className="brand-note">
          Bộ file trên trang gồm logo ngang màu, logo ngang trắng và biểu tượng. Chưa có file logo dọc.
        </p>
        <p className="brand-note">{brandSection.note}</p>
      </Dialog>

      <Dialog open={panel === "color"} title="Bảng màu" onClose={closePanel}>
        <ul className="brand-swatches">
          {brandColors.map((color) => (
            <li key={color.id}>
              <button type="button" className="brand-swatch" onClick={() => copyHex(color.hex)}>
                <span className="brand-swatch-chip" style={{ background: color.hex }} />
                <span>
                  <span className="brand-swatch-name">{color.name}</span>
                  <span className="brand-swatch-note">{color.note}</span>
                </span>
                <span className="brand-swatch-hex">{copied === color.hex ? "Đã chép" : color.hex}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="brand-note">Nhấn một màu để chép mã HEX. Các mã lấy từ file nhận diện đang dùng trên website.</p>
      </Dialog>

      <Dialog open={panel === "type"} title="Typography" onClose={closePanel}>
        <ul className="brand-type-list">
          {brandTypeWeights.map((item) => (
            <li key={item.id}>
              <span className="brand-type-meta">
                Be Vietnam Pro · {item.label} {item.weight}
              </span>
              <p className="brand-type-sample" style={{ fontWeight: item.weight }}>
                Liên đoàn Pickleball Việt Nam
              </p>
            </li>
          ))}
        </ul>
        <p className="brand-note">
          Ấn phẩm in ghi nhận SVN-Gotham. Giao diện website dùng Be Vietnam Pro.
        </p>
      </Dialog>

      <Dialog open={panel === "usage"} title="Hướng dẫn sử dụng" onClose={closePanel}>
        <div className="brand-usage-frame">
          <img src={sitePath(brandSection.logoPreview)} alt="" width={588} height={219} />
        </div>
        <p className="brand-note">
          Dùng file SVG đã có: bản màu trên nền sáng, bản trắng trên nền đỏ. Không vẽ lại logo.
        </p>
        <p className="brand-note">
          Khoảng cách an toàn, kích thước tối thiểu và danh sách cách dùng sai chưa được công bố trên trang này.
          Khung viền chỉ minh họa khoảng thở quanh logo.
        </p>
      </Dialog>

      <Dialog open={panel === "library"} title={brandSection.viewLibraryLabel} onClose={closePanel}>
        <p className="text-[15px] leading-relaxed text-ink">{brandSection.libraryNote}</p>
      </Dialog>

      <Dialog open={panel === "download"} title={brandSection.downloadLabel} onClose={closePanel}>
        <p className="text-[15px] leading-relaxed text-ink">{brandSection.downloadNote}</p>
      </Dialog>
    </section>
  )
}
