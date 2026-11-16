/**
 * Hồ sơ vận động viên minh họa cho giao diện.
 * Mã, DUPR và thành tích không phải hồ sơ chính thức của Liên đoàn.
 */

import { tournamentPath } from "../lib/tournaments"

export type PlayerAchievement = {
  title: string
  description?: string
  /** Đường dẫn thật tới trang giải, nếu thành tích gắn với một giải đang có. */
  href?: string
}

export type Player = {
  id: string
  name: string
  image: string
  playerCode?: string
  club?: string
  location?: string
  dupr?: number
  competitionTypes?: string[]
  achievement?: PlayerAchievement
  profileUrl?: string
}

export type PlayerBatch = "Đợt 1" | "Đợt 2" | "Đợt 3"

/** Bản ghi minh họa dùng cho bộ lọc đợt trên trang Thư viện. */
export type CatalogPlayer = Player & {
  category: string
  batch: PlayerBatch
  bio: string
  illustrative: true
}

function feat(description: string, href?: string): PlayerAchievement {
  return { title: "Thành tích nổi bật", description, href }
}

export const players: CatalogPlayer[] = [
  {
    id: "a1",
    name: "Nguyễn Gia Huy",
    image: "/images/athletes/athlete-01.webp",
    playerCode: "VPF000256",
    club: "CLB Pickleball Hà Nội",
    location: "Hà Nội",
    dupr: 4,
    competitionTypes: ["Đơn", "Đôi"],
    achievement: feat("Vô địch Giải VPF Open 2025 - Đôi nam"),
    category: "Đôi nam",
    batch: "Đợt 1",
    bio: "Chơi đơn và đôi tại Hà Nội.",
    illustrative: true,
  },
  {
    id: "a2",
    name: "Trần Ngọc Ánh",
    image: "/images/athletes/athlete-02.webp",
    playerCode: "VPF000188",
    club: "CLB Pickleball Sài Gòn",
    location: "TP. Hồ Chí Minh",
    dupr: 4.2,
    competitionTypes: ["Đơn", "Đôi"],
    achievement: feat("Á quân nội dung đôi nữ, mùa giải phong trào 2025"),
    category: "Đôi nữ",
    batch: "Đợt 1",
    bio: "Chơi đơn và đôi tại TP. Hồ Chí Minh.",
    illustrative: true,
  },
  {
    id: "a3",
    name: "Lê Minh Khoa",
    image: "/images/athletes/athlete-03.webp",
    playerCode: "VPF000314",
    club: "CLB Pickleball Đà Nẵng",
    location: "Đà Nẵng",
    dupr: 3.8,
    competitionTypes: ["Đơn"],
    achievement: feat(
      "Nội dung đơn nam tại Giải Pickleball Giao lưu Đà Nẵng 2026",
      tournamentPath("giao-luu-da-nang-2026"),
    ),
    category: "Đơn nam",
    batch: "Đợt 1",
    bio: "Tập trung nội dung đơn tại Đà Nẵng.",
    illustrative: true,
  },
  {
    id: "a4",
    name: "Phạm Bảo Châu",
    image: "/images/athletes/athlete-04.webp",
    playerCode: "VPF000097",
    club: "CLB Pickleball Hà Nội",
    location: "Hà Nội",
    dupr: 4.6,
    competitionTypes: ["Đôi"],
    category: "Đôi hỗn hợp",
    batch: "Đợt 1",
    bio: "Chơi đôi hỗn hợp tại Hà Nội.",
    illustrative: true,
  },
  {
    id: "a5",
    name: "Hoàng Đức Anh",
    image: "/images/athletes/athlete-05.webp",
    playerCode: "VPF000421",
    club: "CLB Pickleball Hải Phòng",
    location: "Hải Phòng",
    dupr: 4.1,
    competitionTypes: ["Đơn", "Đôi"],
    achievement: feat("Hạng ba nội dung đôi nam, giải giao lưu miền Bắc"),
    category: "Đôi nam",
    batch: "Đợt 2",
    bio: "Chơi đơn và đôi tại Hải Phòng.",
    illustrative: true,
  },
  {
    id: "a6",
    name: "Vũ Thanh Thảo",
    image: "/images/athletes/athlete-06.webp",
    playerCode: "VPF000533",
    club: "CLB Pickleball Cần Thơ",
    location: "Cần Thơ",
    dupr: 3.9,
    competitionTypes: ["Đơn"],
    achievement: feat("Vào bán kết nội dung đơn nữ, giải giao lưu cuối năm"),
    category: "Đơn nữ",
    batch: "Đợt 2",
    bio: "Chơi đơn tại Cần Thơ.",
    illustrative: true,
  },
  {
    id: "a7",
    name: "Đặng Nhật Nam",
    image: "/images/athletes/athlete-07.webp",
    playerCode: "VPF000276",
    club: "CLB Pickleball Bình Dương",
    location: "Bình Dương",
    dupr: 4.4,
    competitionTypes: ["Đôi"],
    achievement: feat("Đồng đội câu lạc bộ tại Giải đồng đội miền Nam 2026"),
    category: "Đôi nam",
    batch: "Đợt 2",
    bio: "Chơi đôi tại Bình Dương.",
    illustrative: true,
  },
  {
    id: "a8",
    name: "Bùi Hà My",
    image: "/images/athletes/athlete-08.webp",
    playerCode: "VPF000612",
    club: "CLB Pickleball Huế",
    location: "Huế",
    dupr: 4,
    competitionTypes: ["Đơn", "Đôi"],
    achievement: feat("Vô địch nội dung đôi nữ, giải giao lưu địa phương"),
    category: "Đôi nữ",
    batch: "Đợt 2",
    bio: "Chơi đơn và đôi tại Huế.",
    illustrative: true,
  },
  {
    id: "a9",
    name: "Ngô Quang Vinh",
    image: "/images/athletes/athlete-09.webp",
    playerCode: "VPF000148",
    club: "CLB Pickleball Khánh Hòa",
    location: "Khánh Hòa",
    dupr: 3.7,
    competitionTypes: ["Đơn"],
    category: "Đơn nam",
    batch: "Đợt 3",
    bio: "Chơi đơn tại Khánh Hòa.",
    illustrative: true,
  },
  {
    id: "a10",
    name: "Đinh Thu Trang",
    image: "/images/athletes/athlete-10.webp",
    playerCode: "VPF000705",
    club: "CLB Pickleball Hà Nội",
    location: "Hà Nội",
    dupr: 4.3,
    competitionTypes: ["Đôi"],
    achievement: feat("Á quân đôi hỗn hợp, giải giao lưu câu lạc bộ"),
    category: "Đôi hỗn hợp",
    batch: "Đợt 3",
    bio: "Chơi đôi hỗn hợp tại Hà Nội.",
    illustrative: true,
  },
]
