/**
 * Thư viện media minh họa cho trang Media.
 * Khi chuyển WordPress: media item và album là Custom Post Type,
 * phân loại là taxonomy, tệp nằm trong Media Library.
 * Không phải tư liệu chính thức của một giải đấu.
 */

export type MediaRatio = "1:1" | "3:4" | "2:3" | "4:3" | "16:9"

export type MediaShot = {
  id: string
  src: string
  alt: string
  caption: string
  position?: string
}

export type MediaImage = {
  id: string
  slug: string
  title: string
  description: string
  type: "image"
  thumbnail: string
  imageAlt: string
  imagePosition?: string
  ratio: MediaRatio
  date: string
  category: string
  illustrative: true
}

export type MediaAlbum = {
  id: string
  slug: string
  title: string
  description: string
  type: "album"
  thumbnail: string
  imageAlt: string
  imagePosition?: string
  ratio: MediaRatio
  date: string
  images: MediaShot[]
  illustrative: true
}

export type MediaVideo = {
  id: string
  slug: string
  title: string
  description: string
  type: "video"
  thumbnail: string
  imageAlt: string
  imagePosition?: string
  ratio: MediaRatio
  date: string
  duration?: string
  /** Chỉ gán khi có tệp hoặc embed hợp lệ. */
  videoUrl?: string
  featured?: boolean
  illustrative: true
}

export type MediaItem = MediaImage | MediaAlbum | MediaVideo

export const mediaFilters = ["Tất cả", "Hình ảnh", "Album", "Video"] as const

export type MediaFilter = (typeof mediaFilters)[number]

const outdoor = "/images/outdoor.jpg"
const match = "/images/match.jpg"
const player = "/images/player.jpg"

