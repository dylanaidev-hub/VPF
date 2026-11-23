import { useTranslation } from "../../i18n"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import type { TournamentView } from "../../types"
import { TournamentEventsTab } from "./detail/TournamentEventsTab"
import { TournamentOverviewTab } from "./detail/TournamentOverviewTab"
import { TournamentResultsTab } from "./detail/TournamentResultsTab"
import { TournamentRulesTab } from "./detail/TournamentRulesTab"
import { TournamentScheduleTab } from "./detail/TournamentScheduleTab"

const tabs = [
  { id: "tong-quan", label: "Tổng quan" },
  { id: "noi-dung", label: "Nội dung thi đấu" },
  { id: "lich", label: "Lịch thi đấu" },
  { id: "ket-qua", label: "Kết quả" },
  { id: "dieu-le", label: "Điều lệ" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function TournamentDetailTabs({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabId>("tong-quan")
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = document.getElementById("dau-trang")
    const update = () => {
      const offset = header?.getBoundingClientRect().height ?? 76
      document.documentElement.style.setProperty("--header-offset", `${offset}px`)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

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
      <div ref={wrapRef} className="td-tabs-wrap">
        <div className="td-tabs" role="tablist" aria-label={t("Thông tin giải đấu")} onKeyDown={onKeyDown}>
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
                className="td-tab"
                onClick={() => setTab(item.id)}
              >
                {t(item.label)}
              </button>
            )
          })}
        </div>
      </div>

      <div
        key={tab}
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="tournament-tab-panel mt-5"
      >
        {tab === "tong-quan" ? <TournamentOverviewTab tournament={tournament} /> : null}
        {tab === "noi-dung" ? <TournamentEventsTab tournament={tournament} /> : null}
        {tab === "lich" ? <TournamentScheduleTab tournament={tournament} /> : null}
        {tab === "ket-qua" ? <TournamentResultsTab tournament={tournament} /> : null}
        {tab === "dieu-le" ? <TournamentRulesTab tournament={tournament} /> : null}
      </div>
    </div>
  )
}
