import { leadership } from "./leadership.mock"

export type FederationMilestone = {
  id: string
  date: string
  title: string
  description: string
}

export type FederationPerson = {
  id: string
  name: string
  title: string
  department: string
  duties: string[]
  roster?: string[]
  image?: string
  imageAlt?: string
  objectPosition?: string
  group: "chair" | "vice" | "member"
}

const illustrativeDuty = "Nội dung minh họa cho giao diện, không phải phân công chính thức."

function leaderToPerson(
  id: string,
  group: FederationPerson["group"],
  department: string,
  duties: string[],
): FederationPerson {
  const leader = leadership.leaders.find((item) => item.id === id)
  if (!leader) throw new Error(id)
  return {
    id: leader.id,
    name: leader.name,
    title: leader.position,
    department,
    duties,
    image: leader.image ?? undefined,
    imageAlt: leader.imageAlt,
    objectPosition: leader.objectPosition,
    group,
  }
}

export const federationIntro = {
  id: "gioi-thieu",
  eyebrow: "Liên đoàn",
  title: "Giới thiệu Liên đoàn",
  body: "Liên đoàn Pickleball Việt Nam (VPF) được giới thiệu trên cổng thông tin này như đầu mối kết nối người chơi, câu lạc bộ và hoạt động phong trào. Vai trò mô tả ở trang gồm phát triển pickleball tại Việt Nam, nâng dần chuẩn mực chuyên môn và tạo chỗ đứng để môn thể thao được nhìn thấy rộng hơn. Phần mở đầu chỉ nêu mục đích của hồ sơ liên đoàn trên website.",
  note: "Các mốc, văn bản và nhân sự bên dưới là dữ liệu minh họa khi thông tin chính thức chưa được công bố.",
  image: "/images/match.jpg",
  imageAlt: "Các trận đấu pickleball trong nhà. Ảnh minh họa cho hoạt động phong trào, không phải sự kiện chính thức của VPF.",
}

export const federationNav = [
  { href: "#gioi-thieu", label: "Giới thiệu" },
  { href: "#lich-su", label: "Lịch sử" },
  { href: "#quyet-dinh", label: "Quyết định" },
  { href: "#tam-nhin", label: "Tầm nhìn" },
  { href: "#chuc-nang", label: "Chức năng" },
  { href: "#tai-lieu", label: "Điều lệ" },
  { href: "#ban-chap-hanh", label: "Ban Chấp hành" },
  { href: "#lien-he", label: "Liên hệ" },
]

export const federationHistory = {
  id: "lich-su",
  eyebrow: "Lịch sử hình thành",
  title: "Lịch sử hình thành",
  note: "Những dấu mốc quan trọng trong quá trình hình thành và phát triển của Liên đoàn.",
  milestones: [
    {
      id: "2024-03",
      date: "03/2024",
      title: "Khởi xướng",
      description: "Phong trào pickleball được ghi nhận rộng hơn ở nhiều địa phương. Mốc chỉ để xem giao diện.",
    },
    {
      id: "2025-06",
      date: "06/2025",
      title: "Kết nối câu lạc bộ",
      description: "Các nhóm chơi bắt đầu trao đổi để hình dung một tổ chức chung. Không phải biên bản đã ký.",
    },
    {
      id: "2026-01",
      date: "01/2026",
      title: "Dự thảo tổ chức",
      description: "Khung nhiệm vụ được soạn để trình bày trên trang. Chưa phải văn bản đã ban hành.",
    },
    {
      id: "2026-07",
      date: "07/2026",
      title: "Hồ sơ trên website",
      description: "Trang liên đoàn được dựng để xem cấu trúc nội dung. Không phải lễ thành lập chính thức.",
    },
  ] satisfies FederationMilestone[],
}

export const federationDecision = {
  id: "quyet-dinh",
  eyebrow: "Hồ sơ pháp lý",
  title: "Quyết định thành lập Liên đoàn",
  note: "Quyết định thành lập sẽ được cập nhật khi Liên đoàn công bố.",
  numberLabel: "Số quyết định",
  number: "Chưa công bố",
  dateLabel: "Ngày ban hành",
  date: "Chưa công bố",
  authorityLabel: "Cơ quan ban hành",
  authority: "Chưa công bố",
  documentTitle: "Quyết định thành lập",
  stampLabel: "Minh họa",
  status: "PDF chưa được cung cấp",
  cta: "Xem văn bản",
  href: "/documents/chua-cong-bo.html?van-ban=quyet-dinh",
  pdf: "",
}

