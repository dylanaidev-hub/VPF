import { useMemo, useState } from "react"
import { CalendarDays, MapPin, Play } from "lucide-react"
import { libraryAlbums, libraryMediaTabs, type LibraryAlbum, type LibraryMediaTab } from "../../data/library.mock"
import type { MediaAlbum, MediaShot } from "../../data/media.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { AlbumViewer } from "../media/AlbumViewer"
import { MediaLightbox } from "../media/MediaLightbox"
import { Dialog } from "../Dialog"

export function MediaLibrarySection() {
  const [tab, setTab] = useState<LibraryMediaTab>("Ảnh giải đấu")
  const [album, setAlbum] = useState<LibraryAlbum | null>(null)
  const [lightbox, setLightbox] = useState<{ shots: Array<MediaShot & { title?: string }>; index: number } | null>(
    null,
  )
  const [videoNote, setVideoNote] = useState<LibraryAlbum | null>(null)
  const { ref, shown } = useReveal<HTMLElement>()

  const visible = useMemo(() => libraryAlbums.filter((item) => item.tab === tab), [tab])

  const openAlbum = (item: LibraryAlbum) => {
    if (item.tab === "Video") {
      setVideoNote(item)
      return
    }
    setAlbum(item)
  }

  const asMediaAlbum = (item: LibraryAlbum): MediaAlbum => ({
    id: item.id,
    slug: item.id,
    title: item.title,
    description: item.description,
    type: "album",
    thumbnail: item.cover,
    imageAlt: item.coverAlt,
    imagePosition: item.coverPosition,
    ratio: "16:9",
    date: item.date ?? "",
    images: item.images,
    illustrative: true,
  })

  return (
    <section
      id="anh-video"
      ref={ref}
      className={cx("library-section library-media library-rise", shown && "is-in")}
      aria-labelledby="anh-video-tieu-de"
    >
      <div className="page-wrap">
        <div className="library-section-head">
          <h2 id="anh-video-tieu-de" className="library-section-title">
            Ảnh & Video
          </h2>
          <p className="library-section-lead">Thư viện album giải đấu, câu lạc bộ và video minh họa.</p>
          <p className="library-note">Album và video dưới đây là dữ liệu minh họa — không phải tư liệu chính thức.</p>
        </div>

        <div className="library-tabs" role="tablist" aria-label="Loại media">
          {libraryMediaTabs.map((item) => {
            const selected = item === tab
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cx("library-tab", selected && "is-active")}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            )
          })}
        </div>

        <ul className="library-album-grid">
          {visible.map((item) => (
            <li key={item.id}>
              <button type="button" className="library-album-card" onClick={() => openAlbum(item)}>
                <span className="library-album-cover">
                  <img
                    src={sitePath(item.cover)}
                    alt=""
                    width={640}
                    height={400}
                    loading="lazy"
                    className={cx("library-album-img", item.coverPosition)}
                  />
                  {item.tab === "Video" ? (
                    <span className="library-album-play" aria-hidden>
                      <Play className="size-5" />
                    </span>
                  ) : null}
                </span>
                <span className="library-album-body">
                  <span className="library-album-title">{item.title}</span>
                  <span className="library-album-meta">{item.countLabel}</span>
                  {item.date || item.location ? (
                    <span className="library-album-facts">
                      {item.date ? (
                        <span>
                          <CalendarDays className="size-3.5" aria-hidden />
                          {item.date}
                        </span>
                      ) : null}
                      {item.location ? (
                        <span>
                          <MapPin className="size-3.5" aria-hidden />
                          {item.location}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {album ? (
        <AlbumViewer
          album={asMediaAlbum(album)}
          paused={lightbox !== null}
          onClose={() => setAlbum(null)}
          onOpenShot={(_shot, index) =>
            setLightbox({
              shots: album.images.map((image) => ({ ...image, title: album.title })),
              index,
            })
          }
        />
      ) : null}

      {lightbox ? (
        <MediaLightbox
          shots={lightbox.shots}
          index={lightbox.index}
          onIndex={(index) => setLightbox((current) => (current ? { ...current, index } : current))}
          onClose={() => setLightbox(null)}
        />
      ) : null}

      <Dialog open={videoNote !== null} title={videoNote?.title ?? "Video"} onClose={() => setVideoNote(null)}>
        {videoNote ? (
          <div>
            <p className="text-sm font-medium text-brand-strong">Video minh họa</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">
              Chưa có tệp hoặc nguồn phát hợp lệ. Thẻ này dùng để duyệt giao diện danh mục video.
            </p>
            <p className="mt-3 text-sm text-muted">
              {videoNote.countLabel}
              {videoNote.location ? ` · ${videoNote.location}` : ""}
              {videoNote.date ? ` · ${videoNote.date}` : ""}
            </p>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}
