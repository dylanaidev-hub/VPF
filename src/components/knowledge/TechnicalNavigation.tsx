import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { technicalSections } from "../../data/technicalResources"

export function TechnicalNavigation() {
  const navRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string>(() =>
    technicalSections.find(({ id }) => `#${id}` === window.location.hash)?.id ?? technicalSections[0].id,
  )

  useEffect(() => {
    const header = document.getElementById("dau-trang")
    const content = document.querySelector(".tech-content")
    const root = document.documentElement
    const sections = technicalSections.flatMap(({ id }) => {
      const section = document.getElementById(id)
      return section ? [section] : []
    })
    let offset = 100
    let frame = 0
    let settleTimer = 0
    let navigating = false

    function updateActive() {
      frame = 0
      if (navigating) return
      const readingLine = offset + Math.min(64, window.innerHeight * 0.1)
      const atEnd = window.scrollY + window.innerHeight >= root.scrollHeight - 2
      const current = atEnd ? sections.at(-1) : sections.findLast((section) => section.getBoundingClientRect().top <= readingLine)
      setActive(current?.id ?? technicalSections[0].id)
    }

    function queueUpdate() {
      if (!frame) frame = requestAnimationFrame(updateActive)
    }

    function waitForAnchorScroll() {
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(() => {
        navigating = false
        queueUpdate()
      }, 160)
    }

    function onScroll() {
      if (navigating) waitForAnchorScroll()
      else queueUpdate()
    }

    function onHashChange() {
      const target = sections.find((section) => `#${section.id}` === window.location.hash)
      if (!target) return
      navigating = true
      setActive(target.id)
      waitForAnchorScroll()
    }

    function measure() {
      offset = (header?.getBoundingClientRect().height ?? 76) + 24
      root.style.setProperty("--tech-scroll-offset", `${offset}px`)
      queueUpdate()
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (header) observer.observe(header)
    if (content) observer.observe(content)
    const initial = sections.find((section) => `#${section.id}` === window.location.hash)
    initial?.scrollIntoView({ block: "start", behavior: "instant" })

    window.addEventListener("hashchange", onHashChange)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)
      window.removeEventListener("hashchange", onHashChange)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", measure)
      root.style.removeProperty("--tech-scroll-offset")
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLAnchorElement>('[aria-current="location"]')
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return
    const viewport = nav.getBoundingClientRect()
    const item = link.getBoundingClientRect()
    if (item.left < viewport.left || item.right > viewport.right) {
      nav.scrollLeft += item.left - viewport.left - (nav.clientWidth - item.width) / 2
    }
  }, [active])

  return (
    <nav ref={navRef} className="tech-nav" aria-label="Danh mục chuyên môn">
      <ol>
        {technicalSections.map(({ id, title }, index) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={active === id ? "location" : undefined}>
              <span className="tech-topic-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="tech-topic-title">{title}</span>
              <ArrowRight size={20} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
