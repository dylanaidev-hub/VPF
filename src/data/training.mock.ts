/**
 * Chương trình đào tạo minh họa.
 * Khi chuyển WordPress: Custom Post Type `training`.
 * Không phải lịch khai giảng chính thức.
 */
export type TrainingProgram = {
  id: string
  slug: string
  anchor: string
  name: string
  audience: string
  description: string
  topics: string[]
  image: string
  imageAlt: string
  illustrative: true
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "co-ban",
    slug: "pickleball-co-ban",
    anchor: "chuong-trinh-co-ban",
    name: "Pickleball Cơ bản",
    audience: "Người mới bắt đầu",
    description: "Làm quen luật chơi, kỹ thuật cơ bản và cách di chuyển trên sân.",
    topics: ["Luật chơi", "Kỹ thuật cơ bản", "Di chuyển"],
    image: "/images/outdoor.jpg",
    imageAlt: "Sân pickleball ngoài trời. Ảnh minh họa cho chương trình cơ bản.",
    illustrative: true,
  },
  {
    id: "trong-tai",
    slug: "dao-tao-trong-tai",
    anchor: "chuong-trinh-trong-tai",
    name: "Đào tạo Trọng tài",
    audience: "Người quan tâm đến công tác trọng tài",
    description: "Ôn luật thi đấu và quy trình điều hành một trận từ lúc vào sân đến lúc kết thúc.",
    topics: ["Luật thi đấu", "Quy trình điều hành trận đấu"],
    image: "/images/match.jpg",
    imageAlt: "Khu vực thi đấu pickleball trong nhà. Ảnh minh họa cho chương trình trọng tài.",
    illustrative: true,
  },
  {
    id: "huan-luyen-vien",
    slug: "boi-duong-huan-luyen-vien",
    anchor: "chuong-trinh-hlv",
    name: "Bồi dưỡng Huấn luyện viên",
    audience: "Người có kinh nghiệm chơi và hướng dẫn Pickleball",
    description: "Phương pháp giảng dạy, cùng các tình huống kỹ thuật và chiến thuật thường gặp.",
    topics: ["Phương pháp giảng dạy", "Kỹ thuật", "Chiến thuật"],
    image: "/images/player.jpg",
    imageAlt: "Người chơi pickleball cầm vợt. Ảnh minh họa cho chương trình huấn luyện viên.",
    illustrative: true,
  },
]
