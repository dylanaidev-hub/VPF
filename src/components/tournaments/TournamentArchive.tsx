import { ArrowUpRight, MapPin, X } from "lucide-react"
import type { TournamentView } from "../../types"
import { formatEventDate } from "../../lib/format"
import { sitePath } from "../../lib/site"
import { statusLabel, tournamentStatusFilters, type TournamentSort, type TournamentStatusFilter } from "../../lib/tournaments"
import { Badge } from "../Badge"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

export function TournamentToolbar({
  query,
  status,
  year,
  location,
  sort,
  years,
  locations,
  onQuery,
  onStatus,
  onYear,
  onLocation,
  onSort,
  onReset,
  dirty,
}: {
  query: string
  status: TournamentStatusFilter
  year: string
  location: string
  sort: TournamentSort
  years: string[]
  locations: string[]
  onQuery: (query: string) => void
  onStatus: (status: TournamentStatusFilter) => void
  onYear: (year: string) => void
  onLocation: (location: string) => void
  onSort: (sort: TournamentSort) => void
  onReset: () => void
  dirty: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-3 sm:flex-row" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Tìm kiếm giải đấu</span>
          <input
            type="search"
            value={query}
            placeholder="Tìm kiếm giải đấu..."
            onChange={(event) => onQuery(event.target.value)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-4 pr-12 text-[15px] text-ink outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              aria-label="Xóa tìm kiếm"
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"
              onClick={() => onQuery("")}
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </label>
        <label className="sm:w-52">
          <span className="sr-only">Sắp xếp theo thời gian</span>
          <select
            value={sort}
            onChange={(event) => onSort(event.target.value as TournamentSort)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="latest">Mới nhất</option>
            <option value="soonest">Cũ nhất</option>
          </select>
        </label>
      </form>

      <div className="tournament-pills" role="tablist" aria-label="Trạng thái giải đấu">
        {tournamentStatusFilters.map((item) => {
          const selected = item === status
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              className={
                selected
                  ? "shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-medium text-ink"
                  : "shrink-0 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink"
              }
              onClick={() => onStatus(item)}
            >
              {item}
            </button>
          )
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]">
        <label>
          <span className="sr-only">Năm</span>
          <select
            value={year}
            onChange={(event) => onYear(event.target.value)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="Tất cả">Tất cả năm</option>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Địa điểm</span>
          <select
            value={location}
            onChange={(event) => onLocation(event.target.value)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="Tất cả">Tất cả địa điểm</option>
            {locations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        {dirty ? (
          <button
            type="button"
            className="h-12 rounded-[10px] border border-line px-4 text-sm font-medium text-ink hover:border-ink/20"
            onClick={onReset}
          >
            Xóa bộ lọc
          </button>
        ) : null}
      </div>
    </div>
  )
}

export function TournamentGrid({ tournaments }: { tournaments: TournamentView[] }) {
  return (
    <ul className="tournament-grid">
      {tournaments.map((tournament) => {
        const date = formatEventDate(tournament.startDate, tournament.endDate)
        return (
          <li key={tournament.id}>
            <a href={sitePath(tournament.detailUrl)} className="group flex h-full flex-col">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={sitePath(tournament.coverImage)}
                  alt=""
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition-transform duration-[250ms] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="flex items-center justify-between gap-3 pt-3">
                <Badge tone={tone[tournament.status]}>{statusLabel[tournament.status]}</Badge>
                <time dateTime={tournament.startDate} className="text-[13px] text-muted">
                  {date.rangeLabel}
                </time>
              </div>
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-ink group-hover:text-brand-strong">
                {tournament.name}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="size-4 shrink-0 text-ink" aria-hidden />
                {tournament.location}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                Xem chi tiết
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function TournamentEmpty({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-paper px-6 py-14 text-center">
      <p className="text-lg font-semibold text-ink">Không tìm thấy giải đấu phù hợp.</p>
      <button
        type="button"
        className="mt-4 inline-flex min-h-11 items-center rounded-[10px] bg-brand px-5 text-sm font-medium text-ink"
        onClick={onClear}
      >
        Xóa bộ lọc
      </button>
    </div>
  )
}

export function TournamentPagination({
  page,
  pageCount,
  onPage,
}: {
  page: number
  pageCount: number
  onPage: (page: number) => void
}) {
  if (pageCount < 1) return null
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)
  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Phân trang giải đấu">
      <button
        type="button"
        className="min-h-11 rounded-[10px] border border-line px-4 text-sm font-medium text-ink disabled:opacity-40"
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        Trước
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          aria-current={number === page ? "page" : undefined}
          className={
            number === page
              ? "grid size-11 place-items-center rounded-[10px] bg-brand text-sm font-semibold text-ink"
              : "grid size-11 place-items-center rounded-[10px] border border-line text-sm font-medium text-ink hover:border-brand"
          }
          onClick={() => onPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        className="min-h-11 rounded-[10px] border border-line px-4 text-sm font-medium text-ink disabled:opacity-40"
        disabled={page === pageCount}
        onClick={() => onPage(page + 1)}
      >
        Sau
      </button>
    </nav>
  )
}
