import { useTranslation } from "../i18n"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "../components/Button"
import { PageHeader } from "../components/PageHeader"
import { PartnershipBenefits } from "../components/partnership/PartnershipBenefits"
import { SiteLayout } from "../components/SiteLayout"
import "../components/partnership/partnership-ecosystem.css"
import { news } from "../data/news"
import { sponsorTierLabel, type SponsorProfile } from "../data/partnership.mock"
import { tournaments } from "../data/tournaments.mock"
import { formatViDate } from "../lib/format"
import { newsPath } from "../lib/news"
import { sitePath } from "../lib/site"
import { tournamentPath } from "../lib/tournaments"

export function SponsorDetailPage({ sponsor }: { sponsor: SponsorProfile }) {
  const { t } = useTranslation()
  const supported = tournaments.filter((item) => sponsor.tournamentSlugs.includes(item.slug)).slice(0, 4)
  const relatedNews = news.filter((item) => sponsor.newsSlugs.includes(item.slug)).slice(0, 4)

  return (
    <SiteLayout>
      <div className="eco-detail">
      <PageHeader
        breadcrumb={[
          { label: "Trang chủ", href: "/index.html" },
          { label: "Hợp tác", href: "/hoptac.html" },
          { label: sponsor.name },
        ]}
        title={sponsor.name}
        titleId="nha-tai-tro-chi-tiet"
        description={t(sponsor.intro)}
        action={
          <Button href="/hoptac.html">
            <ArrowLeft className="size-4" aria-hidden />
            {t("Về trang Hợp tác")}
          </Button>
        }
      />

      <section className="partner-section partner-detail-banner" aria-labelledby="nha-tai-tro-chi-tiet">
        <div className="page-wrap partner-detail-banner-inner">
          <div className="partner-detail-logo-panel">
            <img src={sitePath(sponsor.logoSrc)} alt={sponsor.name} width={280} height={120} className="partner-detail-logo" />
          </div>
          <div className="partner-detail-banner-copy">
            <p className="partner-tier-badge">{t(sponsorTierLabel[sponsor.tier])}</p>
            <p className="partner-main-sector mt-3">{sponsor.sector}</p>
          </div>
        </div>
      </section>

      {(sponsor.about || sponsor.statement || sponsor.quote || sponsor.sector || sponsor.website) && (
        <section className="partner-section" aria-labelledby="gioi-thieu-cong-ty">
          <div className="page-wrap partner-about-grid">
            <div className="min-w-0">
              <h2 id="gioi-thieu-cong-ty" className="partner-section-title">
                {t("Giới thiệu")}
              </h2>
              {sponsor.about ? <p className="partner-section-lead mt-3">{sponsor.about}</p> : null}
              {sponsor.statement ? <p className="mt-4 text-[15px] leading-relaxed text-ink">{sponsor.statement}</p> : null}
              {sponsor.quote ? <blockquote className="partner-quote">{sponsor.quote}</blockquote> : null}
            </div>
            <aside className="partner-quick-info">
              <h3 className="partner-quick-title">{t("Thông tin nhanh")}</h3>
              <dl className="partner-quick-list">
                <div>
                  <dt>{t("Lĩnh vực")}</dt>
                  <dd>{sponsor.sector}</dd>
                </div>
                <div>
                  <dt>{t("Hạng mục")}</dt>
                  <dd>{t(sponsorTierLabel[sponsor.tier])}</dd>
                </div>
                {sponsor.website ? (
                  <div>
                    <dt>Website</dt>
                    <dd>
                      <a href={sponsor.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                        {t("Truy cập")}
                        <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    </dd>
                  </div>
                ) : (
                  <div>
                    <dt>Website</dt>
                    <dd>{t("Chưa công bố")}</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </section>
      )}

      {supported.length > 0 ? (
        <section className="partner-section partner-detail-related" aria-labelledby="giai-dong-hanh">
          <div className="page-wrap">
            <h2 id="giai-dong-hanh" className="partner-section-title">
              {t("Giải đấu đồng hành")}
            </h2>
            <ul className="partner-tour-grid">
              {supported.map((item) => (
                <li key={item.id}>
                  <a href={sitePath(tournamentPath(item.slug))} className="partner-tour-card">
                    <img
                      src={sitePath(item.thumbnail ?? item.coverImage)}
                      alt=""
                      width={640}
                      height={400}
                      loading="lazy"
                      className="partner-tour-img"
                    />
                    <span className="partner-tour-name">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {relatedNews.length > 0 ? (
        <section className="partner-section" aria-labelledby="tin-lien-quan">
          <div className="page-wrap">
            <h2 id="tin-lien-quan" className="partner-section-title">
              {t("Tin liên quan")}
            </h2>
            <ul className="partner-news-grid">
              {relatedNews.map((article) => (
                <li key={article.id}>
                  <a href={sitePath(newsPath(article))} className="partner-news-card">
                    <img
                      src={sitePath(article.image)}
                      alt=""
                      width={640}
                      height={360}
                      loading="lazy"
                      className="partner-news-img"
                    />
                    <span className="partner-news-body">
                      <span className="partner-news-title">{t(article.title)}</span>
                      <time dateTime={article.publishedAt} className="partner-news-date">
                        {formatViDate(article.publishedAt)}
                      </time>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <PartnershipBenefits />
      <section className="partner-section">
        <div className="page-wrap flex flex-wrap gap-3">
          <Button href="/hoptac.html#nha-tai-tro" variant="secondary">
            <ArrowLeft className="size-4" aria-hidden />
            {t("Quay lại danh mục nhà tài trợ")}
          </Button>
          <Button href="/hoptac.html#lien-he-hop-tac">
            {t("Liên hệ hợp tác")}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </section>
      </div>
    </SiteLayout>
  )
}

export function SponsorNotFoundPage() {
  const { t } = useTranslation()
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[
          { label: "Trang chủ", href: "/index.html" },
          { label: "Hợp tác", href: "/hoptac.html" },
          { label: "Không tìm thấy" },
        ]}
        title={t("Không tìm thấy nhà tài trợ")}
        titleId="nha-tai-tro-khong-tim-thay"
        description={t("Hồ sơ nhà tài trợ này không có trên cổng hợp tác.")}
      />
      <div className="page-wrap pb-16">
        <Button href="/hoptac.html">{t("Về trang Hợp tác")}</Button>
      </div>
    </SiteLayout>
  )
}
