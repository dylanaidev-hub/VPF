import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { PageHeader } from "../components/PageHeader"
import { SiteLayout } from "../components/SiteLayout"
import { news } from "../data/news"
import { ILLUSTRATIVE_LABEL, sponsorTierLabel, type SponsorProfile } from "../data/partnership.mock"
import { tournaments } from "../data/tournaments.mock"
import { formatViDate } from "../lib/format"
import { newsPath } from "../lib/news"
import { sitePath } from "../lib/site"
import { tournamentPath } from "../lib/tournaments"

export function SponsorDetailPage({ sponsor }: { sponsor: SponsorProfile }) {
  const supported = tournaments.filter((item) => sponsor.tournamentSlugs.includes(item.slug)).slice(0, 4)
  const relatedNews = news.filter((item) => sponsor.newsSlugs.includes(item.slug)).slice(0, 4)

  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[
          { label: "Trang chủ", href: "/index.html" },
          { label: "Hợp tác", href: "/hoptac.html" },
          { label: sponsor.name },
        ]}
        eyebrow={sponsorTierLabel[sponsor.tier]}
        title={sponsor.name}
        titleId="nha-tai-tro-chi-tiet"
        description={sponsor.intro}
        disclaimer={ILLUSTRATIVE_LABEL}
        action={
          <a href={sitePath("/hoptac.html")} className="page-header-cta">
            <ArrowLeft className="size-4" aria-hidden />
            Về trang Hợp tác
          </a>
        }
      />

      <section className="partner-section partner-detail-banner" aria-labelledby="nha-tai-tro-chi-tiet">
        <div className="page-wrap partner-detail-banner-inner">
          <div className="partner-detail-logo-panel">
            <img src={sitePath(sponsor.logoSrc)} alt={sponsor.name} width={280} height={120} className="partner-detail-logo" />
          </div>
          <div className="partner-detail-banner-copy">
            <p className="partner-tier-badge">{sponsorTierLabel[sponsor.tier]}</p>
            <p className="partner-main-sector mt-3">{sponsor.sector}</p>
            <p className="partner-note mt-2">Hồ sơ nhà tài trợ minh họa — không phải đối tác chính thức đã công bố.</p>
          </div>
        </div>
      </section>

      {(sponsor.about || sponsor.statement || sponsor.quote || sponsor.sector || sponsor.website) && (
        <section className="partner-section" aria-labelledby="gioi-thieu-cong-ty">
          <div className="page-wrap partner-about-grid">
            <div className="min-w-0">
              <h2 id="gioi-thieu-cong-ty" className="partner-section-title">
                Giới thiệu
              </h2>
              {sponsor.about ? <p className="partner-section-lead mt-3">{sponsor.about}</p> : null}
              {sponsor.statement ? <p className="mt-4 text-[15px] leading-relaxed text-ink">{sponsor.statement}</p> : null}
              {sponsor.quote ? <blockquote className="partner-quote">{sponsor.quote}</blockquote> : null}
            </div>
            <aside className="partner-quick-info">
              <h3 className="partner-quick-title">Thông tin nhanh</h3>
              <dl className="partner-quick-list">
                <div>
                  <dt>Lĩnh vực</dt>
                  <dd>{sponsor.sector}</dd>
                </div>
                <div>
                  <dt>Hạng mục</dt>
                  <dd>{sponsorTierLabel[sponsor.tier]}</dd>
                </div>
                {sponsor.website ? (
                  <div>
                    <dt>Website</dt>
                    <dd>
                      <a href={sponsor.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                        Truy cập
                        <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    </dd>
                  </div>
                ) : (
                  <div>
                    <dt>Website</dt>
                    <dd>Chưa công bố</dd>
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
              Giải đấu đồng hành
            </h2>
            <p className="partner-note">Danh sách giải minh họa gắn với hồ sơ này trên giao diện.</p>
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
              Tin liên quan
            </h2>
            <p className="partner-note">Bài viết hiện có trên cổng tin tức, gắn minh họa với hồ sơ này.</p>
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
                      <span className="partner-news-title">{article.title}</span>
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

      <section className="partner-section">
        <div className="page-wrap flex flex-wrap gap-3">
          <a href={sitePath("/hoptac.html#nha-tai-tro")} className="partner-btn-secondary inline-flex">
            <ArrowLeft className="size-4" aria-hidden />
            Quay lại danh mục nhà tài trợ
          </a>
          <a href={sitePath("/hoptac.html#lien-he-hop-tac")} className="partner-btn-primary inline-flex">
            Liên hệ hợp tác
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </section>
    </SiteLayout>
  )
}

export function SponsorNotFoundPage() {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[
          { label: "Trang chủ", href: "/index.html" },
          { label: "Hợp tác", href: "/hoptac.html" },
          { label: "Không tìm thấy" },
        ]}
        eyebrow="Hợp tác"
        title="Không tìm thấy nhà tài trợ"
        titleId="nha-tai-tro-khong-tim-thay"
        description="Hồ sơ bạn mở không có trong dữ liệu minh họa hiện tại."
      />
      <div className="page-wrap pb-16">
        <a href={sitePath("/hoptac.html")} className="partner-btn-primary inline-flex">
          Về trang Hợp tác
        </a>
      </div>
    </SiteLayout>
  )
}
