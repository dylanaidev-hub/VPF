/**
 * Bài kiến thức cho trang Chuyên môn.
 * Khi chuyển WordPress: Custom Post Type `knowledge`, category là taxonomy.
 * Không dùng dữ liệu Tin tức.
 */
export type KnowledgeArticle = {
  id: string
  slug: string
  category: string
  title: string
  description: string
  image: string
  imageAlt: string
  featured: boolean
  body: string[]
  illustrative: true
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "bat-dau-choi",
    slug: "nhung-dieu-can-biet-truoc-khi-bat-dau-choi-pickleball",
    category: "Luật thi đấu",
    title: "Những điều cần biết trước khi bắt đầu chơi Pickleball",
    description: "Sân, vợt, bóng và những quy ước cơ bản để buổi chơi đầu tiên diễn ra rõ ràng.",
    image: "/images/player.jpg",
    imageAlt: "Vận động viên pickleball trên sân. Ảnh minh họa cho bài hướng dẫn người mới.",
    featured: true,
    illustrative: true,
    body: [
      "Bài này là hướng dẫn minh họa, không phải giáo trình chính thức của Liên đoàn Pickleball Việt Nam.",
      "Pickleball chơi trên sân nhỏ hơn sân tennis, với lưới thấp và bóng nhựa lỗ. Người mới nên làm quen với đường biên, vùng cấm gần lưới và cách cầm vợt trước khi tính điểm.",
      "Một buổi đầu chỉ cần nắm: bóng phải nảy trước khi đánh ở một số tình huống giao bóng, và hai bên luân phiên giao theo thể thức đã thống nhất trước trận.",
    ],
  },
  {
    id: "ky-thuat-co-ban",
    slug: "5-ky-thuat-co-ban-danh-cho-nguoi-moi",
    category: "Đào tạo",
    title: "5 kỹ thuật cơ bản dành cho người mới",
    description: "Giao bóng, trả giao, volley, cú thứ ba và vị trí đứng sân cho người mới tập.",
    image: "/images/match.jpg",
    imageAlt: "Trận đấu pickleball trong nhà. Ảnh minh họa cho bài kỹ thuật cơ bản.",
    featured: false,
    illustrative: true,
    body: [
      "Năm kỹ thuật dưới đây chỉ để xem cấu trúc một bài hướng dẫn. Đây không phải giáo án chính thức.",
      "Giao bóng dưới tay, trả giao qua lưới, volley ngắn, cú đánh thứ ba từ cuối sân và cách đứng theo cặp là năm mốc thường được dùng khi giới thiệu môn cho người mới.",
    ],
  },
  {
    id: "tinh-diem",
    slug: "cach-tinh-diem-va-xac-dinh-luot-giao-bong",
    category: "Luật thi đấu",
    title: "Cách tính điểm và xác định lượt giao bóng",
    description: "Điểm chỉ được cộng khi đang giao bóng, và lượt giao đổi theo thể thức đã chọn.",
    image: "/images/outdoor.jpg",
    imageAlt: "Pha bóng pickleball ngoài trời. Ảnh minh họa cho bài cách tính điểm.",
    featured: false,
    illustrative: true,
    body: [
      "Phần giải thích này là bản tóm tắt minh họa để xem giao diện, không thay thế luật thi đấu đang có hiệu lực.",
      "Trong thể thức phổ biến, chỉ bên giao bóng mới ghi được điểm. Khi bên giao phạm lỗi, quyền giao chuyển sang bên kia. Số điểm và bên nào đang giao nên được đọc to trước mỗi lượt để cả sân cùng theo dõi.",
    ],
  },
]
