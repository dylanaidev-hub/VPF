export type Leader = {
  id: string
  name: string
  position: string
  responsibility?: string
  featured?: boolean
  image: string | null
}

export const leadership = {
  eyebrow: "Ban lãnh đạo",
  title: "Ban Chấp hành Liên đoàn",
  cta: "Xem toàn bộ Ban Chấp hành",
  note: "Tên và chức danh là dữ liệu minh họa, không khẳng định chức vụ tại VPF.",
  leaders: [
    {
      id: "le-van-thanh",
      name: "Lê Văn Thành",
      position: "Chủ tịch Liên đoàn",
      featured: true,
      image: null,
    },
    {
      id: "nguyen-minh-anh",
      name: "Nguyễn Minh Anh",
      position: "Phó Chủ tịch",
      responsibility: "Chuyên môn",
      image: null,
    },
    {
      id: "tran-quoc-hung",
      name: "Trần Quốc Hưng",
      position: "Phó Chủ tịch",
      responsibility: "Tổ chức giải đấu",
      image: null,
    },
    {
      id: "pham-duc-long",
      name: "Phạm Đức Long",
      position: "Phó Chủ tịch",
      responsibility: "Phát triển cộng đồng",
      image: null,
    },
  ] satisfies Leader[],
}