export const federationVision = {
  id: "tam-nhin",
  eyebrow: "Tầm nhìn & sứ mệnh",
  headline: "Kết nối. Phát triển. Hội nhập.",
  tagline: "Kiến tạo tương lai Pickleball Việt Nam.",
  visionLabel: "Tầm nhìn",
  visionTitle: "Vươn tầm khu vực.",
  vision:
    "Hướng đến một cộng đồng thể thao phổ biến, chuyên nghiệp và có vị thế trong khu vực.",
  missionLabel: "Sứ mệnh",
  missionTitle: "Kết nối. Phát triển. Hội nhập.",
  mission:
    "Kết nối cộng đồng, nâng cao chuyên môn và phát triển phong trào Pickleball trên toàn quốc.",
  /**
   * Mô tả là nội dung giao diện đề xuất, còn chỉnh được cho đến khi VPF duyệt.
   * Ảnh lấy từ thư viện minh họa của website, không phải sự kiện của VPF.
   */
  values: [
    {
      id: "ket-noi",
      label: "Kết nối cộng đồng",
      description:
        "Xây dựng mạng lưới gắn kết người chơi, câu lạc bộ và các tổ chức Pickleball trên toàn quốc.",
      image: "/images/outdoor.jpg",
      imageAlt:
        "Người chơi pickleball trên sân ngoài trời. Ảnh minh họa cho ý kết nối cộng đồng, không phải hoạt động của VPF.",
      crop: "xMidYMid slice",
    },
    {
      id: "chuyen-nghiep",
      label: "Chuyên nghiệp",
      description:
        "Thúc đẩy đào tạo, nâng cao chuyên môn và phát triển các tiêu chuẩn tổ chức, thi đấu.",
      image: "/images/match.jpg",
      imageAlt:
        "Vận động viên thi đấu pickleball trong nhà. Ảnh minh họa cho ý chuyên nghiệp, không phải giải của VPF.",
      crop: "xMidYMid slice",
    },
    {
      id: "minh-bach",
      label: "Minh bạch",
      description: "Đề cao sự rõ ràng, công bằng và trách nhiệm trong các hoạt động của Liên đoàn.",
      image: "/images/match.jpg",
      imageAlt:
        "Khu vực tổ chức một giải pickleball trong nhà. Ảnh minh họa, không phải ban tổ chức của VPF.",
      crop: "xMaxYMid slice",
    },
    {
      id: "ben-vung",
      label: "Phát triển bền vững",
      description:
        "Xây dựng nền tảng lâu dài cho phong trào Pickleball, từ cộng đồng đến thế hệ kế cận.",
      image: "/images/player.jpg",
      imageAlt:
        "Một người chơi pickleball cầm vợt. Ảnh minh họa cho ý phát triển lâu dài, không phải chương trình đào tạo của VPF.",
      crop: "xMidYMid slice",
    },
    {
      id: "hoi-nhap",
      label: "Hội nhập quốc tế",
      description:
        "Tăng cường kết nối, giao lưu và hợp tác với cộng đồng Pickleball trong khu vực và quốc tế.",
      image: "/images/match.jpg",
      imageAlt:
        "Cụm sân pickleball trong một giải mang tính quốc tế. Ảnh minh họa, không phải sự kiện của VPF.",
      crop: "xMinYMax slice",
    },
  ],
}

export const federationMandate = {
  id: "chuc-nang",
  eyebrow: "Chức năng và nhiệm vụ",
  title: "Chức năng và nhiệm vụ",
  note: "Phạm vi hoạt động và những nhiệm vụ VPF đảm nhận trong phát triển Pickleball Việt Nam.",
  functionsTitle: "Chức năng",
  functions: [
    "Đại diện cộng đồng pickleball trong các hoạt động được giao trên hồ sơ này.",
    "Là đầu mối thông tin cho phong trào, câu lạc bộ và giải đấu minh họa.",
    "Nơi trình bày định hướng chuyên môn trước khi có chuẩn mực ban hành.",
    "Kênh giới thiệu hợp tác, không thay cho thỏa thuận đã ký.",
  ],
  dutiesTitle: "Nhiệm vụ, quyền hạn",
  duties: [
    "Kết nối hội viên và câu lạc bộ khi danh sách chính thức được công bố.",
    "Phối hợp nội dung giải đấu trong phạm vi trang thông tin cho phép.",
    "Đề xuất hợp tác theo mẫu trên website, chưa phải thẩm quyền đã ban hành.",
    "Cập nhật văn bản khi có tệp điều lệ và quyết định thật.",
  ],
}

