/**
 * Dữ liệu minh họa cho trang Thư viện & Cộng đồng.
 * Không phải tài nguyên, danh mục hay chương trình chính thức của Liên đoàn.
 */

import type { MediaShot } from "./media.mock"

export const ILLUSTRATIVE_LABEL = "Dữ liệu minh họa — không phải thông tin chính thức của Liên đoàn."

export const libraryNav = [
  { id: "bo-nhan-dien", label: "Thư viện" },
  { id: "anh-video", label: "Ảnh & Video" },
  { id: "don-vi-thanh-vien", label: "Đơn vị thành viên" },
  { id: "doi-tuyen-vdv", label: "Đội tuyển & VĐV" },
  { id: "dang-ky-thanh-vien", label: "Đăng ký thành viên" },
] as const

export type LibraryNavId = (typeof libraryNav)[number]["id"]

export const libraryPage = {
  eyebrow: "Thư viện & Cộng đồng",
  title: "Thư viện & Cộng đồng",
  description:
    "Khám phá tài nguyên nhận diện, hình ảnh, video và mạng lưới đơn vị, vận động viên Pickleball Việt Nam.",
  disclaimer:
    "Nội dung trên trang đang dùng dữ liệu minh họa để duyệt giao diện — chưa phải thư viện hay danh mục chính thức.",
} as const

const outdoor = "/images/outdoor.jpg"
const match = "/images/match.jpg"
const player = "/images/player.jpg"
const logoMark = "/brand/logo-mark-color.svg"
const logoColor = "/brand/logo-horizontal-color.svg"

