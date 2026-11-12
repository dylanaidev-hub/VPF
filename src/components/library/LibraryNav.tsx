import { useEffect, useState } from "react"
import { libraryNav, type LibraryNavId } from "../../data/library.mock"
import { cx } from "../../lib/cx"

function hashNavId(): LibraryNavId {
  const hash = window.location.hash.replace(/^#/, "")
  return libraryNav.some((item) => item.id === hash) ? (hash as LibraryNavId) : libraryNav[0].id
}

export function LibraryNav() {
  const [active, setActive] = useState<LibraryNavId>(hashNavId)

  useEffect(() => {
    const onHash = () => setActive(hashNavId())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  useEffect(() => {
    const sections = libraryNav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target.id) return
        const next = top.target.id as LibraryNavId
        setActive((current) => (current === next ? current : next))
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0.12, 0.28, 0.45] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="library-nav" aria-label="Điều hướng thư viện & cộng đồng">
      <ul className="library-nav-list">
        {libraryNav.map((item) => {
          const selected = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cx("library-nav-link", selected && "is-active")}
                aria-current={selected ? "true" : undefined}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
