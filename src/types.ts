export type NavItem = {
  id: string
  label: string
  href: string
  children?: NavItem[]
}

export type HeroSlide = {
  id: string
  category: string
  title: string
  description: string
  image: string
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

export type NewsArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  /** Nội dung bài. Cùng mảng với `body` để trang chủ không đổi cách đọc. */
  content: string[]
  body: string[]
  category: string
  image: string
  imageAlt: string
  imagePosition?: string
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

/** Nội dung thi đấu. Khi chuyển WordPress: nhóm field của CPT `tournament`. */
export type TournamentCategory = {
  id: string
  name: string
  level?: string
  ageGroup?: string
  format?: string
}

export type TournamentScheduleStatus = "scheduled" | "ongoing" | "finished"

/** Lịch trận. Khi chuyển WordPress: dữ liệu có cấu trúc, không phải bài viết. */
export type TournamentScheduleItem = {
  id: string
  date: string
  time: string
  court: string
  event: string
  participants: string
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
}

export type TournamentDocument = {
  id: string
  title: string
  /** Chỉ có khi file thật đã được đăng. */
  href?: string
}

/**
 * Giải đấu dùng chung cho Homepage và trang Giải đấu.
 * `status` không lưu trong dữ liệu — tính từ startDate và endDate.
 * Các field `summary`, `thumbnail`, `time`, `detailUrl` giữ cho Homepage.
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
  location: string
  venue: string
  organizer: string
  categories: TournamentCategory[]
  schedule: TournamentScheduleItem[]
  results: TournamentResult[]
  regulations: {
    summary: string
    documents: TournamentDocument[]
  }
  isFeatured: boolean
  illustrative: boolean
  time: string
  summary: string
  note: string
  thumbnail: string
  thumbnailAlt: string
  detailUrl: string
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
