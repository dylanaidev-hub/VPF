import { ArrowRight } from "lucide-react"
import type { NewsArticle } from "../types"
import { formatViDate } from "../lib/format"
import { Badge } from "./Badge"
import { NewsImage } from "./NewsImage"
import { StarPattern } from "./StarPattern"

export function FeaturedNewsCard({
  article,
  onOpen,
}: {
  article: NewsArticle
  onOpen: (article: NewsArticle) => void
}) {
  const important = article.category === "Tin Liên đoàn"

  return (
    <a
      href={`#${article.slug}`}
      onClick={(event) => {
        event.preventDefault()
        onOpen(article)
      }}
      className="group relative isolate flex h-full min-h-[440px] overflow-hidden rounded-2xl bg-signal min-[1200px]:min-h-[520px]"
    >
      <NewsImage
        src={article.image}
        alt=""
        width={1600}
        height={1000}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${article.imagePosition ?? "object-center"}`}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(174,48,51,0.08)_0%,rgba(174,48,51,0.12)_38%,rgba(174,48,51,0.88)_100%)]"
        aria-hidden
      />
      <StarPattern className="vpf-star-mark-card" />
      <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
        <Badge tone={important ? "important" : "neutral"}>{article.category}</Badge>
      </div>
      <div className="relative z-10 mt-auto w-full max-w-xl p-5 pr-20 sm:p-7 sm:pr-24">
        <time dateTime={article.date} className="text-[13px] font-medium text-white/75">
          {formatViDate(article.date)}
        </time>
        <h3 className="mt-2 line-clamp-3 text-2xl font-semibold leading-snug text-white sm:text-[1.7rem]">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-white/80">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-brand">
          Đọc tiếp
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </div>
    </a>
  )
}
