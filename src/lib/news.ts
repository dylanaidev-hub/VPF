import { news } from "../data/news"
import type { NewsArticle } from "../types"
import { foldText } from "./format"
export { getNewsDetailUrl, getNewsSlug } from "./newsRoute"

export const newsCategories = [
  "Tất cả",
  "Tin Liên đoàn",
  "Giải đấu & Cộng đồng",
  "Quốc tế",
] as const

export type NewsCategory = (typeof newsCategories)[number]
export type NewsSort = "newest" | "oldest"

export const NEWS_PAGE_SIZE = 9

export function getNewsBySlug(slug: string | null) {
  return news.find((article) => article.slug === slug) ?? null
}

export function getNewsContentText(article: NewsArticle) {
  return article.content.flatMap((block) => {
    if (typeof block === "string") return [block]
    if (block.type === "heading") return [block.text]
    if (block.type === "list") return block.items
    return block.caption ? [block.alt, block.caption] : [block.alt]
  })
}

function newsTopicWords(title: string) {
  return foldNewsQuery(title).split(/[^a-z0-9]+/).filter((word) => word.length >= 4 && word !== "pickleball")
}

export function getRelatedNews(article: NewsArticle, articles: readonly NewsArticle[] = news) {
  const relatedIds = new Set(article.relatedIds)
  const topicWords = new Set(newsTopicWords(article.title))
  const now = new Date()
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)

  const ranked = articles
    .filter((item) => {
      if (item.id === article.id || item.slug === article.slug) return false
      if (item.status && item.status !== "published") return false

      const publishedAt = Date.parse(item.publishedAt)
      if (!Number.isFinite(publishedAt)) return false
      return /^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt) ? item.publishedAt <= today : publishedAt <= now.getTime()
    })
    .map((item) => ({
      item,
      sameCategory: Number(item.category === article.category),
      explicit: Number(relatedIds.has(item.id)),
      overlap: new Set(newsTopicWords(item.title).filter((word) => topicWords.has(word))).size,
    }))
    .sort((a, b) =>
      b.sameCategory - a.sameCategory ||
      b.explicit - a.explicit ||
      b.overlap - a.overlap ||
      b.item.publishedAt.localeCompare(a.item.publishedAt),
    )

  const related: NewsArticle[] = []
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()
  for (const { item } of ranked) {
    if (seenIds.has(item.id) || seenSlugs.has(item.slug)) continue
    seenIds.add(item.id)
    seenSlugs.add(item.slug)
    related.push(item)
    if (related.length === 3) break
  }
  return related
}

export function selectSpotlight(articles: NewsArticle[]) {
  const featured = articles.find((item) => item.isFeatured || item.featured) ?? articles[0]
  const trending = articles
    .filter((item) => item.isTrending && item.id !== featured?.id)
    .sort((a, b) => (a.trendingRank ?? Number.MAX_SAFE_INTEGER) - (b.trendingRank ?? Number.MAX_SAFE_INTEGER))
  return { featured, trending }
}

function foldNewsQuery(value: string) {
  return foldText(value).replace(/đ/g, "d")
}

export function filterNews(
  articles: NewsArticle[],
  options: { category: NewsCategory; query: string; sort: NewsSort },
) {
  const needle = foldNewsQuery(options.query.trim())
  const categories = options.category === "Giải đấu & Cộng đồng"
    ? ["Giải đấu", "Cộng đồng"]
    : [options.category]
  const seen = new Set<string>()
  const matched = articles.filter((article) => {
    if (seen.has(article.id)) return false
    seen.add(article.id)
    if (options.category !== "Tất cả" && !categories.includes(article.category)) return false
    if (!needle) return true
    return foldNewsQuery(`${article.title} ${article.excerpt}`).includes(needle)
  })
  return matched.sort((a, b) => {
    const order = a.publishedAt.localeCompare(b.publishedAt)
    return options.sort === "oldest" ? order : -order
  })
}

export function selectNewsLayout(articles: NewsArticle[]) {
  const { featured, trending } = selectSpotlight(articles)
  const rest = articles.filter((item) => item.id !== featured?.id)
  const trendingIds = new Set(trending.map((item) => item.id))
  const secondary = rest.filter((item) => !trendingIds.has(item.id)).slice(0, 3)
  return {
    featured,
    secondary,
  }
}
