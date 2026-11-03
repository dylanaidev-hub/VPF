import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "../types"
import { formatViDate } from "../lib/format"
import { selectNewsLayout } from "../lib/news"
import { Dialog } from "./Dialog"
import { FeaturedNewsCard } from "./FeaturedNewsCard"
import { NewsCard } from "./NewsCard"
import { TrendingNews } from "./TrendingNews"

export function NewsSection({
  articles,
  onOpen,
}: {
  articles: NewsArticle[]
  onOpen: (article: NewsArticle) => void
}) {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const { featured, secondary, trending, catalog } = selectNewsLayout(articles)

  if (!featured) return null

  return (
    <section id="tin-tuc" data-section className="bg-white py-12 md:py-[88px] min-[1200px]:py-28">
      <div className="page-wrap">
        <div className="relative mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="relative max-w-2xl">
            <PickleballMark />
            <p className="relative mb-3 flex items-center gap-3 text-[13px] font-medium text-brand-strong">
              <span className="h-px w-8 bg-brand" aria-hidden />
              Tin tức
            </p>
            <h2
              id="tin-tuc-tieu-de"
              className="relative text-[2rem] font-bold leading-[1.15] tracking-tight text-ink min-[1200px]:text-[2.75rem]"
            >
              Tin tức nổi bật
            </h2>
            <p className="relative mt-3 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
              Cập nhật những thông tin mới nhất từ cộng đồng Pickleball Việt Nam.
            </p>
          </div>
          <button
            type="button"
            className="relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-[10px] border border-line bg-white px-5 text-[15px] font-medium text-ink transition-colors duration-200 hover:border-brand hover:bg-brand md:self-auto"
            onClick={() => setCatalogOpen(true)}
          >
            Tất cả tin tức
            <ArrowUpRight className="size-4" aria-hidden />
          </button>
        </div>

        <div className="grid items-stretch gap-6 min-[1200px]:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
          <FeaturedNewsCard article={featured} onOpen={onOpen} />
          <div className="grid content-start gap-4 min-[1200px]:h-full min-[1200px]:grid-rows-3">
            {secondary.map((article) => (
              <NewsCard key={article.id} article={article} onOpen={onOpen} />
            ))}
          </div>
        </div>

        <TrendingNews articles={trending} onOpen={onOpen} />
      </div>

      <Dialog open={catalogOpen} title="Tất cả tin tức" onClose={() => setCatalogOpen(false)}>
        <ul className="divide-y divide-line">
          {catalog.map((article) => (
            <li key={article.id}>
              <button
                type="button"
                className="flex w-full flex-col items-start gap-1 py-4 text-left"
                onClick={() => {
                  setCatalogOpen(false)
                  onOpen(article)
                }}
              >
                <span className="text-[12px] font-medium text-muted">
                  {article.category}
                  <span aria-hidden> · </span>
                  <time dateTime={article.date}>{formatViDate(article.date)}</time>
                </span>
                <span className="text-base font-semibold leading-snug text-ink">{article.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </Dialog>
    </section>
  )
}

function PickleballMark() {
  return (
    <svg
      viewBox="0 0 80 80"
      aria-hidden
      className="pointer-events-none absolute -top-4 right-0 size-24 text-brand opacity-20 sm:size-28"
    >
      <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="28" cy="32" r="3.2" fill="currentColor" />
      <circle cx="40" cy="26" r="3.2" fill="currentColor" />
      <circle cx="52" cy="32" r="3.2" fill="currentColor" />
      <circle cx="31" cy="46" r="3.2" fill="currentColor" />
      <circle cx="46" cy="48" r="3.2" fill="currentColor" />
      <circle cx="40" cy="58" r="3.2" fill="currentColor" />
    </svg>
  )
}
