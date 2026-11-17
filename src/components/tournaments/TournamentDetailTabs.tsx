import { useTranslation } from "../../i18n"
import { useState, type KeyboardEvent } from "react"
import type { TournamentScheduleStatus, TournamentView } from "../../types"
import { formatViDate } from "../../lib/format"
import { sitePath } from "../../lib/site"
import { Select } from "../Select"

const tabs = [
  { id: "tong-quan", label: "Tổng quan" },
  { id: "noi-dung", label: "Nội dung thi đấu" },
  { id: "lich", label: "Lịch thi đấu" },
  { id: "ket-qua", label: "Kết quả" },
  { id: "dieu-le", label: "Điều lệ" },
] as const

type TabId = (typeof tabs)[number]["id"]

const scheduleStatusLabel: Record<TournamentScheduleStatus, string> = {
  scheduled: "Chưa diễn ra",
  ongoing: "Đang diễn ra",
  finished: "Đã kết thúc",
}

export function TournamentDetailTabs({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabId>("tong-quan")

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((item) => item.id === tab)
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
    event.preventDefault()
    const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length
    const id = tabs[next].id
    setTab(id)
    document.getElementById(`tab-${id}`)?.focus()
  }

  return (
    <div>
      <div
        className="tournament-tabs"
        role="tablist"
        aria-label={t("Thông tin giải đấu")}
        onKeyDown={onKeyDown}
      >
        {tabs.map((item) => {
          const selected = item.id === tab
          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={
                selected
                  ? "shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-medium text-ink"
                  : "shrink-0 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink"
              }
              onClick={() => setTab(item.id)}
            >
              {t(item.label)}
            </button>
          )
        })}
      </div>
      <div
        key={tab}
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="tournament-tab-panel mt-6"
      >
        {tab === "tong-quan" ? <Overview tournament={tournament} /> : null}
        {tab === "noi-dung" ? <Events tournament={tournament} /> : null}
        {tab === "lich" ? <Schedule tournament={tournament} /> : null}
        {tab === "ket-qua" ? <Results tournament={tournament} /> : null}
        {tab === "dieu-le" ? <Regulations tournament={tournament} /> : null}
      </div>
    </div>
  )
}

