export const technicalSections = [
  { id: "luat-thi-dau", title: "Luật thi đấu" },
  { id: "the-thuc-thi-dau", title: "Thể thức thi đấu" },
  { id: "trong-tai", title: "Trọng tài" },
  { id: "huan-luyen-vien", title: "Huấn luyện viên" },
  { id: "van-ban-chuyen-mon", title: "Văn bản chuyên môn" },
  { id: "dao-tao", title: "Đào tạo & tập huấn" },
] as const

export const documentTypes = ["Luật", "Quy chế", "Hướng dẫn", "Biểu mẫu"] as const

export type TechnicalDocument = {
  id: string
  title: string
  type: typeof documentTypes[number]
  source: "demo" | "official"
  reference?: string
  publishedOn?: string
  effectiveOn?: string
  updatedOn?: string
  sampleDate?: string
  version?: string
  description: string
  pdf: string
  cover?: string
  outline: { title: string; text: string }[]
}

export const technicalDocuments: TechnicalDocument[] = [
  {
    id: "luat-thi-dau-mau",
    title: "Luật thi đấu Pickleball",
    type: "Luật",
    source: "demo",
    reference: "MẪU-LUẬT",
    sampleDate: "2026-11-16",
    updatedOn: "2026-11-16",
    version: "0.1",
    description: "Bản mẫu để tra cứu cấu trúc một bộ luật thi đấu, từ sân và thiết bị đến cách tra cứu tình huống trong trận.",
    pdf: "/documents/chuyen-mon/luat-thi-dau-mau.pdf",
    cover: "/documents/chuyen-mon/bia-luat-thi-dau.webp",
    outline: [
      { title: "Sân và trang thiết bị", text: "Dùng bản mẫu này để lập danh sách các hạng mục cần đối chiếu về sân, vạch sân, lưới, bóng và vợt. Ghi nguồn thông số từ tài liệu áp dụng tại giải." },
      { title: "Giao bóng và trả giao bóng", text: "Khi học luật, đánh dấu các đoạn mô tả trình tự giao và trả giao bóng. Đối chiếu từng tình huống thực hành với phiên bản luật do ban tổ chức công bố." },
      { title: "Cách tính điểm và kết thúc game", text: "Ghi lại hệ thống tính điểm và điều kiện kết thúc được quy định cho nội dung thi đấu. Kiểm tra xem thể thức có khác giữa các vòng hay không." },
      { title: "Lỗi và xử lý tình huống", text: "Mô tả diễn biến bằng các dữ kiện quan sát được, xác định điều khoản cần tra cứu và ghi nhận người có thẩm quyền xử lý theo điều lệ giải." },
    ],
  },
  {
    id: "huong-dan-the-thuc",
    title: "Hướng dẫn lập thể thức thi đấu",
    type: "Hướng dẫn",
    source: "demo",
    reference: "MẪU-THỂ-THỨC",
    sampleDate: "2026-11-16",
    description: "Phiếu chuẩn bị nội dung thi đấu, sơ đồ vòng đấu và phân hạng để ban tổ chức điền theo điều lệ áp dụng.",
    pdf: "/documents/chuyen-mon/huong-dan-the-thuc.pdf",
    outline: [
      { title: "Lập danh mục nội dung", text: "Ghi các nội dung đơn, đôi và đôi nam nữ dự kiến, cùng số lượng người chơi hoặc đội cho từng nội dung." },
      { title: "Chuẩn bị vòng đấu", text: "Lập sơ đồ vòng bảng hoặc loại trực tiếp dựa trên số đăng ký và số sân. Dành chỗ để ghi số game, tiêu chí đi tiếp và cách xác định người thắng khi điều lệ được phê duyệt." },
      { title: "Rà soát phân hạng", text: "Chuẩn bị danh sách theo trình độ và lứa tuổi. Để trống ngưỡng và mốc xác định tuổi đến khi có thể lệ công bố." },
    ],
  },
  {
    id: "quy-che-trong-tai",
    title: "Khung quy chế trọng tài",
    type: "Quy chế",
    source: "demo",
    reference: "MẪU-QUY-CHẾ",
    sampleDate: "2026-06-01",
    description: "Mẫu đề cương phân công trọng tài và giám sát để rà soát trước giải.",
    pdf: "/documents/chuyen-mon/quy-che-trong-tai.pdf",
    outline: [
      { title: "Danh sách phân công", text: "Ghi các vị trí trọng tài chính, trọng tài biên nếu có và giám sát. Xác nhận đầu mối điều phối trước mỗi phiên thi đấu." },
      { title: "Phạm vi hoạt động", text: "Chuẩn bị trường ghi phạm vi phân công ở cấp quốc gia hoặc tỉnh, thành. Chỉ điền căn cứ và thẩm quyền khi văn bản chính thức đã có." },
      { title: "Bàn giao ca làm việc", text: "Chuẩn bị thông tin sân, giờ bắt đầu, trạng thái trận và hồ sơ cần bàn giao cho ca tiếp theo." },
    ],
  },
  {
    id: "huong-dan-dieu-hanh",
    title: "Hướng dẫn chuẩn bị điều hành trận đấu",
    type: "Hướng dẫn",
    source: "demo",
    reference: "MẪU-ĐIỀU-HÀNH",
    sampleDate: "2025-10-06",
    description: "Bảng kiểm thực hành tín hiệu, gọi điểm và ghi nhận tình huống trên sân.",
    pdf: "/documents/chuyen-mon/huong-dan-dieu-hanh.pdf",
    outline: [
      { title: "Chuẩn bị trước trận", text: "Rà soát phân công, thông tin trận và các điểm cần thống nhất với đội ngũ điều hành." },
      { title: "Thực hành giao tiếp trên sân", text: "Chọn tình huống luyện ký hiệu tay và gọi điểm. Đối chiếu cách diễn đạt với tài liệu hiện hành của giải trước khi thực hành." },
      { title: "Ghi nhận tình huống", text: "Tách dữ kiện quan sát được khỏi nhận định, ghi diễn biến và xác định đầu mối tiếp nhận nếu phát sinh tranh chấp." },
    ],
  },
  {
    id: "tieu-chuan-huan-luyen",
    title: "Đề cương tiêu chuẩn đào tạo huấn luyện viên",
    type: "Hướng dẫn",
    source: "demo",
    reference: "MẪU-ĐÀO-TẠO",
    sampleDate: "2026-09-10",
    description: "Khung đề mục để rà soát chứng nhận, giáo trình và an toàn khi có tài liệu được phê duyệt.",
    pdf: "/documents/chuyen-mon/tieu-chuan-huan-luyen.pdf",
    outline: [
      { title: "Khung thông tin chứng nhận", text: "Dành trường ghi cấp độ, điều kiện tham gia, thời hạn và quy trình gia hạn. Bản mẫu không quy định các tiêu chí hoặc thời hạn này." },
      { title: "Thiết kế giáo trình", text: "Tách mục tiêu buổi học cơ bản và nâng cao. Chuẩn bị bài tập theo kỹ năng, phương pháp phản hồi và tiêu chí quan sát kết quả." },
      { title: "An toàn tập luyện", text: "Rà soát mặt sân, lối di chuyển, dụng cụ, phương án nghỉ và người liên hệ tại địa điểm tổ chức." },
    ],
  },
  {
    id: "ke-hoach-buoi-tap",
    title: "Phiếu kế hoạch buổi tập pickleball",
    type: "Biểu mẫu",
    source: "demo",
    reference: "MẪU-BUỔI-TẬP",
    sampleDate: "2025-07-21",
    description: "Mẫu lập mục tiêu, phân bổ thời gian và ghi nhận kết quả của một buổi tập.",
    pdf: "/documents/chuyen-mon/ke-hoach-buoi-tap.pdf",
    outline: [
      { title: "Thông tin buổi tập", text: "Ngày, địa điểm, đối tượng tham gia, số sân và dụng cụ cần chuẩn bị." },
      { title: "Cấu trúc buổi tập", text: "Mục tiêu kỹ năng, hoạt động khởi động, bài tập theo nhóm và hoạt động tổng kết." },
      { title: "Ghi nhận kết quả", text: "Ghi điều người học đã thực hiện được, tình huống cần sửa và một mục tiêu cho buổi sau." },
    ],
  },
  {
    id: "phieu-ghi-nhan-tran",
    title: "Phiếu ghi nhận trận đấu",
    type: "Biểu mẫu",
    source: "demo",
    reference: "MẪU-TRẬN",
    sampleDate: "2026-08-17",
    description: "Mẫu ghi diễn biến, kết quả và tình huống cần chuyển tới đầu mối của giải.",
    pdf: "/documents/chuyen-mon/phieu-ghi-nhan-tran.pdf",
    outline: [
      { title: "Nhận diện trận đấu", text: "Ghi tên giải, mã trận nội bộ, sân, nội dung, vòng đấu và các bên tham gia." },
      { title: "Diễn biến và kết quả", text: "Dành chỗ ghi kết quả từng game và thời điểm xảy ra tình huống cần lưu ý." },
      { title: "Kiểm tra thông tin", text: "Rà soát nội dung cùng người được phân công và ghi thời điểm bàn giao phiếu." },
    ],
  },
  {
    id: "phieu-dang-ky",
    title: "Phiếu chuẩn bị đăng ký tập huấn",
    type: "Biểu mẫu",
    source: "demo",
    reference: "MẪU-TẬP-HUẤN",
    sampleDate: "2026-11-16",
    description: "Danh sách thông tin để người học chuẩn bị trước khi có kênh đăng ký chính thức.",
    pdf: "/documents/chuyen-mon/phieu-dang-ky.pdf",
    outline: [
      { title: "Chọn chương trình", text: "Ghi tên chương trình quan tâm, hình thức học phù hợp và khoảng thời gian có thể tham gia." },
      { title: "Chuẩn bị thông tin", text: "Tự ghi đối tượng tham gia và mục tiêu học tập. Chỉ cung cấp thông tin cá nhân qua kênh được đơn vị tổ chức công bố." },
      { title: "Xác nhận với đơn vị tổ chức", text: "Kiểm tra thời hạn, địa điểm và cách xác nhận hồ sơ trên thông báo chính thức trước khi đăng ký." },
    ],
  },
]

