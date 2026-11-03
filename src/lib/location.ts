/** Khớp trang HTML hiện tại. `/` và `/index.html` đều là trang chủ. */
export function isCurrentPage(href: string) {
  if (typeof window === "undefined" || !href.startsWith("/")) return false
  const base = import.meta.env.BASE_URL
  let path = window.location.pathname
  if (base !== "/") {
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base
    if (path === prefix || path === base) path = "/"
    else if (path.startsWith(`${prefix}/`)) path = path.slice(prefix.length)
  }
  const current = path === "/" ? "/index.html" : path
  const target = href.split("#")[0].split("?")[0] || "/index.html"
  return current === target
}
