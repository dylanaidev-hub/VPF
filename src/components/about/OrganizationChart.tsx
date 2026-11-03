import { useEffect, useRef } from "react"
import { organization } from "../../data/organization.mock"
import { Container } from "../Container"
import { SectionHeading } from "../SectionHeading"

export function OrganizationChart() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-org-reveal]")]
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
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
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
    <section ref={rootRef} className="bg-paper" aria-labelledby="co-cau-tieu-de">
      <Container className="py-20 min-[1200px]:py-24">
        <SectionHeading
          id="co-cau-tieu-de"
          eyebrow={organization.eyebrow}
          title={organization.title}
          subtitle={organization.description}
        />
        <p className="-mt-4 mb-8 text-sm text-muted">{organization.note}</p>

        <div className="org-architecture">
          <article data-org-reveal className="org-reveal org-tier org-tier-congress" style={{ transitionDelay: "0ms" }}>
            <p className="org-tier-label">Cấp 01</p>
            <h3>{organization.congress}</h3>
          </article>

          <div className="org-link" aria-hidden />

          <article data-org-reveal className="org-reveal org-tier org-tier-board" style={{ transitionDelay: "140ms" }}>
            <p className="org-tier-label">Cấp 02</p>
            <h3>{organization.board}</h3>
          </article>

          <div className="org-link org-link-short" aria-hidden />

          <ol className="org-units" aria-label="Đơn vị trực thuộc Ban Chấp hành">
            {organization.units.map((unit, index) => (
              <li
                key={unit.id}
                data-org-reveal
                className="org-reveal org-unit"
                style={{ transitionDelay: `${260 + index * 60}ms` }}
              >
                <span className="org-unit-index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{unit.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
