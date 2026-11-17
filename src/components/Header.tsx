import { setLanguage, useTranslation } from "../i18n"
import { useCallback, useEffect, useId, useState } from "react"
import { ChevronDown, Menu, Search, X } from "lucide-react"
import { navigation, presentNavItem } from "../data/navigation"
import { cx } from "../lib/cx"
import { isCurrentPage } from "../lib/location"
import { sitePath } from "../lib/site"
import type { NavItem } from "../types"
import { Logo } from "./Logo"
import { MobileNavigation } from "./MobileNavigation"

function DesktopItem({ item }: { item: NavItem }) {
  const { t } = useTranslation()
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
        {t(item.label)}
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
          {t(item.label)}
        </a>
        <button
          type="button"
          className="grid size-6 place-items-center text-ink"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={t(open ? "navigation.close" : "navigation.open", { label: t(item.label) })}
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
                {t(child.label)}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function Header({
  items = navigation,
}: {
  items?: NavItem[]
} = {}) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

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
        {t("Đi tới nội dung")}
      </a>
      <div className="page-wrap flex h-[76px] items-center justify-between gap-3 min-[1200px]:gap-4">
        <a href={sitePath("/index.html")} className="brand-home shrink-0" aria-label={t("Về trang chủ VPF")}>
          <Logo className="max-[374px]:h-8" />
        </a>
        <nav className="hidden items-center gap-4 min-[1200px]:flex" aria-label={t("Chính")}>
          {items.map((item) => (
            <DesktopItem key={item.id} item={presentNavItem(item)} />
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 max-[374px]:gap-1">
          <a
            href={sitePath("/timkiem.html")}
            className="grid size-10 place-items-center rounded-[10px] border border-line text-ink hover:bg-paper"
            aria-label={t("Tìm kiếm")}
            aria-current={isCurrentPage("/timkiem.html") ? "page" : undefined}
            onClick={closeMenu}
          >
            <Search className="size-5" aria-hidden />
          </a>
          <LanguageSwitcher />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[10px] border border-line text-ink hover:bg-paper min-[1200px]:hidden"
            aria-label={menuOpen ? t("Đóng menu") : t("Mở menu")}
            aria-expanded={menuOpen}
            aria-controls="menu-di-dong"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <MobileNavigation open={menuOpen} onClose={closeMenu} items={items} />
    </header>
  )
}

function LanguageSwitcher() {
  const { language, t } = useTranslation()

  return (
    <div role="group" aria-label={t("language.label")} className="inline-flex items-center rounded-full border border-line p-0.5">
      {(["vi", "en"] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          aria-label={locale === "vi" ? "Tiếng Việt" : "English"}
          aria-pressed={locale === language}
          className={cx(
            "grid h-8 min-w-8 place-items-center rounded-full px-1.5 text-xs font-semibold text-ink transition-colors duration-200 motion-reduce:transition-none",
            locale === language ? "bg-brand" : "hover:bg-paper",
          )}
          onClick={() => setLanguage(locale)}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
