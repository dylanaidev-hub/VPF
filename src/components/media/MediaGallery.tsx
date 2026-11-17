import { useCallback, useMemo, useState } from "react"
import { Images, Play } from "lucide-react"
import {
  isMediaAlbum,
  isMediaImage,
  mediaFilters,
  mediaItems,
  type MediaAlbum,
  type MediaFilter,
  type MediaImage,
  type MediaItem,
  type MediaRatio,
  type MediaShot,
  type MediaVideo,
} from "../../data/media.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { MediaLightbox } from "./MediaLightbox"
import { VideoViewer } from "./VideoViewer"

const pageSize = 12

const filterType = {
  "Hình ảnh": "image",
  Album: "album",
  Video: "video",
} as const

const typeLabel = {
  image: "Hình ảnh",
  album: "Album",
  video: "Video",
} as const

export function MediaGallery() {
  const [filter, setFilter] = useState<MediaFilter>("Tất cả")
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [video, setVideo] = useState<MediaVideo | null>(null)
  const closeVideo = useCallback(() => setVideo(null), [])
  const [lightbox, setLightbox] = useState<{ shots: Array<MediaShot & { title?: string }>; index: number } | null>(null)
  const { ref, shown } = useReveal<HTMLUListElement>()

  const visible = useMemo(
    () => mediaItems.filter((item) => filter === "Tất cả" || item.type === filterType[filter]),
    [filter],
  )
  const shownItems = visible.slice(0, visibleCount)

  const openImage = (item: MediaImage) => {
    setLightbox({ shots: [toShot(item)], index: 0 })
  }

  const openAlbum = (item: MediaAlbum, index = 0) => {
    setLightbox({
      shots: item.images.map((shot) => ({ ...shot, title: item.title })),
      index,
    })
  }

  return (
    <section id="thu-vien" className="page-wrap pb-16 pt-6 md:pt-8" aria-labelledby="thu-vien-tieu-de">
      <h2 id="thu-vien-tieu-de" className="sr-only">
        Thư viện hình ảnh và video
      </h2>

      <div className="media-filters" role="tablist" aria-label="Loại media">
        {mediaFilters.map((item) => {
          const selected = item === filter
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          )
        })}
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {shownItems.length} / {visible.length} mục
      </p>

      {shownItems.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-line bg-paper px-5 py-10 text-center text-base font-medium text-ink">
          Không có nội dung phù hợp.
        </p>
      ) : (
        <ul ref={ref} className="media-gallery mt-4">
          {shownItems.map((item) => (
            <li key={item.id} className={cx("media-rise", shown && "is-in")}>
              <MediaTile
                item={item}
                onOpen={() => {
                  if (isMediaImage(item)) openImage(item)
                  else if (isMediaAlbum(item)) openAlbum(item)
                  else setVideo(item)
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {shownItems.length < visible.length ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink"
            onClick={() => setVisibleCount((count) => count + pageSize)}
          >
            Xem thêm
          </button>
        </div>
      ) : null}

      {video ? <VideoViewer video={video} onClose={closeVideo} /> : null}
      {lightbox ? (
        <MediaLightbox
          shots={lightbox.shots}
          index={lightbox.index}
          onIndex={(index) => setLightbox((current) => (current ? { ...current, index } : current))}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  )
}

function toShot(item: MediaImage): MediaShot & { title: string } {
  return {
    id: item.id,
    src: item.thumbnail,
    alt: item.imageAlt,
    caption: item.description,
    title: item.title,
    position: item.imagePosition,
  }
}

function MediaTile({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  const [width, height] = ratioParts(item.ratio)
  return (
    <button
      type="button"
      className="media-tile"
      aria-label={`${typeLabel[item.type]}. ${item.title}. ${item.description}`}
      onClick={onOpen}
    >
      <span className={cx("media-tile-visual", ratioClass(item.ratio))}>
        <img
          src={sitePath(item.thumbnail)}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          className={cx("media-tile-image", item.imagePosition)}
        />
        {item.type === "album" ? (
          <span className="media-type-mark" aria-hidden>
            <Images className="size-3.5" />
          </span>
        ) : null}
        {item.type === "video" ? (
          <span className="media-type-mark" aria-hidden>
            <Play className="size-3.5" />
          </span>
        ) : null}
        <span className="media-tile-overlay" aria-hidden>
          <span className="media-tile-title">{item.title}</span>
          <span className="media-tile-desc">{item.description}</span>
        </span>
      </span>
    </button>
  )
}

function ratioParts(ratio: MediaRatio): [number, number] {
  const [width, height] = ratio.split(":").map(Number)
  return [width, height]
}

function ratioClass(ratio: MediaRatio) {
  return `media-ratio-${ratio.replace(":", "-")}`
}
