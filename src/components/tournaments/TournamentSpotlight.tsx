import type { TournamentView } from "../../types"
import { FeaturedTournament } from "../FeaturedTournament"

/** @deprecated Prefer `FeaturedTournament`. Kept as a thin alias for older imports. */
export function TournamentSpotlight({ tournament }: { tournament: TournamentView }) {
  return <FeaturedTournament tournament={tournament} variant="tournament" showCountdown />
}
