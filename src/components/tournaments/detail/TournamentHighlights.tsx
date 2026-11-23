import { useTranslation } from "../../../i18n"
import type { TournamentView } from "../../../types"
import { tournamentDetailStats } from "../../../lib/tournamentDetail"

function formatValue(value: number | null) {
  if (value == null) return "—"
  return new Intl.NumberFormat("vi-VN").format(value)
}

export function TournamentHighlights({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const stats = tournamentDetailStats(tournament)
  const items = [
    { label: "Vận động viên", value: stats.athletes },
    { label: "Đội tham gia", value: stats.teams },
    { label: "Trận đấu", value: stats.matches },
    { label: "Nội dung thi đấu", value: stats.events },
  ]

  return (
    <section aria-label={t("Thống kê giải đấu")}>
      <ul className="td-highlights">
        {items.map((item) => (
          <li key={item.label} className="td-highlight">
            <strong>{formatValue(item.value)}</strong>
            <span>{t(item.label)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
