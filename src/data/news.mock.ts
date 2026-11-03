import type { NewsArticle } from "../types"

const demoNote =
  "Đây là bài viết minh họa cho bản demo trang chủ. Nội dung không phải thông cáo hay phát ngôn chính thức của Liên đoàn Pickleball Việt Nam."

type NewsSource = Omit<NewsArticle, "content" | "publishedAt" | "isFeatured" | "illustrative">

/**
 * Nguồn tin duy nhất cho Homepage và trang Tin tức.
 * Một bài nổi bật, ba bài phụ, sáu bài trending.
 * trendingRank là thứ tự minh họa, không phải lượt xem.
 * Mọi bài đều là dữ liệu minh họa.
 */
const source: NewsSource[] = [
  {
    id: "ra-mat",
    slug: "vpf-ra-mat-ong-le-van-thanh-lam-chu-tich-nhiem-ky-i",
    category: "Tin Liên đoàn",
    title: "VPF ra mắt, ông Lê Văn Thành làm Chủ tịch nhiệm kỳ I",
    date: "2026-07-28",
    excerpt:
      "Đại hội tại Hà Nội bầu Ban Chấp hành 37 người và thông qua Điều lệ cùng phương hướng 2026–2031.",
    body: [
      "Đại hội tại Hà Nội bầu Ban Chấp hành 37 người và thông qua Điều lệ cùng phương hướng 2026–2031.",
      "Bài này dùng làm tin nổi bật trên trang chủ. Tên nhân sự và diễn biến đại hội trong bản demo không thay cho thông cáo chính thức.",
      demoNote,
    ],
    image: "/images/match.jpg",
    imageAlt: "Trận đấu đôi pickleball trên sân trong nhà. Ảnh minh họa cho tin nổi bật.",
    imagePosition: "object-[center_40%]",
    featured: true,
  },
  {
    id: "phat-trien-chuyen-nghiep",
    slug: "pickleball-viet-nam-huong-den-giai-doan-phat-trien-chuyen-nghiep",
    category: "Hoạt động Liên đoàn",
    title: "Pickleball Việt Nam hướng đến giai đoạn phát triển chuyên nghiệp",
    date: "2026-11-02",
    excerpt:
      "Các hoạt động kết nối cộng đồng, nâng cao chất lượng giải đấu và phát triển phong trào tiếp tục được chú trọng.",
    body: [
      "Các hoạt động kết nối cộng đồng, nâng cao chất lượng giải đấu và phát triển phong trào tiếp tục được chú trọng.",
      "Ở giai đoạn này, trọng tâm được mô tả theo hướng xây nền: câu lạc bộ có đầu mối rõ, giải đấu có cách tổ chức thống nhất, và người chơi mới có lối vào cộng đồng gần nơi mình sinh sống.",
      demoNote,
    ],
    image: "/images/outdoor.jpg",
    imageAlt: "Pha đánh bóng pickleball trên sân ngoài trời. Ảnh minh họa.",
    imagePosition: "object-[center_35%]",
    featured: false,
  },
  {
    id: "to-chuc-giai",
    slug: "nhung-nguyen-tac-quan-trong-trong-to-chuc-giai-pickleball",
    category: "Chuyên môn",
    title: "Những nguyên tắc quan trọng trong tổ chức giải Pickleball",
    date: "2026-10-21",
    excerpt:
      "Tìm hiểu các yếu tố cần thiết để tổ chức một giải đấu chuyên nghiệp, minh bạch và hiệu quả.",
    body: [
      "Tìm hiểu các yếu tố cần thiết để tổ chức một giải đấu chuyên nghiệp, minh bạch và hiệu quả.",
      "Một giải chạy ổn thường bắt đầu từ điều lệ rõ, lịch sân công bố sớm, trọng tài thống nhất cách tính điểm, và ban tổ chức có kênh trả lời câu hỏi của vận động viên trước giờ bóng lăn.",
      demoNote,
    ],
    image: "/images/match.jpg",
    imageAlt: "Cụm sân pickleball trong nhà. Ảnh minh họa.",
    imagePosition: "object-[72%_center]",
    featured: false,
  },
  {
    id: "cau-lac-bo",
    slug: "cac-cau-lac-bo-gop-phan-lan-toa-phong-trao-pickleball",
    category: "Cộng đồng",
    title: "Các câu lạc bộ góp phần lan tỏa phong trào Pickleball",
    date: "2026-10-14",
    excerpt:
      "Hoạt động giao lưu và tập luyện thường xuyên giúp kết nối người chơi ở nhiều địa phương.",
    body: [
      "Hoạt động giao lưu và tập luyện thường xuyên giúp kết nối người chơi ở nhiều địa phương.",
      "Câu lạc bộ là nơi người mới mượn vợt, học luật giao bóng và tìm bạn đánh cùng trình. Khi các nhóm này gặp nhau, phong trào không còn nằm ở một vài sân lớn.",
      demoNote,
    ],
    image: "/images/player.jpg",
    imageAlt:
      "Vận động viên pickleball trên sân ngoài trời. Ảnh minh họa, không phải chân dung nhân sự Liên đoàn.",
    imagePosition: "object-[center_15%]",
    featured: false,
  },
  {
    id: "co-so-du-lieu",
    slug: "mot-co-so-du-lieu-cho-hoi-vien-cau-lac-bo-va-giai-dau",
    category: "Chuyên môn",
    title: "Một cơ sở dữ liệu cho hội viên, câu lạc bộ và giải đấu",
    date: "2026-10-30",
    excerpt: "Hồ sơ điện tử, đăng ký thi đấu và danh sách câu lạc bộ được gom về một đầu mối.",
    body: [
      "Hồ sơ điện tử, đăng ký thi đấu và danh sách câu lạc bộ được gom về một đầu mối.",
      "Bài mô tả hướng làm việc của một cơ sở dữ liệu dùng chung. Chưa có hệ thống nào được công bố trên trang này.",
      demoNote,
    ],
    image: "/images/outdoor.jpg",
    imageAlt: "Sân pickleball ngoài trời. Ảnh minh họa.",
    imagePosition: "object-center",
    featured: false,
    isTrending: true,
    trendingRank: 1,
  },
  {
    id: "dao-tao",
    slug: "nang-cao-ky-nang-va-kien-thuc-chuyen-mon-cho-nguoi-choi-pickleball",
    category: "Đào tạo",
    title: "Nâng cao kỹ năng và kiến thức chuyên môn cho người chơi Pickleball",
    date: "2026-10-07",
    excerpt: "Các hoạt động đào tạo góp phần xây dựng nền tảng phát triển bền vững cho bộ môn.",
    body: [
      "Các hoạt động đào tạo góp phần xây dựng nền tảng phát triển bền vững cho bộ môn.",
      "Buổi tập có thể đi từ cách cầm vợt, chọn vị trí ở lưới, đến cách trọng tài công bố tỉ số.",
      demoNote,
    ],
    image: "/images/player.jpg",
    imageAlt: "Vận động viên cầm vợt pickleball. Ảnh minh họa.",
    imagePosition: "object-[center_30%]",
    featured: false,
    isTrending: true,
    trendingRank: 2,
  },
  {
    id: "giai-phong-trao",
    slug: "khong-khi-soi-dong-tai-cac-giai-pickleball-phong-trao",
    category: "Giải đấu",
    title: "Không khí sôi động tại các giải Pickleball phong trào",
    date: "2026-10-28",
    excerpt:
      "Những trận đấu hấp dẫn và tinh thần giao lưu thể thao tạo nên sức hút của các sự kiện Pickleball.",
    body: [
      "Những trận đấu hấp dẫn và tinh thần giao lưu thể thao tạo nên sức hút của các sự kiện Pickleball.",
      "Trên sân phong trào, người chơi thường gặp nhau qua nội dung đôi và đôi nam nữ.",
      demoNote,
    ],
    image: "/images/match.jpg",
    imageAlt: "Trận đấu đôi pickleball trên sân trong nhà. Ảnh minh họa.",
    imagePosition: "object-center",
    featured: false,
    isTrending: true,
    trendingRank: 3,
  },
  {
    id: "quoc-te",
    slug: "theo-doi-luat-va-lich-cua-lien-doan-quoc-te-chau-a",
    category: "Quốc tế",
    title: "Theo dõi luật và lịch của liên đoàn quốc tế, châu Á",
    date: "2026-09-18",
    excerpt: "Bộ luật và lịch thi đấu quốc tế được theo dõi để cộng đồng trong nước có mốc tham chiếu.",
    body: [
      "Bộ luật và lịch thi đấu quốc tế được theo dõi để cộng đồng trong nước có mốc tham chiếu.",
      "Bài không thông báo tư cách thành viên hay thay đổi luật nào đã được Liên đoàn ban hành.",
      demoNote,
    ],
    image: "/images/outdoor.jpg",
    imageAlt: "Hai người chơi pickleball trên sân ngoài trời. Ảnh minh họa.",
    imagePosition: "object-[center_40%]",
    featured: false,
    isTrending: true,
    trendingRank: 4,
  },
  {
    id: "gioi-tre",
    slug: "pickleball-ngay-cang-thu-hut-cong-dong-nguoi-choi-tre",
    category: "Cộng đồng",
    title: "Pickleball ngày càng thu hút cộng đồng người chơi trẻ",
    date: "2026-10-11",
    excerpt: "Nhịp trận ngắn và sân dễ tiếp cận khiến nhiều bạn trẻ tìm đến bộ môn sau giờ học.",
    body: [
      "Nhịp trận ngắn và sân dễ tiếp cận khiến nhiều bạn trẻ tìm đến bộ môn sau giờ học.",
      "Đây là quan sát minh họa về phong trào, không phải số liệu người chơi theo độ tuổi.",
      demoNote,
    ],
    image: "/images/player.jpg",
    imageAlt: "Vận động viên trẻ cầm vợt pickleball. Ảnh minh họa, không xác định danh tính.",
    imagePosition: "object-[center_20%]",
    featured: false,
    isTrending: true,
    trendingRank: 5,
  },
  {
    id: "xu-huong",
    slug: "nhung-xu-huong-phat-trien-pickleball-dang-chu-y",
    category: "Hợp tác",
    title: "Những xu hướng phát triển Pickleball đáng chú ý",
    date: "2026-09-30",
    excerpt: "Sân câu lạc bộ, giải cuối tuần và các buổi tập mở đang định hình cách phong trào lan ra.",
    body: [
      "Sân câu lạc bộ, giải cuối tuần và các buổi tập mở đang định hình cách phong trào lan ra.",
      "Các xu hướng trong bài là giả định để minh họa giao diện, chưa phải báo cáo của Liên đoàn.",
      demoNote,
    ],
    image: "/images/match.jpg",
    imageAlt: "Cụm sân pickleball đang có trận đấu. Ảnh minh họa.",
    imagePosition: "object-[30%_center]",
    featured: false,
    isTrending: true,
    trendingRank: 6,
  },
]

export const news: NewsArticle[] = source.map((article) => ({
  ...article,
  content: article.body,
  publishedAt: article.date,
  isFeatured: article.featured,
  illustrative: true,
}))
