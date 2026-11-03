import { useEffect, useRef } from "react"
import { aboutVision } from "../../data/aboutVision.mock"
import { sitePath } from "../../lib/site"

export function VisionMission() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-reveal]")]
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || nodes.length === 0) {
      nodes.forEach((node) => node.classList.add("is-in"))
      return
    }

    const pending = new Set(nodes)
    const reveal = (node: HTMLElement) => {
      node.classList.add("is-in")
      pending.delete(node)
      observer.unobserve(node)
    }
    const inView = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect()
      const view = window.innerHeight || document.documentElement.clientHeight
      return rect.bottom > view * 0.06 && rect.top < view * 0.94
    }
    const scan = () => {
      pending.forEach((node) => {
        if (inView(node)) reveal(node)
      })
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal(entry.target as HTMLElement)
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    )
    nodes.forEach((node) => observer.observe(node))
    scan()
    window.addEventListener("scroll", scan, { passive: true })
    window.addEventListener("resize", scan)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", scan)
      window.removeEventListener("resize", scan)
    }
  }, [])

  return (
    <section ref={rootRef} className="vision-manifesto" aria-labelledby="tam-nhin-tieu-de">
      <div className="vision-stage">
        <div className="vision-media" data-reveal>
          <img
            src={sitePath(aboutVision.image)}
            alt={aboutVision.imageAlt}
            width={2000}
            height={1333}
            loading="lazy"
            decoding="async"
            className="vision-media-img"
          />
          <div className="vision-shade" aria-hidden />
          <CourtLines />
        </div>

        <div className="vision-manifesto-inner page-wrap">
          <p data-reveal className="vision-kicker vision-reveal" style={{ transitionDelay: "0ms" }}>
            {aboutVision.eyebrow}
          </p>
          <h2 id="tam-nhin-tieu-de" className="vision-headline">
            <span data-reveal className="vision-line vision-reveal" style={{ transitionDelay: "80ms" }}>
              {aboutVision.headline}
            </span>
            <span data-reveal className="vision-line vision-accent vision-reveal" style={{ transitionDelay: "200ms" }}>
              {aboutVision.accent}
            </span>
          </h2>

          <div className="vision-statements">
            <article data-reveal className="vision-statement vision-reveal" style={{ transitionDelay: "320ms" }}>
              <p className="vision-meta">
                <span className="vision-num">{aboutVision.vision.number}</span>
                <span className="vision-label">{aboutVision.vision.label}</span>
              </p>
              <h3 className="vision-statement-title">{aboutVision.vision.title}</h3>
              <p className="vision-statement-body">{aboutVision.vision.description}</p>
            </article>
            <article data-reveal className="vision-statement vision-reveal" style={{ transitionDelay: "460ms" }}>
              <p className="vision-meta">
                <span className="vision-num">{aboutVision.mission.number}</span>
                <span className="vision-label">{aboutVision.mission.label}</span>
              </p>
              <h3 className="vision-statement-title">{aboutVision.mission.title}</h3>
              <p className="vision-statement-body">{aboutVision.mission.description}</p>
            </article>
          </div>

          <div className="vision-values-wrap">
            <p data-reveal className="vision-values-label vision-reveal" style={{ transitionDelay: "520ms" }}>
              {aboutVision.valuesTitle}
            </p>
            <ol className="vision-values" aria-label={aboutVision.valuesTitle}>
              {aboutVision.values.map((value, index) => (
                <li
                  key={value.id}
                  data-reveal
                  className="vision-value vision-reveal"
                  style={{ transitionDelay: `${560 + index * 70}ms` }}
                >
                  <span className="vision-num">{String(index + 1).padStart(2, "0")}</span>
                  <p className="vision-value-title">{value.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function CourtLines() {
  return (
    <svg className="vision-court" viewBox="0 0 200 440" aria-hidden>
      <rect x="10" y="10" width="180" height="420" />
      <line x1="10" y1="220" x2="190" y2="220" />
      <line x1="10" y1="148" x2="190" y2="148" />
      <line x1="10" y1="292" x2="190" y2="292" />
      <line x1="100" y1="10" x2="100" y2="148" />
      <line x1="100" y1="292" x2="100" y2="430" />
    </svg>
  )
}
