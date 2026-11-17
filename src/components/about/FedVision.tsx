import { useTranslation } from "../../i18n"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { federationVision } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReducedMotion } from "../../lib/useReducedMotion"
import { useReveal } from "../../lib/useReveal"
import { vpfStarPaths } from "../vpfStarPaths"

const STAR_VIEW = 800
/** stroke-opacity from /public/brand/pattern-star.svg, inner outline first. */
const STAR_INK = [1, 0.74, 0.54, 0.38, 0.26, 0.16, 0.09]
const CLIP_ID = "vpf-fed-star-clip"
const OPEN_AT = 520
const RETURN_MS = 380
const RESTORE_MS = 420
const TIPS_MS = 360 + 80 * 4

type Point = { x: number; y: number }
type Place = "top" | "right" | "down-right" | "down-left" | "left"
type Phase = "idle" | "enter" | "open" | "return" | "shrink" | "tips"

function outerTips(path: string): Point[] {
  const points = [...path.matchAll(/[ML]\s+([\d.]+)\s+([\d.]+)/g)].map((match) => ({
    x: Number(match[1]),
    y: Number(match[2]),
  }))
  return points.filter((_, index) => index % 2 === 0)
}

function placeFor(tip: Point, center: Point): Place {
  const dx = tip.x - center.x
  const dy = tip.y - center.y
  if (dy < 0 && Math.abs(dx) < Math.abs(dy)) return "top"
  if (dx > 0 && dy < 0) return "right"
  if (dx > 0) return "down-right"
  if (dy > 0) return "down-left"
  return "left"
}

function useCompactStar() {
  const [compact, setCompact] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false,
  )

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return compact
}