export const federationCharter = {
  id: "tai-lieu",
  eyebrow: "Tài liệu quy chế",
  title: "Điều lệ Liên đoàn Pickleball Việt Nam",
  typeLabel: "Loại tài liệu",
  type: "Điều lệ",
  formatLabel: "Định dạng",
  format: "PDF",
  statusLabel: "Tình trạng",
  status: "Chưa có tệp",
  note: "Điều lệ sẽ được đăng tại đây khi Liên đoàn công bố.",
  cta: "Xem tài liệu",
  href: "/documents/chua-cong-bo.html?van-ban=dieu-le",
}

const federationChair = leaderToPerson("le-van-thanh", "chair", "Ban Chấp hành", [
  illustrativeDuty,
  "Điều phối các mục được trình bày trên hồ sơ liên đoàn.",
])

const federationVices = [
  leaderToPerson("nguyen-minh-anh", "vice", "Chuyên môn", [illustrativeDuty]),
  leaderToPerson("tran-quoc-hung", "vice", "Tổ chức giải đấu", [illustrativeDuty]),
  leaderToPerson("pham-duc-long", "vice", "Phát triển cộng đồng", [illustrativeDuty]),
]

const federationMembers = [
  ["ban-chuyen-mon", "Ngô Hà My", "Trưởng ban", "Ban Chuyên môn"],
  ["ban-to-chuc", "Lý Quang Vinh", "Trưởng ban", "Ban Tổ chức giải"],
  ["ban-phong-trao", "Đặng Thu Trang", "Trưởng ban", "Ban Phát triển phong trào"],
  ["ban-truyen-thong", "Vũ Minh Khang", "Trưởng ban", "Ban Truyền thông"],
  ["ban-doi-ngoai", "Phan Bảo Châu", "Trưởng ban", "Ban Đối ngoại"],
  ["ban-tai-chinh", "Hồ Đức An", "Trưởng ban", "Ban Tài chính"],
  ["ban-kiem-tra", "Tạ Kim Oanh", "Trưởng ban", "Ban Kiểm tra"],
  ["ban-dao-tao", "Bùi Nhật Nam", "Trưởng ban", "Ban Đào tạo"],
  ["ban-trong-tai", "Đinh Gia Hân", "Trưởng ban", "Ban Trọng tài"],
  ["ban-phap-che", "Lâm Quốc Việt", "Trưởng ban", "Ban Pháp chế"],
  ["ban-hoi-vien", "Trịnh Mai Chi", "Trưởng ban", "Ban Hội viên"],
  ["van-phong", "Châu Thanh Tú", "Chánh Văn phòng", "Văn phòng Liên đoàn"],
].map(
  ([id, name, title, department]): FederationPerson => ({
    id,
    name,
    title,
    department,
    group: "member",
    duties: [illustrativeDuty, `Phụ trách mục “${department}” trong sơ đồ minh họa.`],
    roster: ["Ủy viên minh họa 1", "Ủy viên minh họa 2"],
  }),
)

export const federationCommittee = {
  id: "ban-chap-hanh",
  eyebrow: "Ban Chấp hành",
  title: "Ban Chấp hành Liên đoàn",
  note: "Đội ngũ lãnh đạo và các thành viên tham gia điều hành hoạt động của Liên đoàn.",
  cta: "Xem toàn bộ Ban Chấp hành",
  chair: federationChair,
  vices: federationVices,
  members: federationMembers,
  people: [federationChair, ...federationVices, ...federationMembers],
}

export const federationContact = {
  id: "lien-he",
  eyebrow: "Thông tin liên hệ",
  title: "Liên hệ Liên đoàn",
  note: "Thông tin để kết nối với Liên đoàn Pickleball Việt Nam.",
  rows: [
    { id: "address", label: "Địa chỉ", value: "Hà Nội, Việt Nam — địa điểm minh họa, chưa có số nhà." },
    { id: "hotline", label: "Hotline", value: "Chưa công bố" },
    { id: "email", label: "Email", value: "Chưa công bố" },
    { id: "hours", label: "Giờ làm việc", value: "Chưa công bố" },
  ],
  cta: "Đề xuất hợp tác",
  href: "/hoptac.html#lien-he-hop-tac",
  mapTitle: "Bản đồ minh họa khu vực Hà Nội, không ghim trụ sở VPF",
  mapSrc: "https://maps.google.com/maps?q=H%C3%A0%20N%E1%BB%99i%2C%20Vi%E1%BB%87t%20Nam&z=11&output=embed",
}
