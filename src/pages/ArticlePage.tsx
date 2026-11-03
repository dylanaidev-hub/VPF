import { useMemo } from "react"
import { news } from "../data/news"
import { formatViDate } from "../lib/format"
import { articleSlugFromPath } from "../lib/news"
import { sitePath } from "../lib/site"
import { Breadcrumb } from "../components/Breadcrumb"
import { SiteLayout } from "../components/SiteLayout"

export function ArticlePage() {
  const article = useMemo(() => {
    const slug = articleSlugFromPath(window.location.pathname)
    return news.find((item) => item.slug === slug) ?? null
  }, [])

  return (
    <SiteLayout>
      <article className="bg-white">
        <div className="page-wrap py-10 min-[1200px]:py-16">
          {article ? (
            <>
              <Breadcrumb
                items={[
                  { label: "Trang chủ", href: "/index.html" },
                  { label: "Tin tức", href: "/tintuc.html" },
                  { label: article.title },
                ]}
              />
              <p className="mt-8 text-[13px] font-medium text-brand-strong">
                {article.category}
                <span className="text-muted"> · </span>
                <time dateTime={article.publishedAt} className="text-muted">
                  {formatViDate(article.publishedAt)}
                </time>
              </p>
              <h1 className="news-page-title mt-4 max-w-4xl text-ink">{article.title}</h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">{article.excerpt}</p>
              <img
                src={sitePath(article.image)}
                alt={article.imageAlt}
                width={1600}
                height={900}
                fetchPriority="high"
                decoding="async"
                className={`mt-8 aspect-video w-full rounded-2xl object-cover ${article.imagePosition ?? "object-center"}`}
              />
              <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-relaxed text-ink md:text-base">
                {article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-10">
                <a href={sitePath("/tintuc.html")} className="text-[15px] font-medium text-brand-strong">
                  Về trang tin tức
                </a>
              </p>
            </>
          ) : (
            <>
              <h1 className="news-page-title text-ink">Không tìm thấy bài viết</h1>
              <p className="mt-4 text-muted">Đường dẫn không khớp bài nào trong nguồn tin hiện tại.</p>
              <p className="mt-6">
                <a href={sitePath("/tintuc.html")} className="text-[15px] font-medium text-brand-strong">
                  Về trang tin tức
                </a>
              </p>
            </>
          )}
        </div>
      </article>
    </SiteLayout>
  )
}
