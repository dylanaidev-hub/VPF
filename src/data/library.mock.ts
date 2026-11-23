/**
 * Dữ liệu minh họa cho trang Thư viện & Cộng đồng.
 * Không phải tài nguyên, danh mục hay chương trình chính thức của Liên đoàn.
 */

import type { MediaShot } from "./media.mock"
import { players, type CatalogPlayer, type PlayerBatch } from "./players.mock"

export const ILLUSTRATIVE_LABEL = "Dữ liệu minh họa — không phải thông tin chính thức của Liên đoàn."

export const libraryPage = {
  eyebrow: "Thư viện & Cộng đồng",
  title: "Thư viện & Cộng đồng",
  description:
    "Khám phá tài nguyên nhận diện, hình ảnh, video và mạng lưới đơn vị thành viên Pickleball Việt Nam.",
  disclaimer:
    "Nội dung trên trang đang dùng dữ liệu minh họa để duyệt giao diện — chưa phải thư viện hay danh mục chính thức.",
} as const

const outdoor = "/images/outdoor.jpg"
const match = "/images/match.jpg"
const player = "/images/player.jpg"
const logoMark = "/brand/logo-mark-color.svg"
const logoColor = "/brand/logo-horizontal-color.svg"
const logoWhite = "/brand/logo-horizontal-white.svg"

export const brandColors = [
  { id: "primary", name: "Primary", hex: "#AE3033", note: "Màu nền chính, đo từ ấn phẩm nhận diện." },
  { id: "logo", name: "Đỏ logo", hex: "#BE1E2D", note: "Màu đỏ trong file logo." },
  { id: "accent", name: "Accent", hex: "#E8943C", note: "Vàng nhấn trong hệ màu." },
  { id: "orange", name: "Cam logo", hex: "#F7941D", note: "Cam trong file logo." },
] as const

export const brandLogoVersions = [
  { id: "horizontal", label: "Logo ngang", src: logoColor, surface: "light" },
  { id: "white", label: "Nền đỏ", src: logoWhite, surface: "field" },
  { id: "mark", label: "Biểu tượng", src: logoMark, surface: "light" },
] as const

export const brandTypeWeights = [
  { id: "regular", label: "Regular", weight: 400 },
  { id: "medium", label: "Medium", weight: 500 },
  { id: "semibold", label: "Semibold", weight: 600 },
  { id: "bold", label: "Bold", weight: 700 },
] as const

export const brandScenes = [
  { id: "card", label: "Danh thiếp", src: "/images/brand/brand-card-scene.jpg", alt: "Danh thiếp trống trên mặt đá. Ảnh minh họa bề mặt in." },
  { id: "letter", label: "Giấy tiêu đề", src: "/images/brand/brand-letterhead-scene.jpg", alt: "Tờ giấy trắng và bút trên bàn gỗ. Ảnh minh họa văn phòng phẩm." },
  { id: "event", label: "Sự kiện", src: "/images/brand/brand-event-scene.jpg", alt: "Phông đỏ với tấm bảng trắng. Ảnh minh họa nhận diện sự kiện." },
] as const

export const brandSection = {
  id: "bo-nhan-dien",
  title: "Bộ nhận diện VPF",
  description:
    "Khám phá hệ thống nhận diện thương hiệu và các quy chuẩn ứng dụng của Liên đoàn Pickleball Việt Nam.",
  logoPreview: logoColor,
  logoWhite,
  logoMark,
  logoAlt: "Logo Liên đoàn Pickleball Việt Nam.",
  note: ILLUSTRATIVE_LABEL,
  resources: [
    { id: "logo", index: "01", label: "Logo", detail: "Logo ngang màu, logo trắng trên nền đỏ và biểu tượng." },
    { id: "color", index: "02", label: "Bảng màu", detail: "Primary, accent và màu trong file logo, kèm mã HEX." },
    { id: "type", index: "03", label: "Typography", detail: "Be Vietnam Pro và các độ đậm đang dùng trên website." },
    {
      id: "usage",
      index: "04",
      label: "Hướng dẫn sử dụng",
      detail: "Khung minh họa. Chưa có quy chuẩn khoảng cách và kích thước tối thiểu được công bố.",
    },
  ],
  viewLibraryLabel: "Xem thư viện",
  downloadLabel: "Tải tài nguyên",
  /** Chỉ gán khi có Drive / tệp thật. Demo hiện tại không có. */
  downloadHref: undefined as string | undefined,
  downloadNote:
    "Chưa có kho tài nguyên nhận diện chính thức để tải. Nút đang ở chế độ minh họa để kiểm tra giao diện.",
  libraryNote:
    "Thư viện nhận diện đầy đủ sẽ thay thế khung này khi Liên đoàn công bố tài liệu.",
} as const

