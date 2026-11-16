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
    name: "Nike",
    logoSrc: "/images/partners/nike.png",
    tier: "main",
    sector: "Thể thao",
    intro:
      "Thương hiệu minh họa đồng hành cùng các hoạt động thi đấu Pickleball ở mức nhà tài trợ chính trên giao diện cổng thông tin.",
    about:
      "Nike là hồ sơ minh họa trên cổng thông tin. Nội dung chỉ dùng để duyệt trang giới thiệu nhà tài trợ, không phải đối tác chính thức.",
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
    name: "Adidas",
    logoSrc: "/images/partners/adidas.png",
    tier: "gold",
    sector: "Thể thao",
    intro: "Nhà tài trợ vàng minh họa cho danh mục logo cấp trung.",
    about: "Hồ sơ minh họa Adidas trên cổng Hợp tác.",
    tournamentSlugs: ["mo-rong-ha-noi-2026", "dong-doi-mien-nam-2026"],
    newsSlugs: ["khong-khi-soi-dong-tai-cac-giai-pickleball-phong-trao"],
    illustrative: true,
  },
  {
    id: "paddle-one",
    slug: "paddle-one",
    name: "Puma",
    logoSrc: "/images/partners/puma.png",
    tier: "gold",
    sector: "Thể thao",
    intro: "Nhà tài trợ vàng minh họa.",
    tournamentSlugs: ["cong-dong-tphcm-2026"],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "match-point",
    slug: "match-point",
    name: "Coca-Cola",
    logoSrc: "/images/partners/coca-cola.png",
    tier: "silver",
    sector: "Đồ uống",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: ["giao-luu-da-nang-2026"],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "play-arena",
    slug: "play-arena",
    name: "Samsung",
    logoSrc: "/images/partners/samsung.png",
    tier: "silver",
    sector: "Điện tử",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "rally-club",
    slug: "rally-club",
    name: "Visa",
    logoSrc: "/images/partners/visa.png",
    tier: "silver",
    sector: "Thanh toán",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "next-serve",
    slug: "next-serve",
    name: "Red Bull",
    logoSrc: "/images/partners/redbull.png",
    tier: "silver",
    sector: "Đồ uống",
    intro: "Nhà tài trợ bạc minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "sport-hub",
    slug: "sport-hub",
    name: "YouTube",
    logoSrc: "/images/partners/youtube.png",
    tier: "media",
    sector: "Nền tảng video",
    intro: "Đối tác truyền thông minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "victory-court",
    slug: "victory-court",
    name: "TikTok",
    logoSrc: "/images/partners/tiktok.png",
    tier: "media",
    sector: "Mạng xã hội",
    intro: "Đối tác chuyên môn minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "prime-athletics",
    slug: "prime-athletics",
    name: "Netflix",
    logoSrc: "/images/partners/netflix.png",
    tier: "media",
    sector: "Giải trí",
    intro: "Đối tác chuyên môn minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "baseline",
    slug: "baseline",
    name: "Spotify",
    logoSrc: "/images/partners/spotify.png",
    tier: "media",
    sector: "Âm nhạc",
    intro: "Đối tác truyền thông minh họa.",
    tournamentSlugs: [],
    newsSlugs: [],
    illustrative: true,
  },
  {
    id: "netline",
    slug: "netline",
    name: "Google",
    logoSrc: "/images/partners/google.png",
    tier: "media",
    sector: "Công nghệ",
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
  image: string
  imageAlt: string
}

