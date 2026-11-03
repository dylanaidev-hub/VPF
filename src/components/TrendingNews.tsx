import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Flame } from "lucide-react"
import type { NewsArticle } from "../types"
import { formatViDate } from "../lib/format"
import { trendingLabel } from "../lib/news"
import { useReducedMotion } from "../lib/useReducedMotion"
import { cx } from "../lib/cx"
import { Badge } from "./Badge"
import { NewsImage } from "./NewsImage"

export function TrendingNews({
  articles,
  onOpen,
}: {
  articles: NewsArticle[]
  onOpen: (article: NewsArticle) => void
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [edge, setEdge] = useState({ start: true, end: false })

  const sync = () => {
    const node = scroller.current
    if (!node) return
    setEdge({
      start: node.scrollLeft <= 2,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 2,
    })
  }

  useEffect(() => {
    sync()
    const node = scroller.current
    if (!node) return
    node.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync)
    return () => {
      node.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
    }
  }, [articles.length])

  const move = (direction: number) => {
    const node = scroller.current
    const card = node?.querySelector<HTMLElement>("[data-trending-card]")
    if (!node || !card) return
    const gap = 20
    node.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    })
  }

  if (articles.length === 0) return null

  return (
    <div className="mt-12 min-[1200px]:mt-16">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 id="tin-quan-tam" className="flex items-center gap-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            <Flame className="size-5 text-brand" aria-hidden />
            Tin tức đang được quan tâm
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            Số thứ tự là thứ tự minh họa, không phải lượt xem.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <CarouselButton label="Tin trước" disabled={edge.start} onClick={() => move(-1)}>
            <ChevronLeft className="size-4" aria-hidden />
          </CarouselButton>
          <CarouselButton label="Tin sau" disabled={edge.end} onClick={() => move(1)}>
            <ChevronRight className="size-4" aria-hidden />
          </CarouselButton>
        </div>
      </div>
      <div
        ref={scroller}
        tabIndex={0}
        aria-labelledby="tin-quan-tam"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault()
            move(1)
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault()
            move(-1)
          }
        }}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-0 overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {articles.map((article, index) => (
          <a
            key={article.id}
            data-trending-card
            href={`#${article.slug}`}
            onClick={(event) => {
              event.preventDefault()
              onOpen(article)
            }}
            className="trending-card group shrink-0 snap-start"
          >
            <div className="relative overflow-hidden rounded-2xl bg-paper">
              <NewsImage
                src={article.image}
                alt=""
                width={640}
                height={360}
                loading="lazy"
                className={`aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${article.imagePosition ?? "object-center"}`}
              />
              <span className="absolute bottom-3 left-3 rounded-md bg-brand px-2 py-1 text-sm font-bold leading-none tracking-wide text-ink">
                {trendingLabel(article, index)}
              </span>
            </div>
            <div className="mt-3 flex flex-col">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Badge tone="neutral" className="border border-line">
                  {article.category}
                </Badge>
                <time dateTime={article.date} className="text-[12px] font-medium text-muted">
                  {formatViDate(article.date)}
                </time>
              </div>
              <h4 className="mt-2 line-clamp-3 text-base font-semibold leading-snug text-ink">
                {article.title}
              </h4>
              <ArrowUpRight
                className="mt-3 size-4 self-end text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "grid size-10 place-items-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-brand hover:bg-brand disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      {children}
    </button>
  )
}
