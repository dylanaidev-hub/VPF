import { useTranslation } from "../../i18n"
import { useCallback, useMemo, useState } from "react"
import { CalendarDays, MapPin, Play } from "lucide-react"
import { libraryAlbums, libraryMediaTabs, type LibraryMediaTab } from "../../data/library.mock"
import type { MediaItem } from "../../data/media.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { toLibraryMedia } from "../../data/library-media"
import { MediaViewer } from "../media/MediaViewer"

export function MediaLibrarySection() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<LibraryMediaTab>("Ảnh giải đấu")
  const [selection, setSelection] = useState<MediaItem | null>(null)
  const closeViewer = useCallback(() => setSelection(null), [])
  const { ref, shown } = useReveal<HTMLElement>()

  const visible = useMemo(() => libraryAlbums.filter((item) => item.tab === tab), [tab])

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
            {t("Ảnh & Video")}
          </h2>
          <p className="library-section-lead">{t("Thư viện album giải đấu, câu lạc bộ và video Pickleball.")}</p>
        </div>

        <div className="library-tabs" role="tablist" aria-label={t("Loại media")}>
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
                {t(item)}
              </button>
            )
          })}
        </div>

        <ul className="library-album-grid">
          {visible.map((item) => (
            <li key={item.id}>
              <button type="button" className="library-album-card" onClick={() => setSelection(toLibraryMedia(item))}>
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
                  <span className="library-album-title">{t(item.title)}</span>
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
                          {t(item.location)}
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

      {selection ? <MediaViewer key={selection.id} item={selection} onClose={closeViewer} /> : null}
    </section>
  )
}
