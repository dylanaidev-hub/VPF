import type { Statistic } from "../types"

/**
 * Số liệu demo cho giao diện. Không phải thống kê chính thức của VPF.
 * Khi có số thật, thay `value` và đổi `note`.
 */
const note = "Số liệu minh họa"

export const statistics: Statistic[] = [
  { id: "member-units", label: "Đơn vị thành viên", value: 48, suffix: "+", note },
  { id: "clubs", label: "Câu lạc bộ", value: 350, suffix: "+", note },
  { id: "events", label: "Giải đấu", value: 120, suffix: "+", note },
]
