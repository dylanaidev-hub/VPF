import { useTranslation } from "../i18n"
import { ArrowRight, ArrowUpRight, Clock, MapPin } from "lucide-react"
import type { TournamentStatus, TournamentView } from "../types"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { statusLabel } from "../lib/tournaments"
import { cx } from "../lib/cx"
import { Badge } from "./Badge"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

const compactBadgeClass: Record<TournamentStatus, string> = {
  upcoming: "tournament-card-badge is-upcoming",
  ongoing: "tournament-card-badge is-live",
  finished: "tournament-card-badge is-finished",
}

export type TournamentCardVariant = "default" | "compact"

type TournamentCardProps = {
  tournament: TournamentView
  /** `compact` dùng cho Homepage timeline; `default` giữ layout hiện tại. */
  variant?: TournamentCardVariant
  className?: string
}

export function TournamentCard({
  tournament,
  variant = "default",
  className,
}: TournamentCardProps) {
  if (variant === "compact") {
    return <CompactTournamentCard tournament={tournament} className={className} />
  }

  return <DefaultTournamentCard tournament={tournament} className={className} />
}

function DefaultTournamentCard({
  tournament,
  className,
}: {
  tournament: TournamentView
  className?: string
}) {
  const date = formatEventDate(tournament.startDate, tournament.endDate)
  const wideDay = date.day.includes("–")

  return (
    <article className={cx("h-full", className)}>
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

function CompactTournamentCard({
  tournament,
  className,
}: {
  tournament: TournamentView
  className?: string
}) {
  const { t } = useTranslation()
  const date = formatEventDate(tournament.startDate, tournament.endDate)
  const place =
    tournament.scope === "international" && tournament.country
      ? `${t(tournament.location)}, ${tournament.country}`
      : t(tournament.location)
  const time = tournament.time?.trim() || null

  return (
    <article className={cx("h-full", className)}>
      <a
        href={sitePath(tournament.detailUrl)}
        className="tournament-card is-compact group"
        aria-label={`${tournament.name}. ${t(statusLabel[tournament.status])}. ${place}${time ? `. ${time}` : ""}.`}
      >
        <div className="tournament-card-top">
          <div className="tournament-card-date">
            <p className="tournament-card-day">{date.day}</p>
            <p className="tournament-card-meta">{date.monthLine}</p>
          </div>
          <span className={compactBadgeClass[tournament.status]}>
            {t(statusLabel[tournament.status])}
          </span>
        </div>

        <h3 className="tournament-card-title">{tournament.name}</h3>

        <div className="tournament-card-foot">
          <div className="tournament-card-facts">
            <span className="tournament-card-place">
              <MapPin className="size-4 shrink-0" aria-hidden />
              <span>{place}</span>
            </span>
            {time ? (
              <span className="tournament-card-time">
                <Clock className="size-4 shrink-0" aria-hidden />
                <span>{time}</span>
              </span>
            ) : null}
          </div>
          <ArrowUpRight
            className="tournament-card-arrow size-4 shrink-0"
            aria-hidden
          />
        </div>
      </a>
    </article>
  )
}
