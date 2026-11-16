import type { Partner } from "../types"

export const partnership = {
  eyebrow: "Partnership Hub",
  title: "Đồng hành cùng Pickleball Việt Nam",
  description:
    "Cùng VPF kết nối cộng đồng yêu thể thao, thúc đẩy phong trào Pickleball và tạo ra những giá trị hợp tác bền vững.",
  cta: "Trở thành đối tác",
  href: "/hoptac.html#lien-he-hop-tac",
  image: "/images/player.jpg",
  imageAlt: "Vận động viên pickleball trên sân ngoài trời.",
  pillars: [
    { id: "thuong-hieu", label: "Thương hiệu", detail: "Nhận diện cạnh hệ sinh thái Pickleball Việt Nam." },
    { id: "giai-dau", label: "Giải đấu", detail: "Gắn kết với các hoạt động thi đấu trọng điểm." },
    { id: "truyen-thong", label: "Truyền thông", detail: "Lan tỏa nội dung và câu chuyện thương hiệu." },
    { id: "cong-dong", label: "Cộng đồng", detail: "Kết nối câu lạc bộ, người chơi và địa phương." },
  ],
} as const

/** Hiện khi toàn bộ logo vẫn là dữ liệu minh họa. */
export const partnersIllustrativeNote =
  "Logo và tên thương hiệu chỉ mang tính minh họa, không đại diện cho đối tác chính thức của VPF."

/** Ảnh logo thương hiệu. Chỉ để minh họa bố cục, không phải đối tác chính thức. */
export const partners: Partner[] = [
  { id: "ace-sports", name: "Adidas", logoSrc: "/images/partners/adidas.png", illustrative: true },
  { id: "rally-club", name: "Visa", logoSrc: "/images/partners/visa.png", illustrative: true },
  { id: "court-pro", name: "Nike", logoSrc: "/images/partners/nike.png", illustrative: true },
  { id: "paddle-one", name: "Puma", logoSrc: "/images/partners/puma.png", illustrative: true },
  { id: "match-point", name: "Coca-Cola", logoSrc: "/images/partners/coca-cola.png", illustrative: true },
  { id: "play-arena", name: "Samsung", logoSrc: "/images/partners/samsung.png", illustrative: true },
  { id: "next-serve", name: "Red Bull", logoSrc: "/images/partners/redbull.png", illustrative: true },
  { id: "sport-hub", name: "YouTube", logoSrc: "/images/partners/youtube.png", illustrative: true },
  { id: "victory-court", name: "TikTok", logoSrc: "/images/partners/tiktok.png", illustrative: true },
  { id: "prime-athletics", name: "Netflix", logoSrc: "/images/partners/netflix.png", illustrative: true },
  { id: "baseline", name: "Spotify", logoSrc: "/images/partners/spotify.png", illustrative: true },
  { id: "netline", name: "Google", logoSrc: "/images/partners/google.png", illustrative: true },
]
