import { useState } from "react"
import { mediaAlbums, type MediaAlbum, type MediaShot } from "../../data/media.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { formatViDate } from "../../lib/format"
import { useReveal } from "../../lib/useReveal"
import { AlbumViewer } from "./AlbumViewer"
import { MediaLightbox } from "./MediaLightbox"

export function PhotoAlbums() {
  const [album, setAlbum] = useState<MediaAlbum | null>(null)
  const [lightbox, setLightbox] = useState<{ shots: Array<MediaShot & { title?: string }>; index: number } | null>(null)
  const { ref, shown } = useReveal<HTMLUListElement>()

  return (
    <section className="bg-paper py-14 md:py-16">
      <div className="page-wrap">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Bộ sưu tập ảnh</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Khám phá các bộ ảnh được tổng hợp theo hoạt động và chủ đề.
        </p>
        <ul ref={ref} className="media-albums mt-8">
          {mediaAlbums.map((item, index) => (
            <li
              key={item.id}
              className={cx("media-rise", shown && "is-in")}
              style={{ transitionDelay: shown ? `${index * 80}ms` : undefined }}
            >
              <article className="media-album h-full">
                <div className="media-album-stack">
                  <span className="media-album-sheet media-album-sheet-back" aria-hidden />
                  <span className="media-album-sheet media-album-sheet-mid" aria-hidden />
                  <img
                    src={sitePath(item.thumbnail)}
                    alt={item.imageAlt}
                    loading="lazy"
                    className={cx("media-album-cover", item.imagePosition)}
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {item.images.length} ảnh
                  <span> · </span>
                  <time dateTime={item.date}>{formatViDate(item.date)}</time>
                </p>
                <button
                  type="button"
                  className="mt-3 text-sm font-semibold text-ink"
                  onClick={() => setAlbum(item)}
                >
                  Xem album
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {album ? (
        <AlbumViewer
          album={album}
          paused={lightbox !== null}
          onClose={() => setAlbum(null)}
          onOpenShot={(_shot, index) =>
            setLightbox({
              shots: album.images.map((shot) => ({ ...shot, title: album.title })),
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
    </section>
  )
}
