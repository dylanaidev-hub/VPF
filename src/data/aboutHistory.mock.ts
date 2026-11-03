export type HistoryIcon = "sprout" | "users" | "landmark"

export type HistoryMilestone = {
  id: string
  year: string
  title: string
  icon: HistoryIcon
  points: string[]
  highlight?: boolean
}

export const aboutHistory = {
  eyebrow: "Lịch sử hình thành",
  title: "Hành trình phát triển của VPF",
  description:
    "Được hình thành với mục tiêu xây dựng một hệ sinh thái Pickleball chuyên nghiệp, bền vững và lan tỏa rộng khắp Việt Nam.",
  note: "Các mốc dưới đây là dữ liệu minh họa, không phải lịch sử chính thức của VPF.",
  milestones: [
    {
      id: "khoi-xuong",
      year: "2024",
      title: "Khởi xướng",
      icon: "sprout",
      points: [
        "Phong trào Pickleball phát triển mạnh tại nhiều địa phương.",
        "Cộng đồng người chơi và các câu lạc bộ dần hình thành.",
      ],
    },
    {
      id: "van-dong",
      year: "2025",
      title: "Vận động thành lập",
      icon: "users",
      points: [
        "Các hoạt động kết nối cộng đồng và chuẩn bị tổ chức được triển khai.",
        "Xây dựng định hướng phát triển cho Liên đoàn.",
      ],
    },
    {
      id: "thanh-lap",
      year: "2026",
      title: "Thành lập VPF",
      icon: "landmark",
      highlight: true,
      points: [
        "Đánh dấu giai đoạn tổ chức và phát triển của Liên đoàn.",
        "Hướng đến xây dựng hệ thống quản lý và phát triển Pickleball chuyên nghiệp.",
      ],
    },
  ] satisfies HistoryMilestone[],
}
