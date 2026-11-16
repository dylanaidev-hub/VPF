import type { Player } from "../data/players.mock"
import { SportsProfileCard, type SportsProfileRow } from "./SportsProfileCard"

export function PlayerCard({
  player,
  variant = "default",
  onOpen,
}: {
  player: Player
  variant?: "default" | "compact"
  onOpen?: () => void
}) {
  const compact = variant === "compact"
  const formats = (player.competitionTypes ?? []).filter(Boolean).join(" · ")
  const rows: SportsProfileRow[] = []

  if (player.club) rows.push({ icon: "users", text: player.club })
  if (!compact && player.location) rows.push({ icon: "pin", text: player.location })
  if (player.dupr != null) {
    rows.push({
      icon: "chart",
      text: (
        <>
          DUPR: <span className="player-card-dupr">{player.dupr.toFixed(1)}</span>
        </>
      ),
    })
  }
  if (!compact && formats) rows.push({ icon: "paddle", text: `Thi đấu: ${formats}` })

  const achievement = compact ? undefined : player.achievement

  return (
    <SportsProfileCard
      name={player.name}
      image={player.image}
      code={player.playerCode ? `Mã VĐV: ${player.playerCode}` : undefined}
      rows={rows}
      highlight={
        achievement
          ? {
              title: achievement.title,
              description: achievement.description,
              href: achievement.href,
              icon: "trophy",
            }
          : undefined
      }
      variant={variant}
      onOpen={onOpen}
      profileUrl={player.profileUrl}
    />
  )
}
