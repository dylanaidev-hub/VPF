export type Leader = {
  id: string
  name: string
  position: string
  responsibility?: string
  featured?: boolean
  image: string | null
  imageAlt: string
  objectPosition?: string
}

/** Ảnh Pexels (giấy phép miễn phí). Chỉ dùng cho demo, không phải lãnh đạo VPF. */
export const leadership = {
  eyebrow: "Ban lãnh đạo",
  title: "Ban Chấp hành Liên đoàn",
  cta: "Xem toàn bộ Ban Chấp hành",
  note: "Tên, chức danh và ảnh là dữ liệu minh họa, không phải nhân sự chính thức của VPF.",
  leaders: [
    {
      id: "le-van-thanh",
      name: "Lê Văn Thành",
      position: "Chủ tịch Liên đoàn",
      featured: true,
      image: "/images/leadership/le-van-thanh.jpg",
      imageAlt: "Ảnh chân dung minh họa. Không phải Chủ tịch VPF.",
      objectPosition: "center 22%",
    },
    {
      id: "nguyen-minh-anh",
      name: "Nguyễn Minh Anh",
      position: "Phó Chủ tịch",
      responsibility: "Chuyên môn",
      image: "/images/leadership/nguyen-minh-anh.jpg",
      imageAlt: "Ảnh chân dung minh họa. Không phải Phó Chủ tịch VPF.",
      objectPosition: "center 42%",
    },
    {
      id: "tran-quoc-hung",
      name: "Trần Quốc Hưng",
      position: "Phó Chủ tịch",
      responsibility: "Tổ chức giải đấu",
      image: "/images/leadership/tran-quoc-hung.jpg",
      imageAlt: "Ảnh chân dung minh họa. Không phải Phó Chủ tịch VPF.",
      objectPosition: "center 16%",
    },
    {
      id: "pham-duc-long",
      name: "Phạm Đức Long",
      position: "Phó Chủ tịch",
      responsibility: "Phát triển cộng đồng",
      image: "/images/leadership/pham-duc-long.jpg",
      imageAlt: "Ảnh chân dung minh họa. Không phải Phó Chủ tịch VPF.",
      objectPosition: "center 12%",
    },
  ] satisfies Leader[],
}
