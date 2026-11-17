import { useTranslation } from "../../i18n"
import { useState } from "react"
import { Check, Download } from "lucide-react"
import { benefitRows, offersSection, partnershipOffers } from "../../data/partnership.mock"
import { Dialog } from "../Dialog"
import { Button } from "../Button"
import { SectionHeading } from "../SectionHeading"
import { vpfStarPaths } from "../vpfStarPaths"

const groups = [
  {
    id: "brand",
    title: "Nhận diện thương hiệu",
    ids: ["logo-home", "profile"] as const,
    featured: false,
  },
  {
    id: "media",
    title: "Truyền thông",
    ids: ["livestream", "pr"] as const,
    featured: false,
  },
  {
    id: "event",
    title: "Tài trợ giải đấu",
    ids: ["backdrop", "booth"] as const,
    featured: true,
  },
  {
    id: "community",
    title: "Kết nối cộng đồng",
    ids: [] as const,
    featured: false,
  },
] as const

const tierNames = [
  ["main", "Nhà tài trợ chính"],
  ["companion", "Đối tác đồng hành"],
  ["event", "Tài trợ giải"],
  ["media", "Đối tác truyền thông"],
] as const

export function PartnershipBenefits() {
  const { t } = useTranslation()
  const [downloadOpen, setDownloadOpen] = useState(false)
  const hasPdf = Boolean(offersSection.downloadHref?.trim())
  const community = partnershipOffers
    .find((offer) => offer.id === "doi-tac-dong-hanh")
    ?.benefits.find((item) => item.includes("cộng đồng"))

  return (
    <section className="eco-section eco-benefits" aria-labelledby="quyen-loi-tieu-de">
      <svg className="eco-benefits-star" viewBox="0 0 800 800" fill="none" aria-hidden>
        {vpfStarPaths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
      <div className="page-wrap">
        <SectionHeading
          id="quyen-loi-tieu-de"
          title={offersSection.comparisonTitle}
          subtitle={offersSection.comparisonDescription}
          className="eco-benefits-head"
        />
        <p className="eco-benefits-note">{t(offersSection.note)}</p>

        <div className="eco-benefit-cards">
          {groups.map((group) => {
            const rows = benefitRows.filter((row) => (group.ids as readonly string[]).includes(row.id))
            return (
              <article key={group.id} className={group.featured ? "eco-benefit-card is-featured" : "eco-benefit-card"}>
                {group.featured ? <p className="eco-benefit-badge">{t("Nổi bật")}</p> : null}
                <h3>{t(group.title)}</h3>
                <ul>
                  {rows.map((row) => (
                    <li key={row.id}>
                      <Check className="eco-benefit-check" aria-hidden />
                      <div>
                        <strong>{t(row.label)}</strong>
                        <span>{tiers(row)}</span>
                      </div>
                    </li>
                  ))}
                  {group.id === "community" && community ? (
                    <li>
                      <Check className="eco-benefit-check" aria-hidden />
                      <div>
                        <strong>{community}</strong>
                        <span>{t("Đối tác đồng hành")}</span>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="eco-benefit-download">
          {hasPdf && offersSection.downloadHref ? (
            <Button href={offersSection.downloadHref} download>
              <Download className="size-4" aria-hidden />
              {t(offersSection.downloadLabel)}
            </Button>
          ) : (
            <Button type="button" onClick={() => setDownloadOpen(true)}>
              <Download className="size-4" aria-hidden />
              {t(offersSection.downloadLabel)}
            </Button>
          )}
        </div>
      </div>
      <Dialog open={downloadOpen} title={t(offersSection.downloadLabel)} onClose={() => setDownloadOpen(false)}>
        <p className="text-[15px] leading-relaxed text-ink">{offersSection.downloadNote}</p>
      </Dialog>
    </section>
  )
}

function tiers(row: (typeof benefitRows)[number]) {
  return tierNames
    .filter(([key]) => row[key])
    .map(([, label]) => label)
    .join(" · ")
}
