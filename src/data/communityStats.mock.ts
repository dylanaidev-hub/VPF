/**
 * Chỉ số minh họa trên trang Cộng đồng.
 * Khi chuyển WordPress: custom fields, không phải thống kê chính thức.
 */
export type CommunityStat = {
  id: string
  value: number
  suffix: string
  label: string
}

export const communityStats: CommunityStat[] = [
  { id: "players", value: 2500, suffix: "+", label: "Người chơi" },
  { id: "clubs", value: 120, suffix: "+", label: "Câu lạc bộ" },
  { id: "provinces", value: 30, suffix: "+", label: "Tỉnh thành" },
]