export type LibraryMediaTab = "Ảnh giải đấu" | "Ảnh CLB" | "Video"

export const libraryMediaTabs: LibraryMediaTab[] = ["Ảnh giải đấu", "Ảnh CLB", "Video"]

export type LibraryAlbum = {
  id: string
  title: string
  tab: LibraryMediaTab
  description: string
  cover: string
  coverAlt: string
  coverPosition?: string
  countLabel: string
  date?: string
  location?: string
  images: MediaShot[]
  videoUrl?: string
  illustrative: true
}

function shots(prefix: string, sources: Array<{ src: string; alt: string; caption: string; position?: string }>): MediaShot[] {
  return sources.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    position: item.position,
  }))
}

export const libraryAlbums: LibraryAlbum[] = [
  {
    id: "gd-hn-2026",
    title: "Giải Pickleball Mở rộng Hà Nội 2026",
    tab: "Ảnh giải đấu",
    description: "Album minh họa khung hình thi đấu tại Hà Nội.",
    cover: outdoor,
    coverAlt: "Sân pickleball ngoài trời. Ảnh minh họa album giải đấu.",
    coverPosition: "object-[center_40%]",
    countLabel: "6 ảnh",
    date: "03.2026",
    location: "Hà Nội",
    illustrative: true,
    images: shots("gd-hn", [
      { src: outdoor, alt: "Sân ngoài trời.", caption: "Khung sân. Minh họa.", position: "object-[center_40%]" },
      { src: player, alt: "Người chơi.", caption: "Trên sân. Minh họa.", position: "object-[center_20%]" },
      { src: match, alt: "Cụm sân trong nhà.", caption: "Trong nhà. Minh họa." },
      { src: outdoor, alt: "Góc sân.", caption: "Góc sân. Minh họa.", position: "object-[15%_center]" },
      { src: player, alt: "Cận vợt.", caption: "Cận vợt. Minh họa.", position: "object-[25%_45%]" },
      { src: match, alt: "Hàng sân.", caption: "Hàng sân. Minh họa.", position: "object-[center_30%]" },
    ]),
  },
  {
    id: "gd-cong-dong-2026",
    title: "Giải Pickleball Cộng đồng 2026",
    tab: "Ảnh giải đấu",
    description: "Album minh họa không khí giải cộng đồng.",
    cover: match,
    coverAlt: "Cụm sân pickleball trong nhà. Ảnh minh họa.",
    countLabel: "4 ảnh",
    date: "05.2026",
    location: "TP. Hồ Chí Minh",
    illustrative: true,
    images: shots("gd-cd", [
      { src: match, alt: "Cụm sân.", caption: "Cụm sân. Minh họa." },
      { src: outdoor, alt: "Ngoài trời.", caption: "Ngoài trời. Minh họa." },
      { src: player, alt: "Người chơi.", caption: "Người chơi. Minh họa." },
      { src: match, alt: "Góc thi đấu.", caption: "Góc thi đấu. Minh họa.", position: "object-[70%_center]" },
    ]),
  },
  {
    id: "gd-dao-tao",
    title: "Hoạt động đào tạo và tập huấn",
    tab: "Ảnh giải đấu",
    description: "Album minh họa buổi tập huấn chuyên môn.",
    cover: player,
    coverAlt: "Vận động viên cầm vợt. Ảnh minh họa tập huấn.",
    coverPosition: "object-[center_20%]",
    countLabel: "4 ảnh",
    date: "01.2026",
    location: "Đà Nẵng",
    illustrative: true,
    images: shots("gd-dt", [
      { src: player, alt: "Người chơi.", caption: "Tập huấn. Minh họa.", position: "object-[center_20%]" },
      { src: outdoor, alt: "Sân ngoài.", caption: "Sân ngoài. Minh họa." },
      { src: match, alt: "Trong nhà.", caption: "Trong nhà. Minh họa." },
      { src: player, alt: "Tư thế.", caption: "Tư thế. Minh họa.", position: "object-[60%_center]" },
    ]),
  },
  {
    id: "gd-mo-rong-dn",
    title: "Giải mở rộng miền Trung 2026",
    tab: "Ảnh giải đấu",
    description: "Album minh họa giải khu vực miền Trung.",
    cover: outdoor,
    coverAlt: "Sân ngoài trời. Ảnh minh họa giải miền Trung.",
    countLabel: "3 ảnh",
    date: "07.2026",
    location: "Đà Nẵng",
    illustrative: true,
    images: shots("gd-mt", [
      { src: outdoor, alt: "Sân ngoài.", caption: "Sân ngoài. Minh họa." },
      { src: match, alt: "Trong nhà.", caption: "Trong nhà. Minh họa." },
      { src: player, alt: "Người chơi.", caption: "Người chơi. Minh họa." },
    ]),
  },
  {
    id: "clb-hoat-dong",
    title: "Hoạt động Câu lạc bộ Pickleball",
    tab: "Ảnh CLB",
    description: "Album minh họa sinh hoạt câu lạc bộ địa phương.",
    cover: match,
    coverAlt: "Cụm sân trong nhà. Ảnh minh họa hoạt động CLB.",
    countLabel: "5 ảnh",
    date: "02.2026",
    location: "Hà Nội",
    illustrative: true,
    images: shots("clb-1", [
      { src: match, alt: "CLB trong nhà.", caption: "Buổi đánh. Minh họa." },
      { src: outdoor, alt: "CLB ngoài trời.", caption: "Ngoài trời. Minh họa." },
      {
        src: "/images/partnership/community.jpg",
        alt: "Sân ngoài trời lúc hoàng hôn",
        caption: "Sân ngoài trời lúc hoàng hôn. Ảnh minh họa.",
      },
      { src: match, alt: "Sân CLB.", caption: "Sân CLB. Minh họa." },
      { src: outdoor, alt: "Góc sân CLB.", caption: "Góc sân. Minh họa." },
    ]),
  },
  {
    id: "clb-giao-luu",
    title: "Giao lưu CLB miền Nam",
    tab: "Ảnh CLB",
    description: "Album minh họa buổi giao lưu giữa các câu lạc bộ.",
    cover: outdoor,
    coverAlt: "Sân ngoài trời. Ảnh minh họa giao lưu CLB.",
    countLabel: "4 ảnh",
    date: "04.2026",
    location: "TP. Hồ Chí Minh",
    illustrative: true,
    images: shots("clb-2", [
      { src: outdoor, alt: "Giao lưu.", caption: "Giao lưu. Minh họa." },
      { src: player, alt: "Người chơi CLB.", caption: "Người chơi. Minh họa." },
      {
        src: "/images/partnership/event.jpg",
        alt: "Vợt và bóng trên sân trong nhà",
        caption: "Vợt và bóng trên sân trong nhà. Ảnh minh họa.",
      },
      { src: outdoor, alt: "Toàn cảnh.", caption: "Toàn cảnh. Minh họa." },
    ]),
  },
  {
    id: "clb-nguoi-moi",
    title: "Buổi làm quen cho người mới",
    tab: "Ảnh CLB",
    description: "Album minh họa buổi hướng dẫn người mới tại CLB.",
    cover: player,
    coverAlt: "Người chơi cầm vợt. Ảnh minh họa buổi làm quen.",
    countLabel: "3 ảnh",
    date: "06.2026",
    location: "Cần Thơ",
    illustrative: true,
    images: shots("clb-3", [
      { src: player, alt: "Người mới.", caption: "Người mới. Minh họa." },
      { src: match, alt: "Tập cơ bản.", caption: "Tập cơ bản. Minh họa." },
      { src: outdoor, alt: "Sân tập.", caption: "Sân tập. Minh họa." },
    ]),
  },
  {
    id: "clb-cuoi-tuan",
    title: "Sinh hoạt cuối tuần",
    tab: "Ảnh CLB",
    description: "Album minh họa nhịp sinh hoạt cuối tuần của CLB.",
    cover: match,
    coverAlt: "Cụm sân. Ảnh minh họa sinh hoạt cuối tuần.",
    countLabel: "4 ảnh",
    date: "08.2026",
    location: "Hải Phòng",
    illustrative: true,
    images: shots("clb-4", [
      { src: match, alt: "Cuối tuần.", caption: "Cuối tuần. Minh họa." },
      { src: outdoor, alt: "Ngoài trời.", caption: "Ngoài trời. Minh họa." },
      {
        src: "/images/partnership/community.jpg",
        alt: "Sân ngoài trời lúc hoàng hôn",
        caption: "Sân ngoài trời lúc hoàng hôn. Ảnh minh họa.",
      },
      { src: match, alt: "Sân CLB.", caption: "Sân CLB. Minh họa." },
    ]),
  },
  {
    id: "vid-highlight",
    title: "Highlight giải minh họa",
    tab: "Video",
    description: "Thẻ video minh họa. Chưa có tệp phát.",
    cover: outdoor,
    coverAlt: "Ảnh bìa video highlight. Chưa có phim.",
    countLabel: "1 video",
    date: "03.2026",
    location: "Hà Nội",
    illustrative: true,
    images: shots("vid-1", [{ src: outdoor, alt: "Bìa video.", caption: "Video minh họa — chưa có tệp." }]),
  },
  {
    id: "vid-clb",
    title: "Nhịp sống câu lạc bộ",
    tab: "Video",
    description: "Thẻ video minh họa hoạt động CLB. Chưa có tệp phát.",
    cover: match,
    coverAlt: "Ảnh bìa video CLB. Chưa có phim.",
    countLabel: "1 video",
    date: "05.2026",
    location: "TP. Hồ Chí Minh",
    illustrative: true,
    images: shots("vid-2", [{ src: match, alt: "Bìa video CLB.", caption: "Video minh họa — chưa có tệp." }]),
  },
  {
    id: "vid-tap-huan",
    title: "Clip tập huấn kỹ thuật",
    tab: "Video",
    description: "Thẻ video minh họa tập huấn. Chưa có tệp phát.",
    cover: player,
    coverAlt: "Ảnh bìa video tập huấn. Chưa có phim.",
    coverPosition: "object-[center_25%]",
    countLabel: "1 video",
    date: "02.2026",
    location: "Đà Nẵng",
    illustrative: true,
    images: shots("vid-3", [{ src: player, alt: "Bìa video tập huấn.", caption: "Video minh họa — chưa có tệp." }]),
  },
  {
    id: "vid-cong-dong",
    title: "Cộng đồng trên sân",
    tab: "Video",
    description: "Thẻ video minh họa cộng đồng. Chưa có tệp phát.",
    cover: outdoor,
    coverAlt: "Ảnh bìa video cộng đồng. Chưa có phim.",
    countLabel: "1 video",
    date: "09.2026",
    location: "Cần Thơ",
    illustrative: true,
    images: shots("vid-4", [{ src: outdoor, alt: "Bìa video cộng đồng.", caption: "Video minh họa — chưa có tệp." }]),
  },
]

