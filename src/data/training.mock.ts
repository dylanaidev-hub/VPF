/**
 * Chương trình đào tạo minh họa cho trang Chuyên môn (UI review).
 * Không phải lịch khai giảng chính thức của Liên đoàn.
 */

import { ILLUSTRATIVE_LABEL } from "./expertise.mock"

export type TrainingStatus = "upcoming" | "open" | "completed"

export type TrainingProgram = {
  id: string
  slug: string
  anchor: string
  name: string
  audience: string
  description: string
  topics: string[]
  schedule: string
  duration: string
  dateBlock: { day: string; monthYear: string }
  location: string
  status: TrainingStatus
  ctaLabel: string
  image?: string
  imageAlt?: string
  featured?: boolean
  illustrative: true
}

export const trainingStatusLabel: Record<TrainingStatus, string> = {
  upcoming: "Sắp diễn ra",
  open: "Đang mở đăng ký",
  completed: "Đã kết thúc",
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "trong-tai-co-ban",
    slug: "khoa-dao-tao-trong-tai-co-ban",
    anchor: "khoa-dao-tao-trong-tai-co-ban",
    name: "Khóa đào tạo trọng tài Pickleball cơ bản",
    audience: "Ứng viên trọng tài, người điều hành giải phong trào",
    description: "Giới thiệu luật thi đấu, vị trí trọng tài trên sân và quy trình điều hành trận cơ bản.",
    topics: ["Luật thi đấu cơ bản", "Vị trí và tín hiệu trọng tài", "Quy trình trước / trong / sau trận"],
    schedule: "12–14.12.2026",
    duration: "3 ngày",
    dateBlock: { day: "12–14", monthYear: "12.2026" },
    location: "Hà Nội",
    status: "open",
    ctaLabel: "Đăng ký",
    image: "/images/match.jpg",
    imageAlt: "Sân thi đấu trong nhà. Ảnh minh họa cho khóa đào tạo trọng tài.",
    featured: true,
    illustrative: true,
  },
  {
    id: "tap-huan-luat",
    slug: "tap-huan-luat-thi-dau",
    anchor: "tap-huan-luat-thi-dau",
    name: "Tập huấn luật thi đấu Pickleball",
    audience: "Trọng tài, HLV và ban tổ chức giải",
    description: "Ôn các tình huống luật thường gặp và cách áp dụng thống nhất trên sân.",
    topics: ["Tình huống giao bóng", "Lỗi không gian sân", "Cách đọc điểm"],
    schedule: "22.11.2026",
    duration: "1 ngày",
    dateBlock: { day: "22", monthYear: "11.2026" },
    location: "TP. Hồ Chí Minh",
    status: "upcoming",
    ctaLabel: "Xem chi tiết",
    illustrative: true,
  },
  {
    id: "hlv-co-ban",
    slug: "dao-tao-hlv-cap-co-ban",
    anchor: "dao-tao-hlv-cap-co-ban",
    name: "Chương trình đào tạo huấn luyện viên cấp cơ bản",
    audience: "Người có kinh nghiệm chơi, muốn hướng dẫn người mới",
    description: "Phương pháp giảng dạy kỹ thuật cơ bản và tổ chức buổi tập an toàn.",
    topics: ["Kỹ thuật cơ bản", "Tổ chức buổi tập", "An toàn trên sân"],
    schedule: "09–11.01.2027",
    duration: "3 ngày",
    dateBlock: { day: "09–11", monthYear: "01.2027" },
    location: "Đà Nẵng",
    status: "upcoming",
    ctaLabel: "Xem chi tiết",
    illustrative: true,
  },
  {
    id: "ky-thuat-phuong-phap",
    slug: "tap-huan-ky-thuat-phuong-phap",
    anchor: "tap-huan-ky-thuat-phuong-phap",
    name: "Tập huấn kỹ thuật và phương pháp huấn luyện",
    audience: "HLV đang hoạt động tại câu lạc bộ",
    description: "Cập nhật bài tập kỹ thuật, phương pháp sửa lỗi và theo dõi tiến bộ người học.",
    topics: ["Bài tập kỹ thuật", "Sửa lỗi phổ biến", "Theo dõi tiến bộ"],
    schedule: "05–06.02.2027",
    duration: "2 ngày",
    dateBlock: { day: "05–06", monthYear: "02.2027" },
    location: "Cần Thơ",
    status: "open",
    ctaLabel: "Đăng ký",
    illustrative: true,
  },
  {
    id: "hoi-thao-chuyen-mon",
    slug: "hoi-thao-chuyen-mon-pickleball",
    anchor: "hoi-thao-chuyen-mon-pickleball",
    name: "Hội thảo chuyên môn Pickleball",
    audience: "Trọng tài, HLV, ban tổ chức và cộng đồng chuyên môn",
    description: "Chia sẻ kinh nghiệm tổ chức giải, điều hành và phát triển chuyên môn địa phương.",
    topics: ["Tổ chức giải", "Phối hợp trọng tài – ban tổ chức", "Trao đổi thực tiễn"],
    schedule: "18.10.2026",
    duration: "Nửa ngày",
    dateBlock: { day: "18", monthYear: "10.2026" },
    location: "Hà Nội",
    status: "completed",
    ctaLabel: "Xem chi tiết",
    illustrative: true,
  },
  {
    id: "cap-nhat-quy-dinh",
    slug: "chuong-trinh-cap-nhat-quy-dinh",
    anchor: "chuong-trinh-cap-nhat-quy-dinh",
    name: "Chương trình cập nhật quy định thi đấu",
    audience: "Trọng tài và ban điều hành giải",
    description: "Tóm tắt các điểm cần lưu ý khi áp dụng quy định thi đấu trên hệ thống giải minh họa.",
    topics: ["Điểm cập nhật quy định", "Áp dụng tại giải", "Hỏi đáp tình huống"],
    schedule: "28.03.2027",
    duration: "1 ngày",
    dateBlock: { day: "28", monthYear: "03.2027" },
    location: "Bình Dương",
    status: "upcoming",
    ctaLabel: "Xem chi tiết",
    illustrative: true,
  },
]

export const PREVIEW_TRAINING_COUNT = 3

export const trainingSection = {
  id: "dao-tao",
  title: "Đào tạo & tập huấn",
  description: "Lịch khóa đào tạo và tập huấn chuyên môn Pickleball.",
  empty: "Chưa có chương trình đào tạo được công bố.",
  viewAllLabel: "Xem tất cả chương trình",
  collapseLabel: "Thu gọn danh sách",
  showCompletedLabel: "Hiện chương trình đã kết thúc",
  illustrativeNote: ILLUSTRATIVE_LABEL,
} as const
