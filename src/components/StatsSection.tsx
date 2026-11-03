import { useEffect, useState } from "react"
import type { Statistic } from "../types"
import { cx } from "../lib/cx"
import { useReducedMotion } from "../lib/useReducedMotion"

function useCountUp(target: number | null) {
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState<number | null>(target === null || reduce ? target : 0)

  useEffect(() => {
    if (target === null || reduce) {
      setCurrent(target)
      return
    }

    let frame = 0
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setCurrent(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, reduce])

  return current
}

function StatFigure({ stat }: { stat: Statistic }) {
  const current = useCountUp(stat.value)
  const figure =
    current === null ? "—" : `${current.toLocaleString("vi-VN")}${stat.suffix ?? ""}`
  const label =
    current === null
      ? `${stat.label}, chưa có số liệu`
      : `${stat.label}: ${figure}. ${stat.note}`

  return (
    <div className="px-1 py-8 sm:px-6 lg:px-8" aria-label={label}>
      <span className="block h-0.5 w-7 bg-brand" aria-hidden />
      <p className="mt-4 text-[clamp(1.85rem,7vw,3.5rem)] font-bold leading-none tracking-tight text-ink" aria-hidden>
        {figure}
      </p>
      <p className="mt-3 text-sm font-medium text-ink">{stat.label}</p>
      <p className="mt-1 text-[13px] text-muted">{stat.note}</p>
    </div>
  )
}

export function StatsSection({ items }: { items: Statistic[] }) {
  return (
    <section id="so-lieu" data-section aria-labelledby="so-lieu-tieu-de" className="border-b border-line bg-paper">
      <div className="page-wrap py-10 md:py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[13px] font-medium text-brand-strong">
            <span className="h-px w-8 bg-brand" aria-hidden />
            Số liệu minh họa
          </p>
          <h2 id="so-lieu-tieu-de" className="mt-3 text-[2rem] font-bold leading-tight tracking-tight text-ink">
            Quy mô hoạt động
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Bốn con số dưới đây chỉ dùng để xem giao diện. Đây không phải thống kê chính thức của Liên đoàn Pickleball Việt Nam.
          </p>
        </div>
        <ul className="mt-6 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={cx(
                index % 2 === 0 && "max-md:border-r max-md:border-line",
                index < 2 && "max-md:border-b max-md:border-line",
                index < items.length - 1 && "md:border-r md:border-line",
              )}
            >
              <StatFigure stat={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
