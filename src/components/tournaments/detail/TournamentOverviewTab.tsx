import { useTranslation } from "../../../i18n"
import type { TournamentView } from "../../../types"
import { formatViDate } from "../../../lib/format"
import { hasValidContact } from "../../../lib/tournamentDetail"
import { TournamentMoments } from "./TournamentMoments"

export function TournamentOverviewTab({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const overview = tournament.overview
  const place =
    tournament.scope === "international" && tournament.country
      ? `${tournament.venue}, ${tournament.location}, ${tournament.country}`
      : `${tournament.venue}, ${t(tournament.location)}`
  const contact = tournament.contact
  const showContact = hasValidContact(tournament)

  const facts = [
    { label: "Địa điểm", value: place },
    { label: "Đơn vị tổ chức", value: tournament.organizer },
    tournament.coOrganizer ? { label: "Đơn vị phối hợp", value: tournament.coOrganizer } : null,
    { label: "Giờ thi đấu", value: tournament.time },
    tournament.audience || overview?.audience
      ? { label: "Đối tượng tham gia", value: tournament.audience ?? overview?.audience ?? "" }
      : null,
    tournament.scale ? { label: "Quy mô", value: tournament.scale } : null,
    tournament.registrationDeadline
      ? { label: "Hạn đăng ký", value: formatViDate(tournament.registrationDeadline) }
      : null,
    showContact
      ? {
          label: "Liên hệ ban tổ chức",
          value: [contact?.name, contact?.email, contact?.phone].filter(Boolean).join(" · "),
        }
      : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="td-panel td-overview">
      <div className="td-overview-grid">
        <div className="td-overview-main">
          <div className="td-prose">
            {overview?.intro?.length ? (
              overview.intro.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)
            ) : (
              <>
                <p>{t(tournament.description)}</p>
                <p className="is-soft">{t(tournament.objective)}</p>
              </>
            )}
          </div>

          {overview?.goals ? (
            <div>
              <h3 className="td-section-title">{t("Mục tiêu tổ chức")}</h3>
              <p className="td-soft">{t(overview.goals)}</p>
            </div>
          ) : null}

          {overview?.venueNote ? (
            <div>
              <h3 className="td-section-title">{t("Ghi chú địa điểm")}</h3>
              <p className="td-soft">{t(overview.venueNote)}</p>
            </div>
          ) : null}

          {overview?.dayPlan?.length ? (
            <div>
              <h3 className="td-section-title">{t("Lịch trình tổng quan")}</h3>
              <ul className="td-day-plan">
                {overview.dayPlan.map((day) => (
                  <li key={day.date} className="td-day-card">
                    <h4>{t(day.title)}</h4>
                    <p>{formatViDate(day.date)}</p>
                    <ul>
                      {day.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {overview?.prizes?.length ? (
            <div>
              <h3 className="td-section-title">{t("Cơ cấu giải thưởng")}</h3>
              <ul className="td-prize-list">
                {overview.prizes.map((prize) => (
                  <li key={prize.place}>
                    <span>
                      <strong>{t(prize.place)}:</strong> {t(prize.detail)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="td-overview-aside">
          <h3 className="td-section-title">{t("Chi tiết tổ chức")}</h3>
          <dl className="td-info td-info-compact">
            {facts.map((row) => (
              <div key={row.label} className="td-info-item">
                <dt>{t(row.label)}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <TournamentMoments tournament={tournament} embedded />
    </div>
  )
}
