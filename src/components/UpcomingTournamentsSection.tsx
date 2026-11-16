import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { Tournament, TournamentView } from "../types"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { selectTournamentSpotlight, statusLabel, tournamentStart } from "../lib/tournaments"
import { cx } from "../lib/cx"
import { FeaturedTournament, useTournamentClock } from "./FeaturedTournament"

function phaseOf(item: Pick<Tournament, "startDate" | "time">, now: Date) {
  return now.getTime() >= tournamentStart(item).getTime() ? "ongoing" : "upcoming"
}

export function UpcomingTournamentsSection({
  tournaments,
}: {
  tournaments: Tournament[]
}) {
  const now = useTournamentClock()
  const { featured, timeline } = selectTournamentSpotlight(tournaments, now)

  return (
    <section id="giai-dau" data-section className="vpf-hub" aria-labelledby="giai-dau-tieu-de">
      <div className="page-wrap">
        <div className="vpf-hub-head">
          <div className="max-w-2xl">
            <h2 id="giai-dau-tieu-de">Đấu trường Pickleball</h2>
            <p className="vpf-hub-lead">
              Khám phá những giải đấu và sự kiện Pickleball sắp diễn ra trên toàn quốc.
            </p>
          </div>
          <a className="vpf-hub-calendar" href={sitePath("/giaidau.html")}>
            Xem lịch giải đấu
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        {featured ? (
          <>
            <FeaturedTournament tournament={featured} variant="home" showCountdown now={now} />
            {timeline.length > 0 ? (
              <div>
                <h3 className="vpf-hub-next">Tiếp theo trên lịch</h3>
                <ol className="vpf-hub-timeline">
                  {timeline.map((item) => (
                    <li key={item.id}>
                      <TimelineEvent tournament={item} now={now} />
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </>
        ) : (
          <div className="vpf-hub-empty">
            <p>Chưa có giải đấu sắp diễn ra</p>
            <p>Khi lịch được cập nhật, giải gần nhất sẽ xuất hiện tại đây.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function TimelineEvent({ tournament, now }: { tournament: TournamentView; now: Date }) {
  const date = formatEventDate(tournament.startDate, tournament.endDate)
  const phase = phaseOf(tournament, now)

  return (
    <a className={cx("vpf-hub-event", phase === "ongoing" && "is-live")} href={sitePath(tournament.detailUrl)}>
      <span className="vpf-hub-date">
        <span className="vpf-hub-day">{date.day}</span>
        <span className="vpf-hub-month">{date.month}</span>
        <span className="vpf-hub-year">{date.year}</span>
      </span>
      <span className="vpf-hub-event-copy">
        <span className="vpf-hub-event-name">{tournament.name}</span>
        <span className="vpf-hub-event-city">{tournament.location}</span>
        <span className={cx("vpf-hub-event-status", phase === "ongoing" ? "is-live" : "is-upcoming")}>
          {statusLabel[phase]}
        </span>
      </span>
      <ArrowRight className="vpf-hub-arrow size-4" aria-hidden />
    </a>
  )
}
