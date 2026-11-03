import { useEffect, useState } from "react"
import { communityStats } from "../../data/communityStats.mock"
import { useReducedMotion } from "../../lib/useReducedMotion"
import { useReveal } from "../../lib/useReveal"

function Counter({ value, active }: { value: number; active: boolean }) {
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? value : 0,
  )

  useEffect(() => {
    if (!active) return
    if (reduce) {
      setCurrent(value)
      return
    }
    const start = performance.now()
    const duration = 800
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setCurrent(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, reduce, value])

  return <>{current.toLocaleString("vi-VN")}</>
}

export function CommunityStats() {
  const { ref, shown } = useReveal<HTMLDListElement>()

  return (
    <section className="page-wrap pb-4" aria-labelledby="so-lieu-cong-dong">
      <p id="so-lieu-cong-dong" className="text-sm font-semibold text-brand-strong">
        Số liệu minh họa
      </p>
      <dl ref={ref} className="community-stats mt-4">
        {communityStats.map((stat) => (
          <div key={stat.id} className="community-stat">
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="community-stat-value text-ink">
              <Counter value={stat.value} active={shown} />
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
