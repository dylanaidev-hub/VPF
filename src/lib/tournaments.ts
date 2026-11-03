import type { Tournament, TournamentStatus, TournamentView } from "../types"
import { foldText, parseIsoDate } from "./format"

export const TOURNAMENT_PAGE_SIZE = 9

export const tournamentStatusFilters = ["Tất cả", "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"] as const

export type TournamentStatusFilter = (typeof tournamentStatusFilters)[number]
export type TournamentSort = "soonest" | "latest"

const statusByFilter: Record<Exclude<TournamentStatusFilter, "Tất cả">, TournamentStatus> = {
  "Đang diễn ra": "ongoing",
  "Sắp diễn ra": "upcoming",
  "Đã kết thúc": "finished",
}

const STATUS_RANK: Record<TournamentStatus, number> = {
  ongoing: 0,
  upcoming: 1,
  finished: 2,
}

export function getTournamentStatus(
  startDate: string,
  endDate: string,
  now = new Date(),
): TournamentStatus {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const start = parseIsoDate(startDate).getTime()
  const end = parseIsoDate(endDate).getTime()

  if (today < start) return "upcoming"
  if (today > end) return "finished"
  return "ongoing"
}

export function withStatus(items: Tournament[], now = new Date()): TournamentView[] {
  return items.map((item) => ({
    ...item,
    status: getTournamentStatus(item.startDate, item.endDate, now),
  }))
}

export function selectHighlighted(items: Tournament[], limit = 3, now = new Date()) {
  return withStatus(items, now)
    .filter((item) => item.status === "ongoing" || item.status === "upcoming")
    .sort(
      (a, b) =>
        STATUS_RANK[a.status] - STATUS_RANK[b.status] ||
        a.startDate.localeCompare(b.startDate),
    )
    .slice(0, limit)
}

export function sortByStart(items: Tournament[], now = new Date()) {
  return withStatus(items, now).sort((a, b) => a.startDate.localeCompare(b.startDate))
}

/** Giải chưa kết thúc, theo ngày bắt đầu. Giải đầu là spotlight, ba giải sau là timeline. */
export function selectTournamentSpotlight(items: Tournament[], now = new Date()) {
  const active = withStatus(items, now)
    .filter((item) => item.status !== "finished")
    .sort((a, b) => a.startDate.localeCompare(b.startDate))

  return {
    featured: active[0] ?? null,
    timeline: active.slice(1, 4),
    calendar: sortByStart(items, now),
  }
}

export const statusLabel: Record<TournamentStatus, string> = {
  upcoming: "Sắp diễn ra",
  ongoing: "Đang diễn ra",
  finished: "Đã kết thúc",
}

export function tournamentPath(slug: string) {
  return `/chitiet-giaidau.html?slug=${encodeURIComponent(slug)}`
}

export function tournamentSlugFromLocation(location: Pick<Location, "search"> = window.location) {
  const slug = new URLSearchParams(location.search).get("slug")?.trim()
  return slug || null
}

function foldQuery(value: string) {
  return foldText(value).replace(/đ/g, "d")
}

export function selectFeaturedTournament(items: Tournament[], now = new Date()) {
  const views = withStatus(items, now)
  return views.find((item) => item.isFeatured) ?? selectTournamentSpotlight(items, now).featured
}

export function filterTournaments(
  items: Tournament[],
  options: {
    status: TournamentStatusFilter
    query: string
    year: string
    location: string
    sort: TournamentSort
  },
  now = new Date(),
) {
  const needle = foldQuery(options.query.trim())
  const seen = new Set<string>()
  const matched = withStatus(items, now).filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    if (options.status !== "Tất cả" && item.status !== statusByFilter[options.status]) return false
    if (options.year !== "Tất cả" && !item.startDate.startsWith(options.year)) return false
    if (options.location !== "Tất cả" && item.location !== options.location) return false
    if (!needle) return true
    return foldQuery(`${item.name} ${item.description} ${item.summary} ${item.location} ${item.venue}`).includes(needle)
  })
  return matched.sort((a, b) => {
    const order = a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name, "vi")
    return options.sort === "latest" ? -order : order
  })
}
