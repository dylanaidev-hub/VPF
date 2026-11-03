import { ArrowRight } from "lucide-react"
import type { NewsArticle } from "../types"
import { formatViDate } from "../lib/format"
import { Badge } from "./Badge"
import { NewsImage } from "./NewsImage"

export function NewsCard({
  article,
  onOpen,
}: {
  article: NewsArticle
  onOpen: (article: NewsArticle) => void
}) {
  return (
    <a
      href={`#${article.slug}`}
      onClick={(event) => {
        event.preventDefault()
        onOpen(article)
      }}
      className="group flex h-full min-h-[104px] items-stretch gap-3 rounded-2xl border border-line bg-white p-3 transition-[border-color] duration-200 hover:border-brand/70 sm:gap-4"
    >
      <div className="relative w-[88px] shrink-0 self-stretch overflow-hidden rounded-xl bg-paper sm:w-[32%]">
        <NewsImage
          src={article.image}
          alt=""
          width={320}
          height={240}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${article.imagePosition ?? "object-center"}`}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Badge tone="neutral" className="border border-line">
            {article.category}
          </Badge>
          <time dateTime={article.date} className="text-[12px] font-medium text-muted">
            {formatViDate(article.date)}
          </time>
        </div>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-ink sm:text-lg">
          {article.title}
        </h3>
      </div>
      <span className="grid size-9 shrink-0 place-items-center self-center rounded-full border border-line text-ink transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none">
        <ArrowRight className="size-4" aria-hidden />
      </span>
    </a>
  )
}
