import type { Partner } from "../types"

export const partnership = {
  eyebrow: "Hợp tác",
  title: "Đồng hành cùng Pickleball Việt Nam",
  description:
    "Cùng VPF kết nối cộng đồng yêu thể thao, thúc đẩy phong trào Pickleball và tạo ra những giá trị hợp tác bền vững.",
  cta: "Trở thành đối tác",
  href: "#lien-he",
  image: "/images/player.jpg",
  imageAlt: "Vận động viên pickleball trên sân ngoài trời.",
}

/** Hiện khi toàn bộ logo vẫn là dữ liệu minh họa. */
export const partnersIllustrativeNote =
  "Logo và tên thương hiệu chỉ mang tính minh họa, không đại diện cho đối tác chính thức của VPF."

/**
 * Logo giả định cho bản demo. Không dùng tên hay biểu trưng doanh nghiệp thật.
 * Thay `logoSrc` bằng file chính thức khi có đối tác. Không gắn href nếu chưa có URL.
 */
export const partners: Partner[] = [
  { id: "ace-sports", name: "Ace Sports", logoSrc: "/partners/ace-sports.svg", illustrative: true },
  { id: "rally-club", name: "Rally Club", logoSrc: "/partners/rally-club.svg", illustrative: true },
  { id: "court-pro", name: "Court Pro", logoSrc: "/partners/court-pro.svg", illustrative: true },
  { id: "paddle-one", name: "Paddle One", logoSrc: "/partners/paddle-one.svg", illustrative: true },
  { id: "match-point", name: "Match Point", logoSrc: "/partners/match-point.svg", illustrative: true },
  { id: "play-arena", name: "Play Arena", logoSrc: "/partners/play-arena.svg", illustrative: true },
  { id: "next-serve", name: "Next Serve", logoSrc: "/partners/next-serve.svg", illustrative: true },
  { id: "sport-hub", name: "Sport Hub", logoSrc: "/partners/sport-hub.svg", illustrative: true },
  { id: "victory-court", name: "Victory Court", logoSrc: "/partners/victory-court.svg", illustrative: true },
  { id: "prime-athletics", name: "Prime Athletics", logoSrc: "/partners/prime-athletics.svg", illustrative: true },
  { id: "baseline", name: "Baseline", logoSrc: "/partners/baseline.svg", illustrative: true },
  { id: "netline", name: "Netline", logoSrc: "/partners/netline.svg", illustrative: true },
]
