import { useTranslation } from "../../../i18n"
import type { TournamentView } from "../../../types"

export function TournamentEventsTab({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()

  if (!tournament.categories.length) {
    return <p className="td-empty">{t("Chưa có nội dung thi đấu.")}</p>
  }

  return (
    <ul className="td-event-grid">
      {tournament.categories.map((item) => (
        <li key={item.id} className="td-event-card">
          <div>
            <h3>{item.name}</h3>
            {item.status ? <p className="mt-1 text-sm text-muted">{t(item.status)}</p> : null}
          </div>
          <dl className="td-event-meta">
            {item.level ? (
              <div>
                <dt>{t("Nhóm trình độ")}</dt>
                <dd>{item.level}</dd>
              </div>
            ) : null}
            {item.ageGroup ? (
              <div>
                <dt>{t("Nhóm tuổi")}</dt>
                <dd>{item.ageGroup}</dd>
              </div>
            ) : null}
            {item.entrants != null ? (
              <div>
                <dt>{t("Số đội / VĐV")}</dt>
                <dd>{item.entrants}</dd>
              </div>
            ) : null}
            {item.format ? (
              <div>
                <dt>{t("Thể thức")}</dt>
                <dd>{t(item.format)}</dd>
              </div>
            ) : null}
            {item.rounds != null ? (
              <div>
                <dt>{t("Số vòng đấu")}</dt>
                <dd>{item.rounds}</dd>
              </div>
            ) : null}
            {item.prize ? (
              <div>
                <dt>{t("Giải thưởng")}</dt>
                <dd>{t(item.prize)}</dd>
              </div>
            ) : null}
          </dl>
        </li>
      ))}
    </ul>
  )
}
