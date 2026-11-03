import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { navigation, presentNavItem } from "../data/navigation"
import { cx } from "../lib/cx"
import { isCurrentPage } from "../lib/location"
import { sitePath } from "../lib/site"
import type { NavItem } from "../types"

export function MobileNavigation({
  open,
  onClose,
  items = navigation,
}: {
  open: boolean
  onClose: () => void
  items?: NavItem[]
}) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    navRef.current?.querySelector<HTMLElement>("a, button")?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="min-[1200px]:hidden">
      <button
        type="button"
        aria-label="Đóng menu"
        className="fixed inset-0 top-[76px] z-40 bg-ink/40"
        onClick={onClose}
      />
      <nav
        ref={navRef}
        id="menu-di-dong"
        aria-label="Menu di động"
        className="fixed inset-y-0 right-0 top-[76px] z-50 w-[min(100%,22.5rem)] overflow-y-auto border-l border-line bg-white px-5 py-4"
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id} className="border-b border-line">
              <MobileItem
                item={presentNavItem(item)}
                expanded={expanded === item.id}
                onToggle={() => setExpanded((current) => (current === item.id ? null : item.id))}
                onNavigate={onClose}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function MobileItem({
  item,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  const children = item.children ?? []
  const current = isCurrentPage(item.href)
  return (
    <div className="py-1">
      <div className="flex items-center justify-between gap-3">
        <a
          href={sitePath(item.href)}
          className={cx(
            "flex-1 py-3 text-base font-medium",
            current ? "text-brand-strong" : "text-ink",
          )}
          aria-current={current ? "page" : undefined}
          onClick={() => {
            if (item.href.startsWith("#")) onNavigate()
          }}
        >
          {item.label}
        </a>
        {children.length >= 2 ? (
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[10px] border border-line"
            aria-expanded={expanded}
            aria-label={`${expanded ? "Thu gọn" : "Mở"} menu ${item.label}`}
            onClick={onToggle}
          >
            <ChevronDown className={cx("size-4", expanded && "rotate-180")} aria-hidden />
          </button>
        ) : null}
      </div>
      {children.length >= 2 && expanded ? (
        <ul className="mb-3 ml-1 border-l border-line pl-3">
          {children.map((child) => (
            <li key={child.id}>
              <a
                href={sitePath(child.href)}
                className="block py-2.5 text-sm font-medium text-muted hover:text-ink"
                onClick={() => {
                  if (child.href.startsWith("#")) onNavigate()
                }}
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
