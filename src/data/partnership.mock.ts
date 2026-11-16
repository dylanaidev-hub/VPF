/**
 * Dữ liệu minh họa cho cổng Hợp tác / Partnership Portal.
 * Không phải cam kết, nhà tài trợ hay quyền lợi chính thức của VPF.
 */

export const ILLUSTRATIVE_LABEL = "Dữ liệu minh họa — không phải thông tin chính thức của Liên đoàn."

export const partnershipPage = {
  eyebrow: "Hợp tác",
  title: "Hợp tác",
  description:
    "Cùng VPF phát triển phong trào Pickleball Việt Nam thông qua những cơ hội hợp tác và đồng hành bền vững.",
  disclaimer:
    "Nội dung trên trang đang dùng dữ liệu minh họa để duyệt giao diện — chưa phải hồ sơ hợp tác chính thức.",
} as const

export type PartnershipMetric = {
  id: string
  value: number
  suffix?: string
  label: string
}

export const partnershipMetrics: PartnershipMetric[] = [
  { id: "vdv-clb", value: 1200, suffix: "+", label: "VĐV & CLB" },
  { id: "giai-dau", value: 24, label: "Giải đấu mỗi năm" },
  { id: "livestream", value: 85, suffix: "K+", label: "Lượt xem livestream" },
  { id: "tinh-thanh", value: 32, label: "Tỉnh/thành tham gia" },
]

export const impactSection = {
  id: "dong-hanh",
  title: "Đồng hành cùng VPF",
  description: "Quy mô phong trào Pickleball Việt Nam và tiềm năng đồng hành cùng VPF.",
  note: ILLUSTRATIVE_LABEL,
  ctaLabel: "Trở thành đối tác",
  ctaHref: "#lien-he-hop-tac",
} as const

export type SponsorTier = "main" | "gold" | "silver" | "media"

export type SponsorProfile = {
  id: string
  slug: string
  name: string
  logoSrc: string
  tier: SponsorTier
  sector: string
  intro: string
  about?: string
  statement?: string
  quote?: string
  website?: string
  tournamentSlugs: string[]
  newsSlugs: string[]
  illustrative: true
}

export const sponsorTierLabel: Record<SponsorTier, string> = {
  main: "Nhà tài trợ chính",
  gold: "Nhà tài trợ Vàng",
  silver: "Nhà tài trợ Bạc",
  media: "Đối tác truyền thông – chuyên môn",
}

