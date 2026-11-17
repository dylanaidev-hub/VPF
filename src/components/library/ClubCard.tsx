import { useTranslation } from "../../i18n"
import { MapPin } from "lucide-react"
import { sitePath } from "../../lib/site"
import { vpfStarPaths } from "../vpfStarPaths"
import "./club-card.css"

const vpfWordmark = "/brand/logo-horizontal-white.svg"

function ClubStar() {
  return (
    <svg className="club-card-star" viewBox="0 0 800 800" fill="none" aria-hidden>
      {vpfStarPaths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export function ClubCard({
  name,
  location,
  logo,
  onOpen,
}: {
  name: string
  location: string
  logo: string
  onOpen: () => void
}) {
  const { t } = useTranslation()
  return (
    <article className="club-card">
      <button type="button" className="club-card-open" onClick={onOpen}>
        <span className="club-card-top">
          <img className="club-card-wordmark" src={sitePath(vpfWordmark)} alt="" width={588} height={219} />
          <ClubStar />
          <span className="club-card-mark">
            <img src={sitePath(logo)} alt="" width={80} height={80} />
          </span>
        </span>
        <span className="club-card-body">
          <span className="club-card-name">{name}</span>
          <span className="club-card-place">
            <MapPin className="club-card-pin" aria-hidden />
            <span>{t(location)}</span>
          </span>
        </span>
      </button>
    </article>
  )
}
