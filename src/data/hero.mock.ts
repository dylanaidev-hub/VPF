import type { HeroSlide } from "../types"

/**
 * Ba banner minh họa cho trang chủ.
 * Ảnh là ảnh pickleball thật trong bộ asset; nội dung chữ không phải thông cáo chính thức.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "tuong-lai",
    category: "Sự kiện nổi bật",
    title: "Cùng kiến tạo tương lai Pickleball Việt Nam",
    description:
      "Kết nối cộng đồng, phát triển phong trào và nâng tầm Pickleball Việt Nam.",
    image: "/images/outdoor.jpg",
    imageAlt: "Hai người chơi pickleball trong một pha bóng trên sân ngoài trời.",
    objectPosition: "object-[center_40%]",
    primaryCta: { label: "Khám phá VPF", href: "#lien-doan" },
    secondaryCta: { label: "Xem giải đấu", href: "#giai-dau" },
  },
  {
    id: "giai-dau",
    category: "Giải đấu",
    title: "Sẵn sàng cho những trận đấu bùng nổ",
    description:
      "Khám phá các giải đấu Pickleball, nơi hội tụ đam mê, tinh thần thể thao và những màn tranh tài hấp dẫn.",
    image: "/images/match.jpg",
    imageAlt: "Vận động viên thi đấu đôi pickleball trên cụm sân trong nhà.",
    objectPosition: "object-[center_45%]",
    primaryCta: { label: "Xem giải đấu", href: "#giai-dau" },
    secondaryCta: { label: "Khám phá VPF", href: "#lien-doan" },
  },
  {
    id: "cong-dong",
    category: "Cộng đồng",
    title: "Kết nối đam mê, lan tỏa tinh thần thể thao",
    description:
      "Cùng xây dựng cộng đồng Pickleball năng động, gắn kết và phát triển bền vững.",
    image: "/images/player.jpg",
    imageAlt: "Vận động viên cầm vợt pickleball trên sân ngoài trời.",
    objectPosition: "object-[center_18%]",
    primaryCta: { label: "Khám phá cộng đồng", href: "#cong-dong" },
    secondaryCta: { label: "Khám phá VPF", href: "#lien-doan" },
  },
]
