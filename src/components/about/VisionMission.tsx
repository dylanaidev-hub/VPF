import { useEffect, useRef } from "react"
import { BadgeCheck, Eye, Globe, Sprout, Target, Users, type LucideIcon } from "lucide-react"
import { aboutVision, type ValueIcon } from "../../data/aboutVision.mock"
import { sitePath } from "../../lib/site"

const valueIcons: Record<ValueIcon, LucideIcon> = {
  users: Users,
  badge: BadgeCheck,
  eye: Eye,
  sprout: Sprout,
  globe: Globe,
}

export function VisionMission() {
  const rootRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]")
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
      return rect.bottom > view * 0.08 && rect.top < view * 0.92
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    )
    nodes.forEach((node) => observer.observe(node))
    scan()
    window.addEventListener("scroll", scan, { passive: true })
    window.addEventListener("resize", scan)

    const parallax = parallaxRef.current
    let frame = 0
    const onScroll = () => {
      if (!parallax) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.innerWidth < 768) {
          parallax.style.transform = ""
          return
        }
        const rect = parallax.parentElement?.getBoundingClientRect()
        if (!rect) return
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        const shift = Math.max(-10, Math.min(10, (progress - 0.5) * 20))
        parallax.style.transform = `translate3d(0, ${shift}px, 0)`
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", scan)
      window.removeEventListener("resize", scan)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={rootRef} className="bg-white" aria-labelledby="tam-nhin-tieu-de">
      <div className="page-wrap py-16 min-[1200px]:py-24">
        <header data-reveal className="vision-reveal mb-10 max-w-3xl min-[1200px]:mb-14">
          <p className="flex items-center gap-3 text-[13px] font-medium text-brand-strong">
            <span className="h-px w-8 bg-brand" aria-hidden />
            {aboutVision.eyebrow}
          </p>
          <h2 id="tam-nhin-tieu-de" className="vision-title text-ink">
            {aboutVision.title}
          </h2>
        </header>

        <div className="vision-showcase">
          <article data-reveal className="vision-card">
            <div className="vision-photo">
              <div ref={parallaxRef} className="vision-parallax">
                <img
                  src={sitePath(aboutVision.image)}
                  alt={aboutVision.imageAlt}
                  width={1333}
                  height={2000}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[center_24%]"
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-brand" aria-hidden />
            </div>
            <div className="vision-copy">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-white/75 uppercase">
                {aboutVision.vision.label}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white min-[1200px]:text-[1.85rem]">
                {aboutVision.vision.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-[15px]">
                {aboutVision.vision.description}
              </p>
            </div>
          </article>

          <article data-reveal className="vision-reveal vision-reveal-x vision-mission">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] text-brand-strong uppercase">
                {aboutVision.mission.label}
              </p>
              <Target className="mt-6 size-10 text-brand" aria-hidden />
            </div>
            <div>
              <h3 className="vision-mission-title text-ink">
                {aboutVision.mission.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/80 sm:text-[15px]">
                {aboutVision.mission.description}
              </p>
            </div>
          </article>
        </div>

        <div className="mt-12 min-[1200px]:mt-16">
          <h3
            id="gia-tri-tieu-de"
            data-reveal
            className="vision-reveal mb-5 text-xl font-bold tracking-tight text-ink min-[1200px]:mb-6 min-[1200px]:text-2xl"
          >
            {aboutVision.valuesTitle}
          </h3>
          <ul className="vision-values" aria-labelledby="gia-tri-tieu-de">
            {aboutVision.values.map((value, index) => {
              const Icon = valueIcons[value.icon]
              return (
                <li
                  key={value.id}
                  data-reveal
                  className="vision-reveal vision-reveal-y vision-value"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon className="vision-value-icon size-6 text-brand" aria-hidden />
                  <p className="mt-4 text-sm font-semibold leading-snug text-ink">{value.title}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