export type MemberOrg = {
  id: string
  name: string
  province: string
  description: string
  logo?: string
  logoAlt?: string
  illustrative: true
}

export const memberOrgs: MemberOrg[] = [
  { id: "m01", name: "Hanoi Pickleball Community", province: "Hà Nội", logo: "/images/clubs/club-01.png", description: "Nhóm minh họa kết nối người chơi tại Hà Nội.", illustrative: true },
  { id: "m02", name: "Saigon Pickleball Club", province: "TP. Hồ Chí Minh", logo: "/images/clubs/club-02.png", description: "Câu lạc bộ minh họa tại TP. Hồ Chí Minh.", illustrative: true },
  { id: "m03", name: "Da Nang Pickleball Club", province: "Đà Nẵng", logo: "/images/clubs/club-03.png", description: "Câu lạc bộ minh họa khu vực miền Trung.", illustrative: true },
  { id: "m04", name: "Can Tho Pickleball Club", province: "Cần Thơ", logo: "/images/clubs/club-04.png", description: "Câu lạc bộ minh họa Đồng bằng sông Cửu Long.", illustrative: true },
  { id: "m05", name: "Hai Phong Pickleball Club", province: "Hải Phòng", logo: "/images/clubs/club-05.png", description: "Câu lạc bộ minh họa tại Hải Phòng.", illustrative: true },
  { id: "m06", name: "Nha Trang Pickleball Community", province: "Khánh Hòa", logo: "/images/clubs/club-06.png", description: "Cộng đồng minh họa tại Nha Trang.", illustrative: true },
  { id: "m07", name: "Binh Duong Open Club", province: "Bình Dương", logo: "/images/clubs/club-07.png", description: "Câu lạc bộ minh họa tại Bình Dương.", illustrative: true },
  { id: "m08", name: "Hue Pickleball Group", province: "Huế", logo: "/images/clubs/club-05.png", description: "Nhóm minh họa tại Huế.", illustrative: true },
  { id: "m09", name: "Dong Nai Pickleball Club", province: "Đồng Nai", logo: "/images/clubs/club-06.png", description: "Câu lạc bộ minh họa tại Đồng Nai.", illustrative: true },
  { id: "m10", name: "Vung Tau Community", province: "Bà Rịa - Vũng Tàu", logo: "/images/clubs/club-07.png", description: "Cộng đồng minh họa tại Vũng Tàu.", illustrative: true },
]

