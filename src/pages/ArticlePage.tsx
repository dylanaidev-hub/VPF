import { useTranslation } from "../i18n"
import { ArrowRight } from "lucide-react"
import type { NewsArticle, NewsContentBlock } from "../types"
import { formatViDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { getNewsDetailUrl, getRelatedNews } from "../lib/news"
import { ArticleShare } from "../components/ArticleShare"
import { Breadcrumb } from "../components/Breadcrumb"
import { Button } from "../components/Button"
import { NewsCard } from "../components/NewsCard"
import { NewsImage } from "../components/NewsImage"
import { SectionHeading } from "../components/SectionHeading"
import { SiteLayout } from "../components/SiteLayout"

function ArticleBlock({ block }: { block: NewsContentBlock }) {
  const { t } = useTranslation()

  if (typeof block === "string") return <p>{t(block)}</p>

  if (block.type === "heading") {
    return <h2 className="pt-3 text-xl font-bold leading-snug sm:text-2xl">{t(block.text)}</h2>
  }

  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul"
    return (
      <List className={`space-y-2 ps-6 ${block.ordered ? "list-decimal" : "list-disc"}`}>
        {block.items.map((item, index) => <li key={index}>{t(item)}</li>)}
      </List>
    )
  }

  return (
    <figure>
      <NewsImage src={block.src} alt={t(block.alt)} loading="lazy" decoding="async" className="h-auto w-full rounded-xl" />
      {block.caption ? <figcaption className="mt-2 text-sm text-muted">{t(block.caption)}</figcaption> : null}
    </figure>
  )
}

export function ArticlePage({ article }: { article: NewsArticle | null }) {
  const { t } = useTranslation()
  const crumbs = [
    { label: "Trang chủ", href: "/index.html" },
    { label: "Tin tức", href: article ? "/tintuc.html" : undefined },
  ]

  if (!article) {
    return (
      <SiteLayout>
        <div className="page-wrap py-10 md:py-14">
          <Breadcrumb items={crumbs} />
          <h1 className="news-page-title mt-6">{t("Không tìm thấy bài viết")}</h1>
          <p className="mt-4 text-muted">{t("Đường dẫn không khớp bài nào trong nguồn tin hiện tại.")}</p>
          <Button href="/tintuc.html" className="mt-6">{t("Quay lại Tin tức")}</Button>
        </div>
      </SiteLayout>
    )
  }

  const related = getRelatedNews(article)
  const byline = [article.author, article.source ? t(article.source) : undefined].filter(Boolean).join(" · ")
  const content = article.excerpt && article.content[0] === article.excerpt ? article.content.slice(1) : article.content

  return (
    <SiteLayout>
      <article className="page-wrap bg-white py-8 sm:py-10 lg:py-14">
        <div className="mx-auto max-w-[780px]">
          <header>
            <Breadcrumb items={[...crumbs, { label: article.title }]} />
            <p className="mt-6 text-sm font-semibold text-signal">{t(article.category)}</p>
            <h1 className="mt-2 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-ink [overflow-wrap:anywhere]">
              {t(article.title)}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <time dateTime={article.publishedAt}>{formatViDate(article.publishedAt)}</time>
              {byline ? <span>{byline}</span> : null}
              {article.illustrative ? <span>{t("Bài viết minh họa")}</span> : null}
            </p>
            {article.excerpt ? <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{t(article.excerpt)}</p> : null}
          </header>
          <NewsImage
            src={article.coverImage ?? article.thumbnail}
            alt={t(article.imageAlt)}
            width={1600}
            height={900}
            fetchPriority="high"
            decoding="async"
            className={`mt-7 aspect-video w-full rounded-xl bg-paper object-cover ${article.imagePosition ?? "object-center"}`}
          />
          <div className="mt-8 space-y-5 text-base leading-[1.75] text-ink [overflow-wrap:anywhere] sm:text-lg">
            {content.map((block, index) => <ArticleBlock key={index} block={block} />)}
            {!article.content.length ? <p className="text-muted">{t("Nội dung bài viết chưa được công bố.")}</p> : null}
          </div>
          <ArticleShare title={t(article.title)} url={sitePath(getNewsDetailUrl(article))} />
        </div>
      </article>

      {related.length ? (
        <section className="bg-paper py-12 md:py-16 lg:py-22" aria-labelledby="tin-lien-quan">
          <div className="page-wrap">
            <SectionHeading
              id="tin-lien-quan"
              title="Bài viết liên quan"
              action={
                <Button variant="text" className="text-(--vpf-logo-red)" href="/tintuc.html">
                  {t("Xem tất cả")} <ArrowRight className="size-4" aria-hidden />
                </Button>
              }
            />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="min-w-0">
                  <NewsCard article={item} variant="editorial" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </SiteLayout>
  )
}
