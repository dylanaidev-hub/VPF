/** Prefix a root path with the Vite base. Dev stays `/`; GitHub Pages uses `/VPF/`. */
export function sitePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path
  const base = import.meta.env.BASE_URL
  if (base === "/") return path
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base
  return `${prefix}${path}`
}
