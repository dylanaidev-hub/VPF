import type { TournamentScheduleItem, TournamentView } from "../types"
import { withStatus } from "./tournaments"

export function matchSides(item: TournamentScheduleItem) {
  if (item.sideA && item.sideB) return { sideA: item.sideA, sideB: item.sideB }
  const parts = item.participants.split(/\s+[–-]\s+/)
  return {
    sideA: parts[0]?.trim() || item.participants,
    sideB: parts[1]?.trim() || "—",
  }
}

export function relatedTournaments(current: TournamentView, all: TournamentView[], limit = 3) {
  return all
    .filter((item) => item.id !== current.id)
    .sort((a, b) => b.startDate.localeCompare(a.startDate) || a.name.localeCompare(b.name, "vi"))
    .slice(0, limit)
}

export function tournamentDetailStats(tournament: TournamentView) {
  if (tournament.stats) return tournament.stats
  return {
    athletes: null,
    teams: null,
    matches: tournament.schedule.length || null,
    events: tournament.categories.length || null,
  }
}

export function hasValidContact(tournament: TournamentView) {
  const contact = tournament.contact
  if (!contact) return false
  return Boolean(contact.email || contact.phone || contact.name)
}

export function selectRelatedFromCatalog(current: TournamentView, catalog: Parameters<typeof withStatus>[0], limit = 3) {
  return relatedTournaments(current, withStatus(catalog), limit)
}
