import { ArrowUpRight, Clock, MapPin } from "lucide-react"
import type { TournamentView } from "../types"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { statusLabel } from "../lib/tournaments"
import { Badge } from "./Badge"
import { NewsImage } from "./NewsImage"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

export function FeaturedTournamentCard({
  tournament,
  fill = false,
}: {
  tournament: TournamentView
  fill?: boolean
}) {
  const date = formatEventDate(tournament.startDate, tournament.endDate)

  return (
    <a href={sitePath(tournament.detailUrl)} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-navy">
      <div
        className={
          fill
            ? "relative aspect-video shrink-0 overflow-hidden min-[1200px]:aspect-auto min-[1200px]:min-h-[22rem] min-[1200px]:flex-1"
            : "relative aspect-video overflow-hidden"
        }
      >
        <NewsImage
          src={tournament.thumbnail}
          alt=""
          width={1600}
          height={1000}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[250ms] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="relative px-5 py-5 sm:px-7 sm:py-6">
        <CourtLines />
        <Badge tone={tone[tournament.status]}>{statusLabel[tournament.status]}</Badge>
        <p className="relative mt-4 text-[1.65rem] font-bold leading-none tracking-tight text-white sm:text-[2rem]">
          {date.day}
          <span className="ml-2 text-lg font-semibold text-white/80 sm:text-xl">
            {date.month} {date.year}
          </span>
        </p>
        <h3 className="relative mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">
          {tournament.name}
        </h3>
        <dl className="relative mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <dt className="sr-only">Địa điểm</dt>
            <dd>{tournament.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" aria-hidden />
            <dt className="sr-only">Thời gian</dt>
            <dd>{tournament.time}</dd>
          </div>
        </dl>
        <span className="relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-brand px-5 text-[15px] font-medium text-ink">
          Khám phá giải đấu
          <ArrowUpRight
            className="size-4 transition-transform duration-[250ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </div>
    </a>
  )
}

function CourtLines() {
  return (
    <svg
      viewBox="0 0 160 88"
      aria-hidden
      className="pointer-events-none absolute right-0 bottom-0 h-28 w-44 text-white opacity-[0.14]"
    >
      <rect x="8" y="10" width="144" height="68" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="10" x2="80" y2="78" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="28" x2="152" y2="28" stroke="currentColor" strokeWidth="1" />
      <line x1="8" y1="60" x2="152" y2="60" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