export const resourceGroups = [
  {
    id: "the-thuc-thi-dau",
    title: "Thể thức thi đấu",
    intro: "Tra cứu các nội dung cần xác định khi xây dựng điều lệ và lịch thi đấu.",
    panels: [
      { title: "Nội dung", items: ["Đơn", "Đôi", "Đôi nam nữ"] },
      { title: "Thể thức", items: ["Vòng bảng", "Loại trực tiếp", "Số game", "Cách xác định người thắng"] },
      { title: "Phân hạng", items: ["Trình độ", "Lứa tuổi"] },
    ],
    documents: ["huong-dan-the-thuc", "phieu-ghi-nhan-tran"],
  },
  {
    id: "trong-tai",
    title: "Trọng tài",
    intro: "Tài liệu tham khảo để chuẩn bị nhân sự điều hành và phối hợp xử lý tình huống trên sân.",
    panels: [
      { title: "Vai trò và cấp bậc", items: ["Trọng tài chính", "Trọng tài biên", "Giám sát", "Phạm vi hoạt động theo quốc gia, tỉnh thành"] },
      { title: "Quy trình điều hành trận đấu", items: ["Ký hiệu tay", "Gọi điểm", "Xử lý tình huống", "Giải quyết tranh chấp"] },
    ],
    documents: ["quy-che-trong-tai", "huong-dan-dieu-hanh"],
  },
  {
    id: "huan-luyen-vien",
    title: "Huấn luyện viên",
    intro: "Các chủ đề cần đối chiếu khi tra cứu chứng nhận, lập giáo trình và chuẩn bị buổi tập.",
    panels: [
      { title: "Hệ thống chứng nhận", items: ["Các cấp độ huấn luyện viên", "Điều kiện tham gia", "Thời hạn chứng nhận", "Quy trình gia hạn"] },
      { title: "Giáo trình và phương pháp", items: ["Giáo trình cơ bản", "Giáo trình nâng cao", "Phương pháp huấn luyện", "An toàn tập luyện"] },
    ],
    documents: ["tieu-chuan-huan-luyen", "ke-hoach-buoi-tap"],
  },
] as const

