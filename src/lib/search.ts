import { foldText } from "./format"

export const searchTypes = {
  news: "Tin tức",
  tournament: "Giải đấu",
  document: "Chuyên môn / Tài liệu",
  member: "Đơn vị thành viên",
  athlete: "Vận động viên",
  page: "Trang thông tin",
} as const

export type SearchType = keyof typeof searchTypes

export type SearchItem = {
  id: string
  type: SearchType
  title: string
  description?: string
  keywords?: string[]
  url: string
  date?: string
  meta?: string
  label?: string
}

function normalize(value: string) {
  return foldText(value).replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim()
}

export function searchSite(items: readonly SearchItem[], query: string, type?: SearchType) {
  const phrase = normalize(query)
  if (!phrase) return []

  const words = [...new Set(phrase.split(" "))]
  return items.flatMap((item) => {
    if (type && item.type !== type) return []
    const title = normalize(item.title)
    const context = normalize([item.description, ...(item.keywords ?? [])].join(" "))
    if (!words.every((word) => title.includes(word) || context.includes(word))) return []

    const titleMatches = words.filter((word) => title.includes(word)).length
    const rank = title === phrase ? 3 : title.startsWith(phrase) ? 2 : title.includes(phrase) ? 1 : 0
    return [{ item, titleMatches, rank }]
  }).sort((a, b) =>
    b.rank - a.rank ||
    b.titleMatches - a.titleMatches ||
    (b.item.date ?? "").localeCompare(a.item.date ?? "") ||
    a.item.title.localeCompare(b.item.title, "vi"),
  ).map(({ item }) => item)
}
