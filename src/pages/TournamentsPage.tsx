import { useEffect, useMemo, useState } from "react"
import { liveArena } from "../data/live"
import { tournaments } from "../data/tournaments"
import {
  filterTournaments,
  selectFeaturedTournament,
  TOURNAMENT_LOAD_MORE,
  TOURNAMENT_PAGE_SIZE,
  tournamentCategoryOptions,
  tournamentEmptyMessage,
  type TournamentScopeFilter,
  type TournamentSort,
  type TournamentStatusFilter,
} from "../lib/tournaments"
import { LiveSection } from "../components/LiveSection"
import { PageHero } from "../components/PageHero"
import { pageHeroes } from "../data/pageHeroes"
import { SiteLayout } from "../components/SiteLayout"
import { FeaturedTournament } from "../components/FeaturedTournament"
import { TournamentEmpty, TournamentGrid, TournamentToolbar } from "../components/tournaments/TournamentArchive"

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
  const categories = useMemo(() => tournamentCategoryOptions(tournaments), [])
  const [status, setStatus] = useState<TournamentStatusFilter>("Tất cả")
  const [query, setQuery] = useState("")
  const [year, setYear] = useState("Tất cả")
  const [location, setLocation] = useState("Tất cả")
  const [scope, setScope] = useState<TournamentScopeFilter>("Tất cả")
  const [category, setCategory] = useState("Tất cả")
  const [sort, setSort] = useState<TournamentSort>("latest")
  const [visibleCount, setVisibleCount] = useState(TOURNAMENT_PAGE_SIZE)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nextScope = params.get("scope")
    if (nextScope === "Trong nước" || nextScope === "Quốc tế") setScope(nextScope)
  }, [])

  const dropdownsDefault =
    year === "Tất cả" && location === "Tất cả" && scope === "Tất cả" && category === "Tất cả"
  const browsing = status === "Tất cả" && query.trim() === "" && dropdownsDefault

  const filtered = useMemo(
    () => filterTournaments(tournaments, { status, query, year, location, scope, category, sort }),
    [status, query, year, location, scope, category, sort],
  )

  const archive = useMemo(() => {
    if (!browsing || !featured) return filtered
    return filtered.filter((item) => item.id !== featured.id)
  }, [browsing, featured, filtered])

  const visible = archive.slice(0, visibleCount)
  const canLoadMore = visibleCount < archive.length
  /** Chỉ hiện khi dropdown (khu vực / năm / địa điểm / nội dung) khác mặc định — không vì status chip. */
  const dirty = !dropdownsDefault
  const showFeatured = Boolean(browsing && featured)
  const emptyCopy = tournamentEmptyMessage(status, query)

  const resetVisible = () => setVisibleCount(TOURNAMENT_PAGE_SIZE)
  const clearFilters = () => {
    setStatus("Tất cả")
    setQuery("")
    setYear("Tất cả")
    setLocation("Tất cả")
    setScope("Tất cả")
    setCategory("Tất cả")
    setSort("latest")
    resetVisible()
  }

  return (
    <SiteLayout>
      <article className="bg-white">
        <PageHero {...pageHeroes.tournaments} />

        <LiveSection arena={liveArena} />

        {showFeatured && featured ? (
          <div className="page-wrap py-6 min-[1200px]:py-8">
            <FeaturedTournament tournament={featured} variant="tournament" showCountdown />
          </div>
        ) : null}

        <section className="border-t border-line" aria-labelledby="kham-pha-giai-dau">
          <div className="page-wrap py-8 min-[1200px]:py-10">
            <div className="tournament-explorer-head">
              <div>
                <h2 id="kham-pha-giai-dau" className="text-[1.65rem] font-bold tracking-tight text-ink min-[1200px]:text-[1.85rem]">
                  Khám phá giải đấu
                </h2>
                <p className="mt-1 text-sm text-muted" aria-live="polite">
                  {archive.length} giải đấu
                </p>
              </div>
            </div>

            <div className="mt-5">
              <TournamentToolbar
                query={query}
                status={status}
                year={year}
                location={location}
                scope={scope}
                category={category}
                sort={sort}
                years={years}
                locations={locations}
                categories={categories}
                dirty={dirty}
                onQuery={(next) => {
                  setQuery(next)
                  resetVisible()
                }}
                onStatus={(next) => {
                  setStatus(next)
                  resetVisible()
                }}
                onYear={(next) => {
                  setYear(next)
                  resetVisible()
                }}
                onLocation={(next) => {
                  setLocation(next)
                  resetVisible()
                }}
                onScope={(next) => {
                  setScope(next)
                  resetVisible()
                }}
                onCategory={(next) => {
                  setCategory(next)
                  resetVisible()
                }}
                onSort={(next) => {
                  setSort(next)
                  resetVisible()
                }}
                onReset={clearFilters}
              />
            </div>

            <div
              key={`${status}-${query}-${year}-${location}-${scope}-${category}-${sort}`}
              className="tournament-results mt-6"
            >
              {visible.length === 0 ? (
                <TournamentEmpty message={emptyCopy} onClear={clearFilters} />
              ) : (
                <TournamentGrid tournaments={visible} />
              )}
            </div>

            {canLoadMore ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center rounded-[10px] border border-line bg-white px-6 text-[15px] font-medium text-ink hover:border-brand hover:bg-brand"
                  onClick={() => setVisibleCount((count) => count + TOURNAMENT_LOAD_MORE)}
                >
                  Xem thêm giải đấu
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </article>
    </SiteLayout>
  )
}
