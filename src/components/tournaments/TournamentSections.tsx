import { useMemo, useState } from "react"
import { ArrowRight, ArrowUpRight, MapPin, Trophy } from "lucide-react"
import type { TournamentStatus, TournamentView } from "../../types"
import { formatEventDate } from "../../lib/format"
import { sitePath } from "../../lib/site"
import { primaryCategory, statusLabel } from "../../lib/tournaments"
import { Badge } from "../Badge"
import { TournamentGrid } from "./TournamentArchive"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

type ActiveTab = "all" | TournamentStatus

function SectionHead({
  id,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  id: string
  title: string
  description?: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="tournament-section-head">
      <div className="min-w-0">
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <a href={sitePath(actionHref)} className="tournament-section-link">
          {actionLabel}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      ) : null}
    </div>
  )
}

export function ActiveTournamentSchedule({
  tournaments,
  excludeId,
}: {
  tournaments: TournamentView[]
  excludeId?: string
}) {
  const [tab, setTab] = useState<ActiveTab>("all")
  const pool = useMemo(
    () =>
      tournaments
        .filter((item) => item.id !== excludeId)
        .filter((item) => item.status === "ongoing" || item.status === "upcoming")
        .sort(
          (a, b) =>
            (a.status === "ongoing" ? 0 : 1) - (b.status === "ongoing" ? 0 : 1) ||
            a.startDate.localeCompare(b.startDate),
        ),
    [tournaments, excludeId],
  )
  const visible = tab === "all" ? pool : pool.filter((item) => item.status === tab)

  return (
    <section className="tournament-active" aria-labelledby="giai-sap-dien-ra">
      <div className="page-wrap py-10 min-[1200px]:py-12">
        <SectionHead
          id="giai-sap-dien-ra"
          title="Giải đang và sắp diễn ra"
          description="Theo dõi các giải đang diễn ra và lịch sắp tới trên toàn quốc."
        />

        <div className="tournament-pills mt-5" role="tablist" aria-label="Lọc giải đang và sắp diễn ra">
          {(
            [
              ["all", "Tất cả"],
              ["ongoing", "Đang diễn ra"],
              ["upcoming", "Sắp diễn ra"],
            ] as const
          ).map(([value, label]) => {
            const selected = tab === value
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={selected}
                className={
                  selected
                    ? "shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-medium text-ink"
                    : "shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink"
                }
                onClick={() => setTab(value)}
              >
                {label}
              </button>
            )
          })}
        </div>

        {visible.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line bg-white px-5 py-10 text-center text-sm text-muted">
            Chưa có giải phù hợp trong nhóm này.
          </p>
        ) : (
          <ul className="tournament-rail mt-6">
            {visible.map((tournament) => {
              const date = formatEventDate(tournament.startDate, tournament.endDate)
              return (
                <li key={tournament.id}>
                  <a href={sitePath(tournament.detailUrl)} className="tournament-rail-card group">
                    <div className="tournament-rail-date" aria-hidden>
                      <span>{tournament.startDate.slice(8, 10)}.{tournament.startDate.slice(5, 7)}</span>
                      <strong>{date.rangeLabel}</strong>
                    </div>
                    <div className="tournament-rail-body">
                      <Badge tone={tone[tournament.status]}>{statusLabel[tournament.status]}</Badge>
                      <h3>{tournament.name}</h3>
                      <p>
                        <MapPin className="size-4 shrink-0" aria-hidden />
                        {tournament.location}
                        <span aria-hidden> · </span>
                        {primaryCategory(tournament)}
                      </p>
                    </div>
                    <span className="tournament-rail-cta">
                      Xem chi tiết
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export function ScopedTournamentSection({
  id,
  title,
  description,
  tournaments,
  excludeId,
  limit = 6,
  viewAllHref,
}: {
  id: string
  title: string
  description: string
  tournaments: TournamentView[]
  excludeId?: string
  limit?: number
  viewAllHref: string
}) {
  const list = tournaments.filter((item) => item.id !== excludeId).slice(0, limit)
  if (list.length === 0) return null

  return (
    <section className="border-t border-line bg-white" aria-labelledby={id}>
      <div className="page-wrap py-10 min-[1200px]:py-12">
        <SectionHead
          id={id}
          title={title}
          description={description}
          actionHref={viewAllHref}
          actionLabel="Xem tất cả"
        />
        <div className="mt-6">
          <TournamentGrid tournaments={list} />
        </div>
      </div>
    </section>
  )
}

export function CompletedTournamentSection({
  tournaments,
  excludeId,
  limit = 6,
}: {
  tournaments: TournamentView[]
  excludeId?: string
  limit?: number
}) {
  const list = tournaments.filter((item) => item.id !== excludeId).slice(0, limit)
  if (list.length === 0) return null

  return (
    <section className="tournament-completed" aria-labelledby="giai-da-ket-thuc">
      <div className="page-wrap py-10 min-[1200px]:py-12">
        <SectionHead
          id="giai-da-ket-thuc"
          title="Giải đã kết thúc"
          description="Xem lại các giải đã khép lại và kết quả thi đấu."
        />
        <ul className="tournament-completed-grid mt-6">
          {list.map((tournament) => {
            const date = formatEventDate(tournament.startDate, tournament.endDate)
            const place =
              tournament.scope === "international" && tournament.country
                ? `${tournament.location}, ${tournament.country}`
                : tournament.location
            return (
              <li key={tournament.id}>
                <a href={sitePath(tournament.detailUrl)} className="tournament-completed-card group">
                  <div className="tournament-completed-media">
                    <img
                      src={sitePath(tournament.coverImage)}
                      alt=""
                      width={800}
                      height={450}
                      loading="lazy"
                    />
                  </div>
                  <div className="tournament-completed-copy">
                    <Badge tone="finished">{statusLabel.finished}</Badge>
                    <h3>{tournament.name}</h3>
                    <p>
                      <time dateTime={tournament.startDate}>{date.rangeLabel}</time>
                      <span aria-hidden> · </span>
                      {place}
                    </p>
                    {tournament.champion ? (
                      <p className="tournament-completed-champ">
                        <Trophy className="size-4 shrink-0" aria-hidden />
                        {tournament.champion}
                      </p>
                    ) : null}
                    <span>
                      Xem kết quả
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
