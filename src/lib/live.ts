import type { BroadcastMatch, BroadcastStatus, BroadcastTeam, BroadcastTournament } from "../data/live"

export type PlayableStream = {
  kind: "hls" | "file" | "youtube"
  src: string
}

export const broadcastStatusLabel: Record<BroadcastStatus, string> = {
  live: "LIVE",
  upcoming: "UP NEXT",
  finished: "FINISHED",
}

export type BroadcastView = BroadcastMatch & {
  tournamentName: string
  homeName: string
  awayName: string
}

export function presentBroadcast(
  match: BroadcastMatch,
  tournaments: BroadcastTournament[],
  teams: BroadcastTeam[],
): BroadcastView {
  return {
    ...match,
    tournamentName: tournaments.find((item) => item.id === match.tournamentId)?.name ?? "",
    homeName: teams.find((item) => item.id === match.homeTeamId)?.name ?? "",
    awayName: teams.find((item) => item.id === match.awayTeamId)?.name ?? "",
  }
}

function youtubeId(url: URL) {
  const host = url.hostname.replace(/^www\./, "")
  if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] ?? null
  if (host !== "youtube.com" && host !== "m.youtube.com") return null
  if (url.pathname === "/watch") return url.searchParams.get("v")
  const [kind, id] = url.pathname.split("/").filter(Boolean)
  if (id && (kind === "embed" || kind === "shorts" || kind === "live")) return id
  return null
}

/**
 * Nhận diện nguồn phát.
 * YouTube và file chỉ được gắn sau khi người dùng bấm Play, và bắt đầu ở trạng thái tắt tiếng.
 * HLS (.m3u8) chưa được phát ở giai đoạn này.
 */
export function classifyStream(url: string | undefined): PlayableStream | null {
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null
  const videoId = youtubeId(parsed)
  if (videoId) {
    return { kind: "youtube", src: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0` }
  }
  const path = `${parsed.pathname}${parsed.search}`
  if (/\.m3u8($|\?)/i.test(path)) return { kind: "hls", src: url }
  if (/\.(mp4|webm)($|\?)/i.test(path)) return { kind: "file", src: url }
  return null
}

export function youtubeCommand(frame: HTMLIFrameElement | null, func: "playVideo" | "pauseVideo" | "mute" | "unMute") {
  frame?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "https://www.youtube-nocookie.com",
  )
}

export function padScore(value: number) {
  return String(value).padStart(2, "0")
}