export const sponsors: SponsorProfile[] = [
  {
    id: "court-pro",
    slug: "court-pro",
    name: "Court Pro",
    logoSrc: "/partners/court-pro.svg",
    tier: "main",
    sector: "Thiết bị & sân thể thao",
    intro:
      "Thương hiệu minh họa đồng hành cùng các hoạt động thi đấu Pickleball ở mức nhà tài trợ chính trên giao diện cổng thông tin.",
    about:
      "Court Pro là hồ sơ minh họa cho doanh nghiệp quan tâm trang thiết bị và mặt sân. Nội dung chỉ dùng để duyệt trang giới thiệu nhà tài trợ.",
    statement:
      "Chúng tôi muốn đồng hành cùng phong trào Pickleball Việt Nam qua các giải đấu và hoạt động cộng đồng — nội dung minh họa.",
    quote: "Pickleball cần sân chơi chất lượng và hệ sinh thái bền vững. — Trích dẫn minh họa",
    website: undefined,
    tournamentSlugs: ["mo-rong-ha-noi-2026", "cong-dong-tphcm-2026", "giao-luu-da-nang-2026"],
    newsSlugs: [
      "khong-khi-soi-dong-tai-cac-giai-pickleball-phong-trao",
      "cac-cau-lac-bo-gop-phan-lan-toa-phong-trao-pickleball",
      "pickleball-viet-nam-huong-den-giai-doan-phat-trien-chuyen-nghiep",
    ],
    illustrative: true,
  },
  {
    id: "ace-sports",
    slug: "ace-sports",
    name: "Ace Sports",
    logoSrc: "/partners/ace-sports.svg",
    tier: "gold",
    sector: "Thể thao & phụ kiện",
    intro: "Nhà tài trợ vàng minh họa cho danh mục logo cấp trung.",
    about: "Hồ sơ minh họa Ace Sports trên cổng Hợp tác.",
    tournamentSlugs: ["mo-rong-ha-noi-2026", "dong-doi-mien-nam-2026"],
    newsSlugs: ["khong-khi-soi-dong-tai-cac-giai-pickleball-phong-trao"],
    illustrative: true,
  },
  {
    id: "paddle-one",
    slug: "paddle-one",
    name: "Paddle One",
    logoSrc: "/partners/paddle-one.svg",
    tier: "gold",
    sector: "Vợt & dụng cụ",
    intro: "Nhà tài trợ vàng minh họa.",
    tournamentSlugs: ["cong-dong-tphcm-2026"],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "match-point",
    slug: "match-point",
    name: "Match Point",
    logoSrc: "/partners/match-point.svg",
    tier: "silver",
    sector: "Sự kiện thể thao",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: ["giao-luu-da-nang-2026"],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "play-arena",
    slug: "play-arena",
    name: "Play Arena",
    logoSrc: "/partners/play-arena.svg",
    tier: "silver",
    sector: "Cụm sân & giải trí",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "rally-club",
    slug: "rally-club",
    name: "Rally Club",
    logoSrc: "/partners/rally-club.svg",
    tier: "silver",
    sector: "Câu lạc bộ",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "next-serve",
    slug: "next-serve",
    name: "Next Serve",
    logoSrc: "/partners/next-serve.svg",
    tier: "silver",
    sector: "Công nghệ thể thao",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "sport-hub",
    slug: "sport-hub",
    name: "Sport Hub",
    logoSrc: "/partners/sport-hub.svg",
    tier: "media",
    sector: "Truyền thông thể thao",
    intro: "Đối tác truyền thông minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "victory-court",
    slug: "victory-court",
    name: "Victory Court",
    logoSrc: "/partners/victory-court.svg",
    tier: "media",
    sector: "Nội dung chuyên môn",
    intro: "Đối tác chuyên môn minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "prime-athletics",
    slug: "prime-athletics",
    name: "Prime Athletics",
    logoSrc: "/partners/prime-athletics.svg",
    tier: "media",
    sector: "Huấn luyện & thể lực",
    intro: "Đối tác chuyên môn minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "baseline",
    slug: "baseline",
    name: "Baseline",
    logoSrc: "/partners/baseline.svg",
    tier: "media",
    sector: "Truyền thông số",
    intro: "Đối tác truyền thông minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "netline",
    slug: "netline",
    name: "Netline",
    logoSrc: "/partners/netline.svg",
    tier: "media",
    sector: "Hạ tầng sân",
    intro: "Đối tác chuyên môn minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
]

export const mainSponsor = sponsors.find((item) => item.tier === "main")!
export const goldSilverSponsors = sponsors.filter((item) => item.tier === "gold" || item.tier === "silver")
export const mediaSponsors = sponsors.filter((item) => item.tier === "media")

export const sponsorsSection = {
  id: "nha-tai-tro",
  title: "Nhà tài trợ & Đối tác",
  description: "Các nhà tài trợ và đối tác đồng hành theo từng hạng mục hợp tác.",
  note: ILLUSTRATIVE_LABEL,
} as const

export type PartnershipOffer = {
  id: string
  title: string
  description: string
  benefits: string[]
}

export const partnershipOffers: PartnershipOffer[] = [
  {
    id: "nha-tai-tro-chinh",
    title: "Nhà tài trợ chính",
    description: "Đồng hành chiến lược với phạm vi nhận diện rộng trên các hoạt động trọng điểm.",
    benefits: ["Hồ sơ nhà tài trợ trên cổng thông tin", "Hiện diện trên trang chủ (minh họa)", "Ưu tiên gắn kết giải trọng điểm"],
  },
  {
    id: "doi-tac-dong-hanh",
    title: "Đối tác đồng hành",
    description: "Phối hợp theo chương trình hoặc chuỗi hoạt động trong một giai đoạn.",
    benefits: ["Logo hạng mục đồng hành", "Chia sẻ nội dung hợp tác", "Tham gia hoạt động cộng đồng"],
  },
  {
    id: "tai-tro-giai",
    title: "Tài trợ giải",
    description: "Gắn thương hiệu với một giải hoặc một chuỗi sự kiện cụ thể.",
    benefits: ["Backdrop / bảng tên giải (minh họa)", "Hiện diện livestream (minh họa)", "Tin bài sự kiện liên quan"],
  },
  {
    id: "doi-tac-truyen-thong",
    title: "Đối tác truyền thông",
    description: "Cùng sản xuất hoặc phân phối nội dung về Pickleball Việt Nam.",
    benefits: ["Chia sẻ kênh truyền thông", "Bài PR / nội dung chuyên đề", "Hỗ trợ phủ sóng sự kiện"],
  },
]

export const benefitRows = [
  { id: "logo-home", label: "Logo trên trang chủ VPF", main: true, companion: true, event: false, media: false },
  { id: "profile", label: "Trang giới thiệu nhà tài trợ", main: true, companion: true, event: true, media: false },
  { id: "backdrop", label: "Backdrop giải đấu", main: true, companion: false, event: true, media: false },
  { id: "livestream", label: "Nhận diện livestream", main: true, companion: false, event: true, media: true },
  { id: "pr", label: "Bài PR / tin liên quan", main: true, companion: true, event: true, media: true },
  { id: "booth", label: "Gian hàng sự kiện", main: true, companion: false, event: true, media: false },
] as const

export const offersSection = {
  id: "hinh-thuc",
  title: "Hình thức hợp tác & Quyền lợi",
  description: "Các hướng hợp tác và quyền lợi dành cho đối tác đồng hành cùng VPF.",
  note: ILLUSTRATIVE_LABEL,
  comparisonTitle: "So sánh quyền lợi",
  downloadLabel: "Tải hồ sơ tài trợ (PDF)",
  /** Chỉ gán khi có PDF thật. */
  downloadHref: undefined as string | undefined,
  downloadNote:
    "Chưa có hồ sơ tài trợ PDF chính thức. Nút đang ở chế độ minh họa để kiểm tra giao diện.",
} as const

export const partnershipTypeOptions = [
  "Nhà tài trợ chính",
  "Đối tác đồng hành",
  "Tài trợ giải",
  "Đối tác truyền thông",
  "Hình thức khác",
] as const

export const contactSection = {
  id: "lien-he-hop-tac",
  title: "Liên hệ hợp tác",
  description: "Gửi thông tin để VPF liên hệ về cơ hội hợp tác.",
  note: "Chức năng gửi đang chờ tích hợp. Dữ liệu không được gửi đi và không được lưu trên trình duyệt.",
  ctaLabel: "Gửi thông tin",
  consentLabel: "Tôi đồng ý để VPF liên hệ và xử lý thông tin theo chính sách bảo mật.",
} as const

export function getSponsorBySlug(slug: string | null | undefined) {
  if (!slug) return null
  return sponsors.find((item) => item.slug === slug) ?? null
}
