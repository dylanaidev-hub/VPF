import { ArrowRight } from "lucide-react"
import type { NewsArticle } from "../../types"
import { formatViDate } from "../../lib/format"
import { newsPath } from "../../lib/news"
import { sitePath } from "../../lib/site"
import { Badge } from "../Badge"

export function NewsSpotlight({ featured }: { featured: NewsArticle }) {
  return (
    <a href={sitePath(newsPath(featured))} className="news-feature group">
      <div className="overflow-hidden rounded-2xl bg-paper">
        <img
          src={sitePath(featured.image)}
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className={`aspect-video w-full object-cover transition-transform duration-[250ms] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${featured.imagePosition ?? "object-center"}`}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Badge tone={featured.category === "Tin Liên đoàn" ? "important" : "neutral"} className="border border-line">
            {featured.category}
          </Badge>
          <time dateTime={featured.publishedAt} className="text-[13px] font-medium text-muted">
            {formatViDate(featured.publishedAt)}
          </time>
        </div>
        <h2 className="mt-3 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-ink transition-colors duration-[250ms] group-hover:text-brand-strong min-[1200px]:text-[2rem]">
          {featured.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{featured.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-ink">
          Đọc bài viết
          <ArrowRight
            className="size-4 transition-transform duration-[250ms] group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </div>
    </a>
  )
}
