import { useTranslation } from "../i18n"
import { ArrowUpRight } from "lucide-react"
import type { Tournament } from "../types"
import { sitePath } from "../lib/site"
import { selectTournamentSpotlight } from "../lib/tournaments"
import { FeaturedTournament, useTournamentClock } from "./FeaturedTournament"
import { TournamentCard } from "./TournamentCard"

export function UpcomingTournamentsSection({
  tournaments,
}: {
  tournaments: Tournament[]
}) {
  const { t } = useTranslation()
  const now = useTournamentClock()
  const { featured, timeline } = selectTournamentSpotlight(tournaments, now)

  return (
    <section id="giai-dau" data-section className="vpf-hub" aria-labelledby="giai-dau-tieu-de">
      <div className="page-wrap">
        <div className="vpf-hub-head">
          <div className="max-w-2xl">
            <h2 id="giai-dau-tieu-de">{t("Đấu trường Pickleball")}</h2>
            <p className="vpf-hub-lead">
              {t("Khám phá những giải đấu và sự kiện Pickleball sắp diễn ra trên toàn quốc.")}
            </p>
          </div>
          <a className="vpf-hub-calendar" href={sitePath("/giaidau.html")}>
            {t("Xem lịch giải đấu")}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        {featured ? (
          <>
            <FeaturedTournament tournament={featured} variant="home" showCountdown now={now} />
            {timeline.length > 0 ? (
              <div>
                <h3 className="vpf-hub-next">{t("Tiếp theo trên lịch")}</h3>
                <ol className="vpf-hub-timeline">
                  {timeline.map((item) => (
                    <li key={item.id}>
                      <TournamentCard tournament={item} variant="compact" />
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </>
        ) : (
          <div className="vpf-hub-empty">
            <p>{t("Chưa có giải đấu sắp diễn ra")}</p>
            <p>{t("Khi lịch được cập nhật, giải gần nhất sẽ xuất hiện tại đây.")}</p>
          </div>
        )}
      </div>
    </section>
  )
}
