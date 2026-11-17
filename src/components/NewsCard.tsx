import { useTranslation } from "../i18n"
import { ArrowRight } from "lucide-react"
import type { NewsArticle } from "../types"
import { cx } from "../lib/cx"
import { formatViDate } from "../lib/format"
import { getNewsDetailUrl } from "../lib/news"
import { sitePath } from "../lib/site"
import { Badge } from "./Badge"
import { NewsImage } from "./NewsImage"

export function NewsCard({ article, variant = "compact" }: {
  article: NewsArticle
  variant?: "compact" | "editorial"
}) {
  const { t } = useTranslation()
  const editorial = variant === "editorial"
  const date = editorial ? article.publishedAt : article.date
  return (
    <a
      href={sitePath(getNewsDetailUrl(article))}
      className={cx(
        "group flex h-full rounded-2xl border border-line bg-white",
        editorial
          ? "flex-col overflow-hidden"
          : "min-h-[104px] items-stretch gap-3 p-3 transition-[border-color] duration-200 hover:border-brand/70 sm:gap-4",
      )}
    >
      <div className={cx(
        "relative shrink-0 overflow-hidden bg-paper",
        editorial ? "aspect-video w-full" : "w-[88px] self-stretch rounded-xl sm:w-[32%]",
      )}>
        <NewsImage
          src={article.thumbnail}
          alt=""
          width={editorial ? 640 : 320}
          height={editorial ? 360 : 240}
          loading="lazy"
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            editorial ? "duration-[250ms]" : "duration-200",
            article.imagePosition ?? "object-center",
          )}
        />
      </div>
      <div className={cx("flex min-w-0 flex-1 flex-col", editorial ? "p-4" : "justify-center py-0.5")}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Badge tone="neutral" className="border border-line">
            {t(article.category)}
          </Badge>
          <time dateTime={date} className="text-[12px] font-medium text-muted">
            {formatViDate(date.slice(0, 10))}
          </time>
        </div>
        <h3 className={cx(
          "mt-2 line-clamp-2 text-base font-semibold leading-snug text-ink sm:text-lg",
          editorial && "transition-colors duration-[250ms] group-hover:text-(--vpf-logo-red) motion-reduce:transition-none",
        )}>
          {t(article.title)}
        </h3>
      </div>
      {editorial ? null : <span className="grid size-9 shrink-0 place-items-center self-center rounded-full border border-line text-ink transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none">
        <ArrowRight className="size-4" aria-hidden />
      </span>}
    </a>
  )
}
