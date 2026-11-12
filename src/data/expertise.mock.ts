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

export const rulesDocument = {
  id: "luat-thi-dau",
  title: "Luật thi đấu",
  intro: "Tài liệu luật thi đấu Pickleball — bản minh họa để duyệt giao diện.",
  documentLabel: "Luật thi đấu Pickleball",
  documentType: "Tài liệu hướng dẫn",
  version: "Bản minh họa",
  documentKind: "PDF",
  description:
    "Quy định cơ bản về sân đấu, giao bóng, tính điểm và lỗi trong thi đấu Pickleball.",
  statusLabel: "Bản minh họa",
  onlineLabel: "Đọc online",
  downloadLabel: "Tải PDF",
  /** Chỉ gán khi có tệp PDF thật. Demo hiện tại không có tệp. */
  pdfHref: undefined as string | undefined,
  publishedYear: undefined as string | undefined,
  summary: [
    "Đây là bản xem trước minh họa dành cho duyệt giao diện cổng thông tin.",
    "Nội dung tóm tắt: cấu trúc sân và lưới, giao bóng dưới tay, cách tính điểm phổ biến, một số lỗi thường gặp khi thi đấu.",
    "Không phải quy định chính thức của Liên đoàn Pickleball Việt Nam. Bản PDF chính thức sẽ thay thế khi được công bố.",
  ],
  downloadNote:
    "Chưa có tệp PDF thật để tải. Nút Tải PDF đang ở chế độ minh họa để kiểm tra giao diện.",
  illustrative: true as const,
}

export type PersonnelMember = {
  id: string
  name: string
  level: string
  province: string
  specialization?: string
  bio?: string
  /** Chỉ dùng khi có ảnh chân dung thật. Demo dùng avatar chữ cái. */
  portrait?: string
  portraitAlt?: string
  illustrative: true
}

export const referees: PersonnelMember[] = [
  {
    id: "tt-01",
    name: "Nguyễn Minh Khoa",
    level: "Quốc gia",
    province: "Hà Nội",
    bio: "Hồ sơ minh họa cho cấp trọng tài quốc gia trong giao diện danh mục.",
    illustrative: true,
  },
  {
    id: "tt-02",
    name: "Trần Thu Hà",
    level: "Cấp 1",
    province: "TP. Hồ Chí Minh",
    bio: "Hồ sơ minh họa trọng tài cấp 1 tại khu vực phía Nam.",
    illustrative: true,
  },
  {
    id: "tt-03",
    name: "Lê Hoàng Nam",
    level: "Cấp 1",
    province: "Đà Nẵng",
    bio: "Hồ sơ minh họa trọng tài cấp 1 khu vực miền Trung.",
    illustrative: true,
  },
  {
    id: "tt-04",
    name: "Phạm Quang Huy",
    level: "Cấp 2",
    province: "Hải Phòng",
    bio: "Hồ sơ minh họa trọng tài cấp 2.",
    illustrative: true,
  },
  {
    id: "tt-05",
    name: "Hoàng Mai Anh",
    level: "Cấp 2",
    province: "Cần Thơ",
    bio: "Hồ sơ minh họa trọng tài cấp 2 khu vực Đồng bằng sông Cửu Long.",
    illustrative: true,
  },
  {
    id: "tt-06",
    name: "Vũ Đức Thành",
    level: "Cấp 3",
    province: "Khánh Hòa",
    bio: "Hồ sơ minh họa trọng tài cấp 3.",
    illustrative: true,
  },
  {
    id: "tt-07",
    name: "Đặng Ngọc Lan",
    level: "Cấp 1",
    province: "Hà Nội",
    bio: "Hồ sơ minh họa trọng tài cấp 1 tại Hà Nội.",
    illustrative: true,
  },
  {
    id: "tt-08",
    name: "Bùi Thanh Sơn",
    level: "Cấp 2",
    province: "Bình Dương",
    bio: "Hồ sơ minh họa trọng tài cấp 2 tại Bình Dương.",
    illustrative: true,
  },
  {
    id: "tt-09",
    name: "Ngô Thị Hương",
    level: "Cấp 3",
    province: "Huế",
    bio: "Hồ sơ minh họa trọng tài cấp 3 tại Huế.",
    illustrative: true,
  },
  {
    id: "tt-10",
    name: "Đỗ Văn Phúc",
    level: "Cấp 2",
    province: "Đà Nẵng",
    bio: "Hồ sơ minh họa trọng tài cấp 2 tại Đà Nẵng.",
    illustrative: true,
  },
]