export const mediaItems: MediaItem[] = [
  {
    id: "san-ngoai-troi",
    slug: "san-pickleball-ngoai-troi",
    title: "Sân ngoài trời",
    description: "Khung hình minh họa một pha bóng trên sân pickleball ngoài trời.",
    type: "image",
    thumbnail: outdoor,
    imageAlt: "Hai người chơi pickleball trên sân ngoài trời.",
    imagePosition: "object-[center_40%]",
    ratio: "16:9",
    date: "2026-10-18",
    category: "Sân đấu",
    illustrative: true,
  },
  {
    id: "nguoi-choi",
    slug: "van-dong-vien-tren-san",
    title: "Trên sân",
    description: "Chân dung minh họa một vận động viên cầm vợt pickleball.",
    type: "image",
    thumbnail: player,
    imageAlt: "Vận động viên pickleball cầm vợt trên sân.",
    imagePosition: "object-[center_20%]",
    ratio: "2:3",
    date: "2026-10-12",
    category: "Người chơi",
    illustrative: true,
  },
  {
    id: "cum-san",
    slug: "cum-san-trong-nha",
    title: "Cụm sân trong nhà",
    description: "Ảnh minh họa nhiều sân pickleball đang có trận trong nhà.",
    type: "image",
    thumbnail: match,
    imageAlt: "Nhiều sân pickleball trong nhà đang có người thi đấu.",
    imagePosition: "object-[70%_center]",
    ratio: "1:1",
    date: "2026-10-04",
    category: "Thi đấu",
    illustrative: true,
  },
  {
    id: "gan-luoi",
    slug: "pha-bong-gan-luoi",
    title: "Gần lưới",
    description: "Cắt cảnh minh họa từ ảnh sân ngoài trời, tập trung vào khu vực lưới.",
    type: "image",
    thumbnail: outdoor,
    imageAlt: "Góc gần lưới trên sân pickleball ngoài trời.",
    imagePosition: "object-[center_70%]",
    ratio: "4:3",
    date: "2026-09-28",
    category: "Sân đấu",
    illustrative: true,
  },
  {
    id: "album-ngoai-troi",
    slug: "bo-anh-san-ngoai-troi",
    title: "Ngoài trời",
    description: "Bộ ảnh minh họa các góc sân pickleball ngoài trời.",
    type: "album",
    thumbnail: outdoor,
    imageAlt: "Ảnh bìa bộ sưu tập sân pickleball ngoài trời.",
    imagePosition: "object-center",
    ratio: "3:4",
    date: "2026-10-18",
    illustrative: true,
    images: [
      {
        id: "nt-1",
        src: outdoor,
        alt: "Toàn cảnh sân pickleball ngoài trời.",
        caption: "Toàn cảnh sân. Ảnh minh họa.",
        position: "object-center",
      },
      {
        id: "nt-2",
        src: outdoor,
        alt: "Khu vực lưới trên sân pickleball ngoài trời.",
        caption: "Khu vực lưới. Cùng một bức ảnh, góc nhìn khác.",
        position: "object-[center_65%]",
      },
      {
        id: "nt-3",
        src: player,
        alt: "Người chơi pickleball đứng trên sân.",
        caption: "Người chơi trên sân. Ảnh minh họa riêng.",
        position: "object-[center_25%]",
      },
    ],
  },
  {
    id: "video-tran-dau",
    slug: "thuoc-phim-tran-dau",
    title: "Một pha thi đấu",
    description: "Video minh họa. Chưa có tệp để phát.",
    type: "video",
    thumbnail: match,
    imageAlt: "Ảnh bìa cho video trận pickleball trong nhà. Chưa có phim.",
    imagePosition: "object-center",
    ratio: "16:9",
    date: "2026-10-04",
    featured: true,
    illustrative: true,
  },
  {
    id: "vot-va-bong",
    slug: "vot-pickleball",
    title: "Vợt và bóng",
    description: "Cận cảnh minh họa vợt pickleball trong tay vận động viên.",
    type: "image",
    thumbnail: player,
    imageAlt: "Cận cảnh vợt pickleball.",
    imagePosition: "object-[30%_center]",
    ratio: "4:3",
    date: "2026-09-20",
    category: "Người chơi",
    illustrative: true,
  },
  {
    id: "album-trong-nha",
    slug: "bo-anh-ngay-thi-dau-trong-nha",
    title: "Trong nhà",
    description: "Bộ ảnh minh họa không khí một cụm sân pickleball trong nhà.",
    type: "album",
    thumbnail: match,
    imageAlt: "Ảnh bìa bộ sưu tập sân pickleball trong nhà.",
    ratio: "2:3",
    date: "2026-10-04",
    illustrative: true,
    images: [
      {
        id: "tn-1",
        src: match,
        alt: "Dãy sân pickleball trong nhà.",
        caption: "Dãy sân. Ảnh minh họa.",
        position: "object-[20%_center]",
      },
      {
        id: "tn-2",
        src: match,
        alt: "Một sân pickleball phía cuối khu thi đấu.",
        caption: "Sân phía cuối. Cùng một bức ảnh.",
        position: "object-[80%_center]",
      },
      {
        id: "tn-3",
        src: outdoor,
        alt: "Sân pickleball ngoài trời để so sánh không gian.",
        caption: "Một sân ngoài trời trong cùng bộ ảnh minh họa.",
      },
    ],
  },
  {
    id: "duong-bien",
    slug: "duong-bien-san",
    title: "Đường biên",
    description: "Góc sân minh họa, nhìn dọc đường biên pickleball.",
    type: "image",
    thumbnail: outdoor,
    imageAlt: "Đường biên sân pickleball ngoài trời.",
    imagePosition: "object-[80%_center]",
    ratio: "3:4",
    date: "2026-09-14",
    category: "Sân đấu",
    illustrative: true,
  },
  {
    id: "video-giao-luu",
    slug: "thuoc-phim-giao-luu",
    title: "Buổi đánh ngoài trời",
    description: "Video minh họa. Chưa có tệp để phát.",
    type: "video",
    thumbnail: outdoor,
    imageAlt: "Ảnh bìa cho video sân pickleball ngoài trời. Chưa có phim.",
    ratio: "1:1",
    date: "2026-09-28",
    illustrative: true,
  },
  {
    id: "album-nguoi-choi",
    slug: "bo-anh-nguoi-choi",
    title: "Người chơi",
    description: "Bộ ảnh minh họa vận động viên và không khí trên sân.",
    type: "album",
    thumbnail: player,
    imageAlt: "Ảnh bìa bộ sưu tập người chơi pickleball.",
    imagePosition: "object-[center_15%]",
    ratio: "4:3",
    date: "2026-10-12",
    illustrative: true,
    images: [
      {
        id: "nc-1",
        src: player,
        alt: "Vận động viên pickleball nhìn về phía sân.",
        caption: "Trên sân. Ảnh minh họa.",
        position: "object-[center_15%]",
      },
      {
        id: "nc-2",
        src: player,
        alt: "Cận vợt pickleball.",
        caption: "Cận vợt. Cùng một bức ảnh.",
        position: "object-[25%_45%]",
      },
      {
        id: "nc-3",
        src: match,
        alt: "Người chơi ở cụm sân trong nhà.",
        caption: "Trong nhà. Ảnh minh họa khác.",
        position: "object-center",
      },
      {
        id: "nc-4",
        src: outdoor,
        alt: "Pha bóng pickleball ngoài trời.",
        caption: "Ngoài trời. Ảnh minh họa khác.",
        position: "object-[center_40%]",
      },
    ],
  },
  {
    id: "video-khoanh-khac",
    slug: "thuoc-phim-khoanh-khac",
    title: "Khoảnh khắc trên sân",
    description: "Video minh họa. Chưa có tệp để phát.",
    type: "video",
    thumbnail: player,
    imageAlt: "Ảnh bìa cho video người chơi pickleball. Chưa có phim.",
    imagePosition: "object-[center_30%]",
    ratio: "2:3",
    date: "2026-09-20",
    illustrative: true,
  },
  {
    id: "album-tong-hop",
    slug: "bo-anh-khoanh-khac",
    title: "Khoảnh khắc",
    description: "Bộ ảnh gom vài khung hình minh họa đã dùng trên trang.",
    type: "album",
    thumbnail: match,
    imageAlt: "Ảnh bìa bộ sưu tập khoảnh khắc pickleball.",
    imagePosition: "object-[40%_center]",
    ratio: "16:9",
    date: "2026-08-30",
    illustrative: true,
    images: [
      {
        id: "kk-1",
        src: match,
        alt: "Cụm sân pickleball trong nhà.",
        caption: "Trong nhà.",
      },
      {
        id: "kk-2",
        src: outdoor,
        alt: "Sân pickleball ngoài trời.",
        caption: "Ngoài trời.",
      },
      {
        id: "kk-3",
        src: player,
        alt: "Vận động viên pickleball.",
        caption: "Người chơi.",
      },
    ],
  },
  {
    id: "chan-dung",
    slug: "chan-dung-tren-san",
    title: "Chân dung trên sân",
    description: "Cắt dọc từ ảnh vận động viên. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: player,
    imageAlt: "Chân dung vận động viên pickleball, cắt từ ảnh minh họa.",
    imagePosition: "object-[center_10%]",
    ratio: "1:1",
    date: "2026-09-08",
    category: "Người chơi",
    illustrative: true,
  },
  {
    id: "bong-do",
    slug: "bong-do-ngoai-troi",
    title: "Bóng đổ trên sân",
    description: "Góc thấp của sân ngoài trời. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: outdoor,
    imageAlt: "Góc thấp sân pickleball ngoài trời.",
    imagePosition: "object-[center_80%]",
    ratio: "3:4",
    date: "2026-09-02",
    category: "Sân đấu",
    illustrative: true,
  },
  {
    id: "hang-san",
    slug: "hang-san-trong-nha",
    title: "Hàng sân",
    description: "Dải sân trong nhà nhìn ngang. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: match,
    imageAlt: "Hàng sân pickleball trong nhà nhìn ngang.",
    imagePosition: "object-[center_30%]",
    ratio: "16:9",
    date: "2026-08-22",
    category: "Thi đấu",
    illustrative: true,
  },
  {
    id: "tu-the",
    slug: "tu-the-chuan-bi",
    title: "Tư thế chuẩn bị",
    description: "Cắt dọc người chơi cầm vợt. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: player,
    imageAlt: "Vận động viên pickleball trong tư thế chuẩn bị.",
    imagePosition: "object-[60%_center]",
    ratio: "2:3",
    date: "2026-08-16",
    category: "Người chơi",
    illustrative: true,
  },
  {
    id: "goc-san",
    slug: "goc-san-ngoai-troi",
    title: "Góc sân",
    description: "Một góc sân ngoài trời. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: outdoor,
    imageAlt: "Góc sân pickleball ngoài trời.",
    imagePosition: "object-[15%_center]",
    ratio: "4:3",
    date: "2026-08-09",
    category: "Sân đấu",
    illustrative: true,
  },
  {
    id: "khuan-hinh-vuong",
    slug: "khuan-hinh-san-trong-nha",
    title: "Khung hình vuông",
    description: "Cắt vuông cụm sân trong nhà. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: match,
    imageAlt: "Cắt vuông cụm sân pickleball trong nhà.",
    imagePosition: "object-[50%_40%]",
    ratio: "1:1",
    date: "2026-08-02",
    category: "Thi đấu",
    illustrative: true,
  },
  {
    id: "nguoi-choi-doc",
    slug: "nguoi-choi-khung-doc",
    title: "Khung dọc",
    description: "Khung dọc vận động viên. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: player,
    imageAlt: "Khung dọc vận động viên pickleball.",
    imagePosition: "object-[center_35%]",
    ratio: "3:4",
    date: "2026-07-26",
    category: "Người chơi",
    illustrative: true,
  },
  {
    id: "toan-canh",
    slug: "toan-canh-san-ngoai",
    title: "Toàn cảnh sân",
    description: "Toàn cảnh ngang sân ngoài trời. Cùng một bức ảnh minh họa.",
    type: "image",
    thumbnail: outdoor,
    imageAlt: "Toàn cảnh ngang sân pickleball ngoài trời.",
    imagePosition: "object-center",
    ratio: "16:9",
    date: "2026-07-18",
    category: "Sân đấu",
    illustrative: true,
  },
]

export function isMediaImage(item: MediaItem): item is MediaImage {
  return item.type === "image"
}

export function isMediaAlbum(item: MediaItem): item is MediaAlbum {
  return item.type === "album"
}

export function isMediaVideo(item: MediaItem): item is MediaVideo {
  return item.type === "video"
}

export const mediaAlbums = mediaItems.filter(isMediaAlbum)
export const mediaVideos = mediaItems.filter(isMediaVideo)

export type PlayableVideo =
  | { kind: "file"; src: string }
  | { kind: "youtube"; src: string }

/** Chỉ nhận tệp video hoặc embed YouTube. Không tự phát. */
export function playableVideo(url: string | undefined): PlayableVideo | null {
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null
  const host = parsed.hostname.replace(/^www\./, "")
  if (host === "youtu.be") {
    const id = parsed.pathname.split("/").filter(Boolean)[0]
    return id ? { kind: "youtube", src: `https://www.youtube-nocookie.com/embed/${id}?rel=0` } : null
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = parsed.searchParams.get("v")
    return id ? { kind: "youtube", src: `https://www.youtube-nocookie.com/embed/${id}?rel=0` } : null
  }
  if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) return { kind: "file", src: url }
  return null
}
