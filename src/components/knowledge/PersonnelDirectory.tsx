import { useMemo, useState } from "react"
import { ChevronDown, ChevronUp, MapPin, X } from "lucide-react"
import { PREVIEW_PERSONNEL_COUNT, uniqueSorted, type PersonnelMember } from "../../data/expertise.mock"
import { cx } from "../../lib/cx"
import { foldText } from "../../lib/format"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"
import { Select } from "../Select"

const searchInputClass =
  "h-12 w-full rounded-[10px] border border-line bg-white px-4 pr-12 text-[15px] text-ink outline-none [&::-webkit-search-cancel-button]:hidden"

const selectClass = "h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"

const clearSearchClass =
  "absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"

const resetFilterClass =
  "h-12 shrink-0 rounded-[10px] border border-line px-4 text-sm font-medium text-ink hover:border-ink/20"

function fold(value: string) {
  return foldText(value).replace(/đ/g, "d")
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]![0]! : ""
  return `${first}${last}`.toUpperCase()
}

type PersonnelDirectoryProps = {
  id: string
  title: string
  description: string
  searchLabel: string
  empty: string
  emptyFiltered: string
  illustrativeNote: string
  viewAllLabel: string
  collapseLabel: string
  members: PersonnelMember[]
  variant: "referee" | "coach"
}

export function PersonnelDirectory({
  id,
  title,
  description,
  searchLabel,
  empty,
  emptyFiltered,
  illustrativeNote,
  viewAllLabel,
  collapseLabel,
  members,
  variant,
}: PersonnelDirectoryProps) {
  const [query, setQuery] = useState("")
  const [level, setLevel] = useState("Tất cả")
  const [province, setProvince] = useState("Tất cả")
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<PersonnelMember | null>(null)
  const { ref, shown } = useReveal<HTMLElement>()
  const hasData = members.length > 0

  const levels = useMemo(() => uniqueSorted(members.map((item) => item.level)), [members])
  const provinces = useMemo(() => uniqueSorted(members.map((item) => item.province)), [members])

  const filtered = useMemo(() => {
    const q = fold(query.trim())
    return members.filter((member) => {
      if (level !== "Tất cả" && member.level !== level) return false
      if (province !== "Tất cả" && member.province !== province) return false
      if (!q) return true
      return fold(`${member.name} ${member.level} ${member.province} ${member.specialization ?? ""}`).includes(q)
    })
  }, [members, query, level, province])

  const dirty = query.trim() !== "" || level !== "Tất cả" || province !== "Tất cả"
  const showAll = expanded || dirty
  const visible = showAll ? filtered : filtered.slice(0, PREVIEW_PERSONNEL_COUNT)
  const canToggle = !dirty && filtered.length > PREVIEW_PERSONNEL_COUNT

  const reset = () => {
    setQuery("")
    setLevel("Tất cả")
    setProvince("Tất cả")
  }

  return (
    <section
      id={id}
      ref={ref}
      className={cx(
        "expertise-section expertise-rise",
        variant === "referee" ? "expertise-referees" : "expertise-coaches",
        shown && "is-in",
      )}
      aria-labelledby={`${id}-tieu-de`}
    >
      <div className="page-wrap">
        <div className="expertise-section-head">
          <h2 id={`${id}-tieu-de`} className="expertise-section-title">
            {title}
          </h2>
          <p className="expertise-section-lead">{description}</p>
          <p className="expertise-note">{illustrativeNote}</p>
        </div>

        {hasData ? (
          <div className="mb-4 flex flex-col gap-3">
            <form className="flex flex-col gap-3 sm:flex-row" role="search" onSubmit={(event) => event.preventDefault()}>
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">{searchLabel}</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo họ tên..."
                  className={searchInputClass}
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className={clearSearchClass}
                    aria-label="Xóa tìm kiếm"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                ) : null}
              </label>

              <label className="sm:w-44">
                <span className="sr-only">Lọc theo cấp</span>
                <Select
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  aria-label="Lọc theo cấp"
                  className={selectClass}
                >
                  <option value="Tất cả">Tất cả cấp</option>
                  {levels.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </label>

              <label className="sm:w-48">
                <span className="sr-only">Lọc theo tỉnh/thành</span>
                <Select
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  aria-label="Lọc theo tỉnh/thành"
                  className={selectClass}
                >
                  <option value="Tất cả">Tất cả tỉnh/TP</option>
                  {provinces.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </label>
            </form>

            {dirty ? (
              <div>
                <button type="button" className={resetFilterClass} onClick={reset}>
                  Xóa bộ lọc
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {!hasData ? (
          <div className="expertise-empty">
            <p className="text-base font-medium text-ink">{empty}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="expertise-empty">
            <p className="text-base font-medium text-ink">{emptyFiltered}</p>
            <button type="button" className="mt-3 text-sm font-semibold text-ink underline" onClick={reset}>
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            <ul className="expertise-person-grid">
              {visible.map((member) => (
                <li key={member.id}>
                  <button type="button" className="expertise-person-card" onClick={() => setOpen(member)}>
                    <span className="expertise-person-avatar">
                      <Portrait member={member} />
                    </span>
                    <span className="expertise-person-body">
                      <span className="expertise-person-name">{member.name}</span>
                      <span className="expertise-level">{member.level}</span>
                      <span className="expertise-person-place">
                        <MapPin className="size-3.5 shrink-0" aria-hidden />
                        {member.province}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {canToggle ? (
              <div className="expertise-more">
                <button
                  type="button"
                  className="expertise-more-btn"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((value) => !value)}
                >
                  {expanded ? collapseLabel : `${viewAllLabel} (${filtered.length})`}
                  {expanded ? <ChevronUp className="size-4" aria-hidden /> : <ChevronDown className="size-4" aria-hidden />}
                </button>
              </div>
            ) : dirty ? (
              <p className="expertise-more-meta" aria-live="polite">
                {filtered.length} hồ sơ phù hợp
              </p>
            ) : null}
          </>
        )}
      </div>

      <Dialog
        open={open !== null}
        title={open?.name ?? (variant === "coach" ? "Huấn luyện viên" : "Trọng tài")}
        onClose={() => setOpen(null)}
      >
        {open ? (
          <div className="expertise-profile">
            <div className="expertise-profile-media">
              <Portrait member={open} large />
            </div>
            <p className="text-sm font-medium text-brand-strong">Hồ sơ minh họa</p>
            <p className="expertise-level mt-3">{open.level}</p>
            {open.specialization ? (
              <p className="mt-2 text-sm text-ink">
                <span className="font-semibold">Chuyên môn: </span>
                {open.specialization}
              </p>
            ) : null}
            <p className="expertise-person-place mt-3">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {open.province}
            </p>
            {open.bio ? <p className="mt-4 text-[15px] leading-relaxed text-ink">{open.bio}</p> : null}
            <p className="mt-4 text-sm text-muted">
              Không phải thành viên hay chứng nhận chính thức của Liên đoàn. Chỉ dùng để duyệt giao diện.
            </p>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}

function Portrait({ member, large = false }: { member: PersonnelMember; large?: boolean }) {
  if (member.portrait) {
    return (
      <img
        src={sitePath(member.portrait)}
        alt={member.portraitAlt ?? ""}
        width={large ? 480 : 96}
        height={large ? 600 : 96}
        loading="lazy"
        className={cx("expertise-person-img", large && "is-large")}
      />
    )
  }
  return (
    <span className={cx("expertise-person-fallback", large && "is-large")} aria-hidden>
      {initials(member.name)}
    </span>
  )
}
