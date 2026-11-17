import { useTranslation } from "../i18n"
import { useEffect, useRef, useState } from "react"
import type { Statistic } from "../types"
import { useReducedMotion } from "../lib/useReducedMotion"

const COUNT_MS = 1350

function easeInOutCubic(progress: number) {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
}

function formatStat(value: number | null, suffix?: string) {
  if (value === null) return "—"
  return `${value.toLocaleString("vi-VN")}${suffix ?? ""}`
}

function useCountUp(target: number | null, active: boolean) {
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState<number | null>(target === null || reduce ? target : 0)

  useEffect(() => {
    if (target === null || reduce) {
      setCurrent(target)
      return
    }
    if (!active) return

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_MS)
      setCurrent(Math.round(target * easeInOutCubic(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, reduce, active])

  return current
}

function StatFigure({ stat, active }: { stat: Statistic; active: boolean }) {
  const { t } = useTranslation()
  const current = useCountUp(stat.value, active)
  const figure = formatStat(current, stat.suffix)
  const finalFigure = formatStat(stat.value, stat.suffix)
  const label =
    current === null ? `${stat.label}, chưa có số liệu` : `${stat.label}: ${figure}`

  return (
    <div className="px-4 py-8 text-center sm:px-6" aria-label={t(label)}>
      <span className="mx-auto block h-0.5 w-7 bg-brand" aria-hidden />
      <p className="relative mt-4 text-[clamp(2rem,3vw,3.25rem)] font-bold leading-none tracking-tight text-ink tabular-nums" aria-hidden>
        <span className="invisible">{finalFigure}</span>
        <span className="absolute inset-x-0 top-0">{figure}</span>
      </p>
      <p className="mt-3 text-sm font-medium whitespace-nowrap text-ink sm:text-[15px]">{t(stat.label)}</p>
    </div>
  )
}

export function StatsSection({ items }: { items: Statistic[] }) {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node || reduce) return

    let started = false

    const start = () => {
      if (started) return
      started = true
      setActive(true)
      observer.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.25)) start()
      },
      { threshold: [0.25, 0.3] },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce])

  return (
    <section
      ref={sectionRef}
      id="so-lieu"
      data-section
      aria-labelledby="so-lieu-tieu-de"
      className="border-b border-line bg-paper py-20 md:py-[140px]"
    >
      <div className="page-wrap">
        <div className="max-w-2xl">
          <h2 id="so-lieu-tieu-de" className="vpf-section-title">
            {t("Quy mô hoạt động")}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-base">
            {t("Khám phá quy mô hoạt động và những dấu ấn phát triển của Pickleball Việt Nam.")}
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 divide-y divide-line sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((item) => (
            <li key={item.id}>
              <StatFigure stat={item} active={active || reduce} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