function Overview({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const place =
    tournament.scope === "international" && tournament.country
      ? `${tournament.venue}, ${tournament.location}, ${tournament.country}`
      : `${tournament.venue}, ${tournament.location}`

  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-[15px] leading-relaxed text-ink md:text-base">{t(tournament.description)}</p>
      <div>
        <h3 className="text-base font-semibold text-ink">{t("Mục tiêu tổ chức")}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{tournament.objective}</p>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-ink">{t("Địa điểm")}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{place}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-ink">{t("Đơn vị tổ chức")}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">{tournament.organizer}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-ink">{t("Phạm vi")}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted">
            {tournament.scope === "international" ? t("Quốc tế") : t("Trong nước")}
          </dd>
        </div>
        {tournament.champion ? (
          <div>
            <dt className="text-sm font-medium text-ink">{t("Nhà vô địch (minh họa)")}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">{tournament.champion}</dd>
          </div>
        ) : null}
        {tournament.livestreamUrl ? (
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-ink">Livestream</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              <a href={tournament.livestreamUrl} className="font-medium text-brand-strong underline-offset-2 hover:underline">
                {t("Xem phát sóng")}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
      <p className="text-sm leading-relaxed text-muted">{t("Thông tin liên hệ chưa được công bố.")}</p>
    </div>
  )
}

function Events({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  if (tournament.categories.length === 0) {
    return <p className="text-[15px] text-muted">{t("Chưa có nội dung thi đấu.")}</p>
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {tournament.categories.map((item) => (
        <li key={item.id} className="border-b border-line pb-4">
          <h3 className="text-base font-semibold text-ink">{item.name}</h3>
          <dl className="mt-2 space-y-1 text-sm text-muted">
            {item.level ? (
              <div className="flex gap-2">
                <dt>{t("Nhóm trình độ")}</dt>
                <dd>{item.level}</dd>
              </div>
            ) : null}
            {item.ageGroup ? (
              <div className="flex gap-2">
                <dt>{t("Độ tuổi")}</dt>
                <dd>{item.ageGroup}</dd>
              </div>
            ) : null}
            {item.format ? (
              <div className="flex gap-2">
                <dt>{t("Thể thức")}</dt>
                <dd>{t(item.format)}</dd>
              </div>
            ) : null}
          </dl>
        </li>
      ))}
    </ul>
  )
}

function Schedule({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const [day, setDay] = useState("Tất cả")
  const days = [...new Set(tournament.schedule.map((item) => item.date))]
  const rows = day === "Tất cả" ? tournament.schedule : tournament.schedule.filter((item) => item.date === day)

  if (tournament.schedule.length === 0) {
    return <p className="text-[15px] text-muted">{t("Ban tổ chức chưa cập nhật lịch thi đấu.")}</p>
  }

  return (
    <div>
      {days.length > 1 ? (
        <label className="mb-4 block max-w-xs">
          <span className="sr-only">{t("Lọc lịch theo ngày")}</span>
          <Select
            value={day}
            onChange={(event) => setDay(event.target.value)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="Tất cả">{t("Tất cả ngày")}</option>
            {days.map((item) => (
              <option key={item} value={item}>
                {formatViDate(item)}
              </option>
            ))}
          </Select>
        </label>
      ) : null}
      <div className="tournament-schedule-table overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("Ngày")}</th>
              <th className="px-4 py-3 font-medium">{t("Giờ")}</th>
              <th className="px-4 py-3 font-medium">{t("Sân")}</th>
              <th className="px-4 py-3 font-medium">{t("Nội dung")}</th>
              <th className="px-4 py-3 font-medium">{t("Vận động viên / Đội")}</th>
              <th className="px-4 py-3 font-medium">{t("Trạng thái")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="px-4 py-3 text-ink">{formatViDate(item.date)}</td>
                <td className="px-4 py-3 text-ink">{item.time}</td>
                <td className="px-4 py-3 text-ink">{t(item.court)}</td>
                <td className="px-4 py-3 text-ink">{item.event}</td>
                <td className="px-4 py-3 text-ink">{item.participants}</td>
                <td className="px-4 py-3 text-muted">{scheduleStatusLabel[item.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="tournament-schedule-cards">
        {rows.map((item) => (
          <li key={item.id} className="rounded-2xl border border-line p-4">
            <p className="text-sm font-medium text-ink">
              {formatViDate(item.date)} · {item.time}
            </p>
            <p className="mt-2 text-base font-semibold text-ink">{item.event}</p>
            <dl className="mt-2 space-y-1 text-sm text-muted">
              <div className="flex gap-2">
                <dt>{t("Sân")}</dt>
                <dd className="text-ink">{t(item.court)}</dd>
              </div>
              <div>
                <dt>{t("Vận động viên / Đội")}</dt>
                <dd className="text-ink">{item.participants}</dd>
              </div>
              <div className="flex gap-2">
                <dt>{t("Trạng thái")}</dt>
                <dd>{scheduleStatusLabel[item.status]}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Results({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  if (tournament.results.length === 0) {
    return <p className="text-[15px] text-muted">{t("Kết quả sẽ được cập nhật sau khi các trận đấu kết thúc.")}</p>
  }
  return (
    <div>
      <p className="mb-4 text-sm leading-relaxed text-muted">
        {t("Tên và tỷ số dưới đây chỉ để xem giao diện, không phải kết quả thi đấu chính thức.")}
      </p>
      <ul className="divide-y divide-line border-y border-line">
        {tournament.results.map((item) => (
          <li key={item.id} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1.4fr)_auto_minmax(0,1fr)] sm:items-center">
            <p className="text-[15px] font-medium text-ink">
              {item.sideA}
              <span className="mx-2 font-normal text-muted">–</span>
              {item.sideB}
            </p>
            <p className="text-sm font-semibold text-ink">{item.score}</p>
            <p className="text-sm text-muted">
              {t(item.round)}
              <span className="mx-1.5">·</span>
              {t("Thắng:")} {item.winner}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Regulations({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  return (
    <div className="max-w-3xl">
      <p id="dieu-le-noi-dung" className="text-[15px] leading-relaxed text-ink">
        {t(tournament.regulations.summary)}
      </p>
      {tournament.regulations.documents.length > 0 ? (
        <ul className="mt-5 space-y-2">
          {tournament.regulations.documents.map((document) => (
            <li key={document.id} className="text-sm text-ink">
              {document.href ? (
                <a href={sitePath(document.href)} className="font-medium underline-offset-2 hover:underline">
                  {t(document.title)}
                </a>
              ) : (
                <span>{t(document.title)}</span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#dieu-le-noi-dung"
          className="inline-flex min-h-11 items-center rounded-[10px] bg-brand px-5 text-sm font-medium text-ink"
        >
          {t("Xem điều lệ")}
        </a>
      </div>
      <p className="mt-3 text-sm text-muted">{t("Chưa có tệp điều lệ để tải.")}</p>
    </div>
  )
}
