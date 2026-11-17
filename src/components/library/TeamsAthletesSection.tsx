import { useMemo, useState } from "react"
import { coaches, type Coach } from "../../data/coaches.mock"
import {
  athleteBatches,
  athletes,
  teamsSection,
  type AthleteProfile,
} from "../../data/library.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { libraryRecordAnchor } from "../../lib/libraryLinks"
import { useReveal } from "../../lib/useReveal"
import { CoachCard } from "../CoachCard"
import { Dialog } from "../Dialog"
import { PlayerCard } from "../PlayerCard"
import { Select } from "../Select"

const selectClass = "library-batch-select h-12 rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"

type Tab = "Ban huấn luyện" | "VĐV theo đợt"

export function TeamsAthletesSection() {
  const [tab, setTab] = useState<Tab>(() => {
    const athlete = new URLSearchParams(window.location.search).get("athlete")
    return athletes.some((person) => person.id === athlete) ? "VĐV theo đợt" : "Ban huấn luyện"
  })
  const [batch, setBatch] = useState<(typeof athleteBatches)[number]>("Tất cả đợt")
  const [coachOpen, setCoachOpen] = useState<Coach | null>(null)
  const [athleteOpen, setAthleteOpen] = useState<AthleteProfile | null>(null)
  const { ref, shown } = useReveal<HTMLElement>()

  const visibleAthletes = useMemo(() => {
    if (batch === "Tất cả đợt") return athletes
    return athletes.filter((item) => item.batch === batch)
  }, [batch])

  return (
    <section
      id={teamsSection.id}
      ref={ref}
      className={cx("library-section library-teams library-rise", shown && "is-in")}
      aria-labelledby="doi-tuyen-tieu-de"
    >
      <div className="page-wrap">
        <div className="library-section-head">
          <h2 id="doi-tuyen-tieu-de" className="library-section-title">
            {teamsSection.title}
          </h2>
          <p className="library-section-lead">{teamsSection.description}</p>
        </div>

        <div className="library-team-toolbar">
          <div className="library-tabs" role="tablist" aria-label="Đội tuyển và vận động viên">
            {(["Ban huấn luyện", "VĐV theo đợt"] as const).map((item) => {
              const selected = item === tab
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cx("library-tab", selected && "is-active")}
                  onClick={() => setTab(item)}
                >
                  {item}
                </button>
              )
            })}
          </div>
          <label className="library-batch-filter">
            <span className="sr-only">Lọc theo đợt</span>
            <Select
              value={batch}
              onChange={(event) => setBatch(event.target.value as (typeof athleteBatches)[number])}
              aria-label="Lọc theo đợt"
              className={selectClass}
            >
              {athleteBatches.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </label>
        </div>

        {tab === "Ban huấn luyện" ? (
          <ul className="library-athlete-grid">
            {coaches.map((person) => (
              <li key={person.id} id={libraryRecordAnchor("coach", person.id)}>
                <CoachCard coach={person} onOpen={() => setCoachOpen(person)} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="library-athlete-grid">
            {visibleAthletes.map((person) => (
              <li key={person.id} id={libraryRecordAnchor("athlete", person.id)}>
                <PlayerCard player={person} onOpen={() => setAthleteOpen(person)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={coachOpen !== null} title={coachOpen?.name ?? "Ban huấn luyện"} onClose={() => setCoachOpen(null)}>
        {coachOpen ? (
          <div className="athlete-id-detail">
            <img src={sitePath(coachOpen.image)} alt="" width={864} height={1152} />
            {coachOpen.coachCode ? (
              <p className="text-sm font-semibold tracking-wide text-muted uppercase">Mã HLV: {coachOpen.coachCode}</p>
            ) : null}
            {coachOpen.organization ? <p className="mt-3 text-sm font-semibold text-ink">{coachOpen.organization}</p> : null}
            {coachOpen.location ? <p className="mt-1 text-sm text-muted">{coachOpen.location}</p> : null}
            {coachOpen.certification ? <p className="mt-2 text-sm text-ink">Chứng chỉ: {coachOpen.certification}</p> : null}
            {(coachOpen.specialties ?? []).length > 0 ? (
              <p className="mt-2 text-sm text-ink">Chuyên môn: {coachOpen.specialties?.join(" · ")}</p>
            ) : null}
            {coachOpen.experience ? <p className="mt-4 text-[15px] leading-relaxed text-ink">{coachOpen.experience}</p> : null}
            <p className="mt-4 text-sm text-muted">Không phải thành viên ban huấn luyện chính thức của Liên đoàn.</p>
          </div>
        ) : null}
      </Dialog>

      <Dialog
        open={athleteOpen !== null}
        title={athleteOpen?.name ?? "Vận động viên"}
        onClose={() => setAthleteOpen(null)}
      >
        {athleteOpen ? (
          <div className="athlete-id-detail">
            <img src={sitePath(athleteOpen.image)} alt="" width={720} height={960} />
            {athleteOpen.playerCode ? (
              <p className="text-sm font-semibold tracking-wide text-muted uppercase">Mã VĐV: {athleteOpen.playerCode}</p>
            ) : null}
            <p className="mt-3 text-sm font-semibold text-ink">{athleteOpen.club}</p>
            <p className="mt-1 text-sm text-muted">{athleteOpen.location}</p>
            {athleteOpen.dupr != null ? (
              <p className="mt-2 text-sm text-ink">DUPR {athleteOpen.dupr.toFixed(1)}</p>
            ) : null}
            <p className="mt-2 text-sm text-ink">{(athleteOpen.competitionTypes ?? []).join(" · ")}</p>
            {athleteOpen.achievement ? (
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                {athleteOpen.achievement.description ?? athleteOpen.achievement.title}
              </p>
            ) : null}
            <p className="mt-4 text-sm text-muted">Danh mục này chưa phải danh sách vận động viên được Liên đoàn công bố.</p>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}
