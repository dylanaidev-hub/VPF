import { X } from "lucide-react"
import type { NewsArticle } from "../../types"
import { formatViDate } from "../../lib/format"
import { newsCategories, newsPath, type NewsCategory, type NewsSort } from "../../lib/news"
import { sitePath } from "../../lib/site"
import { Badge } from "../Badge"

export function NewsToolbar({
  category,
  query,
  sort,
  onCategory,
  onQuery,
  onSort,
}: {
  category: NewsCategory
  query: string
  sort: NewsSort
  onCategory: (category: NewsCategory) => void
  onQuery: (query: string) => void
  onSort: (sort: NewsSort) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-3 sm:flex-row" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Tìm kiếm tin tức</span>
          <input
            type="search"
            value={query}
            placeholder="Tìm kiếm tin tức..."
            onChange={(event) => onQuery(event.target.value)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-4 pr-12 text-[15px] text-ink outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              aria-label="Xóa tìm kiếm"
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"
              onClick={() => onQuery("")}
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </label>
        <label className="sm:w-44">
          <span className="sr-only">Sắp xếp</span>
          <select
            value={sort}
            onChange={(event) => onSort(event.target.value as NewsSort)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </label>
      </form>
      <div className="news-categories" role="tablist" aria-label="Danh mục tin">
        {newsCategories.map((item) => {
          const selected = item === category
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              className={
                selected
                  ? "shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-medium text-ink"
                  : "shrink-0 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink"
              }
              onClick={() => onCategory(item)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <ul className="news-grid">
      {articles.map((article) => (
        <li key={article.id}>
          <a href={sitePath(newsPath(article))} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
            <div className="overflow-hidden">
              <img
                src={sitePath(article.image)}
                alt=""
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className={`aspect-video w-full object-cover transition-transform duration-[250ms] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${article.imagePosition ?? "object-center"}`}
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Badge tone="neutral" className="border border-line">
                  {article.category}
                </Badge>
                <time dateTime={article.publishedAt} className="text-[12px] font-medium text-muted">
                  {formatViDate(article.publishedAt)}
                </time>
              </div>
              <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-ink transition-colors duration-[250ms] group-hover:text-brand-strong">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function NewsEmpty({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-line bg-paper px-6 py-12 text-center">
      <p className="text-base font-semibold text-ink">Không tìm thấy bài viết phù hợp.</p>
      <button
        type="button"
        className="mt-5 inline-flex min-h-12 items-center rounded-[10px] bg-brand px-5 text-[15px] font-medium text-ink"
        onClick={onClear}
      >
        Xóa bộ lọc
      </button>
    </div>
  )
}

export function NewsPagination({
  page,
  pageCount,
  onPage,
}: {
  page: number
  pageCount: number
  onPage: (page: number) => void
}) {
  if (pageCount < 1) return null
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)
  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Phân trang tin tức">
      <button
        type="button"
        className="min-h-11 rounded-[10px] border border-line px-4 text-sm font-medium text-ink disabled:opacity-40"
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        Trước
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          aria-current={number === page ? "page" : undefined}
          className={
            number === page
              ? "grid size-11 place-items-center rounded-[10px] bg-brand text-sm font-semibold text-ink"
              : "grid size-11 place-items-center rounded-[10px] border border-line text-sm font-medium text-ink hover:border-brand"
          }
          onClick={() => onPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        className="min-h-11 rounded-[10px] border border-line px-4 text-sm font-medium text-ink disabled:opacity-40"
        disabled={page === pageCount}
        onClick={() => onPage(page + 1)}
      >
        Sau
      </button>
    </nav>
  )
}
