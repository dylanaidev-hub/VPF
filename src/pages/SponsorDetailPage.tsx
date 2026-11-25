import { useTranslation } from "../i18n"
import { useMemo, useState } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "../components/Button"
import { MediaViewer } from "../components/media/MediaViewer"
import { PageHero } from "../components/PageHero"
import { PartnerSpotlightItem } from "../components/partnership/PartnerSpotlightItem"
import { SiteLayout } from "../components/SiteLayout"
import {
  ILLUSTRATIVE_LABEL,
  sponsorTierLabel,
  type SponsorProfile,
} from "../data/partnership.mock"
import { cx } from "../lib/cx"
import { getOtherSponsors, getSponsorHighlights } from "../lib/partnership"
import { sitePath } from "../lib/site"
import { useReveal } from "../lib/useReveal"
import "../components/partnership/sponsor-detail.css"

export function SponsorDetailPage({ sponsor }: { sponsor: SponsorProfile }) {
  const { t } = useTranslation()
  const highlights = useMemo(() => getSponsorHighlights(sponsor), [sponsor])
  const others = useMemo(() => getOtherSponsors(sponsor, 3), [sponsor])
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const brandReveal = useReveal<HTMLElement>()
  const aboutReveal = useReveal<HTMLElement>()
  const galleryReveal = useReveal<HTMLElement>()
  const othersReveal = useReveal<HTMLElement>()

  const aboutBlocks = [sponsor.about, sponsor.statement].filter(
    (value, index, list): value is string => Boolean(value) && list.indexOf(value) === index,
  )

  return (
    <SiteLayout>
      <article className="sponsor-spotlight">
        <PageHero
          title={sponsor.name}
          titleId="nha-tai-tro-chi-tiet"
          description={sponsor.intro}
          breadcrumbs={[
            { label: "Trang chủ", href: "/index.html" },
            { label: "Hợp tác", href: "/hoptac.html" },
            { label: sponsor.name },
          ]}
        />

        <section
          ref={brandReveal.ref}
          className={cx("sponsor-spotlight-section sponsor-spotlight-brand sponsor-spotlight-rise", brandReveal.shown && "is-in")}
          aria-label={t("Thông tin nhà tài trợ")}
        >
          <div className="page-wrap sponsor-spotlight-brand-grid">
            <div className="sponsor-spotlight-logo-panel">
              <img
                src={sitePath(sponsor.logoSrc)}
                alt={sponsor.name}
                width={280}
                height={120}
                className="sponsor-spotlight-logo"
              />
            </div>
            <div className="sponsor-spotlight-brand-copy min-w-0">
              <p className="sponsor-spotlight-tier">{t(sponsorTierLabel[sponsor.tier])}</p>
              {sponsor.sector ? (
                <p className="sponsor-spotlight-meta">
                  {t("Lĩnh vực")}: {sponsor.sector}
                </p>
              ) : null}
              {sponsor.website ? (
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="sponsor-spotlight-link"
                >
                  {t("Website chính thức")}
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              ) : null}
              {sponsor.illustrative ? <p className="sponsor-spotlight-note">{t(ILLUSTRATIVE_LABEL)}</p> : null}
            </div>
          </div>
        </section>

        {aboutBlocks.length > 0 ? (
          <section
            ref={aboutReveal.ref}
            className={cx("sponsor-spotlight-section sponsor-spotlight-rise", aboutReveal.shown && "is-in")}
            aria-labelledby="dong-hanh-cung-vpf"
          >
            <div className="page-wrap sponsor-spotlight-about">
              <h2 id="dong-hanh-cung-vpf" className="sponsor-spotlight-heading">
                {t("Đồng hành cùng VPF")}
              </h2>
              <div className="sponsor-spotlight-body">
                {aboutBlocks.map((block) => (
                  <p key={block}>{t(block)}</p>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {highlights.length > 0 ? (
          <section
            ref={galleryReveal.ref}
            className={cx("sponsor-spotlight-section sponsor-spotlight-rise", galleryReveal.shown && "is-in")}
            aria-labelledby="dau-an-dong-hanh"
          >
            <div className="page-wrap">
              <h2 id="dau-an-dong-hanh" className="sponsor-spotlight-heading">
                {t("Dấu ấn đồng hành")}
              </h2>
              <ul className="sponsor-spotlight-gallery" data-count={highlights.length}>
                {highlights.map((shot, index) => (
                  <li key={shot.id}>
                    <button
                      type="button"
                      className="sponsor-spotlight-shot"
                      aria-label={t(shot.alt)}
                      onClick={() => setViewerIndex(index)}
                    >
                      <img src={sitePath(shot.src)} alt="" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {others.length > 0 ? (
          <section
            ref={othersReveal.ref}
            className={cx("sponsor-spotlight-section sponsor-spotlight-rise", othersReveal.shown && "is-in")}
            aria-labelledby="doi-tac-dong-hanh-khac"
          >
            <div className="page-wrap">
              <h2 id="doi-tac-dong-hanh-khac" className="sponsor-spotlight-heading">
                {t("Đối tác đồng hành khác")}
              </h2>
              <ul className="sponsor-spotlight-others">
                {others.map((item) => (
                  <li key={item.id}>
                    <PartnerSpotlightItem sponsor={item} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

      </article>

      {viewerIndex != null && highlights.length > 0 ? (
        <MediaViewer
          items={highlights.map((shot) => ({
            id: shot.id,
            src: shot.src,
            alt: shot.alt,
            thumbnail: shot.src,
          }))}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      ) : null}
    </SiteLayout>
  )
}

export function SponsorNotFoundPage() {
  const { t } = useTranslation()
  return (
    <SiteLayout>
      <article className="sponsor-spotlight">
        <PageHero
          title="Không tìm thấy nhà tài trợ"
          titleId="nha-tai-tro-khong-tim-thay"
          description="Hồ sơ nhà tài trợ này không có trên cổng hợp tác."
          breadcrumbs={[
            { label: "Trang chủ", href: "/index.html" },
            { label: "Hợp tác", href: "/hoptac.html" },
            { label: "Không tìm thấy" },
          ]}
          action={<Button href="/hoptac.html">{t("Về trang Hợp tác")}</Button>}
        />
      </article>
    </SiteLayout>
  )
}
