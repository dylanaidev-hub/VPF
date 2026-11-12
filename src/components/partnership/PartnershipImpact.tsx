import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { impactSection, partnershipMetrics } from "../../data/partnership.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [active, duration, target])

  return value
}

export function PartnershipImpact() {
  const { ref, shown } = useReveal<HTMLElement>()

  return (
    <section
      id={impactSection.id}
      ref={ref}
      className={cx("partner-section partner-impact partner-rise", shown && "is-in")}
      aria-labelledby="dong-hanh-tieu-de"
    >
      <div className="page-wrap">
        <div className="partner-section-head">
          <h2 id="dong-hanh-tieu-de" className="partner-section-title">
            {impactSection.title}
          </h2>
          <p className="partner-section-lead">{impactSection.description}</p>
          <p className="partner-note">{impactSection.note}</p>
        </div>

        <ul className="partner-metrics">
          {partnershipMetrics.map((metric) => (
            <li key={metric.id} className="partner-metric">
              <MetricValue value={metric.value} suffix={metric.suffix} active={shown} />
              <p className="partner-metric-label">{metric.label}</p>
            </li>
          ))}
        </ul>

        <a href={impactSection.ctaHref} className="partner-btn-primary mt-8 inline-flex">
          {impactSection.ctaLabel}
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  )
}

function MetricValue({ value, suffix, active }: { value: number; suffix?: string; active: boolean }) {
  const current = useCountUp(value, active)
  return (
    <p className="partner-metric-value" aria-label={`${value}${suffix ?? ""}`}>
      <span aria-hidden>
        {current}
        {suffix ?? ""}
      </span>
    </p>
  )
}
