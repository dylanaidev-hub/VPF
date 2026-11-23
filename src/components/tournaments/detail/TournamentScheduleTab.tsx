import { useTranslation } from "../../../i18n"
import { useMemo, useState } from "react"
import type { TournamentScheduleStatus, TournamentView } from "../../../types"
import { formatViDate } from "../../../lib/format"
import { matchSides } from "../../../lib/tournamentDetail"
import { Select } from "../../Select"

const statusLabel: Record<TournamentScheduleStatus, string> = {
  scheduled: "Chưa diễn ra",
  ongoing: "Đang diễn ra",
  finished: "Đã kết thúc",
}

export function TournamentScheduleTab({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const [day, setDay] = useState("Tất cả")
  const [court, setCourt] = useState("Tất cả")
  const [event, setEvent] = useState("Tất cả")

  const days = useMemo(() => [...new Set(tournament.schedule.map((item) => item.date))], [tournament.schedule])
  const courts = useMemo(() => [...new Set(tournament.schedule.map((item) => item.court))], [tournament.schedule])
  const events = useMemo(() => [...new Set(tournament.schedule.map((item) => item.event))], [tournament.schedule])

  const rows = useMemo(() => {
    return tournament.schedule
      .filter((item) => (day === "Tất cả" || item.date === day) && (court === "Tất cả" || item.court === court) && (event === "Tất cả" || item.event === event))
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  }, [tournament.schedule, day, court, event])

  if (!tournament.schedule.length) {
    return <p className="td-empty">{t("Ban tổ chức chưa cập nhật lịch thi đấu.")}</p>
  }

  return (
    <div className="td-panel">
      <div className="td-filters">
        <label>
          <span>{t("Ngày")}</span>
          <Select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="h-11 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="Tất cả">{t("Tất cả ngày")}</option>
            {days.map((item) => (
              <option key={item} value={item}>
                {formatViDate(item)}
              </option>
            ))}
          </Select>
        </label>
        <label>
          <span>{t("Sân")}</span>
          <Select
            value={court}
            onChange={(e) => setCourt(e.target.value)}
            className="h-11 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="Tất cả">{t("Tất cả sân")}</option>
            {courts.map((item) => (
              <option key={item} value={item}>
                {t(item)}
              </option>
            ))}
          </Select>
        </label>
        <label>
          <span>{t("Nội dung")}</span>
          <Select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="h-11 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="Tất cả">{t("Tất cả nội dung")}</option>
            {events.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </label>
      </div>

      {rows.length === 0 ? (
        <p className="td-empty">{t("Không có trận đấu phù hợp với bộ lọc.")}</p>
      ) : (
        <ul className="td-match-list">
          {rows.map((item) => {
            const sides = matchSides(item)
            const winner =
              item.status === "finished" && item.sets
                ? (() => {
                    const aWins = item.sets.filter((set) => {
                      const [left, right] = set.split("–").map(Number)
                      return left > right
                    }).length
                    return aWins >= Math.ceil(item.sets.length / 2) ? sides.sideA : sides.sideB
                  })()
                : null

            return (
              <li key={item.id} className="td-match">
                <div className="td-match-top">
                  <span>
                    {formatViDate(item.date)} · {item.time}
                  </span>
                  <span>{t(item.court)}</span>
                  <span>{item.round ?? item.event}</span>
                  <span>{t(statusLabel[item.status])}</span>
                </div>
                <div className="td-match-sides">
                  <div className={winner === sides.sideA ? "td-match-side is-winner" : "td-match-side"}>
                    <span>{sides.sideA}</span>
                    {item.score ? <span className="td-match-score">{item.sets?.[0] ?? item.score}</span> : null}
                  </div>
                  <div className={winner === sides.sideB ? "td-match-side is-winner" : "td-match-side"}>
                    <span>{sides.sideB}</span>
                    {item.sets && item.sets.length > 1 ? (
                      <span className="td-match-score">{item.sets.slice(1).join(" · ")}</span>
                    ) : item.score && !item.sets ? (
                      <span className="td-match-score">{item.score}</span>
                    ) : (
                      <span className="td-match-score">{item.event}</span>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
