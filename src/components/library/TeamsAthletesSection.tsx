import { useMemo, useState } from "react"
import {
  athleteBatches,
  athletes,
  coachingStaff,
  teamsSection,
  type AthleteProfile,
  type StaffProfile,
} from "../../data/library.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"
import { Select } from "../Select"

const selectClass = "h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"

type Tab = "Ban huấn luyện" | "VĐV theo đợt"

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]![0]! : ""
  return `${first}${last}`.toUpperCase()
}

export function TeamsAthletesSection() {
  const [tab, setTab] = useState<Tab>("Ban huấn luyện")
  const [batch, setBatch] = useState<(typeof athleteBatches)[number]>("Tất cả đợt")
  const [staffOpen, setStaffOpen] = useState<StaffProfile | null>(null)
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
          <p className="library-note">{teamsSection.note}</p>
        </div>

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

        {tab === "Ban huấn luyện" ? (
          <ul className="library-person-grid">
            {coachingStaff.map((person) => (
              <li key={person.id}>
                <button type="button" className="library-person-card" onClick={() => setStaffOpen(person)}>
                  <span className="library-person-portrait is-staff" aria-hidden>
                    {initials(person.name)}
                  </span>
                  <span className="library-person-body">
                    <span className="library-person-name">{person.name}</span>
                    <span className="library-person-role">{person.role}</span>
                    <span className="library-person-spec">{person.specialization}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="mb-4 max-w-xs">
              <label>
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
            <ul className="library-athlete-grid">
              {visibleAthletes.map((person) => (
                <li key={person.id}>
                  <button type="button" className="library-athlete-card" onClick={() => setAthleteOpen(person)}>
                    <span className="library-athlete-portrait" aria-hidden>
                      {initials(person.name)}
                    </span>
                    <span className="library-person-body">
                      <span className="library-person-name">{person.name}</span>
                      <span className="library-person-spec">{person.category}</span>
                      <span className="library-level">{person.batch}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Dialog open={staffOpen !== null} title={staffOpen?.name ?? "Ban huấn luyện"} onClose={() => setStaffOpen(null)}>
        {staffOpen ? (
          <div>
            <p className="text-sm font-medium text-brand-strong">Hồ sơ minh họa</p>
            <p className="mt-3 text-sm font-semibold text-ink">{staffOpen.role}</p>
            <p className="mt-2 text-sm text-muted">{staffOpen.specialization}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">{staffOpen.bio}</p>
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
          <div>
            <p className="text-sm font-medium text-brand-strong">Hồ sơ minh họa</p>
            <p className="mt-3 text-sm font-semibold text-ink">{athleteOpen.category}</p>
            <p className="mt-2 text-sm text-muted">{athleteOpen.batch}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">{athleteOpen.bio}</p>
            <p className="mt-4 text-sm text-muted">Không phải vận động viên chính thức của Liên đoàn. Không có thành tích công bố.</p>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}
