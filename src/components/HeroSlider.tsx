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
  const slide = slides[index]

  useEffect(() => {
    if (reduce) setAutoplay(false)
  }, [reduce])

  useEffect(() => {
    if (!autoplay || suspended || hidden || slides.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, INTERVAL)
    return () => window.clearInterval(timer)
  }, [autoplay, suspended, hidden, slides.length])

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
      className="relative h-[560px] overflow-hidden bg-ink text-white sm:h-[600px] min-[1200px]:h-[640px]"
      aria-roledescription="trình chiếu"
      aria-label="Sự kiện nổi bật"
    >
      {slides.map((item, itemIndex) => (
        <img
          key={item.id}
          src={sitePath(item.image)}
          alt={itemIndex === index ? item.imageAlt : ""}
          width={2000}
          height={1333}
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none",
            item.objectPosition,
            itemIndex === index ? "opacity-100" : "opacity-0",
          )}
          loading={itemIndex === 0 ? "eager" : "lazy"}
          fetchPriority={itemIndex === 0 ? "high" : "auto"}
          aria-hidden={itemIndex === index ? undefined : true}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(23,25,29,0.9)_0%,rgba(23,25,29,0.72)_28%,rgba(23,25,29,0.28)_58%,rgba(23,25,29,0.12)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,rgba(23,25,29,0.72))]"
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex items-end">
        <div key={slide.id} className="page-wrap w-full pb-24 sm:pb-28">
          <div className="max-w-[680px]">
          <p className="flex items-center gap-3 text-[13px] font-medium text-brand">
            <span className="h-px w-8 bg-brand" aria-hidden />
            {slide.category}
          </p>
          <h1 className="mt-4 max-w-xl text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl min-[1200px]:text-[4rem]">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
            {slide.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={slide.primaryCta.href}>{slide.primaryCta.label}</Button>
            <Button href={slide.secondaryCta.href} variant="outline">
              {slide.secondaryCta.label}
            </Button>
          </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20 sm:bottom-6">
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
      className="grid size-11 place-items-center rounded-full border border-white/40 bg-ink/25 text-white hover:bg-white hover:text-ink"
    >
      {children}
    </button>
  )
}
