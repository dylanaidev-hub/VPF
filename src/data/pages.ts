export type PageContent = {
  id: string
  file: string
  eyebrow: string
  title: string
  crumb: string
  description: string
  note: string
}

/**
 * Khung nội dung các trang ngoài Homepage.
 * Chưa phải bài viết chính thức của Liên đoàn.
 */
export const pages = {
  liendoan: {
    id: "liendoan",
    file: "liendoan.html",
    eyebrow: "Liên đoàn",
    title: "Giới thiệu Liên đoàn",
    crumb: "Liên đoàn",
    description:
      "Trang giới thiệu tổ chức, nhiệm kỳ và vai trò của Liên đoàn Pickleball Việt Nam.",
    note: "Nội dung chi tiết sẽ được biên tập sau. Đây là khung trang, chưa phải bài giới thiệu chính thức.",
  },
  tintuc: {
    id: "tintuc",
    file: "tintuc.html",
    eyebrow: "Tin tức",
    title: "Tin tức Pickleball",
    crumb: "Tin tức",
    description: "Trang tổng hợp tin hoạt động, chuyên môn và cộng đồng pickleball.",
    note: "Danh sách tin đầy đủ sẽ được gắn vào trang này ở giai đoạn sau. Trang chủ vẫn hiển thị các tin minh họa.",
  },
  giaidau: {
    id: "giaidau",
    file: "giaidau.html",
    eyebrow: "Giải đấu",
    title: "Hệ thống giải đấu",
    crumb: "Giải đấu",
    description: "Trang theo dõi hệ thống giải, lịch thi đấu và thông tin từng giải.",
    note: "Lịch giải chi tiết sẽ được đưa vào trang này sau. Các giải trên trang chủ hiện là dữ liệu minh họa.",
  },
  chuyenmon: {
    id: "chuyenmon",
    file: "chuyenmon.html",
    eyebrow: "Chuyên môn",
    title: "Thông tin chuyên môn",
    crumb: "Chuyên môn",
    description: "Trang khung về luật thi đấu, đào tạo huấn luyện viên và trọng tài.",
    note: "Tài liệu chuyên môn chính thức chưa được đăng tại đây.",
  },
  congdong: {
    id: "congdong",
    file: "congdong.html",
    eyebrow: "Cộng đồng",
    title: "Cộng đồng Pickleball",
    crumb: "Cộng đồng",
    description: "Trang dành cho hội viên, câu lạc bộ và các hoạt động cộng đồng.",
    note: "Cổng hội viên chưa vận hành. Nội dung đăng ký sẽ được bổ sung sau.",
  },
  media: {
    id: "media",
    file: "media.html",
    eyebrow: "Media",
    title: "Thư viện Media",
    crumb: "Media",
    description: "Trang thư viện ảnh và video của Liên đoàn Pickleball Việt Nam.",
    note: "Kho media chính thức chưa được cập nhật. Ảnh trên trang chủ là ảnh minh họa môn pickleball.",
  },
  hoptac: {
    id: "hoptac",
    file: "hoptac.html",
    eyebrow: "Hợp tác",
    title: "Hợp tác cùng VPF",
    crumb: "Hợp tác",
    description: "Trang dành cho đối tác đồng hành cùng phong trào pickleball.",
    note: "Chưa có hồ sơ hợp tác chính thức trên trang này. Logo ở trang chủ chỉ mang tính minh họa.",
  },
} as const satisfies Record<string, PageContent>