export const courseStatuses = {
  open: "Đang mở đăng ký",
  upcoming: "Sắp diễn ra",
  closed: "Đã kết thúc",
  pending: "Chưa mở đăng ký",
} as const

export type TechnicalCourse = {
  id: string
  title: string
  audience: string
  duration: string
  format: string
  status: keyof typeof courseStatuses
  deadline?: string
  description: string
  topics: string[]
}

export const technicalCourses: TechnicalCourse[] = [
  { id: "trong-tai-co-ban", title: "Thực hành trọng tài cơ bản", audience: "Trọng tài mới, cán bộ câu lạc bộ", duration: "2 ngày", format: "Trực tiếp", status: "open", deadline: "2026-12-06", description: "Thực hành cách chuẩn bị sân, phối hợp điều hành và ghi nhận tình huống trong trận mô phỏng.", topics: ["Chuẩn bị trước trận", "Gọi điểm và giao tiếp trên sân", "Ghi nhận tình huống"] },
  { id: "huan-luyen-nen-tang", title: "Xây dựng buổi tập nền tảng", audience: "Huấn luyện viên, người phụ trách nhóm tập", duration: "1 ngày", format: "Trực tiếp", status: "upcoming", description: "Thiết kế một buổi tập có mục tiêu cụ thể và điều chỉnh bài tập theo trình độ của nhóm.", topics: ["Mục tiêu buổi tập", "Tổ chức bài tập theo nhóm", "Phản hồi và an toàn"] },
  { id: "to-chuc-giai", title: "Lập kế hoạch tổ chức giải", audience: "Ban tổ chức, câu lạc bộ", duration: "3 giờ", format: "Trực tuyến", status: "closed", description: "Làm quen với các bước chuẩn bị thể thức, xếp lịch sân và bàn giao kết quả thi đấu.", topics: ["Sơ đồ vòng đấu", "Lịch sân", "Bàn giao kết quả"] },
  { id: "doc-luat", title: "Đọc luật qua tình huống", audience: "Vận động viên, trọng tài và huấn luyện viên", duration: "2 giờ", format: "Trực tuyến", status: "pending", description: "Luyện cách tra cứu tài liệu và giải thích căn cứ khi phân tích tình huống giả lập.", topics: ["Xác định tài liệu áp dụng", "Mô tả dữ kiện", "Tra cứu và trình bày căn cứ"] },
]
