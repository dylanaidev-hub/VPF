import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { technicalSections } from "../../data/technicalResources"

export function TechnicalNavigation() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const header = document.getElementById("dau-trang")
    const root = document.documentElement
    const measure = () => root.style.setProperty("--tech-scroll-offset", `${(header?.getBoundingClientRect().height ?? 76) + 24}px`)
    measure()
    const observer = new ResizeObserver(measure)
    if (header) observer.observe(header)
    const initial = technicalSections.find(({ id }) => `#${id}` === window.location.hash)
    if (initial) document.getElementById(initial.id)?.scrollIntoView({ block: "start", behavior: "instant" })
    const update = () => setHash(window.location.hash)
    window.addEventListener("hashchange", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", update)
      root.style.removeProperty("--tech-scroll-offset")
    }
  }, [])

  return (
    <nav className="tech-nav" aria-label="Danh mục chuyên môn">
      <ol>
        {technicalSections.map(({ id, title }, index) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={hash === `#${id}` ? "location" : undefined}>
              <span className="tech-topic-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{title}</span>
              <ArrowRight size={19} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
