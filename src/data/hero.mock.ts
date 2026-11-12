import type { HeroSlide } from "../types"

/**
 * Banner minh họa trang chủ — concept The Spirit of Pickleball.
 * Ảnh pickleball thật trong bộ asset; chữ không phải thông cáo chính thức.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "spirit",
    eyebrow: "VIETNAM PICKLEBALL FEDERATION",
    title: "Kết nối đam mê. Vươn tầm Pickleball.",
    titleLines: [
      [
        { text: "KẾT NỐI " },
        { text: "ĐAM MÊ.", accent: true },
      ],
      [
        { text: "VƯƠN TẦM " },
        { text: "PICKLEBALL.", accent: true },
      ],
    ],
    description:
      "Cùng phát triển cộng đồng Pickleball Việt Nam chuyên nghiệp, năng động và bền vững.",
    image: "/images/hero-spirit.jpg",
    imageWebp: "/images/hero-spirit.webp",
    imageMobileWebp: "/images/hero-spirit-mobile.webp",
    imageAlt: "Pha bóng pickleball cận cảnh với vợt và bóng vàng trên sân xanh ngoài trời.",
    objectPosition: "object-[center_45%]",
    primaryCta: { label: "Khám phá VPF", href: "/liendoan.html" },
    secondaryCta: { label: "Xem giải đấu", href: "/giaidau.html" },
  },
  {
    id: "arena",
    eyebrow: "VIETNAM PICKLEBALL FEDERATION",
    title: "Đấu trường bùng nổ. Tinh thần thể thao.",
    titleLines: [
      [
        { text: "ĐẤU TRƯỜNG " },
        { text: "BÙNG NỔ.", accent: true },
      ],
      [
        { text: "TINH THẦN " },
        { text: "THỂ THAO.", accent: true },
      ],
    ],
    description:
      "Nơi hội tụ đam mê, tranh tài chuyên nghiệp và lan tỏa tinh thần Pickleball Việt Nam.",
    image: "/images/outdoor.jpg",
    imageWebp: "/images/outdoor.webp",
    imageMobileWebp: "/images/outdoor-mobile.webp",
    imageAlt: "Hai người chơi pickleball trong một pha bóng trên sân ngoài trời.",
    objectPosition: "object-[center_40%]",
    primaryCta: { label: "Khám phá VPF", href: "/liendoan.html" },
    secondaryCta: { label: "Xem giải đấu", href: "/giaidau.html" },
  },
  {
    id: "community",
    eyebrow: "VIETNAM PICKLEBALL FEDERATION",
    title: "Kết nối cộng đồng. Nâng tầm Việt Nam.",
    titleLines: [
      [
        { text: "KẾT NỐI " },
        { text: "CỘNG ĐỒNG.", accent: true },
      ],
      [
        { text: "NÂNG TẦM " },
        { text: "VIỆT NAM.", accent: true },
      ],
    ],
    description:
      "Gắn kết người chơi, phát triển hoạt động chuyên môn và vươn tầm quốc tế.",
    image: "/images/player.jpg",
    imageWebp: "/images/player.webp",
    imageAlt: "Vận động viên cầm vợt pickleball trên sân ngoài trời.",
    objectPosition: "object-[center_22%]",
    primaryCta: { label: "Khám phá VPF", href: "/liendoan.html" },
    secondaryCta: { label: "Xem giải đấu", href: "/giaidau.html" },
  },
]
