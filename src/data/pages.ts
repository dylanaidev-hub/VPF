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
    description: "Cập nhật những thông tin mới nhất từ Liên đoàn và cộng đồng Pickleball Việt Nam.",
    note: "Các bài viết đang hiển thị là dữ liệu minh họa, không phải thông cáo chính thức.",
  },
  giaidau: {
    id: "giaidau",
    file: "giaidau.html",
    eyebrow: "Giải đấu",
    title: "Hệ thống giải đấu",
    crumb: "Giải đấu",
    description: "Khám phá các giải đấu Pickleball trên toàn quốc, cập nhật lịch thi đấu và kết quả.",
    note: "Các giải đang hiển thị là dữ liệu minh họa, không phải lịch thi đấu chính thức.",
  },
  chuyenmon: {
    id: "chuyenmon",
    file: "chuyenmon.html",
    eyebrow: "Chuyên môn",
    title: "Chuyên môn Pickleball",
    crumb: "Chuyên môn",
    description: "Luật thi đấu, hệ thống trọng tài, huấn luyện viên và chương trình đào tạo của Liên đoàn Pickleball Việt Nam.",
    note: "Tài liệu và danh mục chính thức sẽ được đăng khi Liên đoàn công bố.",
  },
  media: {
    id: "media",
    file: "thu-vien-cong-dong.html",
    eyebrow: "Thư viện & Cộng đồng",
    title: "Thư viện & Cộng đồng",
    crumb: "Thư viện & Cộng đồng",
    description:
      "Khám phá tài nguyên nhận diện, hình ảnh, video và mạng lưới đơn vị, vận động viên Pickleball Việt Nam.",
    note: "Nội dung đang dùng dữ liệu minh họa để duyệt giao diện — chưa phải thư viện hay danh mục chính thức.",
  },
  hoptac: {
    id: "hoptac",
    file: "hoptac.html",
    eyebrow: "Hợp tác",
    title: "Hợp tác",
    crumb: "Hợp tác",
    description:
      "Cùng VPF phát triển phong trào Pickleball Việt Nam thông qua những cơ hội hợp tác và đồng hành bền vững.",
    note: "Nội dung đang dùng dữ liệu minh họa để duyệt giao diện — chưa phải hồ sơ hợp tác chính thức.",
  },
} as const satisfies Record<string, PageContent>
