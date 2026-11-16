/**
 * Dữ liệu minh họa cho trang Chuyên môn (UI review).
 * Không phải danh mục, chứng nhận hay tài liệu chính thức của Liên đoàn.
 * Thay thế bằng dữ liệu công bố khi sẵn sàng.
 */

export const expertiseNav = [
  { id: "luat-thi-dau", label: "Luật thi đấu", icon: "rules" },
  { id: "trong-tai", label: "Trọng tài", icon: "referee" },
  { id: "huan-luyen-vien", label: "Huấn luyện viên", icon: "coach" },
  { id: "dao-tao", label: "Đào tạo & tập huấn", icon: "training" },
] as const

export type ExpertiseNavId = (typeof expertiseNav)[number]["id"]

export const ILLUSTRATIVE_LABEL = "Dữ liệu minh họa — không phải thông tin chính thức của Liên đoàn."

export type ProfessionalTopic = {
  title: string
  text: string
}

/** Tài liệu chuyên môn. `pdfHref` chỉ gán khi có tệp PDF thật, kết thúc bằng .pdf. */
export type ProfessionalResource = {
  id: string
  title: string
  description: string
  category: string
  documentTitle: string
  documentDescription: string
  topics: ProfessionalTopic[]
  /** Ghi chú trong phần đọc, không gắn nhãn ban hành. */
  readerNote: string
  readLabel: string
  downloadLabel: string
  unavailableNote: string
  pdfHref?: string
}

export const rulesDocument: ProfessionalResource = {
  id: "luat-thi-dau",
  title: "Luật thi đấu",
  description: "Sân đấu, giao bóng, tính điểm và lỗi trong thi đấu Pickleball.",
  category: "Tài liệu chuyên môn",
  documentTitle: "Luật thi đấu Pickleball",
  documentDescription: "Phạm vi tài liệu về sân đấu, giao bóng, cách tính điểm và các lỗi thường gặp.",
  topics: [
    { title: "Sân đấu và lưới", text: "Khu vực thi đấu, đường biên và chiều cao lưới." },
    { title: "Giao bóng", text: "Vị trí giao bóng và cách đưa bóng vào cuộc." },
    { title: "Tính điểm", text: "Cách ghi điểm và kết thúc một ván." },
    { title: "Lỗi", text: "Các tình huống khiến đội mất quyền đánh." },
  ],
  readerNote: "Phần này mô tả phạm vi tài liệu. Toàn văn chưa được đăng trên cổng thông tin.",
  readLabel: "Đọc tài liệu",
  downloadLabel: "Tải PDF",
  unavailableNote: "Tệp PDF chưa được công bố",
}

export type PersonnelMember = {
  id: string
  name: string
  level: string
  province: string
  specialization?: string
  bio?: string
  /** Ảnh chân dung, nếu có tệp thật. Không gán ảnh của người khác. */
  portrait?: string
  portraitAlt?: string
  illustrative: true
}

/** Chân dung hư cấu cho giao diện. Không phải trọng tài của Liên đoàn. */
export const referees: PersonnelMember[] = [
  {
    id: "tt-01",
    name: "Nguyễn Minh Khoa",
    level: "Quốc gia",
    province: "Hà Nội",
    bio: "Hồ sơ minh họa cho cấp trọng tài quốc gia trong giao diện danh mục.",
    portrait: "/images/referees/referee-01.webp",
    illustrative: true,
  },
  {
    id: "tt-02",
    name: "Trần Thu Hà",
    level: "Cấp 1",
    province: "TP. Hồ Chí Minh",
    bio: "Hồ sơ minh họa trọng tài cấp 1 tại khu vực phía Nam.",
    portrait: "/images/referees/referee-02.webp",
    illustrative: true,
  },
  {
    id: "tt-03",
    name: "Lê Hoàng Nam",
    level: "Cấp 1",
    province: "Đà Nẵng",
    bio: "Hồ sơ minh họa trọng tài cấp 1 khu vực miền Trung.",
    portrait: "/images/referees/referee-03.webp",
    illustrative: true,
  },
  {
    id: "tt-04",
    name: "Phạm Quang Huy",
    level: "Cấp 2",
    province: "Hải Phòng",
    bio: "Hồ sơ minh họa trọng tài cấp 2.",
    portrait: "/images/referees/referee-04.webp",
    illustrative: true,
  },
  {
    id: "tt-05",
    name: "Hoàng Mai Anh",
    level: "Cấp 2",
    province: "Cần Thơ",
    bio: "Hồ sơ minh họa trọng tài cấp 2 khu vực Đồng bằng sông Cửu Long.",
    portrait: "/images/referees/referee-05.webp",
    illustrative: true,
  },
  {
    id: "tt-06",
    name: "Vũ Đức Thành",
    level: "Cấp 3",
    province: "Khánh Hòa",
    bio: "Hồ sơ minh họa trọng tài cấp 3.",
    portrait: "/images/referees/referee-06.webp",
    illustrative: true,
  },
  {
    id: "tt-07",
    name: "Đặng Ngọc Lan",
    level: "Cấp 1",
    province: "Hà Nội",
    bio: "Hồ sơ minh họa trọng tài cấp 1 tại Hà Nội.",
    portrait: "/images/referees/referee-07.webp",
    illustrative: true,
  },
  {
    id: "tt-08",
    name: "Bùi Thanh Sơn",
    level: "Cấp 2",
    province: "Bình Dương",
    bio: "Hồ sơ minh họa trọng tài cấp 2 tại Bình Dương.",
    portrait: "/images/referees/referee-08.webp",
    illustrative: true,
  },
  {
    id: "tt-09",
    name: "Ngô Thị Hương",
    level: "Cấp 3",
    province: "Huế",
    bio: "Hồ sơ minh họa trọng tài cấp 3 tại Huế.",
    portrait: "/images/referees/referee-09.webp",
    illustrative: true,
  },
  {
    id: "tt-10",
    name: "Đỗ Văn Phúc",
    level: "Cấp 2",
    province: "Đà Nẵng",
    bio: "Hồ sơ minh họa trọng tài cấp 2 tại Đà Nẵng.",
    portrait: "/images/referees/referee-10.webp",
    illustrative: true,
  },
]