export const MEMBER_PREVIEW_COUNT = 6

export const memberSection = {
  id: "don-vi-thanh-vien",
  title: "Đơn vị thành viên",
  description: "Khám phá các câu lạc bộ và đơn vị đang tham gia mạng lưới Pickleball Việt Nam.",
  note: ILLUSTRATIVE_LABEL,
  viewAllLabel: "Xem tất cả đơn vị",
  collapseLabel: "Thu gọn danh mục",
} as const

export type AthleteBatch = PlayerBatch
export type AthleteProfile = CatalogPlayer

export const athleteBatches = ["Tất cả đợt", "Đợt 1", "Đợt 2", "Đợt 3"] as const

/** Cùng nguồn với `players` — không nhân bản hồ sơ. */
export const athletes = players

export const teamsSection = {
  id: "doi-tuyen-vdv",
  title: "Đội tuyển & Vận động viên",
  description: "Ban huấn luyện và vận động viên theo đợt — dữ liệu minh họa để duyệt giao diện.",
  note: ILLUSTRATIVE_LABEL,
} as const

export type MembershipStep = {
  id: string
  number: string
  title: string
  summary: string
  details: string[]
}

export const membershipSteps: MembershipStep[] = [
  {
    id: "step-01",
    number: "01",
    title: "Đối tượng & điều kiện",
    summary: "Các nhóm đối tượng minh họa có thể đăng ký khi có kênh chính thức.",
    details: [
      "Cá nhân.",
      "Câu lạc bộ.",
      "Đơn vị, tổ chức.",
      "Điều kiện tham gia chính thức chưa được công bố.",
    ],
  },
  {
    id: "step-02",
    number: "02",
    title: "Hồ sơ & quy trình",
    summary: "Các bước nộp hồ sơ và xác nhận thông tin đang được dựng khung giao diện.",
    details: [
      "Quy trình thật sẽ được công bố kèm biểu mẫu chính thức.",
      "Demo cho phép xem luồng chọn đối tượng và điền thông tin cơ bản.",
      "Không có kênh tiếp nhận hồ sơ trên bản minh họa này.",
    ],
  },
  {
    id: "step-03",
    number: "03",
    title: "Phí & quyền lợi",
    summary: "Phí và quyền lợi hội viên chưa được Liên đoàn công bố trên trang này.",
    details: [
      "Không hiển thị mức phí giả định.",
      "Quyền lợi sẽ được bổ sung khi có văn bản chính thức.",
      "Phần này chỉ giữ chỗ cấu trúc thông tin.",
    ],
  },
]

export const membershipSection = {
  id: "dang-ky-thanh-vien",
  title: "Đăng ký thành viên",
  description: "Khám phá quy trình tham gia mạng lưới Pickleball Việt Nam.",
  note: ILLUSTRATIVE_LABEL,
  formTitle: "Đăng ký thành viên",
  formDescription: "Điền thông tin để bắt đầu tham gia mạng lưới Pickleball Việt Nam.",
  formNote: "Biểu mẫu minh họa. Chưa có kênh tiếp nhận chính thức — thông tin không được gửi đi và không được lưu.",
  submitLabel: "Gửi đăng ký",
  successNote:
    "Đăng ký minh họa đã được ghi nhận trên giao diện. Thông tin không được gửi đi và không được lưu.",
  applicantTypes: ["Cá nhân", "Câu lạc bộ", "Đơn vị tổ chức"] as const,
} as const

export function uniqueProvinces(items: Array<{ province: string }>) {
  return [...new Set(items.map((item) => item.province))].sort((a, b) => a.localeCompare(b, "vi"))
}
