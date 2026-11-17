import { useTranslation } from "../i18n"
import { ArrowUpRight } from "lucide-react"
import type { NewsArticle } from "../types"
import { selectNewsLayout } from "../lib/news"
import { sitePath } from "../lib/site"
import { FeaturedNewsCard } from "./FeaturedNewsCard"
import { NewsCard } from "./NewsCard"

export function NewsSection({ articles }: { articles: NewsArticle[] }) {
  const { t } = useTranslation()
  const { featured, secondary, trendingTop } = selectNewsLayout(articles)

  if (!featured) return null

  return (
    <section id="tin-tuc" data-section className="bg-white py-12 md:py-[88px] min-[1200px]:py-28">
      <div className="page-wrap">
        <div className="relative mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="relative max-w-2xl">
            <PickleballMark />
            <h2
              id="tin-tuc-tieu-de"
              className="vpf-section-title relative"
            >
              {t("Tin tức nổi bật")}
            </h2>
            <p className="relative mt-3 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
              {t("Cập nhật những thông tin mới nhất từ cộng đồng Pickleball Việt Nam.")}
            </p>
          </div>
          <a
            href={sitePath("/tintuc.html")}
            className="relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-[10px] border border-line bg-white px-5 text-[15px] font-medium text-ink transition-colors duration-200 hover:border-brand hover:bg-brand md:self-auto"
          >
            {t("Tất cả tin tức")}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="grid items-stretch gap-6 min-[1200px]:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
          <FeaturedNewsCard article={featured} />
          <div className="grid content-start gap-4 min-[1200px]:h-full min-[1200px]:grid-rows-3">
            {secondary.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
        {trendingTop.length ? (
          <section className="mt-8" aria-labelledby="tin-dang-chu-y">
            <h3 id="tin-dang-chu-y" className="mb-4 text-xl font-bold text-ink">{t("Tin đang được chú ý")}</h3>
            <ul className="grid gap-4 md:grid-cols-2 min-[1200px]:grid-cols-3">
              {trendingTop.map((article) => (
                <li key={article.id} className="min-w-0"><NewsCard article={article} /></li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
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
