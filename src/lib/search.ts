import { navigation } from "../data/navigation"
import { news } from "../data/news"
import { tournaments } from "../data/tournaments"
import type { NavItem, NewsArticle, TournamentView } from "../types"
import { foldText, formatViDate } from "./format"
import { statusLabel, withStatus } from "./tournaments"

export type SearchResult =
  | { id: string; kind: "news"; title: string; meta: string; article: NewsArticle }
  | {
      id: string
      kind: "tournament"
      title: string
      meta: string
      tournament: TournamentView
    }
  | { id: string; kind: "section"; title: string; meta: string; href: string }

function flattenNav(items: NavItem[], parent?: string): SearchResult[] {
  return items.flatMap((item) => {
    const current: SearchResult = {
      id: `section-${item.id}`,
      kind: "section",
      title: item.label,
      meta: parent ? `${parent} · Chuyên mục` : "Chuyên mục",
      href: item.href,
    }
    return [current, ...(item.children ? flattenNav(item.children, item.label) : [])]
  })
}

export function searchSite(query: string, now = new Date()): SearchResult[] {
  const folded = foldText(query.trim())
  if (!folded) return []

  const matches = (value: string) => foldText(value).includes(folded)
  const articles = news
    .filter((article) => matches(`${article.title} ${article.excerpt} ${article.category}`))
    .map<SearchResult>((article) => ({
      id: `news-${article.id}`,
      kind: "news",
      title: article.title,
      meta: `${article.category} · ${formatViDate(article.date)}`,
      article,
    }))

  const events = withStatus(tournaments, now)
    .filter((item) => matches(`${item.name} ${item.location} ${statusLabel[item.status]}`))
    .map<SearchResult>((tournament) => ({
      id: `tournament-${tournament.id}`,
      kind: "tournament",
      title: tournament.name,
      meta: `${tournament.location} · ${statusLabel[tournament.status]}`,
      tournament,
    }))

  const sections = flattenNav(navigation).filter(
    (item) => matches(item.title) || matches(item.meta),
  )

  return [...articles, ...events, ...sections].slice(0, 8)
}
