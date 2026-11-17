import { useTranslation } from "../i18n"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import type { Tournament, TournamentView } from "../types"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { countdownUntil, statusLabel, tournamentEnd, tournamentStart } from "../lib/tournaments"
import { cx } from "../lib/cx"
import { useReducedMotion } from "../lib/useReducedMotion"

export type FeaturedTournamentVariant = "home" | "tournament"

type FeaturedTournamentProps = {
  tournament: Tournament | TournamentView
  variant?: FeaturedTournamentVariant
  showCountdown?: boolean
  showDescription?: boolean
  className?: string
  /** Shared clock from parent (Homepage section). When omitted, the component ticks on its own. */
  now?: Date
}

export function useTournamentClock(enabled = true) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    if (!enabled) return
    let id = 0
    const tick = () => {
      setNow(new Date())
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    }
    id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    return () => window.clearTimeout(id)
  }, [enabled])
  return now
}

function featurePhase(item: Pick<Tournament, "startDate" | "endDate" | "time">, now: Date) {
  if (now.getTime() >= tournamentEnd(item).getTime()) return "finished" as const
  if (now.getTime() >= tournamentStart(item).getTime()) return "ongoing" as const
  return "upcoming" as const
}

export function FeaturedTournament({
  tournament,
  variant = "home",
  showCountdown = true,
  showDescription = false,
  className,
  now: nowProp,
}: FeaturedTournamentProps) {
  const { t } = useTranslation()
  const localNow = useTournamentClock(nowProp === undefined)
  const now = nowProp ?? localNow
  const date = formatEventDate(tournament.startDate, tournament.endDate)
  const phase = featurePhase(tournament, now)
  const remaining = showCountdown && phase === "upcoming" ? countdownUntil(tournamentStart(tournament), now) : null
  const detailHref = sitePath(tournament.detailUrl)
  const place = [tournament.location, tournament.venue].filter(Boolean).join(" · ")

  return (
    <a
      className={cx("vpf-hub-feature", variant === "tournament" && "is-compact", className)}
      href={detailHref}
    >
      <div className="vpf-hub-copy">
        <p
          className={cx(
            "vpf-hub-badge",
            phase === "ongoing" && "is-live",
            phase === "upcoming" && "is-upcoming",
            phase === "finished" && "is-finished",
          )}
        >
          {t(statusLabel[phase])}
        </p>
        <h3>{tournament.name}</h3>
        {showDescription && tournament.summary ? <p className="vpf-hub-desc">{t(tournament.summary)}</p> : null}
        <dl>
          <div>
            <dt>{t("Thời gian")}</dt>
            <dd>
              {date.day} {t(date.month)} {date.year}
              {tournament.time ? (
                <>
                  <span aria-hidden> · </span>
                  {tournament.time}
                </>
              ) : null}
            </dd>
          </div>
          {place ? (
            <div>
              <dt>{t("Địa điểm")}</dt>
              <dd>
                {t(tournament.location)}
                {tournament.venue ? <span className="vpf-hub-venue"> · {tournament.venue}</span> : null}
              </dd>
            </div>
          ) : null}
        </dl>
        {remaining ? (
          <div
            className="vpf-hub-count"
            role="timer"
            aria-label={`Còn ${remaining.days} ngày ${remaining.hours} giờ ${remaining.minutes} phút ${remaining.seconds} giây`}
          >
            <CountUnit value={remaining.days} label={t("Ngày")} />
            <CountUnit value={remaining.hours} label={t("Giờ")} />
            <CountUnit value={remaining.minutes} label={t("Phút")} />
            <CountUnit value={remaining.seconds} label={t("Giây")} />
          </div>
        ) : showCountdown ? (
          <p className="vpf-hub-live">{t(statusLabel[phase])}</p>
        ) : null}
        <span className="vpf-hub-cta">
          {t("Khám phá giải đấu")}
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </div>
      {tournament.coverImage ? (
        <img
          src={sitePath(tournament.coverImage)}
          alt={tournament.coverImageAlt || ""}
          width={1600}
          height={900}
        />
      ) : null}
    </a>
  )
}

function CountUnit({ value, label }: { value: number; label: string }) {
  const { t } = useTranslation()
  const text = String(Math.max(0, value)).padStart(2, "0")
  return (
    <span className="vpf-hub-unit">
      <span className="vpf-hub-digits" aria-hidden>
        <FlipDigit digit={text[0]!} />
        <FlipDigit digit={text[1]!} />
      </span>
      <span className="vpf-hub-unit-label">{t(label)}</span>
    </span>
  )
}

function FlipDigit({ digit }: { digit: string }) {
  const reduce = useReducedMotion()
  const previous = useRef(digit)
  const [frame, setFrame] = useState<{ from: string; to: string } | null>(null)

  useLayoutEffect(() => {
    if (reduce) {
      previous.current = digit
      setFrame(null)
      return
    }
    if (digit === previous.current) return
    const from = previous.current
    previous.current = digit
    setFrame({ from, to: digit })
    const id = window.setTimeout(() => setFrame(null), 700)
    return () => window.clearTimeout(id)
  }, [digit, reduce])

  return (
    <span className="vpf-flap">
      <span className="vpf-flap-face vpf-flap-top">
        <span className="vpf-flap-glyph">{digit}</span>
      </span>
      <span className="vpf-flap-face vpf-flap-bottom">
        <span className="vpf-flap-glyph">{frame ? frame.from : digit}</span>
      </span>
      {frame ? (
        <span className="vpf-flap-play">
          <span className="vpf-flap-face vpf-flap-top vpf-flap-turn">
            <span className="vpf-flap-glyph">{frame.from}</span>
          </span>
          <span
            className="vpf-flap-face vpf-flap-bottom vpf-flap-land"
            onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return
              setFrame(null)
            }}
          >
            <span className="vpf-flap-glyph">{frame.to}</span>
          </span>
        </span>
      ) : null}
    </span>
  )
}
