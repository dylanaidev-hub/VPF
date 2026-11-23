import { useTranslation } from "../../../i18n"
import { useMemo, useState } from "react"
import type { TournamentView } from "../../../types"
import { Select } from "../../Select"

export function TournamentResultsTab({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const [category, setCategory] = useState("Tất cả")

  const categories = useMemo(() => {
    const ids = new Set(tournament.results.map((item) => item.categoryId).filter(Boolean) as string[])
    if (!ids.size) return tournament.categories
    return tournament.categories.filter((item) => ids.has(item.id))
  }, [tournament])

  const results = useMemo(() => {
    if (category === "Tất cả") return tournament.results
    return tournament.results.filter((item) => item.categoryId === category)
  }, [tournament.results, category])

  const groupResults = results.filter((item) => item.stage === "group")
  const knockoutResults = results.filter((item) => item.stage === "knockout" || item.stage === "final" || !item.stage)

  if (!tournament.results.length) {
    return <p className="td-empty">{t("Kết quả sẽ được cập nhật sau khi các trận đấu kết thúc.")}</p>
  }

  return (
    <div className="td-panel">
      <p className="text-sm text-muted">
        {t("Tên và tỷ số dưới đây chỉ để xem giao diện, không phải kết quả thi đấu chính thức.")}
      </p>

      <div className="td-filters" style={{ gridTemplateColumns: "minmax(0, 20rem)" }}>
        <label>
          <span>{t("Nội dung thi đấu")}</span>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="Tất cả">{t("Tất cả nội dung")}</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </label>
      </div>

      {tournament.winners?.length ? (
        <div>
          <h3 className="td-section-title">{t("Danh sách trao giải")}</h3>
          <ul className="td-winners">
            {tournament.winners
              .filter((item) => category === "Tất cả" || item.categoryId === category)
              .map((item) => (
                <li key={item.categoryId} className="td-winner-card">
                  <h4>{item.categoryName}</h4>
                  <p>
                    <strong>{t("Vô địch")}:</strong> {item.champion}
                  </p>
                  <p>
                    <strong>{t("Á quân")}:</strong> {item.runnerUp}
                  </p>
                  {item.third?.length ? (
                    <p>
                      <strong>{t("Đồng hạng ba")}:</strong> {item.third.join(", ")}
                    </p>
                  ) : null}
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      {tournament.standings?.length ? (
        <div>
          <h3 className="td-section-title">{t("Kết quả vòng bảng")}</h3>
          <div className="td-standings">
            {tournament.standings
              .filter((item) => category === "Tất cả" || item.categoryId === category)
              .map((standing) => (
                <div key={`${standing.categoryId}-${standing.group}`} className="td-standing-card">
                  <h4>
                    {tournament.categories.find((item) => item.id === standing.categoryId)?.name ?? standing.categoryId} ·{" "}
                    {standing.group}
                  </h4>
                  <table className="td-standing-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{t("Đội / VĐV")}</th>
                        <th>P</th>
                        <th>W</th>
                        <th>L</th>
                        <th>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standing.rows.map((row) => (
                        <tr key={row.name}>
                          <td>{row.rank}</td>
                          <td>{row.name}</td>
                          <td>{row.played}</td>
                          <td>{row.won}</td>
                          <td>{row.lost}</td>
                          <td>{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        </div>
      ) : groupResults.length ? (
        <ResultList title={t("Kết quả vòng bảng")} items={groupResults} />
      ) : null}

      <ResultList
        title={t("Kết quả vòng loại trực tiếp")}
        items={knockoutResults.length ? knockoutResults : results}
      />
    </div>
  )
}

function ResultList({
  title,
  items,
}: {
  title: string
  items: TournamentView["results"]
}) {
  const { t } = useTranslation()
  if (!items.length) return null
  return (
    <div>
      <h3 className="td-section-title">{title}</h3>
      <ul className="td-match-list">
        {items.map((item) => (
          <li key={item.id} className="td-match">
            <div className="td-match-top">
              <span>{t(item.round)}</span>
            </div>
            <div className="td-match-sides">
              <div className={item.winner === item.sideA ? "td-match-side is-winner" : "td-match-side"}>
                <span>{item.sideA}</span>
                <span className="td-match-score">{item.sets?.[0] ?? item.score}</span>
              </div>
              <div className={item.winner === item.sideB ? "td-match-side is-winner" : "td-match-side"}>
                <span>{item.sideB}</span>
                <span className="td-match-score">
                  {item.sets && item.sets.length > 1 ? item.sets.slice(1).join(" · ") : item.score}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
