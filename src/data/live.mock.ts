/**
 * Dữ liệu minh họa cho VPF LIVE ARENA.
 * Không phải lịch phát sóng hay kết quả chính thức của Liên đoàn Pickleball Việt Nam.
 *
 * Khi chuyển WordPress: Custom Post Type `vpf_broadcast`.
 * Admin tạo sự kiện, gán trận vào sân, nhập stream_url (HLS .m3u8 hoặc file),
 * cập nhật trạng thái, bảng điểm và lịch phát sóng.
 * Player chỉ gắn nguồn khi `streamUrl` hợp lệ. Chưa có backend streaming.
 */

export type BroadcastStatus = "live" | "upcoming" | "finished"

export type BroadcastTournament = {
  id: string
  name: string
  illustrative: true
}

export type BroadcastTeam = {
  id: string
  name: string
  illustrative: true
}

export type BroadcastMatch = {
  id: string
  tournamentId: string
  homeTeamId: string
  awayTeamId: string
  /** Điểm game hiện tại. Số liệu minh họa. */
  homeScore: number
  awayScore: number
  /** Set đang diễn ra hoặc set đã kết thúc. Minh họa. */
  set: number
  date: string
  time: string
  /** Số sân, hai chữ số. */
  court: string
  stage: string
  name: string
  status: BroadcastStatus
  thumbnail: string
  thumbnailAlt: string
  /** HLS (.m3u8) hoặc file mp4/webm. Để trống khi chưa có luồng. */
  streamUrl?: string
  illustrative: true
}

export type LiveArena = {
  illustrative: true
  tournaments: BroadcastTournament[]
  teams: BroadcastTeam[]
  matches: BroadcastMatch[]
}

export const broadcastsIllustrative = true

const courtImage = "/images/match.jpg"
const courtAlt =
  "Sân pickleball trong nhà. Ảnh minh họa cho khung hình phát sóng, không phải hình trực tiếp của trận này."

export const broadcastTournaments: BroadcastTournament[] = [
  { id: "ha-noi-2026", name: "Giải Pickleball Mở rộng Hà Nội 2026", illustrative: true },
  { id: "quoc-te-2026", name: "Giải Pickleball Quốc tế 2026", illustrative: true },
  { id: "cong-dong-2026", name: "Giải Pickleball Cộng đồng 2026", illustrative: true },
]

export const broadcastTeams: BroadcastTeam[] = [
  { id: "team-a", name: "Team A", illustrative: true },
  { id: "team-b", name: "Team B", illustrative: true },
  { id: "team-c", name: "Team C", illustrative: true },
  { id: "team-d", name: "Team D", illustrative: true },
  { id: "team-e", name: "Team E", illustrative: true },
  { id: "team-f", name: "Team F", illustrative: true },
  { id: "team-g", name: "Team G", illustrative: true },
  { id: "team-h", name: "Team H", illustrative: true },
]

export const broadcastMatches: BroadcastMatch[] = [
  {
    id: "court-04-finished",
    tournamentId: "cong-dong-2026",
    homeTeamId: "team-g",
    awayTeamId: "team-h",
    homeScore: 11,
    awayScore: 6,
    set: 3,
    date: "2026-11-15",
    time: "16:00",
    court: "04",
    stage: "ROUND OF 16",
    name: "Team G vs Team H",
    status: "finished",
    thumbnail: courtImage,
    thumbnailAlt: courtAlt,
    illustrative: true,
  },
  {
    id: "court-01-final",
    tournamentId: "ha-noi-2026",
    homeTeamId: "team-a",
    awayTeamId: "team-b",
    homeScore: 8,
    awayScore: 6,
    set: 2,
    date: "2026-11-15",
    time: "19:00",
    court: "01",
    stage: "FINAL",
    name: "Team A vs Team B",
    status: "live",
    thumbnail: courtImage,
    thumbnailAlt: courtAlt,
    /** Video demo trên YouTube, không phải tín hiệu chính thức của VPF. */
    streamUrl: "https://www.youtube.com/watch?v=68geZh5crzw",
    illustrative: true,
  },
  {
    id: "court-02-semi",
    tournamentId: "quoc-te-2026",
    homeTeamId: "team-c",
    awayTeamId: "team-d",
    homeScore: 0,
    awayScore: 0,
    set: 1,
    date: "2026-11-15",
    time: "20:30",
    court: "02",
    stage: "SEMIFINAL",
    name: "Team C vs Team D",
    status: "upcoming",
    thumbnail: courtImage,
    thumbnailAlt: courtAlt,
    illustrative: true,
  },
  {
    id: "court-03-quarter",
    tournamentId: "ha-noi-2026",
    homeTeamId: "team-e",
    awayTeamId: "team-f",
    homeScore: 0,
    awayScore: 0,
    set: 1,
    date: "2026-11-15",
    time: "21:00",
    court: "03",
    stage: "QUARTERFINAL",
    name: "Team E vs Team F",
    status: "upcoming",
    thumbnail: courtImage,
    thumbnailAlt: courtAlt,
    illustrative: true,
  },
]

export const liveArena: LiveArena = {
  illustrative: true,
  tournaments: broadcastTournaments,
  teams: broadcastTeams,
  matches: broadcastMatches,
}