export const brandSection = {
  id: "bo-nhan-dien",
  title: "Bộ nhận diện VPF",
  description:
    "Logo, màu sắc và kiểu chữ dùng trên giao diện cổng thông tin. Bản dưới đây là khung minh họa để duyệt bố cục thư viện nhận diện.",
  logoPreview: logoColor,
  logoMark,
  logoAlt: "Logo Liên đoàn Pickleball Việt Nam — xem trước minh họa.",
  note: ILLUSTRATIVE_LABEL,
  resources: [
    { id: "logo", label: "Logo", detail: "Phiên bản ngang và biểu tượng." },
    { id: "color", label: "Bảng màu", detail: "Đỏ VPF, navy và cam nhấn." },
    { id: "type", label: "Typography", detail: "Be Vietnam Pro trên giao diện." },
    { id: "usage", label: "Hướng dẫn sử dụng", detail: "Khung minh họa — chưa có guideline chính thức." },
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
      { src: player, alt: "Thành viên.", caption: "Thành viên. Minh họa." },
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
      { src: match, alt: "Trong nhà.", caption: "Trong nhà. Minh họa." },
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
      { src: player, alt: "Thành viên.", caption: "Thành viên. Minh họa." },
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
  { id: "m01", name: "Hanoi Pickleball Community", province: "Hà Nội", description: "Nhóm minh họa kết nối người chơi tại Hà Nội.", illustrative: true },
  { id: "m02", name: "Saigon Pickleball Club", province: "TP. Hồ Chí Minh", description: "Câu lạc bộ minh họa tại TP. Hồ Chí Minh.", illustrative: true },
  { id: "m03", name: "Da Nang Pickleball Club", province: "Đà Nẵng", description: "Câu lạc bộ minh họa khu vực miền Trung.", illustrative: true },
  { id: "m04", name: "Can Tho Pickleball Club", province: "Cần Thơ", description: "Câu lạc bộ minh họa Đồng bằng sông Cửu Long.", illustrative: true },
  { id: "m05", name: "Hai Phong Pickleball Club", province: "Hải Phòng", description: "Câu lạc bộ minh họa tại Hải Phòng.", illustrative: true },
  { id: "m06", name: "Nha Trang Pickleball Community", province: "Khánh Hòa", description: "Cộng đồng minh họa tại Nha Trang.", illustrative: true },
  { id: "m07", name: "Binh Duong Open Club", province: "Bình Dương", description: "Câu lạc bộ minh họa tại Bình Dương.", illustrative: true },
  { id: "m08", name: "Hue Pickleball Group", province: "Huế", description: "Nhóm minh họa tại Huế.", illustrative: true },
  { id: "m09", name: "Dong Nai Pickleball Club", province: "Đồng Nai", description: "Câu lạc bộ minh họa tại Đồng Nai.", illustrative: true },
  { id: "m10", name: "Vung Tau Community", province: "Bà Rịa - Vũng Tàu", description: "Cộng đồng minh họa tại Vũng Tàu.", illustrative: true },
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

export type StaffProfile = {
  id: string
  name: string
  role: string
  specialization: string
  bio: string
  illustrative: true
}

export const coachingStaff: StaffProfile[] = [
  { id: "s1", name: "Nguyễn Thanh Phong", role: "Huấn luyện viên trưởng (minh họa)", specialization: "Chiến thuật đôi", bio: "Hồ sơ minh họa ban huấn luyện.", illustrative: true },
  { id: "s2", name: "Trần Mai Chi", role: "HLV thể lực (minh họa)", specialization: "Thể lực & di chuyển", bio: "Hồ sơ minh họa chuyên đề thể lực.", illustrative: true },
  { id: "s3", name: "Lê Quốc Bảo", role: "HLV kỹ thuật (minh họa)", specialization: "Giao bóng & volley", bio: "Hồ sơ minh họa chuyên đề kỹ thuật.", illustrative: true },
  { id: "s4", name: "Phạm Thu Hà", role: "Trợ lý HLV (minh họa)", specialization: "Người mới & nền tảng", bio: "Hồ sơ minh họa trợ lý huấn luyện.", illustrative: true },
  { id: "s5", name: "Hoàng Minh Tuấn", role: "HLV phân tích (minh họa)", specialization: "Phân tích trận đấu", bio: "Hồ sơ minh họa phân tích chuyên môn.", illustrative: true },
  { id: "s6", name: "Đỗ Lan Anh", role: "HLV trẻ (minh họa)", specialization: "Huấn luyện trẻ em", bio: "Hồ sơ minh họa huấn luyện trẻ.", illustrative: true },
]

export type AthleteBatch = "Đợt 1" | "Đợt 2" | "Đợt 3"

export const athleteBatches = ["Tất cả đợt", "Đợt 1", "Đợt 2", "Đợt 3"] as const

export type AthleteProfile = {
  id: string
  name: string
  category: string
  batch: AthleteBatch
  bio: string
  illustrative: true
}

export const athletes: AthleteProfile[] = [
  { id: "a1", name: "Nguyễn Gia Huy", category: "Đôi nam", batch: "Đợt 1", bio: "Hồ sơ VĐV minh họa đợt 1.", illustrative: true },
  { id: "a2", name: "Trần Ngọc Ánh", category: "Đôi nữ", batch: "Đợt 1", bio: "Hồ sơ VĐV minh họa đợt 1.", illustrative: true },
  { id: "a3", name: "Lê Minh Khoa", category: "Đơn nam", batch: "Đợt 1", bio: "Hồ sơ VĐV minh họa đợt 1.", illustrative: true },
  { id: "a4", name: "Phạm Bảo Châu", category: "Đôi hỗn hợp", batch: "Đợt 1", bio: "Hồ sơ VĐV minh họa đợt 1.", illustrative: true },
  { id: "a5", name: "Hoàng Đức Anh", category: "Đôi nam", batch: "Đợt 2", bio: "Hồ sơ VĐV minh họa đợt 2.", illustrative: true },
  { id: "a6", name: "Vũ Thanh Thảo", category: "Đơn nữ", batch: "Đợt 2", bio: "Hồ sơ VĐV minh họa đợt 2.", illustrative: true },
  { id: "a7", name: "Đặng Nhật Nam", category: "Đôi nam", batch: "Đợt 2", bio: "Hồ sơ VĐV minh họa đợt 2.", illustrative: true },
  { id: "a8", name: "Bùi Hà My", category: "Đôi nữ", batch: "Đợt 2", bio: "Hồ sơ VĐV minh họa đợt 2.", illustrative: true },
  { id: "a9", name: "Ngô Quang Vinh", category: "Đơn nam", batch: "Đợt 3", bio: "Hồ sơ VĐV minh họa đợt 3.", illustrative: true },
  { id: "a10", name: "Đinh Thu Trang", category: "Đôi hỗn hợp", batch: "Đợt 3", bio: "Hồ sơ VĐV minh họa đợt 3.", illustrative: true },
]

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
    summary: "Cá nhân, câu lạc bộ hoặc đơn vị tổ chức quan tâm mạng lưới Pickleball.",
    details: [
      "Nội dung điều kiện chính thức chưa được công bố.",
      "Khung này chỉ minh họa các nhóm đối tượng có thể đăng ký sau này.",
      "Không suy diễn điều kiện hội viên thực tế từ bản demo.",
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
  {
    id: "step-04",
    number: "04",
    title: "Biểu mẫu",
    summary: "Biểu mẫu đăng ký minh họa để kiểm tra trải nghiệm điền thông tin.",
    details: [
      "Dữ liệu nhập không được gửi đi và không được lưu.",
      "Chọn loại đối tượng: cá nhân, câu lạc bộ hoặc đơn vị tổ chức.",
      "CTA mở biểu mẫu demo trong hộp thoại.",
    ],
  },
]

export const membershipSection = {
  id: "dang-ky-thanh-vien",
  title: "Đăng ký thành viên",
  description: "Hành trình đăng ký hội viên gồm bốn bước. Nội dung đang ở chế độ minh họa.",
  note: ILLUSTRATIVE_LABEL,
  ctaLabel: "Đăng ký thành viên",
  applicantTypes: ["Cá nhân", "Câu lạc bộ", "Đơn vị tổ chức"] as const,
} as const

export function uniqueProvinces(items: Array<{ province: string }>) {
  return [...new Set(items.map((item) => item.province))].sort((a, b) => a.localeCompare(b, "vi"))
}
