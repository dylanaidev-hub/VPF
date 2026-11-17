import { useCallback, useState } from "react"
import { ArrowRight, Play } from "lucide-react"
import { featuredLibraryMedia } from "../../data/library-media"
import type { MediaItem } from "../../data/media.mock"
import { useTranslation } from "../../i18n"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { SectionHeading } from "../SectionHeading"
import { MediaViewer } from "./MediaViewer"
import "./home-media.css"

const typeLabel = { image: "Ảnh", album: "Album", video: "Video" } as const

export function HomeMediaSection() {
  const { t } = useTranslation()
  const { ref, shown } = useReveal<HTMLUListElement>()
  const [selection, setSelection] = useState<MediaItem | null>(null)
  const closeViewer = useCallback(() => setSelection(null), [])

  if (featuredLibraryMedia.length === 0) return null

  return (
    <section id="anh-video" className="home-media" aria-labelledby="anh-video-tieu-de">
      <div className="page-wrap">
        <SectionHeading
          id="anh-video-tieu-de"
          title="Ảnh & Video"
          subtitle="Khám phá những khoảnh khắc ấn tượng từ các giải đấu và cộng đồng Pickleball Việt Nam."
          action={
            <a className="home-media-link" href={sitePath("/media.html#anh-video")}>
              {t("Xem tất cả")} <ArrowRight aria-hidden size={18} />
            </a>
          }
        />

        <ul ref={ref} className="home-media-grid" data-revealed={shown}>
          {featuredLibraryMedia.map((item) => {
            const label = t(typeLabel[item.type])
            const title = t(item.title)
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="home-media-tile"
                  aria-label={`${label}: ${title}${item.illustrative ? ` · ${t("Nội dung minh họa")}` : ""}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelection(item)}
                >
                  <img src={sitePath(item.thumbnail)} alt="" loading="lazy" className={cx("home-media-image", item.imagePosition)} />
                  {item.type === "video" ? (
                    <span className="home-media-play" aria-hidden>
                      <Play size={18} fill="currentColor" />
                    </span>
                  ) : null}
                  <span className="home-media-caption" aria-hidden>
                    <span className="home-media-type">
                      {label}{item.illustrative ? ` · ${t("Minh họa")}` : ""}
                    </span>
                    <span className="home-media-title">{title}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {selection ? <MediaViewer key={selection.id} item={selection} onClose={closeViewer} /> : null}
    </section>
  )
}
