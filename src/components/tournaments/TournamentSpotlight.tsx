import { useEffect, useRef, useState } from "react"
import { ArrowRight, MapPin } from "lucide-react"
import type { TournamentView } from "../../types"
import { formatEventDate } from "../../lib/format"
import { sitePath } from "../../lib/site"
import { statusLabel } from "../../lib/tournaments"
import { Badge } from "../Badge"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

export function TournamentSpotlight({ tournament }: { tournament: TournamentView }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [shown, setShown] = useState(false)
  const date = formatEventDate(tournament.startDate, tournament.endDate)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const mark = () => setShown(true)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mark()
      return
    }
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) mark()
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) mark()
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={sitePath(tournament.detailUrl)}
      className={`tournament-feature tournament-reveal group overflow-hidden rounded-2xl bg-navy text-white ${shown ? "is-in" : ""}`}
    >
      <div className="overflow-hidden">
        <img
          src={sitePath(tournament.coverImage)}
          alt=""
          width={1600}
          height={900}
          className="aspect-video h-full w-full object-cover transition-transform duration-[250ms] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8">
        <Badge tone={tone[tournament.status]} className="featured-tournament__badge">
          {statusLabel[tournament.status]}
        </Badge>
        <h2 className="mt-4 text-[1.65rem] font-bold leading-[1.15] tracking-tight min-[1200px]:text-[2rem]">
          {tournament.name}
        </h2>
        <p className="mt-3 text-sm text-white/80">
          <time dateTime={tournament.startDate}>{date.rangeLabel}</time>
          <span aria-hidden> · </span>
          {tournament.time}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
          <MapPin className="size-4 shrink-0" aria-hidden />
          {tournament.venue}, {tournament.location}
        </p>
        <span className="mt-6 inline-flex min-h-12 items-center gap-2 self-start rounded-[10px] bg-brand px-5 text-[15px] font-medium text-ink">
          Xem chi tiết giải đấu
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </div>
    </a>
  )
}
