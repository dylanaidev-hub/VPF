export type NavItem = {
  id: string
  label: string
  href: string
  children?: NavItem[]
}

export type HeroTitlePart = {
  text: string
  accent?: boolean
}

export type HeroSlide = {
  id: string
  eyebrow: string
  /** Each inner array is one headline line; accent parts use VPF orange. */
  titleLines: HeroTitlePart[][]
  /** Plain-text title for aria / live region. */
  title: string
  description: string
  image: string
  imageWebp?: string
  imageMobileWebp?: string
  imageAlt: string
  objectPosition: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export type Statistic = {
  id: string
  label: string
  value: number | null
  suffix?: string
  note: string
}

export type NewsContentBlock =
  | string
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "image"; src: string; alt: string; caption?: string }

export type NewsArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: NewsContentBlock[]
  category: string
  thumbnail: string
  coverImage?: string
  imageAlt: string
  imagePosition?: string
  author?: string
  source?: string
  relatedIds?: string[]
  status?: "published" | "draft" | "scheduled" | "private"
  /** Ngày đăng ISO. Cùng giá trị với `date`. */
  publishedAt: string
  date: string
  isFeatured: boolean
  featured: boolean
  isTrending?: boolean
  /** Thứ tự minh họa. Không phải số lượt xem. */
  trendingRank?: number
  /** Bài demo, không phải thông cáo chính thức. */
  illustrative: boolean
}

export type TournamentStatus = "upcoming" | "ongoing" | "finished"

/** Phạm vi giải — WordPress: taxonomy hoặc ACF select. */
export type TournamentScope = "domestic" | "international"

/** Nội dung thi đấu. Khi chuyển WordPress: nhóm field của CPT `tournament`. */
export type TournamentCategory = {
  id: string
  name: string
  level?: string
  ageGroup?: string
  format?: string
  entrants?: number
  rounds?: number
  status?: string
  prize?: string
}

export type TournamentScheduleStatus = "scheduled" | "ongoing" | "finished"

/** Lịch trận. Khi chuyển WordPress: dữ liệu có cấu trúc, không phải bài viết. */
export type TournamentScheduleItem = {
  id: string
  date: string
  time: string
  court: string
  event: string
  /** Giữ chuỗi gộp cho tương thích; ưu tiên sideA/sideB khi có. */
  participants: string
  sideA?: string
  sideB?: string
  round?: string
  categoryId?: string
  score?: string
  sets?: string[]
  status: TournamentScheduleStatus
}

/** Kết quả minh họa. Không phải kết quả chính thức. */
export type TournamentResult = {
  id: string
  sideA: string
  sideB: string
  score: string
  winner: string
  round: string
  categoryId?: string
  matchId?: string
  sets?: string[]
  stage?: "group" | "knockout" | "final"
}

export type TournamentDocument = {
  id: string
  title: string
  /** Chỉ có khi file thật đã được đăng. */
  href?: string
}

export type TournamentStats = {
  athletes: number
  teams: number
  matches: number
  events: number
}

export type TournamentOverview = {
  intro: string[]
  goals?: string
  audience?: string
  venueNote?: string
  dayPlan?: { date: string; title: string; items: string[] }[]
  prizes?: { place: string; detail: string }[]
  highlights?: string[]
}

export type TournamentRuleSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type TournamentStandingRow = {
  rank: number
  name: string
  played: number
  won: number
  lost: number
  points: number
}

export type TournamentStanding = {
  categoryId: string
  group: string
  rows: TournamentStandingRow[]
}

export type TournamentWinner = {
  categoryId: string
  categoryName: string
  champion: string
  runnerUp: string
  third?: string[]
}

export type TournamentGalleryItem = {
  id: string
  type: "image" | "video"
  src: string
  alt: string
  poster?: string
}

export type TournamentContact = {
  name?: string
  email?: string
  phone?: string
}

/**
 * Giải đấu dùng chung cho Homepage và trang Giải đấu.
 * `status` không lưu trong dữ liệu — tính từ startDate và endDate.
 * Các field `summary`, `thumbnail`, `time`, `detailUrl` giữ cho Homepage.
 * Field tùy chọn phía dưới phục vụ trang chi tiết (map WordPress ACF sau này).
 */
export type Tournament = {
  id: string
  slug: string
  name: string
  description: string
  objective: string
  coverImage: string
  coverImageAlt: string
  startDate: string
  endDate: string
  /** Tỉnh/thành (trong nước) hoặc thành phố (quốc tế). */
  location: string
  venue: string
  organizer: string
  /** Trong nước / quốc tế — quản lý qua WordPress Admin. */
  scope: TournamentScope
  /** Quốc gia khi scope = international. */
  country?: string
  categories: TournamentCategory[]
  schedule: TournamentScheduleItem[]
  results: TournamentResult[]
  regulations: {
    summary: string
    documents: TournamentDocument[]
  }
  /** Nhà vô địch minh họa khi giải đã kết thúc và có dữ liệu. */
  champion?: string
  livestreamUrl?: string
  isFeatured: boolean
  illustrative: boolean
  time: string
  summary: string
  note: string
  thumbnail: string
  thumbnailAlt: string
  detailUrl: string
  logo?: string
  coOrganizer?: string
  scale?: string
  audience?: string
  registrationDeadline?: string
  contact?: TournamentContact
  stats?: TournamentStats
  overview?: TournamentOverview
  ruleSections?: TournamentRuleSection[]
  standings?: TournamentStanding[]
  winners?: TournamentWinner[]
  gallery?: TournamentGalleryItem[]
}

export type TournamentView = Tournament & {
  status: TournamentStatus
}

export type Partner = {
  id: string
  name: string
  logoSrc?: string
  href?: string
  illustrative?: boolean
}
