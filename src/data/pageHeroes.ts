import type { PageHeroProps } from "../components/PageHero"

/** Nội dung hero từng trang. Component không gắn tên trang. */
export type PageHeroConfig = Pick<PageHeroProps, "title" | "description" | "breadcrumbs"> & {
  titleId: string
}

const home = { label: "Trang chủ", href: "/index.html" }

export const pageHeroes = {
  news: {
    titleId: "tin-tuc-trang",
    title: "Tin tức Pickleball",
    description: "Cập nhật những thông tin mới nhất từ Liên đoàn và cộng đồng Pickleball Việt Nam.",
    breadcrumbs: [home, { label: "Tin tức Pickleball" }],
  },
  tournaments: {
    titleId: "giai-dau-trang",
    title: "Hệ thống giải đấu",
    description: "Khám phá các giải đấu Pickleball trên toàn quốc, cập nhật lịch thi đấu và kết quả.",
    breadcrumbs: [home, { label: "Hệ thống giải đấu" }],
  },
  knowledge: {
    titleId: "chuyen-mon-tieu-de",
    title: "Chuyên môn",
    description:
      "Luật thi đấu, hệ thống trọng tài, huấn luyện viên và chương trình đào tạo của Liên đoàn Pickleball Việt Nam.",
    breadcrumbs: [home, { label: "Chuyên môn" }],
  },
  library: {
    titleId: "thu-vien-cong-dong-tieu-de",
    title: "Thư viện & Cộng đồng",
    description:
      "Khám phá tài nguyên nhận diện, hình ảnh, video và mạng lưới đơn vị, vận động viên Pickleball Việt Nam.",
    breadcrumbs: [home, { label: "Thư viện & Cộng đồng" }],
  },
  partnership: {
    titleId: "hop-tac-trang",
    title: "Cùng phát triển phong trào Pickleball Việt Nam",
    description:
      "VPF đồng hành cùng các đối tác, tổ chức và doanh nghiệp để phát triển hệ sinh thái Pickleball chuyên nghiệp và bền vững.",
    breadcrumbs: [home, { label: "Hợp tác" }],
  },
} satisfies Record<string, PageHeroConfig>
