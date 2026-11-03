import { useMemo, useState } from "react"
import { tournaments } from "../data/tournaments"
import {
  filterTournaments,
  selectFeaturedTournament,
  TOURNAMENT_PAGE_SIZE,
  type TournamentSort,
  type TournamentStatusFilter,
} from "../lib/tournaments"
import { Breadcrumb } from "../components/Breadcrumb"
import { SiteLayout } from "../components/SiteLayout"
import {
  TournamentEmpty,
  TournamentGrid,
  TournamentPagination,
  TournamentToolbar,
} from "../components/tournaments/TournamentArchive"
import { TournamentSpotlight } from "../components/tournaments/TournamentSpotlight"

export function TournamentsPage() {
  const featured = useMemo(() => selectFeaturedTournament(tournaments), [])
  const years = useMemo(
    () => [...new Set(tournaments.map((item) => item.startDate.slice(0, 4)))].sort((a, b) => b.localeCompare(a)),
    [],
  )
  const locations = useMemo(
    () => [...new Set(tournaments.map((item) => item.location))].sort((a, b) => a.localeCompare(b, "vi")),
    [],
  )
  const [status, setStatus] = useState<TournamentStatusFilter>("Tất cả")
  const [query, setQuery] = useState("")
  const [year, setYear] = useState("Tất cả")
  const [location, setLocation] = useState("Tất cả")
  const [sort, setSort] = useState<TournamentSort>("latest")
  const [page, setPage] = useState(1)

  const browsing = status === "Tất cả" && query.trim() === "" && year === "Tất cả" && location === "Tất cả"
  const filtered = useMemo(
    () => filterTournaments(tournaments, { status, query, year, location, sort }),
    [status, query, year, location, sort],
  )
  const archive = useMemo(() => {
    if (!browsing || !featured) return filtered
    return filtered.filter((item) => item.id !== featured.id)
  }, [browsing, featured, filtered])
  const pageCount = Math.ceil(archive.length / TOURNAMENT_PAGE_SIZE)
  const currentPage = pageCount === 0 ? 1 : Math.min(page, pageCount)
  const showFeatured = Boolean(browsing && currentPage === 1 && featured)
  const visible = archive.slice((currentPage - 1) * TOURNAMENT_PAGE_SIZE, currentPage * TOURNAMENT_PAGE_SIZE)
  const dirty = !browsing || sort !== "latest"

  const resetPage = () => setPage(1)
  const clearFilters = () => {
    setStatus("Tất cả")
    setQuery("")
    setYear("Tất cả")
    setLocation("Tất cả")
    setSort("latest")
    resetPage()
  }

  return (
    <SiteLayout>
      <article className="bg-white">
        <header className="page-wrap pt-10 pb-6 min-[1200px]:pt-14">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/index.html" }, { label: "Giải đấu" }]} />
          <p className="mt-6 flex items-center gap-3 text-[13px] font-medium text-brand-strong">
            <span className="h-px w-8 bg-brand" aria-hidden />
            Giải đấu
          </p>
          <h1 id="giai-dau-trang" className="tournament-page-title mt-3 text-ink">
            Hệ thống giải đấu
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
            Khám phá các giải đấu Pickleball trên toàn quốc, cập nhật lịch thi đấu và kết quả.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Các giải đang hiển thị là dữ liệu minh họa, không phải lịch thi đấu chính thức.
          </p>
        </header>

        <div className="page-wrap pb-8">
          <TournamentToolbar
            query={query}
            status={status}
            year={year}
            location={location}
            sort={sort}
            years={years}
            locations={locations}
            dirty={dirty}
            onQuery={(next) => {
              setQuery(next)
              resetPage()
            }}
            onStatus={(next) => {
              setStatus(next)
              resetPage()
            }}
            onYear={(next) => {
              setYear(next)
              resetPage()
            }}
            onLocation={(next) => {
              setLocation(next)
              resetPage()
            }}
            onSort={(next) => {
              setSort(next)
              resetPage()
            }}
            onReset={clearFilters}
          />
        </div>

        {showFeatured && featured ? (
          <div className="page-wrap pb-10">
            <TournamentSpotlight tournament={featured} />
          </div>
        ) : null}

        <section className="border-t border-line" aria-labelledby="giai-tat-ca">
          <div className="page-wrap py-10 min-[1200px]:py-12">
            <h2 id="giai-tat-ca" className="text-[1.75rem] font-bold tracking-tight text-ink">
              Tất cả giải đấu
            </h2>
            <p className="mt-2 text-sm text-muted" aria-live="polite">
              {archive.length} giải đấu
            </p>
            <div key={`${status}-${query}-${year}-${location}-${sort}-${currentPage}`} className="tournament-results mt-6">
              {visible.length === 0 ? <TournamentEmpty onClear={clearFilters} /> : <TournamentGrid tournaments={visible} />}
            </div>
            <TournamentPagination page={currentPage} pageCount={pageCount} onPage={setPage} />
          </div>
        </section>
      </article>
    </SiteLayout>
  )
}
