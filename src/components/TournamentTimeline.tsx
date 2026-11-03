import { ArrowUpRight, MapPin } from "lucide-react"
import type { TournamentView } from "../types"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { statusLabel } from "../lib/tournaments"
import { Badge } from "./Badge"

export function TournamentTimeline({ items }: { items: TournamentView[] }) {
  if (items.length === 0) return null

  const years = [...new Set(items.map((item) => item.startDate.slice(0, 4)))]
  const yearLabel = years.length === 1 ? years[0] : `${years[0]}–${years[years.length - 1]}`

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-ink">Tiếp theo trên lịch</h3>
        <p className="text-sm font-medium text-muted">{yearLabel}</p>
      </div>
      <ol className="flex flex-1 flex-col gap-4">
        {items.map((item) => (
          <li key={item.id} className="min-[1200px]:flex-1">
            <TournamentTimelineItem tournament={item} />
          </li>
        ))}
      </ol>
    </div>
  )
}

function TournamentTimelineItem({ tournament }: { tournament: TournamentView }) {
  const date = formatEventDate(tournament.startDate, tournament.endDate)

  return (
    <a
      href={sitePath(tournament.detailUrl)}
      className="group flex h-full items-center gap-3 rounded-[14px] border border-line bg-white p-4 transition-[border-color,background-color] duration-200 hover:border-brand/70 hover:bg-brand/10 sm:gap-4 sm:p-5"
    >
      <div className="w-[4.25rem] shrink-0 rounded-xl bg-paper px-1.5 py-3 text-center sm:w-[4.75rem]">
        <span className="mx-auto mb-2 block h-0.5 w-6 bg-brand" aria-hidden />
        <p className="text-base font-bold leading-none tracking-tight text-ink sm:text-lg">{date.day}</p>
        <p className="mt-1.5 text-[11px] font-medium leading-tight text-brand-strong">{date.month}</p>
      </div>
      <div className="min-w-0 flex-1">
        {tournament.status !== "upcoming" ? (
          <Badge tone={tournament.status === "ongoing" ? "live" : "finished"} className="mb-2">
            {statusLabel[tournament.status]}
          </Badge>
        ) : null}
        <h4 className="line-clamp-2 text-base font-semibold leading-snug text-ink">{tournament.name}</h4>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-4 shrink-0 text-ink" aria-hidden />
          {tournament.location}
        </p>
      </div>
      <ArrowUpRight
        className="size-4 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
        aria-hidden
      />
    </a>
  )
}
