import { useState } from "react"
import { ArrowRight, Check, Download, Minus } from "lucide-react"
import { benefitRows, offersSection, partnershipOffers } from "../../data/partnership.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

export function PartnershipOffers() {
  const { ref, shown } = useReveal<HTMLElement>()
  const [downloadOpen, setDownloadOpen] = useState(false)
  const hasPdf = Boolean(offersSection.downloadHref?.trim())

  return (
    <section
      id={offersSection.id}
      ref={ref}
      className={cx("partner-section partner-offers partner-rise", shown && "is-in")}
      aria-labelledby="hinh-thuc-tieu-de"
    >
      <div className="page-wrap">
        <div className="partner-section-head">
          <h2 id="hinh-thuc-tieu-de" className="partner-section-title">
            {offersSection.title}
          </h2>
          <p className="partner-section-lead">{offersSection.description}</p>
          <p className="partner-note">{offersSection.note}</p>
        </div>

        <ul className="partner-offer-grid">
          {partnershipOffers.map((offer) => (
            <li key={offer.id} className="partner-offer-card">
              <h3 className="partner-offer-title">{offer.title}</h3>
              <p className="partner-offer-desc">{offer.description}</p>
              <ul className="partner-offer-benefits">
                {offer.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#lien-he-hop-tac" className="partner-offer-cta">
                Quan tâm hình thức này
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        <div className="partner-compare">
          <h3 className="partner-compare-title">{offersSection.comparisonTitle}</h3>
          <p className="partner-note">Bảng quyền lợi minh họa — chưa phải cam kết thương mại.</p>
          <div className="partner-compare-scroll">
            <table className="partner-compare-table">
              <thead>
                <tr>
                  <th scope="col">Quyền lợi</th>
                  <th scope="col">Chính</th>
                  <th scope="col">Đồng hành</th>
                  <th scope="col">Tài trợ giải</th>
                  <th scope="col">Truyền thông</th>
                </tr>
              </thead>
              <tbody>
                {benefitRows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    <td>
                      <Cell on={row.main} />
                    </td>
                    <td>
                      <Cell on={row.companion} />
                    </td>
                    <td>
                      <Cell on={row.event} />
                    </td>
                    <td>
                      <Cell on={row.media} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          {hasPdf && offersSection.downloadHref ? (
            <a
              href={sitePath(offersSection.downloadHref)}
              className="partner-btn-primary inline-flex"
              download
              target="_blank"
              rel="noreferrer"
            >
              <Download className="size-4" aria-hidden />
              {offersSection.downloadLabel}
            </a>
          ) : (
            <button type="button" className="partner-btn-primary inline-flex" onClick={() => setDownloadOpen(true)}>
              <Download className="size-4" aria-hidden />
              {offersSection.downloadLabel}
            </button>
          )}
        </div>
      </div>

      <Dialog open={downloadOpen} title={offersSection.downloadLabel} onClose={() => setDownloadOpen(false)}>
        <p className="text-[15px] leading-relaxed text-ink">{offersSection.downloadNote}</p>
      </Dialog>
    </section>
  )
}

function Cell({ on }: { on: boolean }) {
  return on ? (
    <span className="partner-compare-yes" aria-label="Có">
      <Check className="size-4" aria-hidden />
    </span>
  ) : (
    <span className="partner-compare-no" aria-label="Không">
      <Minus className="size-4" aria-hidden />
    </span>
  )
}
