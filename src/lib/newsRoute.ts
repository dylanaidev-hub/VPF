import type { NewsArticle } from "../types.ts"

export const newsDetailPage = "/chitiet-tintuc.html"

export function getNewsDetailUrl(article: Pick<NewsArticle, "slug">) {
  return `${newsDetailPage}?slug=${encodeURIComponent(article.slug)}`
}

function legacyArticleMatch(pathname: string) {
  return pathname.match(/\/tin-tuc\/([^/]+)\/?$/)
}

export function isNewsDetailPath(pathname: string) {
  return pathname === newsDetailPage || legacyArticleMatch(pathname) !== null
}

export function getNewsSlug({ search, pathname }: { search: string; pathname: string }) {
  const querySlug = new URLSearchParams(search).get("slug")
  if (querySlug !== null) return querySlug.trim()

  // Keep article links published before the query-based detail route working.
  const match = legacyArticleMatch(pathname)
  if (!match) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}
