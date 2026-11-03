import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import type { Tournament } from "../types"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { selectTournamentSpotlight, statusLabel } from "../lib/tournaments"
import { Badge } from "./Badge"
import { Dialog } from "./Dialog"
import { FeaturedTournamentCard } from "./FeaturedTournamentCard"
import { TournamentTimeline } from "./TournamentTimeline"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

export function UpcomingTournamentsSection({
  tournaments,
  illustrative = false,
}: {
  tournaments: Tournament[]
  illustrative?: boolean
}) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const { featured, timeline, calendar } = selectTournamentSpotlight(tournaments)

  return (
    <section id="giai-dau" data-section className="bg-paper py-12 md:py-[88px] min-[1200px]:py-28">
      <div className="page-wrap">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="flex items-center gap-3 text-[13px] font-medium text-brand-strong">
                <span className="h-px w-8 bg-brand" aria-hidden />
                Lịch thi đấu
              </p>
              {illustrative ? (
                <span className="rounded-md bg-white px-2 py-1 text-[12px] font-medium text-muted">
                  Dữ liệu minh họa
                </span>
              ) : null}
            </div>
            <h2
              id="giai-dau-tieu-de"
              className="text-[2rem] font-bold leading-[1.15] tracking-tight text-ink min-[1200px]:text-[2.75rem]"
            >
              Giải đấu sắp diễn ra
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
              Theo dõi lịch thi đấu và khám phá những giải đấu Pickleball đáng chú ý.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-[10px] border border-line bg-white px-5 text-[15px] font-medium text-ink transition-colors duration-200 hover:border-brand hover:bg-brand md:self-auto"
            onClick={() => setCalendarOpen(true)}
          >
            Xem lịch giải đấu
            <ArrowUpRight className="size-4" aria-hidden />
          </button>
        </div>

        {featured ? (
          <div
            className={
              timeline.length > 0
                ? "grid items-stretch gap-6 min-[1200px]:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                : ""
            }
          >
            <FeaturedTournamentCard tournament={featured} fill={timeline.length > 0} />
            <TournamentTimeline items={timeline} />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-ink">Chưa có giải đấu sắp diễn ra</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Khi lịch được cập nhật, giải gần nhất sẽ xuất hiện tại đây.
            </p>
          </div>
        )}
      </div>

      <Dialog open={calendarOpen} title="Lịch giải đấu" onClose={() => setCalendarOpen(false)}>
        {illustrative ? (
          <p className="mb-4 text-sm leading-relaxed text-muted">
            Lịch dưới đây là dữ liệu minh họa, không phải lịch thi đấu chính thức.
          </p>
        ) : null}
        <ul className="divide-y divide-line">
          {calendar.map((item) => {
            const date = formatEventDate(item.startDate, item.endDate)
            return (
              <li key={item.id}>
                <a
                  href={sitePath(item.detailUrl)}
                  className="flex w-full items-start justify-between gap-4 py-4 text-left"
                  onClick={() => setCalendarOpen(false)}
                >
                  <span>
                    <span className="block text-[12px] font-medium text-muted">
                      {date.rangeLabel} · {item.location}
                    </span>
                    <span className="mt-1 block text-base font-semibold leading-snug text-ink">{item.name}</span>
                  </span>
                  <Badge tone={tone[item.status]}>{statusLabel[item.status]}</Badge>
                </a>
              </li>
            )
          })}
        </ul>
      </Dialog>
    </section>
  )
}
