import { useTranslation } from "../../../i18n"
import { useMemo, useState } from "react"
import type { TournamentView } from "../../../types"
import { sitePath } from "../../../lib/site"
import { MediaLightbox } from "../../media/MediaLightbox"

export function TournamentMoments({
  tournament,
  embedded = false,
}: {
  tournament: TournamentView
  embedded?: boolean
}) {
  const { t } = useTranslation()
  const gallery = tournament.gallery ?? []
  const [index, setIndex] = useState<number | null>(null)

  const shots = useMemo(
    () =>
      gallery
        .filter((item) => item.type === "image")
        .map((item) => ({
          id: item.id,
          src: item.src,
          alt: item.alt,
          caption: item.alt,
          title: tournament.name,
        })),
    [gallery, tournament.name],
  )

  if (!gallery.length) return null

  return (
    <section className={embedded ? "td-moments is-embedded" : "td-moments"} aria-labelledby="khoanh-khac-giai-tieu-de">
      {embedded ? (
        <h3 id="khoanh-khac-giai-tieu-de" className="td-section-title">
          {t("Khoảnh khắc giải đấu")}
        </h3>
      ) : (
        <div className="td-block-head">
          <div>
            <h2 id="khoanh-khac-giai-tieu-de">{t("Khoảnh khắc giải đấu")}</h2>
            <p>{t("Hình ảnh minh họa từ giải — không phải thư viện chính thức.")}</p>
          </div>
        </div>
      )}
      <ul className="td-moments-grid">
        {gallery.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              className="td-moment"
              onClick={() => setIndex(Math.min(itemIndex, shots.length - 1))}
              aria-label={item.alt}
            >
              <img src={sitePath(item.poster ?? item.src)} alt="" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      {index != null && shots.length ? (
        <MediaLightbox shots={shots} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      ) : null}
    </section>
  )
}
