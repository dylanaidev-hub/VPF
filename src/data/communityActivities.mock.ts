/**
 * Hoạt động cộng đồng minh họa.
 * Khi chuyển WordPress: bài viết hoặc Custom Post Type riêng.
 * Không trùng bài trong news.mock.ts, nên card không gắn link tin.
 */
export type CommunityActivity = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  featured: boolean
  illustrative: true
}

export const communityActivities: CommunityActivity[] = [
  {
    id: "giao-luu-cuoi-tuan",
    title: "Giao lưu Pickleball cuối tuần",
    description: "Buổi đánh mở để người chơi gặp nhau, ghép cặp và làm quen sân gần nơi mình ở.",
    image: "/images/outdoor.jpg",
    imageAlt: "Người chơi pickleball trên sân ngoài trời. Ảnh minh họa cho buổi giao lưu cuối tuần.",
    featured: true,
    illustrative: true,
  },
  {
    id: "ngay-hoi",
    title: "Ngày hội trải nghiệm Pickleball",
    description: "Một ngày để người chưa cầm vợt thử luật giao bóng, cách tính điểm và đánh đôi.",
    image: "/images/match.jpg",
    imageAlt: "Nhiều sân pickleball trong nhà. Ảnh minh họa cho ngày hội trải nghiệm.",
    featured: false,
    illustrative: true,
  },
  {
    id: "ket-noi-clb",
    title: "Hoạt động kết nối các câu lạc bộ",
    description: "Dịp các nhóm ở những thành phố khác nhau gặp nhau để chia sân và cách sinh hoạt.",
    image: "/images/player.jpg",
    imageAlt: "Vận động viên pickleball cầm vợt. Ảnh minh họa cho hoạt động kết nối câu lạc bộ.",
    featured: false,
    illustrative: true,
  },
]
