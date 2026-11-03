export type ValueIcon = "users" | "badge" | "eye" | "sprout" | "globe"

export type CoreValue = {
  id: string
  icon: ValueIcon
  title: string
}

export const aboutVision = {
  eyebrow: "Tầm nhìn & sứ mệnh",
  headline: "Không chỉ phát triển một môn thể thao.",
  accent: "Mà kiến tạo một phong trào.",
  image: "/images/match.jpg",
  imageAlt: "Các trận đấu đôi pickleball trên cụm sân trong nhà, nhìn từ trên khán đài. Ảnh minh họa.",
  vision: {
    number: "01",
    label: "Tầm nhìn",
    title: "Vươn tầm khu vực.",
    description:
      "Hướng đến một cộng đồng thể thao phổ biến, chuyên nghiệp và có vị thế trong khu vực.",
  },
  mission: {
    number: "02",
    label: "Sứ mệnh",
    title: "Kết nối. Phát triển. Hội nhập.",
    description:
      "Kết nối cộng đồng, nâng cao chuyên môn và phát triển phong trào Pickleball trên toàn quốc.",
  },
  valuesTitle: "Những giá trị định hướng VPF",
  values: [
    { id: "community", icon: "users", title: "Kết nối cộng đồng" },
    { id: "professional", icon: "badge", title: "Chuyên nghiệp" },
    { id: "transparent", icon: "eye", title: "Minh bạch" },
    { id: "sustainable", icon: "sprout", title: "Phát triển bền vững" },
    { id: "international", icon: "globe", title: "Hội nhập quốc tế" },
  ] satisfies CoreValue[],
}
