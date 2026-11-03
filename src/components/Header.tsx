import { useEffect, useId, useState } from "react"
import { ChevronDown, Menu, Search, X } from "lucide-react"
import { navigation, presentNavItem } from "../data/navigation"
import { cx } from "../lib/cx"
import { isCurrentPage } from "../lib/location"
import { sitePath } from "../lib/site"
import type { NavItem } from "../types"
import { Logo } from "./Logo"
import { MobileNavigation } from "./MobileNavigation"

function DesktopItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const children = item.children ?? []
  const current = isCurrentPage(item.href)
  const linkClass = cx(
    "relative whitespace-nowrap py-2 text-[14px] font-medium text-ink",
    "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:bg-brand after:transition-transform after:duration-200 motion-reduce:after:transition-none",
    current ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
  )

  if (children.length < 2) {
    return (
      <a href={sitePath(item.href)} className={linkClass} aria-current={current ? "page" : undefined}>
        {item.label}
      </a>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <div className="flex items-center">
        <a href={sitePath(item.href)} className={linkClass} aria-current={current ? "page" : undefined}>
          {item.label}
        </a>
        <button
          type="button"
          className="grid size-6 place-items-center text-ink"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`Mở menu ${item.label}`}
          onClick={() => setOpen((value) => !value)}
        >
          <ChevronDown
            className={cx("size-3.5 transition-transform motion-reduce:transition-none", open && "rotate-180")}
            aria-hidden
          />
        </button>
      </div>
      {open ? (
        <div id={menuId} className="absolute left-0 top-full z-40 min-w-60 pt-2">
          <div className="border border-line bg-white p-1.5" role="menu">
            {children.map((child) => (
              <a
                key={child.id}
                href={sitePath(child.href)}
                role="menuitem"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-paper"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function Header({
  onSearch,
  searchOpen,
  items = navigation,
}: {
  onSearch: () => void
  searchOpen: boolean
  items?: NavItem[]
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header id="dau-trang" className="sticky top-0 z-50 border-b border-line bg-white">
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2"
      >
        Đi tới nội dung
      </a>
      <div className="page-wrap flex h-[76px] items-center justify-between gap-4">
        <a href={sitePath("/index.html")} className="brand-home shrink-0" aria-label="Về trang chủ VPF">
          <Logo />
        </a>
        <nav className="hidden items-center gap-4 min-[1200px]:flex" aria-label="Chính">
          {items.map((item) => (
            <DesktopItem key={item.id} item={presentNavItem(item)} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[10px] border border-line text-ink hover:bg-paper"
            aria-label="Tìm kiếm"
            aria-expanded={searchOpen}
            aria-controls="tim-kiem"
            onClick={() => {
              setMenuOpen(false)
              onSearch()
            }}
          >
            <Search className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[10px] border border-line text-ink hover:bg-paper min-[1200px]:hidden"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-di-dong"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} items={items} />
    </header>
  )
}
