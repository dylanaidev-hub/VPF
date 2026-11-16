import { useMemo, useState } from "react"
import { ChevronDown, ChevronUp, MapPin, X } from "lucide-react"
import { sitePath } from "../../lib/site"
import {
  MEMBER_PREVIEW_COUNT,
  memberOrgs,
  memberSection,
  uniqueProvinces,
  type MemberOrg,
} from "../../data/library.mock"
import { cx } from "../../lib/cx"
import { foldText } from "../../lib/format"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"
import { ClubCard } from "./ClubCard"
import { Select } from "../Select"

const searchInputClass =
  "h-12 w-full rounded-[10px] border border-line bg-white px-4 pr-12 text-[15px] text-ink outline-none [&::-webkit-search-cancel-button]:hidden"

const selectClass = "h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"

const clearSearchClass =
  "absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"

function fold(value: string) {
  return foldText(value).replace(/đ/g, "d")
}

export function MemberOrgsSection() {
  const [query, setQuery] = useState("")
  const [province, setProvince] = useState("Tất cả")
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<MemberOrg | null>(null)
  const { ref, shown } = useReveal<HTMLElement>()
  const provinces = useMemo(() => uniqueProvinces(memberOrgs), [])

  const filtered = useMemo(() => {
    const q = fold(query.trim())
    return memberOrgs.filter((item) => {
      if (province !== "Tất cả" && item.province !== province) return false
      if (!q) return true
      return fold(`${item.name} ${item.province}`).includes(q)
    })
  }, [query, province])

  const dirty = query.trim() !== "" || province !== "Tất cả"
  const showAll = expanded || dirty
  const visible = showAll ? filtered : filtered.slice(0, MEMBER_PREVIEW_COUNT)
  const canToggle = !dirty && filtered.length > MEMBER_PREVIEW_COUNT

  const reset = () => {
    setQuery("")
    setProvince("Tất cả")
  }

  return (
    <section
      id={memberSection.id}
      ref={ref}
      className={cx("library-section library-members library-rise", shown && "is-in")}
      aria-labelledby="don-vi-tieu-de"
    >
      <div className="page-wrap">
        <div className="library-section-head">
          <h2 id="don-vi-tieu-de" className="library-section-title">
            {memberSection.title}
          </h2>
          <p className="library-section-lead">{memberSection.description}</p>
        </div>

        <div className="mb-4 flex flex-col gap-3">
          <form className="flex flex-col gap-3 sm:flex-row" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Tìm đơn vị thành viên</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm tên đơn vị..."
                className={searchInputClass}
              />
              {query ? (
                <button type="button" className={clearSearchClass} aria-label="Xóa tìm kiếm" onClick={() => setQuery("")}>
                  <X className="size-4" aria-hidden />
                </button>
              ) : null}
            </label>
            <label className="sm:w-56">
              <span className="sr-only">Lọc theo tỉnh/thành</span>
              <Select
                value={province}
                onChange={(event) => setProvince(event.target.value)}
                aria-label="Lọc theo tỉnh/thành"
                className={selectClass}
              >
                <option value="Tất cả">Tất cả tỉnh/thành</option>
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
              <button
                type="button"
                className="h-12 rounded-[10px] border border-line px-4 text-sm font-medium text-ink hover:border-ink/20"
                onClick={reset}
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="library-empty">
            <p className="text-base font-medium text-ink">Không có đơn vị phù hợp với bộ lọc.</p>
            <button type="button" className="mt-3 text-sm font-semibold underline" onClick={reset}>
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            <ul className="library-org-grid">
              {visible.map((org) => (
                <li key={org.id}>
                  <ClubCard
                    name={org.name}
                    location={org.province}
                    logo={org.logo ?? ""}
                    onOpen={() => setOpen(org)}
                  />
                </li>
              ))}
            </ul>
            {canToggle ? (
              <div className="library-more">
                <button
                  type="button"
                  className="library-more-btn"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((value) => !value)}
                >
                  {expanded ? memberSection.collapseLabel : `${memberSection.viewAllLabel} (${filtered.length})`}
                  {expanded ? <ChevronUp className="size-4" aria-hidden /> : <ChevronDown className="size-4" aria-hidden />}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <Dialog open={open !== null} title={open?.name ?? "Đơn vị"} onClose={() => setOpen(null)}>
        {open ? (
          <div>
            {open.logo ? (
              <img className="club-dialog-logo" src={sitePath(open.logo)} alt="" width={72} height={72} />
            ) : null}
            <p className="mt-3 text-sm font-medium text-brand-strong">Đơn vị minh họa</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-3.5" aria-hidden />
              {open.province}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">{open.description}</p>
            <p className="mt-4 text-sm text-muted">
              Không phải đơn vị thành viên chính thức. Chưa có thông tin liên hệ công bố trên trang này.
            </p>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}
