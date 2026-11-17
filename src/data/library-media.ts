import { libraryAlbums, type LibraryAlbum } from "./library.mock"
import type { MediaItem } from "./media.mock"

export function toLibraryMedia(entry: LibraryAlbum): MediaItem {
  const common = {
    id: entry.id,
    slug: entry.id,
    title: entry.title,
    description: entry.description,
    thumbnail: entry.cover,
    imageAlt: entry.coverAlt,
    imagePosition: entry.coverPosition,
    ratio: "16:9",
    date: entry.date ?? "",
    illustrative: entry.illustrative,
  } as const

  return entry.tab === "Video"
    ? { ...common, type: "video", videoUrl: entry.videoUrl }
    : { ...common, type: "album", images: entry.images }
}

// Homepage editorial order. A shot ID promotes an existing album photo on its own.
const homepageSelection: { id: string; shotId?: string }[] = [
  { id: "gd-cong-dong-2026" },
  { id: "gd-hn-2026" },
  { id: "vid-tap-huan" },
  { id: "clb-giao-luu", shotId: "clb-2-3" },
  { id: "clb-cuoi-tuan", shotId: "clb-4-3" },
]

export const featuredLibraryMedia = homepageSelection.flatMap(({ id, shotId }): MediaItem[] => {
  const entry = libraryAlbums.find((album) => album.id === id)
  if (!entry) return []
  const item = toLibraryMedia(entry)
  if (!shotId) return [item]
  if (item.type !== "album") return []

  const shot = item.images.find((image) => image.id === shotId)
  if (!shot) return []
  return [{
    ...item,
    id: shot.id,
    slug: shot.id,
    type: "image",
    title: shot.alt,
    description: shot.caption,
    thumbnail: shot.src,
    imageAlt: shot.alt,
    imagePosition: shot.position,
    category: entry.tab,
  }]
})
