export type TrainingCourse = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  format: "Trực tiếp" | "Trực tuyến"
  audience: string
  registrationStatus: "open" | "upcoming" | "closed"
  registrationUrl?: string
  source: "official" | "demo"
}

export const trainingCourses: readonly TrainingCourse[] = []

export const demoTrainingCourses: readonly TrainingCourse[] = [
  {
    id: "demo-ky-nang-nen-tang",
    title: "Lớp kỹ năng Pickleball nền tảng",
    description: "Thực hành giao bóng, trả giao bóng và di chuyển khi chơi đôi.",
    startDate: "2026-12-05",
    endDate: "2026-12-06",
    location: "Hà Nội",
    format: "Trực tiếp",
    audience: "Người mới chơi và thành viên câu lạc bộ",
    registrationStatus: "open",
    source: "demo",
  },
  {
    id: "demo-trong-tai-co-ban",
    title: "Tập huấn trọng tài Pickleball cơ bản",
    description: "Ôn luật, thực hành gọi điểm và xử lý tình huống thường gặp trong trận đấu.",
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    location: "TP. Hồ Chí Minh",
    format: "Trực tiếp",
    audience: "Trọng tài mới và ban tổ chức giải cấp câu lạc bộ",
    registrationStatus: "open",
    source: "demo",
  },
  {
    id: "demo-giao-an-huan-luyen",
    title: "Xây dựng giáo án huấn luyện Pickleball",
    description: "Thiết kế buổi tập theo trình độ và chọn bài tập phù hợp với mục tiêu của nhóm.",
    startDate: "2026-12-22",
    endDate: "2026-12-22",
    location: "Phòng học trực tuyến",
    format: "Trực tuyến",
    audience: "Huấn luyện viên và người phụ trách lớp tại câu lạc bộ",
    registrationStatus: "upcoming",
    source: "demo",
  },
  {
    id: "demo-to-chuc-giai",
    title: "Tập huấn tổ chức giải Pickleball cấp câu lạc bộ",
    description: "Lập lịch thi đấu, bố trí sân và phối hợp với đội ngũ trọng tài.",
    startDate: "2026-06-13",
    endDate: "2026-06-14",
    location: "Đà Nẵng",
    format: "Trực tiếp",
    audience: "Ban tổ chức giải và đại diện câu lạc bộ",
    registrationStatus: "closed",
    source: "demo",
  },
]
