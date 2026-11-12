import type { Tournament, TournamentScope, TournamentStatus, TournamentView } from "../types"
import { foldText, parseIsoDate } from "./format"

export const TOURNAMENT_PAGE_SIZE = 6
export const TOURNAMENT_LOAD_MORE = 6

export const tournamentStatusFilters = ["Tất cả", "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"] as const
export const tournamentScopeFilters = ["Tất cả", "Trong nước", "Quốc tế"] as const

export type TournamentStatusFilter = (typeof tournamentStatusFilters)[number]
export type TournamentScopeFilter = (typeof tournamentScopeFilters)[number]
export type TournamentSort = "soonest" | "latest" | "name"

const scopeByFilter: Record<Exclude<TournamentScopeFilter, "Tất cả">, TournamentScope> = {
  "Trong nước": "domestic",
  "Quốc tế": "international",
}

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

const TOURNAMENT_ZONE = "Asia/Ho_Chi_Minh"

function clockParts(time: string) {
  return [...time.matchAll(/(\d{1,2}):(\d{2})/g)].map(
    (match) => [Number(match[1]), Number(match[2])] as const,
  )
}

/** Giờ tường Việt Nam → mốc UTC. Không phụ thuộc múi giờ của máy. */
function vietnamWallClock(isoDate: string, hours: number, minutes: number) {
  const [year, month, day] = isoDate.split("-").map(Number)
  const utcGuess = Date.UTC(year, month - 1, day, hours, minutes, 0)
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TOURNAMENT_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcGuess))
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value)
  const zonedAsUtc = Date.UTC(
    pick("year"),
    pick("month") - 1,
    pick("day"),
    pick("hour"),
    pick("minute"),
    pick("second"),
  )
  return new Date(utcGuess - (zonedAsUtc - utcGuess))
}

/** Mốc giờ bắt đầu từ ngày giải và khung giờ, ví dụ "08:00 – 17:00". */
export function tournamentStart(item: Pick<Tournament, "startDate" | "time">) {
  const [hour, minute] = clockParts(item.time)[0] ?? [0, 0]
  return vietnamWallClock(item.startDate, hour, minute)
}

/** Mốc giờ kết thúc: giờ sau trong khung giờ, trên ngày kết thúc. */
export function tournamentEnd(item: Pick<Tournament, "endDate" | "time">) {
  const clocks = clockParts(item.time)
  const [hour, minute] = clocks[clocks.length - 1] ?? [23, 59]
  return vietnamWallClock(item.endDate, hour, minute)
}

/** Phần còn lại tới mốc bắt đầu. Null khi mốc đã qua — không trả số âm. */
export function countdownUntil(target: Date, now: Date) {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return null
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  }
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
    scope?: TournamentScopeFilter
    category?: string
    sort: TournamentSort
  },
  now = new Date(),
) {
  const needle = foldQuery(options.query.trim())
  const scope = options.scope ?? "Tất cả"
  const category = options.category ?? "Tất cả"
  const seen = new Set<string>()
  const matched = withStatus(items, now).filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    if (options.status !== "Tất cả" && item.status !== statusByFilter[options.status]) return false
    if (scope !== "Tất cả" && item.scope !== scopeByFilter[scope]) return false
    if (options.year !== "Tất cả" && !item.startDate.startsWith(options.year)) return false
    if (options.location !== "Tất cả" && item.location !== options.location) return false
    if (category !== "Tất cả" && !item.categories.some((entry) => entry.name === category)) return false
    if (!needle) return true
    return foldQuery(
      `${item.name} ${item.description} ${item.summary} ${item.location} ${item.venue} ${item.country ?? ""}`,
    ).includes(needle)
  })
  return matched.sort((a, b) => {
    if (options.sort === "name") return a.name.localeCompare(b.name, "vi")
    const order = a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name, "vi")
    return options.sort === "latest" ? -order : order
  })
}

export function tournamentCategoryOptions(items: Tournament[]) {
  return [...new Set(items.flatMap((item) => item.categories.map((entry) => entry.name)))].sort((a, b) =>
    a.localeCompare(b, "vi"),
  )
}

export function tournamentEmptyMessage(status: TournamentStatusFilter, query: string) {
  if (query.trim()) return "Không tìm thấy giải đấu phù hợp với từ khóa tìm kiếm."
  if (status === "Đang diễn ra") return "Hiện không có giải đang diễn ra."
  if (status === "Sắp diễn ra") return "Hiện không có giải sắp diễn ra."
  if (status === "Đã kết thúc") return "Hiện không có giải đã kết thúc trong bộ lọc này."
  return "Không tìm thấy giải đấu phù hợp."
}

export function tournamentsByScope(
  items: TournamentView[],
  scope: TournamentScope,
  limit?: number,
) {
  const list = items.filter((item) => item.scope === scope)
  return typeof limit === "number" ? list.slice(0, limit) : list
}

export function activeTournaments(items: TournamentView[], limit?: number) {
  const list = items
    .filter((item) => item.status === "ongoing" || item.status === "upcoming")
    .sort(
      (a, b) =>
        STATUS_RANK[a.status] - STATUS_RANK[b.status] ||
        a.startDate.localeCompare(b.startDate),
    )
  return typeof limit === "number" ? list.slice(0, limit) : list
}

export function finishedTournaments(items: TournamentView[], limit?: number) {
  const list = items
    .filter((item) => item.status === "finished")
    .sort((a, b) => b.endDate.localeCompare(a.endDate) || a.name.localeCompare(b.name, "vi"))
  return typeof limit === "number" ? list.slice(0, limit) : list
}

export function primaryCategory(item: Pick<Tournament, "categories">) {
  return item.categories[0]?.name ?? "Pickleball"
}
