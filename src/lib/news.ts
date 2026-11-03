import type { NewsArticle } from "../types"
import { foldText } from "./format"

export const newsCategories = [
  "Tất cả",
  "Tin Liên đoàn",
  "Giải đấu",
  "Cộng đồng",
  "Chuyên môn",
  "Quốc tế",
] as const

export type NewsCategory = (typeof newsCategories)[number]
export type NewsSort = "newest" | "oldest"

export const NEWS_PAGE_SIZE = 9

export function newsPath(article: Pick<NewsArticle, "slug">) {
  return `/tin-tuc/${article.slug}/`
}

export function articleSlugFromPath(pathname: string) {
  const match = pathname.match(/\/tin-tuc\/([^/]+)\/?$/)
  if (!match) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}

export function selectSpotlight(articles: NewsArticle[]) {
  const featured = articles.find((item) => item.isFeatured || item.featured) ?? articles[0]
  const trending = articles
    .filter((item) => item.isTrending && item.id !== featured?.id)
    .sort((a, b) => (a.trendingRank ?? Number.MAX_SAFE_INTEGER) - (b.trendingRank ?? Number.MAX_SAFE_INTEGER))
  return { featured, trending, trendingTop: trending.slice(0, 3) }
}

function foldNewsQuery(value: string) {
  return foldText(value).replace(/đ/g, "d")
}

export function filterNews(
  articles: NewsArticle[],
  options: { category: NewsCategory; query: string; sort: NewsSort },
) {
  const needle = foldNewsQuery(options.query.trim())
  const seen = new Set<string>()
  const matched = articles.filter((article) => {
    if (seen.has(article.id)) return false
    seen.add(article.id)
    if (options.category !== "Tất cả" && article.category !== options.category) return false
    if (!needle) return true
    return foldNewsQuery(`${article.title} ${article.excerpt}`).includes(needle)
  })
  return matched.sort((a, b) => {
    const order = a.publishedAt.localeCompare(b.publishedAt)
    return options.sort === "oldest" ? order : -order
  })
}

export function selectNewsLayout(articles: NewsArticle[]) {
  const featured = articles.find((item) => item.featured) ?? articles[0]
  const rest = articles.filter((item) => item.id !== featured?.id)
  const trending = rest
    .filter((item) => item.isTrending)
    .sort((a, b) => (a.trendingRank ?? Number.MAX_SAFE_INTEGER) - (b.trendingRank ?? Number.MAX_SAFE_INTEGER))
  const trendingIds = new Set(trending.map((item) => item.id))
  const secondary = rest.filter((item) => !trendingIds.has(item.id)).slice(0, 3)
  return {
    featured,
    secondary,
    trending,
    catalog: [...articles].sort((a, b) => b.date.localeCompare(a.date)),
  }
}

export function trendingLabel(article: NewsArticle, index: number) {
  const rank = article.trendingRank ?? index + 1
  return String(rank).padStart(2, "0")
}
