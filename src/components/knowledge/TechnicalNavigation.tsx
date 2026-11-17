import { useEffect, useRef, useState } from "react"
import { ChevronRight } from "lucide-react"
import { technicalSections } from "../../data/technicalResources"

export function TechnicalNavigation() {
  const navigation = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string>(technicalSections[0].id)

  useEffect(() => {
    const sections = technicalSections.flatMap(({ id }) => {
      const section = document.getElementById(id)
      return section ? [section] : []
    })
    let frame = 0
    const update = () => {
      frame = 0
      const offset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + 10
      const current = sections.findLast((section) => section.getBoundingClientRect().top <= offset)
      setActive(current?.id ?? technicalSections[0].id)
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const initial = sections.find((section) => `#${section.id}` === window.location.hash)
    initial?.scrollIntoView({ block: "start", behavior: "instant" })
    queue()
    window.addEventListener("scroll", queue, { passive: true })
    window.addEventListener("resize", queue)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", queue)
      window.removeEventListener("resize", queue)
    }
  }, [])

  useEffect(() => {
    const nav = navigation.current
    const link = nav?.querySelector<HTMLAnchorElement>('[aria-current="location"]')
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return
    const offset = link.getBoundingClientRect().left - nav.getBoundingClientRect().left
    if (offset < 0 || offset + link.offsetWidth > nav.clientWidth) {
      nav.scrollLeft += offset - (nav.clientWidth - link.offsetWidth) / 2
    }
  }, [active])

  return (
    <nav ref={navigation} className="tech-nav" aria-label="Danh mục chuyên môn">
      <p>Danh mục chuyên môn</p>
      <ul>
        {technicalSections.map(({ id, title }) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}>
              <span>{title}</span>
              <ChevronRight size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