/** Chân dung hư cấu cho giao diện. Không phải huấn luyện viên của Liên đoàn. */
export const coaches: PersonnelMember[] = [
  {
    id: "hlv-01",
    name: "Mai Khánh Vy",
    level: "HLV cấp 1",
    province: "Hà Nội",
    specialization: "Kỹ thuật cơ bản",
    bio: "Hướng dẫn người mới cách cầm vợt, tư thế và những đường bóng cơ bản trên sân.",
    portrait: "/images/coaches/coach-01.webp",
    illustrative: true,
  },
  {
    id: "hlv-02",
    name: "Trịnh Bảo Long",
    level: "HLV cấp 1",
    province: "TP. Hồ Chí Minh",
    specialization: "Chiến thuật đôi",
    bio: "Tập trung vào vị trí đứng và cách phối hợp khi đánh đôi.",
    portrait: "/images/coaches/coach-02.webp",
    illustrative: true,
  },
  {
    id: "hlv-03",
    name: "Lý Thanh Tâm",
    level: "HLV cấp 2",
    province: "Đà Nẵng",
    specialization: "Phương pháp giảng dạy",
    bio: "Sắp xếp bài tập theo từng nhóm trình độ để người chơi dễ theo dõi.",
    portrait: "/images/coaches/coach-03.webp",
    illustrative: true,
  },
  {
    id: "hlv-04",
    name: "Phan Nhật Quang",
    level: "HLV cấp 2",
    province: "Hải Phòng",
    specialization: "Thể lực và di chuyển",
    bio: "Chú trọng bước chân, thăng bằng và sức bền khi di chuyển trên sân.",
    portrait: "/images/coaches/coach-04.webp",
    illustrative: true,
  },
  {
    id: "hlv-05",
    name: "Võ Minh Trang",
    level: "HLV cấp 3",
    province: "Cần Thơ",
    specialization: "Người mới bắt đầu",
    bio: "Đồng hành với người mới làm quen sân, luật chơi cơ bản và nhịp giao bóng.",
    portrait: "/images/coaches/coach-05.webp",
    illustrative: true,
  },
  {
    id: "hlv-06",
    name: "Hồ Tuấn Anh",
    level: "HLV cấp 1",
    province: "Khánh Hòa",
    specialization: "Giao bóng và trả giao",
    bio: "Luyện giao bóng và cách trả giao trong các tình huống thường gặp.",
    portrait: "/images/coaches/coach-06.webp",
    illustrative: true,
  },
  {
    id: "hlv-07",
    name: "Nguyễn Hà My",
    level: "HLV cấp 2",
    province: "Bình Dương",
    specialization: "Tổ chức buổi tập",
    bio: "Sắp xếp nhóm tập, thời lượng và bài tập cho một buổi trên sân.",
    portrait: "/images/coaches/coach-07.webp",
    illustrative: true,
  },
  {
    id: "hlv-08",
    name: "Đinh Gia Hân",
    level: "HLV cấp 3",
    province: "Huế",
    specialization: "Kỹ thuật volley",
    bio: "Hướng dẫn kỹ thuật volley và khoảng cách tiếp cận lưới.",
    portrait: "/images/coaches/coach-08.webp",
    illustrative: true,
  },
  {
    id: "hlv-09",
    name: "Bùi Nhật Nam",
    level: "HLV cấp 1",
    province: "Hà Nội",
    specialization: "Huấn luyện trẻ em",
    bio: "Buổi tập cho trẻ em, ưu tiên an toàn, vui chơi và kỹ thuật đơn giản.",
    portrait: "/images/coaches/coach-09.webp",
    illustrative: true,
  },
  {
    id: "hlv-10",
    name: "Cao Thanh Bình",
    level: "HLV cấp 2",
    province: "TP. Hồ Chí Minh",
    specialization: "Chuẩn bị thi đấu",
    bio: "Giúp người chơi sắp xếp khởi động và nhịp trận trước giờ thi đấu.",
    portrait: "/images/coaches/coach-10.webp",
    illustrative: true,
  },
]

export const PREVIEW_PERSONNEL_COUNT = 4

export const refereeSection = {
  id: "trong-tai",
  title: "Hệ thống trọng tài",
  description: "Danh mục theo cấp và địa phương.",
  empty: "Chưa có danh mục trọng tài được công bố.",
  emptyFiltered: "Không có trọng tài phù hợp với bộ lọc.",
  searchLabel: "Tìm trọng tài theo họ tên",
  viewAllLabel: "Xem tất cả trọng tài",
  collapseLabel: "Thu gọn danh mục",
  illustrativeNote: ILLUSTRATIVE_LABEL,
} as const

export const coachSection = {
  id: "huan-luyen-vien",
  title: "Hệ thống huấn luyện viên",
  description: "Huấn luyện viên theo cấp và địa phương.",
  empty: "Chưa có danh mục huấn luyện viên được công bố.",
  emptyFiltered: "Không có huấn luyện viên phù hợp với bộ lọc.",
  searchLabel: "Tìm HLV theo họ tên",
  viewAllLabel: "Xem tất cả huấn luyện viên",
  collapseLabel: "Thu gọn danh mục",
  illustrativeNote: ILLUSTRATIVE_LABEL,
} as const

export function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "vi"))
}