export const partnershipOffers: PartnershipOffer[] = [
  {
    id: "nha-tai-tro-chinh",
    title: "Nhà tài trợ chính",
    description: "Đồng hành chiến lược với phạm vi nhận diện rộng trên các hoạt động trọng điểm.",
    benefits: ["Hồ sơ nhà tài trợ trên cổng thông tin", "Hiện diện trên trang chủ (minh họa)", "Ưu tiên gắn kết giải trọng điểm"],
    image: "/images/partnership/other.jpg",
    imageAlt: "Vợt, bóng pickleball và sổ tay trên bàn.",
  },
  {
    id: "doi-tac-dong-hanh",
    title: "Đối tác đồng hành",
    description: "Phối hợp theo chương trình hoặc chuỗi hoạt động trong một giai đoạn.",
    benefits: ["Logo hạng mục đồng hành", "Chia sẻ nội dung hợp tác", "Tham gia hoạt động cộng đồng"],
    image: "/images/partnership/community.jpg",
    imageAlt: "Sân pickleball cộng đồng vào cuối ngày.",
  },
  {
    id: "tai-tro-giai",
    title: "Tài trợ giải",
    description: "Gắn thương hiệu với một giải hoặc một chuỗi sự kiện cụ thể.",
    benefits: ["Backdrop / bảng tên giải (minh họa)", "Hiện diện livestream (minh họa)", "Tin bài sự kiện liên quan"],
    image: "/images/partnership/event.jpg",
    imageAlt: "Sân pickleball trong một giải đấu trong nhà.",
  },
  {
    id: "doi-tac-truyen-thong",
    title: "Đối tác truyền thông",
    description: "Cùng sản xuất hoặc phân phối nội dung về Pickleball Việt Nam.",
    benefits: ["Chia sẻ kênh truyền thông", "Bài PR / nội dung chuyên đề", "Hỗ trợ phủ sóng sự kiện"],
    image: "/images/partnership/media.jpg",
    imageAlt: "Máy quay và vợt pickleball trên bàn sản xuất.",
  },
]

export const partnershipHero = {
  eyebrow: "Hợp tác cùng VPF",
  title: "Cùng phát triển phong trào Pickleball Việt Nam",
  description:
    "VPF đồng hành cùng các đối tác, tổ chức và doanh nghiệp để phát triển hệ sinh thái Pickleball chuyên nghiệp và bền vững.",
  primaryLabel: "Đề xuất hợp tác",
  primaryHref: "#lien-he-hop-tac",
  secondaryLabel: "Tìm hiểu thêm",
  secondaryHref: "#gia-tri-hop-tac",
  image: "/images/partnership/hero.jpg",
  imageAlt: "Vợt và bóng pickleball dưới ánh sáng đỏ.",
} as const

export const valuesSection = {
  id: "gia-tri-hop-tac",
  title: "Giá trị hợp tác",
} as const

export const partnershipValues = [
  {
    id: "dai-han",
    title: "Đồng hành dài hạn",
    detail: "Hợp tác theo chương trình, đủ thời gian để cùng xây phong trào.",
  },
  {
    id: "thuong-hieu",
    title: "Gia tăng giá trị thương hiệu",
    detail: "Hiện diện cạnh các hoạt động thi đấu và cộng đồng Pickleball.",
  },
  {
    id: "he-sinh-thai",
    title: "Kết nối hệ sinh thái",
    detail: "Nối doanh nghiệp với câu lạc bộ, giải đấu và người chơi.",
  },
  {
    id: "tac-dong",
    title: "Tác động tích cực",
    detail: "Góp vào sân chơi, nội dung và cơ hội cho người mới tham gia.",
  },
] as const

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
  title: "Các hình thức hợp tác",
  description: "Các hướng hợp tác đang được dựng trên cổng này, kèm quyền lợi minh họa.",
  note: ILLUSTRATIVE_LABEL,
  comparisonTitle: "So sánh quyền lợi",
  comparisonDescription: "Khám phá các quyền lợi dành cho từng hạng mục hợp tác cùng VPF.",
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
  title: "Cùng VPF kiến tạo giá trị",
  description: "Gửi thông tin để VPF liên hệ về cơ hội hợp tác.",
  note: "Chức năng gửi đang chờ tích hợp. Dữ liệu không được gửi đi và không được lưu trên trình duyệt.",
  ctaLabel: "Gửi đề xuất hợp tác",
  consentLabel: "Tôi đồng ý để VPF liên hệ và xử lý thông tin theo chính sách bảo mật.",
} as const

export function getSponsorBySlug(slug: string | null | undefined) {
  if (!slug) return null
  return sponsors.find((item) => item.slug === slug) ?? null
}