export function FedVision() {
  const { t } = useTranslation()
  const reveal = useReveal<HTMLElement>()
  const story = useReveal<HTMLDivElement>()
  const compact = useCompactStar()
  const reduce = useReducedMotion()
  const [hot, setHot] = useState<number | null>(null)
  const [keyword, setKeyword] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [swap, setSwap] = useState(0)
  const [played, setPlayed] = useState(false)
  const copy = federationVision
  const outerPath = vpfStarPaths[vpfStarPaths.length - 1] ?? ""
  const tips = outerTips(outerPath)
  const center = tips.reduce(
    (point, tip) => ({ x: point.x + tip.x / tips.length, y: point.y + tip.y / tips.length }),
    { x: 0, y: 0 },
  )
  const values = copy.values.map((value, index) => {
    const tip = tips[index] ?? center
    const dx = tip.x - center.x
    const dy = tip.y - center.y
    const length = Math.hypot(dx, dy) || 1
    return {
      ...value,
      tip,
      place: placeFor(tip, center),
      ix: (dx / length) * 14,
      iy: (dy / length) * 14,
    }
  })
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const timers = useRef<number[]>([])
  const generation = useRef(0)
  const current = keyword === null ? null : values[keyword]

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  const later = (ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    if (keyword === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeStory()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const finishClose = (token: number) => {
    if (generation.current !== token) return
    const back = triggerRef.current
    triggerRef.current = null
    setPhase("idle")
    setKeyword(null)
    requestAnimationFrame(() => back?.focus())
  }

  const openStory = (index: number, trigger?: HTMLElement | null) => {
    if (phase !== "idle" || keyword !== null) return
    triggerRef.current = trigger ?? null
    const token = ++generation.current
    clearTimers()
    setSwap(0)
    setPlayed(true)
    setKeyword(index)
    if (reduce) {
      setPhase("open")
      return
    }
    setPhase("enter")
    later(OPEN_AT, () => {
      if (generation.current !== token) return
      setPhase("open")
    })
  }

  const closeStory = () => {
    if (keyword === null || phase === "idle" || phase === "return" || phase === "shrink" || phase === "tips") return
    const token = ++generation.current
    clearTimers()
    if (reduce) {
      setPhase("idle")
      setKeyword(null)
      return
    }
    const textMs = phase === "open" ? RETURN_MS : 40
    setPhase("return")
    later(textMs, () => {
      if (generation.current !== token) return
      setPhase("shrink")
    })
    later(textMs + RESTORE_MS, () => {
      if (generation.current !== token) return
      setKeyword(null)
      setPhase("tips")
    })
    later(textMs + RESTORE_MS + TIPS_MS, () => finishClose(token))
  }

  const stepStory = (direction: number) => {
    if (phase !== "open" || keyword === null) return
    setKeyword((currentIndex) => {
      if (currentIndex === null) return currentIndex
      return (currentIndex + direction + values.length) % values.length
    })
    setSwap((count) => count + 1)
  }

  const telling = phase === "enter" || phase === "open"
  const expanded = telling || phase === "return"
  const select = (index: number) => setHot(index)
  const clear = (index: number) => setHot((currentHot) => (currentHot === index ? null : currentHot))

  return (
    <section
      id={copy.id}
      ref={reveal.ref}
      className={cx("fed-vision", reveal.shown && "is-in", hot !== null && keyword === null && "is-hot")}
      aria-labelledby="tam-nhin-tieu-de"
    >
      <div className="page-wrap">
        <header className="fed-constellation-head">
          <h2 id="tam-nhin-tieu-de">{t(copy.headline)}</h2>
          <p>{t(copy.tagline)}</p>
        </header>
        <div
          className={cx(
            "fed-constellation",
            played && "is-played",
            expanded && "is-story",
            phase === "open" && "is-open",
            phase === "return" && "is-return",
            phase === "shrink" && "is-shrink",
            phase === "tips" && "is-tips",
          )}
        >
          <div className="fed-constellation-stage">
            <div className="fed-constellation-frame">
              <div className="fed-constellation-visual" aria-hidden>
                <svg className="fed-constellation-svg" viewBox={`0 0 ${STAR_VIEW} ${STAR_VIEW}`} fill="none">
                  <defs>
                    <clipPath id={CLIP_ID} clipPathUnits="userSpaceOnUse">
                      <path d={outerPath} />
                    </clipPath>
                  </defs>
                  <g className="fed-star-media" clipPath={`url(#${CLIP_ID})`}>
                    <g className="fed-star-zoom">
                      {values.map((value, index) => (
                        <image
                          key={value.id}
                          className={cx("fed-star-shot", keyword === index && "is-on")}
                          href={sitePath(value.image)}
                          x="0"
                          y="0"
                          width={STAR_VIEW}
                          height={STAR_VIEW}
                          preserveAspectRatio={value.crop}
                        />
                      ))}
                    </g>
                    <rect className="fed-star-shade" x="0" y="0" width={STAR_VIEW} height={STAR_VIEW} />
                  </g>
                  {vpfStarPaths.map((d, index) => (
                    <g key={d} className="fed-constellation-layer" style={{ ["--i" as string]: index }}>
                      <path d={d} style={{ ["--ink" as string]: STAR_INK[index] ?? 1 }} />
                    </g>
                  ))}
                </svg>
              </div>
              <img
                className="fed-constellation-logo"
                src={sitePath("/brand/logo-horizontal-white.svg")}
                alt=""
                width={176}
                height={66}
              />
              {values.map((value, index) => {
                const style = {
                  ["--tip-x" as string]: `${(value.tip.x / STAR_VIEW) * 100}%`,
                  ["--tip-y" as string]: `${(value.tip.y / STAR_VIEW) * 100}%`,
                  ["--i" as string]: index,
                  ["--ix" as string]: value.ix.toFixed(2),
                  ["--iy" as string]: value.iy.toFixed(2),
                }
                const word = (
                  <span className="fed-constellation-label">
                    <span className="fed-constellation-word">{t(value.label)}</span>
                  </span>
                )
                if (compact) {
                  return (
                    <span
                      key={value.id}
                      className={cx("fed-constellation-pin", hot === index && "is-active", keyword === index && "is-chosen")}
                      style={style}
                      aria-hidden
                    >
                      <span className="fed-constellation-dot">{index + 1}</span>
                      {word}
                    </span>
                  )
                }
                return (
                  <button
                    key={value.id}
                    type="button"
                    className={cx("fed-constellation-pin", hot === index && "is-active", keyword === index && "is-chosen")}
                    data-place={value.place}
                    style={style}
                    aria-expanded={keyword === index}
                    onClick={(event) => openStory(index, event.currentTarget)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "touch") return
                      select(index)
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "touch") return
                      if (event.currentTarget === document.activeElement) return
                      clear(index)
                    }}
                    onFocus={() => select(index)}
                    onBlur={() => clear(index)}
                  >
                    <span className="fed-constellation-dot" />
                    {word}
                  </button>
                )
              })}
              {current ? (
                <div className="fed-star-readout" aria-hidden={phase !== "open"}>
                  <p key={`${current.id}-title-${swap}`} className={cx("fed-star-title", swap > 0 && "is-swap")}>
                    {t(current.label)}
                  </p>
                  <p key={`${current.id}-copy-${swap}`} className={cx("fed-star-blurb", swap > 0 && "is-swap")}>
                    {t(current.description)}
                  </p>
                  <p className="fed-sr">{current.imageAlt}</p>
                </div>
              ) : null}
            </div>
            <div className="fed-star-tools" aria-hidden={!telling}>
              <button
                type="button"
                aria-label={t("Giá trị trước")}
                tabIndex={phase === "open" ? 0 : -1}
                disabled={phase !== "open"}
                onClick={() => stepStory(-1)}
              >
                <ChevronLeft aria-hidden size={18} />
              </button>
              <button
                ref={closeRef}
                type="button"
                aria-label={t("Đóng")}
                tabIndex={telling ? 0 : -1}
                disabled={!telling}
                onClick={closeStory}
              >
                <X aria-hidden size={18} />
              </button>
              <button
                type="button"
                aria-label={t("Giá trị sau")}
                tabIndex={phase === "open" ? 0 : -1}
                disabled={phase !== "open"}
                onClick={() => stepStory(1)}
              >
                <ChevronRight aria-hidden size={18} />
              </button>
            </div>
          </div>
          {compact ? (
            <ul className="fed-constellation-list">
              {values.map((value, index) => (
                <li key={value.id}>
                  <button
                    type="button"
                    className={cx(keyword === index && "is-active")}
                    style={{ ["--i" as string]: index }}
                    aria-expanded={keyword === index}
                    onClick={(event) => openStory(index, event.currentTarget)}
                  >
                    <span>{index + 1}</span>
                    {t(value.label)}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={cx("fed-story", story.shown && "is-in")} ref={story.ref}>
          <div className="fed-story-stem" aria-hidden>
            <span />
            <i />
          </div>
          <div className="fed-story-grid">
            <article>
              <p className="fed-story-index">01</p>
              <p className="fed-constellation-kicker">{t(copy.visionLabel)}</p>
              <h3>{t(copy.visionTitle)}</h3>
              <p>{t(copy.vision)}</p>
            </article>
            <article>
              <p className="fed-story-index">02</p>
              <p className="fed-constellation-kicker">{t(copy.missionLabel)}</p>
              <h3>{t(copy.missionTitle)}</h3>
              <p>{t(copy.mission)}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
