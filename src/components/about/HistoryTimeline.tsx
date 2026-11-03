import { useEffect, useRef } from "react"
import { Landmark, Sprout, Users, type LucideIcon } from "lucide-react"
import { aboutHistory, type HistoryIcon } from "../../data/aboutHistory.mock"
import { cx } from "../../lib/cx"
import { Container } from "../Container"

const icons: Record<HistoryIcon, LucideIcon> = {
  sprout: Sprout,
  users: Users,
  landmark: Landmark,
}

export function HistoryTimeline() {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const nodes = listRef.current?.querySelectorAll(".about-reveal")
    if (!nodes?.length) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-in"))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-in")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.35 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-paper" aria-labelledby="lich-su-tieu-de">
      <Container className="grid gap-10 py-16 min-[1200px]:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] min-[1200px]:items-center min-[1200px]:gap-16 min-[1200px]:py-24">
        <div>
          <p className="flex items-center gap-3 text-[13px] font-medium text-brand-strong">
            <span className="h-px w-8 bg-brand" aria-hidden />
            {aboutHistory.eyebrow}
          </p>
          <h2
            id="lich-su-tieu-de"
            className="mt-4 text-[2rem] font-bold leading-[1.12] tracking-tight text-ink min-[1200px]:text-[2.5rem]"
          >
            {aboutHistory.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">{aboutHistory.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{aboutHistory.note}</p>
        </div>

        <ol ref={listRef} className="relative flex flex-col gap-8 min-[1200px]:flex-row min-[1200px]:gap-6">
          <span className="absolute bottom-2 left-5 top-2 w-px bg-line min-[1200px]:hidden" aria-hidden />
          <span className="absolute left-5 right-5 top-5 hidden h-px bg-line min-[1200px]:block" aria-hidden />
          {aboutHistory.milestones.map((item, index) => {
            const Icon = icons[item.icon]
            return (
              <li
                key={item.id}
                className="about-reveal relative flex gap-4 min-[1200px]:block min-[1200px]:flex-1"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span
                  className={cx(
                    "relative z-10 grid size-10 shrink-0 place-items-center rounded-full",
                    item.highlight ? "bg-brand text-ink" : "bg-navy text-white",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-[1200px]:mt-5">
                  <p className={cx("text-[2rem] font-bold leading-none", item.highlight ? "text-brand-strong" : "text-ink")}>
                    <time dateTime={item.year}>{item.year}</time>
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
