export type ValueIcon = "users" | "badge" | "eye" | "sprout" | "globe"

export type CoreValue = {
  id: string
  icon: ValueIcon
  title: string
}

export const aboutVision = {
  eyebrow: "Tầm nhìn – Sứ mệnh",
  title: "Kiến tạo tương lai Pickleball Việt Nam",
  image: "/images/player.jpg",
  imageAlt: "Vận động viên pickleball trên sân ngoài trời.",
  vision: {
    label: "01 / Tầm nhìn",
    title: "Dẫn dắt sự phát triển của Pickleball",
    description:
      "Hướng đến một cộng đồng thể thao phổ biến, chuyên nghiệp và có vị thế trong khu vực.",
  },
  mission: {
    label: "02 / Sứ mệnh",
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
