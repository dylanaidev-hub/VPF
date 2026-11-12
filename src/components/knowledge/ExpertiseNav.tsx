import { useEffect, useState } from "react"
import { BookOpen, Flag, GraduationCap, Megaphone, type LucideIcon } from "lucide-react"
import { expertiseNav, type ExpertiseNavId } from "../../data/expertise.mock"
import { cx } from "../../lib/cx"

const icons: Record<(typeof expertiseNav)[number]["icon"], LucideIcon> = {
  rules: BookOpen,
  referee: Flag,
  coach: Megaphone,
  training: GraduationCap,
}

const DOCK_CLASS = "has-expertise-dock"

function hashNavId(): ExpertiseNavId {
  const hash = window.location.hash.replace(/^#/, "")
  return expertiseNav.some((item) => item.id === hash) ? (hash as ExpertiseNavId) : expertiseNav[0].id
}

export function ExpertiseNav() {
  const [active, setActive] = useState<ExpertiseNavId>(hashNavId)

  useEffect(() => {
    document.documentElement.classList.add(DOCK_CLASS)
    return () => document.documentElement.classList.remove(DOCK_CLASS)
  }, [])

  useEffect(() => {
    const sections = expertiseNav
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
        const next = top.target.id as ExpertiseNavId
        setActive((current) => (current === next ? current : next))
      },
      {
        /* Header ~76px top; bottom dock ~60–80px. Focus mid-viewport band. */
        rootMargin: "-22% 0px -42% 0px",
        threshold: [0.12, 0.28, 0.45, 0.65],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="expertise-nav" aria-label="Điều hướng chuyên môn">
      <ul className="expertise-nav-list">
        {expertiseNav.map((item) => {
          const Icon = icons[item.icon]
          const selected = active === item.id
          return (
            <li key={item.id} className="expertise-nav-item">
              <a
                href={`#${item.id}`}
                className={cx("expertise-nav-link", selected && "is-active")}
                aria-current={selected ? "true" : undefined}
                onClick={(event) => {
                  if (selected) {
                    event.preventDefault()
                    return
                  }
                  setActive(item.id)
                }}
              >
                <Icon className="expertise-nav-icon" aria-hidden />
                <span className="expertise-nav-label">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
