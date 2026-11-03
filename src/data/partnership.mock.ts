/**
 * Nội dung minh họa cho trang Hợp tác.
 * Khi chuyển WordPress: đối tác là CPT hoặc Options, hình thức hợp tác là field,
 * biểu mẫu nối form plugin. Ảnh nằm trong Media Library.
 * Không phải cam kết hợp tác chính thức của VPF.
 */

import { Eye, Megaphone, Trophy, Users, type LucideIcon } from "lucide-react"

export type PartnershipBenefit = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export type CooperationType = {
  id: string
  title: string
  description: string
}

export type VerifiedPartner = {
  id: string
  name: string
  logoSrc: string
  verified: true
}

export const partnershipBenefits: PartnershipBenefit[] = [
  {
    id: "nhan-dien",
    title: "Gia tăng nhận diện",
    description: "Thương hiệu xuất hiện cùng hoạt động pickleball theo phạm vi hai bên đã thống nhất.",
    icon: Eye,
  },
  {
    id: "cong-dong",
    title: "Kết nối cộng đồng",
    description: "Tiếp cận người chơi và câu lạc bộ quan tâm môn pickleball qua kênh hợp tác đã chọn.",
    icon: Users,
  },
  {
    id: "su-kien",
    title: "Đồng hành sự kiện",
    description: "Gắn tên với một giải hoặc một hoạt động khi nội dung hiện diện đã được thỏa thuận.",
    icon: Trophy,
  },
  {
    id: "dai-han",
    title: "Hợp tác dài hạn",
    description: "Xây dựng quan hệ theo từng giai đoạn. Chưa có gói quyền lợi cố định được công bố.",
    icon: Megaphone,
  },
]

export const cooperationTypes: CooperationType[] = [
  {
    id: "tai-tro",
    title: "Tài trợ giải đấu",
    description: "Đồng hành một giải hoặc một chuỗi hoạt động. Hạng mục hiện diện được thỏa thuận riêng, chưa có bảng giá công khai.",
  },
  {
    id: "chien-luoc",
    title: "Đối tác chiến lược",
    description: "Phối hợp ở mức chương trình, qua nhiều hoạt động trong một giai đoạn, theo năng lực của mỗi bên.",
  },
  {
    id: "truyen-thong",
    title: "Đối tác truyền thông",
    description: "Cùng sản xuất hoặc phân phối nội dung về pickleball. Phạm vi kênh và hình ảnh cần được thống nhất trước.",
  },
  {
    id: "chuyen-mon",
    title: "Đối tác chuyên môn",
    description: "Hỗ trợ đào tạo, trang thiết bị hoặc vận hành. Mức độ tham gia phụ thuộc năng lực thực tế, không phải một quyền lợi mẫu.",
  },
]

export const partnershipTypeOptions = [
  "Tài trợ giải đấu",
  "Đối tác chiến lược",
  "Đối tác truyền thông",
  "Đối tác chuyên môn",
  "Khác",
] as const

/** Chỉ đưa logo vào mảng này khi VPF đã xác nhận đối tác. */
export const verifiedPartners: VerifiedPartner[] = []
