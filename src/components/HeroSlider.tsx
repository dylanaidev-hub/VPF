import { useEffect, useState } from "react"
import type { KeyboardEvent, ReactNode } from "react"
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react"
import type { HeroSlide } from "../types"
import { cx } from "../lib/cx"
import { sitePath } from "../lib/site"
import { useReducedMotion } from "../lib/useReducedMotion"
import { Button } from "./Button"

const INTERVAL = 7000

export function HeroSlider({
  slides,
  suspended = false,
}: {
  slides: HeroSlide[]
  suspended?: boolean
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(!reduce)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [entered, setEntered] = useState(false)
  const slide = slides[index]
  const multi = slides.length > 1

  useEffect(() => {
    if (reduce) setAutoplay(false)
  }, [reduce])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEntered(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!autoplay || suspended || hidden || hovered || !multi) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, INTERVAL)
    return () => window.clearInterval(timer)
  }, [autoplay, suspended, hidden, hovered, multi, slides.length])

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  const go = (direction: number) => {
    setIndex((current) => (current + direction + slides.length) % slides.length)
  }

  const onControlKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      go(-1)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      go(1)
    }
  }

  return (
    <section
      className={cx("vpf-hero", entered && "is-ready", reduce && "is-reduced")}
      aria-roledescription="trình chiếu"
      aria-label="The Spirit of Pickleball"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="vpf-hero-stage" aria-hidden>
        {slides.map((item, itemIndex) => (
          <div
            key={item.id}
            className={cx("vpf-hero-slide", itemIndex === index && "is-active")}
          >
            <div className="vpf-hero-media">
              <picture>
                {item.imageMobileWebp ? (
                  <source
                    media="(max-width: 767px)"
                    srcSet={sitePath(item.imageMobileWebp)}
                    type="image/webp"
                  />
                ) : null}
                {item.imageWebp ? (
                  <source srcSet={sitePath(item.imageWebp)} type="image/webp" />
                ) : null}
                <img
                  src={sitePath(item.image)}
                  alt={itemIndex === index ? item.imageAlt : ""}
                  width={2000}
                  height={1333}
                  className={cx("vpf-hero-image", item.objectPosition)}
                  loading={itemIndex === 0 ? "eager" : "lazy"}
                  fetchPriority={itemIndex === 0 ? "high" : "auto"}
                  decoding={itemIndex === 0 ? "sync" : "async"}
                  aria-hidden={itemIndex === index ? undefined : true}
                />
              </picture>
            </div>
          </div>
        ))}
        <div className="vpf-hero-overlay" />
        <div className="vpf-hero-overlay-bottom" />
      </div>

      <div className="vpf-hero-content">
        <div key={slide.id} className="page-wrap">
          <div className="vpf-hero-copy">
            <p className="vpf-hero-eyebrow">{slide.eyebrow}</p>
            <h1 className="vpf-hero-title">
              {slide.titleLines.map((line, lineIndex) => (
                <span key={`${slide.id}-line-${lineIndex}`} className="vpf-hero-line">
                  {line.map((part) => (
                    <span
                      key={`${part.text}-${part.accent ? "a" : "t"}`}
                      className={part.accent ? "vpf-hero-accent" : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="vpf-hero-desc">{slide.description}</p>
            <div className="vpf-hero-cta">
              <Button href={slide.primaryCta.href}>{slide.primaryCta.label}</Button>
              <Button href={slide.secondaryCta.href} variant="outline">
                {slide.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {multi ? (
        <div className="vpf-hero-controls">
          <div className="page-wrap flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Chọn banner">
              {slides.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-label={`Banner ${itemIndex + 1}: ${item.title}`}
                  className={cx(
                    "h-2 rounded-full transition-all motion-reduce:transition-none",
                    itemIndex === index ? "w-7 bg-brand" : "w-2 bg-white/75 hover:bg-white",
                  )}
                  onClick={() => setIndex(itemIndex)}
                />
              ))}
            </div>
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Điều khiển trình chiếu"
              onKeyDown={onControlKeyDown}
            >
              <ControlButton label="Banner trước" onClick={() => go(-1)}>
                <ArrowLeft className="size-4" aria-hidden />
              </ControlButton>
              <ControlButton
                label={autoplay ? "Tạm dừng trình chiếu" : "Tiếp tục trình chiếu"}
                pressed={!autoplay}
                onClick={() => setAutoplay((value) => !value)}
              >
                {autoplay ? (
                  <Pause className="size-4" aria-hidden />
                ) : (
                  <Play className="size-4" aria-hidden />
                )}
              </ControlButton>
              <ControlButton label="Banner sau" onClick={() => go(1)}>
                <ArrowRight className="size-4" aria-hidden />
              </ControlButton>
            </div>
          </div>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Banner {index + 1} trên {slides.length}: {slide.title}
      </p>
    </section>
  )
}

function ControlButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string
  pressed?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-white/40 bg-white/15 text-white transition-colors hover:bg-white hover:text-ink"
    >
      {children}
    </button>
  )
}