export const coaches: PersonnelMember[] = [
  {
    id: "hlv-01",
    name: "Mai Khánh Vy",
    level: "HLV cấp 1",
    province: "Hà Nội",
    specialization: "Kỹ thuật cơ bản",
    bio: "Hồ sơ minh họa HLV cấp 1, chuyên đề kỹ thuật cơ bản cho người mới.",
    illustrative: true,
  },
  {
    id: "hlv-02",
    name: "Trịnh Bảo Long",
    level: "HLV cấp 1",
    province: "TP. Hồ Chí Minh",
    specialization: "Chiến thuật đôi",
    bio: "Hồ sơ minh họa HLV cấp 1, chuyên đề chiến thuật đánh đôi.",
    illustrative: true,
  },
  {
    id: "hlv-03",
    name: "Lý Thanh Tâm",
    level: "HLV cấp 2",
    province: "Đà Nẵng",
    specialization: "Phương pháp giảng dạy",
    bio: "Hồ sơ minh họa HLV cấp 2, chuyên đề phương pháp giảng dạy.",
    illustrative: true,
  },
  {
    id: "hlv-04",
    name: "Phan Nhật Quang",
    level: "HLV cấp 2",
    province: "Hải Phòng",
    specialization: "Thể lực & di chuyển",
    bio: "Hồ sơ minh họa HLV cấp 2, chuyên đề thể lực và di chuyển trên sân.",
    illustrative: true,
  },
  {
    id: "hlv-05",
    name: "Võ Minh Trang",
    level: "HLV cấp 3",
    province: "Cần Thơ",
    specialization: "Người mới bắt đầu",
    bio: "Hồ sơ minh họa HLV cấp 3, hướng dẫn người mới bắt đầu.",
    illustrative: true,
  },
  {
    id: "hlv-06",
    name: "Hồ Tuấn Anh",
    level: "HLV cấp 1",
    province: "Khánh Hòa",
    specialization: "Giao bóng & trả giao",
    bio: "Hồ sơ minh họa HLV cấp 1, chuyên đề giao bóng và trả giao.",
    illustrative: true,
  },
  {
    id: "hlv-07",
    name: "Nguyễn Hà My",
    level: "HLV cấp 2",
    province: "Bình Dương",
    specialization: "Tổ chức buổi tập",
    bio: "Hồ sơ minh họa HLV cấp 2, chuyên đề tổ chức buổi tập.",
    illustrative: true,
  },
  {
    id: "hlv-08",
    name: "Đinh Gia Hân",
    level: "HLV cấp 3",
    province: "Huế",
    specialization: "Kỹ thuật volley",
    bio: "Hồ sơ minh họa HLV cấp 3, chuyên đề kỹ thuật volley.",
    illustrative: true,
  },
  {
    id: "hlv-09",
    name: "Bùi Nhật Nam",
    level: "HLV cấp 1",
    province: "Hà Nội",
    specialization: "Huấn luyện trẻ em",
    bio: "Hồ sơ minh họa HLV cấp 1, chuyên đề huấn luyện trẻ em.",
    illustrative: true,
  },
  {
    id: "hlv-10",
    name: "Cao Thanh Bình",
    level: "HLV cấp 2",
    province: "TP. Hồ Chí Minh",
    specialization: "Chuẩn bị thi đấu",
    bio: "Hồ sơ minh họa HLV cấp 2, chuyên đề chuẩn bị thi đấu.",
    illustrative: true,
  },
]

export const PREVIEW_PERSONNEL_COUNT = 4

export const refereeSection = {
  id: "trong-tai",
  title: "Hệ thống trọng tài",
  description: "Danh mục trọng tài theo cấp và địa phương.",
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
  description: "Danh mục HLV theo cấp chứng nhận và địa phương.",
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
