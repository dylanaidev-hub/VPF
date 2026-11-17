import { useTranslation } from "../i18n"
import type { ReactNode } from "react"
import { Briefcase, ChartColumn, ChevronRight, GraduationCap, MapPin, Target, Trophy, Users } from "lucide-react"
import { cx } from "../lib/cx"
import { sitePath } from "../lib/site"
import { vpfStarPaths } from "./vpfStarPaths"
import "../styles/components/player-card.css"

export type SportsProfileIcon = "users" | "pin" | "chart" | "paddle" | "cap" | "focus"

export type SportsProfileRow = {
  icon: SportsProfileIcon
  text: ReactNode
}

export type SportsProfileHighlight = {
  title: string
  description?: string
  href?: string
  icon: "trophy" | "experience"
}

function PaddleIcon() {
  return (
    <svg className="player-card-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M8.6 2.8c2.7 0 4.8 2.3 4.8 5.2v1.6c0 1.5-1.1 2.8-2.5 3l-.4 6.2H8.2l-.1-6.1C6.2 12.2 4.4 10.6 4.4 9V8c0-2.9 1.9-5.2 4.2-5.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RowIcon({ icon }: { icon: SportsProfileIcon }) {
  if (icon === "paddle") return <PaddleIcon />
  const Icon =
    icon === "users" ? Users : icon === "pin" ? MapPin : icon === "chart" ? ChartColumn : icon === "cap" ? GraduationCap : Target
  return <Icon className="player-card-icon" aria-hidden />
}

function StarField() {
  return (
    <svg className="player-card-stars" viewBox="0 0 800 800" fill="none" aria-hidden>
      {vpfStarPaths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

function HighlightBody({ highlight }: { highlight: SportsProfileHighlight }) {
  const { t } = useTranslation()
  const Icon = highlight.icon === "trophy" ? Trophy : Briefcase
  return (
    <>
      <Icon className="player-card-trophy" aria-hidden />
      <span className="player-card-award-rule" aria-hidden />
      <span className="player-card-award-copy">
        <span className="player-card-award-title">{t(highlight.title)}</span>
        {highlight.description ? <span className="player-card-award-text">{t(highlight.description)}</span> : null}
      </span>
      {highlight.href ? <ChevronRight className="player-card-award-chevron" aria-hidden /> : null}
    </>
  )
}

export function SportsProfileCard({
  name,
  image,
  code,
  rows,
  highlight,
  variant = "default",
  onOpen,
  profileUrl,
}: {
  name: string
  image: string
  code?: string
  rows: SportsProfileRow[]
  highlight?: SportsProfileHighlight
  variant?: "default" | "compact" | "organization"
  onOpen?: () => void
  profileUrl?: string
}) {
  const { t } = useTranslation()
  const compact = variant === "compact"
  const openClass = "player-card-open"

  if (variant === "organization") {
    const mark = (
      <>
        <img className="player-card-mark" src={sitePath(image)} alt="" width={52} height={52} />
        <span className="player-card-body">
          <span className="player-card-name">{name}</span>
          {rows.length > 0 ? (
            <span className="player-card-rows">
              {rows.map((row, index) => (
                <span className="player-card-row" key={index}>
                  <RowIcon icon={row.icon} />
                  <span>{typeof row.text === "string" ? t(row.text) : row.text}</span>
                </span>
              ))}
            </span>
          ) : null}
        </span>
      </>
    )
    const surface =
      onOpen != null ? (
        <button type="button" className={openClass} onClick={onOpen}>
          {mark}
        </button>
      ) : profileUrl ? (
        <a className={openClass} href={sitePath(profileUrl)}>
          {mark}
        </a>
      ) : (
        <div className={openClass}>{mark}</div>
      )

    return <article className="player-card is-organization">{surface}</article>
  }

  const portrait = (
    <span className="player-card-stage">
      <StarField />
      <img className="player-card-logo" src={sitePath("/brand/logo-horizontal-white.svg")} alt="" />
      <img
        className="player-card-photo"
        src={sitePath(image)}
        alt=""
        width={720}
        height={960}
        loading="lazy"
        decoding="async"
      />
    </span>
  )

  const details = (
    <span className="player-card-body">
      <span className="player-card-name">{name}</span>
      {code ? <span className="player-card-code">{code}</span> : null}
      {rows.length > 0 ? (
        <span className="player-card-rows">
          {rows.map((row, index) => (
            <span className="player-card-row" key={index}>
              <RowIcon icon={row.icon} />
              <span>{typeof row.text === "string" ? t(row.text) : row.text}</span>
            </span>
          ))}
        </span>
      ) : null}
    </span>
  )

  const open =
    onOpen != null ? (
      <button type="button" className={openClass} onClick={onOpen}>
        {portrait}
        {details}
      </button>
    ) : profileUrl ? (
      <a className={openClass} href={sitePath(profileUrl)}>
        {portrait}
        {details}
      </a>
    ) : (
      <div className={openClass}>
        {portrait}
        {details}
      </div>
    )

  return (
    <article className={cx("player-card", compact && "is-compact")}>
      {open}
      <div className={highlight ? "player-card-foot" : "player-card-foot is-empty"}>
        {highlight ? (
          highlight.href ? (
            <a className="player-card-award" href={sitePath(highlight.href)}>
              <HighlightBody highlight={highlight} />
            </a>
          ) : (
            <div className="player-card-award">
              <HighlightBody highlight={highlight} />
            </div>
          )
        ) : null}
      </div>
    </article>
  )
}
