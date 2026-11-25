import { useTranslation } from "../../../i18n"
import type { TournamentView } from "../../../types"
import { TournamentCard } from "../../TournamentCard"

export function TournamentRelated({ items }: { items: TournamentView[] }) {
  const { t } = useTranslation()
  if (!items.length) return null

  return (
    <section className="td-related" aria-labelledby="giai-dau-khac-tieu-de">
      <div className="td-block-head">
        <div>
          <h2 id="giai-dau-khac-tieu-de">{t("Giải đấu khác")}</h2>
          <p>{t("Các giải minh họa khác trong hệ thống.")}</p>
        </div>
      </div>
      <div className="td-related-grid">
        {items.map((item) => (
          <TournamentCard key={item.id} tournament={item} variant="compact" />
        ))}
      </div>
    </section>
  )
}
