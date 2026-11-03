import { ArrowRight, Clock, MapPin } from "lucide-react"
import type { TournamentView } from "../types"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { statusLabel } from "../lib/tournaments"
import { Badge } from "./Badge"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

export function TournamentCard({ tournament }: { tournament: TournamentView }) {
  const date = formatEventDate(tournament.startDate, tournament.endDate)
  const wideDay = date.day.includes("–")

  return (
    <article className="h-full">
      <a
        href={sitePath(tournament.detailUrl)}
        className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink/20"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className={
                wideDay
                  ? "text-[1.65rem] font-bold leading-none tracking-tight text-ink"
                  : "text-[2.6rem] font-bold leading-none tracking-tight text-ink"
              }
            >
              {date.day}
            </p>
            <p className="mt-2 text-sm font-medium text-brand-strong">{date.month}</p>
            <p className="text-[13px] text-muted">{date.year}</p>
          </div>
          <Badge tone={tone[tournament.status]}>{statusLabel[tournament.status]}</Badge>
        </div>
        <h3 className="mt-6 line-clamp-2 text-xl font-semibold leading-snug text-ink">{tournament.name}</h3>
        <dl className="mt-4 space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-ink" aria-hidden />
            <dt className="sr-only">Địa điểm</dt>
            <dd>{tournament.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-ink" aria-hidden />
            <dt className="sr-only">Thời gian</dt>
            <dd>{tournament.time}</dd>
          </div>
        </dl>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-ink group-hover:text-brand-strong">
          Chi tiết giải đấu
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
        </span>
      </a>
    </article>
  )
}
