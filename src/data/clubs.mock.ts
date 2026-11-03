/**
 * Câu lạc bộ minh họa cho trang Cộng đồng.
 * Khi chuyển WordPress: Custom Post Type `club`.
 * Tỉnh / thành phố và loại hình có thể thành taxonomy hoặc custom field.
 * Không phải danh sách CLB đã được VPF công nhận.
 */
export const clubKinds = ["Tất cả", "Câu lạc bộ", "Cộng đồng"] as const

export type ClubKind = (typeof clubKinds)[number]

export type Club = {
  id: string
  slug: string
  name: string
  city: string
  kind: Exclude<ClubKind, "Tất cả">
  description: string
  /** Từ khóa thêm để tìm có dấu và không dấu, kể cả tên địa phương. */
  searchText: string
  focus: string
  rhythm: string
  image: string
  imageAlt: string
  illustrative: true
}

export const clubs: Club[] = [
  {
    id: "saigon",
    slug: "saigon-pickleball-club",
    name: "Saigon Pickleball Club",
    city: "TP. Hồ Chí Minh",
    kind: "Câu lạc bộ",
    description: "Nhóm chơi cố định tại thành phố, dành cho người muốn tìm bạn đánh cùng trong tuần.",
    searchText: "Sài Gòn Saigon Hồ Chí Minh",
    focus: "Giao lưu sau giờ làm và người mới làm quen sân.",
    rhythm: "Vài buổi trong tuần. Lịch này chỉ để xem giao diện.",
    image: "/images/match.jpg",
    imageAlt: "Cụm sân pickleball trong nhà. Ảnh minh họa, không phải sân của Saigon Pickleball Club.",
    illustrative: true,
  },
  {
    id: "hanoi",
    slug: "hanoi-pickleball-community",
    name: "Hanoi Pickleball Community",
    city: "Hà Nội",
    kind: "Cộng đồng",
    description: "Nhóm mở để người chơi ở Hà Nội tìm sân, tìm cặp và làm quen luật giao bóng.",
    searchText: "Hà Nội Ha Noi Hanoi",
    focus: "Kết nối người mới và người đã chơi được vài tháng.",
    rhythm: "Cuối tuần. Không phải lịch sinh hoạt chính thức.",
    image: "/images/outdoor.jpg",
    imageAlt: "Sân pickleball ngoài trời. Ảnh minh họa, không phải sân của Hanoi Pickleball Community.",
    illustrative: true,
  },
  {
    id: "danang",
    slug: "da-nang-pickleball-club",
    name: "Da Nang Pickleball Club",
    city: "Đà Nẵng",
    kind: "Câu lạc bộ",
    description: "Điểm hẹn minh họa cho người chơi miền Trung muốn đánh theo nhóm nhỏ.",
    searchText: "Đà Nẵng Da Nang",
    focus: "Tập kỹ thuật cơ bản và đánh đôi.",
    rhythm: "Buổi tối trong tuần. Dữ liệu minh họa.",
    image: "/images/player.jpg",
    imageAlt: "Người chơi pickleball cầm vợt. Ảnh minh họa, không phải thành viên Da Nang Pickleball Club.",
    illustrative: true,
  },
  {
    id: "cantho",
    slug: "can-tho-pickleball-club",
    name: "Can Tho Pickleball Club",
    city: "Cần Thơ",
    kind: "Câu lạc bộ",
    description: "Nhóm địa phương để người ở Cần Thơ tìm sân và bạn tập cùng trình độ.",
    searchText: "Cần Thơ Can Tho",
    focus: "Buổi tập mở cho người mới.",
    rhythm: "Sáng cuối tuần. Không phải lịch công bố.",
    image: "/images/outdoor.jpg",
    imageAlt: "Pha bóng pickleball ngoài trời. Ảnh minh họa cho Can Tho Pickleball Club.",
    illustrative: true,
  },
  {
    id: "haiphong",
    slug: "hai-phong-pickleball-club",
    name: "Hai Phong Pickleball Club",
    city: "Hải Phòng",
    kind: "Câu lạc bộ",
    description: "Nhóm chơi phong trào, phù hợp người muốn đánh đều mỗi tuần tại Hải Phòng.",
    searchText: "Hải Phòng Hai Phong",
    focus: "Giữ nhịp đánh đôi và giao lưu nội bộ.",
    rhythm: "Hai buổi mỗi tuần. Chỉ là ví dụ trên giao diện.",
    image: "/images/match.jpg",
    imageAlt: "Trận đấu pickleball trong nhà. Ảnh minh họa cho Hai Phong Pickleball Club.",
    illustrative: true,
  },
  {
    id: "nhatrang",
    slug: "nha-trang-pickleball-community",
    name: "Nha Trang Pickleball Community",
    city: "Khánh Hòa",
    kind: "Cộng đồng",
    description: "Nhóm mở tại Nha Trang cho người sống ở Khánh Hòa và khách muốn đánh thử.",
    searchText: "Nha Trang Khánh Hòa Khanh Hoa",
    focus: "Buổi đánh thử cho người mới đến thành phố.",
    rhythm: "Cuối tuần. Chưa có lịch đăng ký.",
    image: "/images/player.jpg",
    imageAlt: "Vận động viên pickleball trên sân. Ảnh minh họa cho Nha Trang Pickleball Community.",
    illustrative: true,
  },
]

export const clubCities = ["Tất cả", ...clubs.map((club) => club.city)]
