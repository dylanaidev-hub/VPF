import { useEffect, useRef } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "../components/Button"
import { PageHeader } from "../components/PageHeader"
import { SiteLayout } from "../components/SiteLayout"
import { siteSearchIndex } from "../data/searchIndex"
import { searchSite, searchTypes, type SearchItem, type SearchType } from "../lib/search"
import { sitePath } from "../lib/site"
import { useFragmentScroll } from "../lib/useFragmentScroll"
import "./search-page.css"

const PAGE_SIZE = 8
const filters = Object.entries(searchTypes) as [SearchType, string][]
const searchPage = "/timkiem.html"

function resultsPath(query: string, type?: SearchType, page = 1) {
  const params = new URLSearchParams({ q: query })
  if (type) params.set("type", type)
  if (page > 1) params.set("page", String(page))
  return `${searchPage}?${params}#ket-qua`
}

function ResultList({ items }: { items: SearchItem[] }) {
  return (
    <ul className="search-results">
      {items.map((item) => (
        <li key={item.id}>
          <a className="search-result" href={sitePath(item.url)}>
            <div>
              <p className="search-result-type">{item.label ?? searchTypes[item.type]}</p>
              <h3>{item.title}</h3>
              {item.description ? <p className="search-result-description">{item.description}</p> : null}
              {item.meta ? <p className="search-result-meta">{item.meta}</p> : null}
            </div>
            <ArrowRight className="size-5 search-result-arrow" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export function SearchPage() {
  const params = new URLSearchParams(window.location.search)
  const query = params.get("q")?.trim() ?? ""
  const type = filters.find(([key]) => key === params.get("type"))?.[0]
  const results = searchSite(siteSearchIndex, query, type)
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const requestedPage = Number(params.get("page"))
  const page = Number.isSafeInteger(requestedPage) ? Math.max(1, Math.min(pageCount, requestedPage)) : 1
  const start = (page - 1) * PAGE_SIZE
  const inputRef = useRef<HTMLInputElement>(null)
  const filterRef = useRef<HTMLElement>(null)

  useFragmentScroll()
  useEffect(() => {
    if (!query && window.matchMedia("(pointer: fine)").matches && document.activeElement === document.body) {
      inputRef.current?.focus({ preventScroll: true })
    }
    const filterNav = filterRef.current
    const activeFilter = filterNav?.querySelector("[aria-current]")
    if (filterNav && activeFilter) {
      const viewport = filterNav.getBoundingClientRect()
      const item = activeFilter.getBoundingClientRect()
      if (item.left < viewport.left || item.right > viewport.right) {
        filterNav.scrollLeft += item.left - viewport.left - (viewport.width - item.width) / 2
      }
    }
  }, [query, type])

  return (
    <SiteLayout>
      <div className="site-search-page">
        <PageHeader
          breadcrumb={[{ label: "Trang chủ", href: "/index.html" }, { label: "Tìm kiếm" }]}
          title="Tìm kiếm"
          description="Khám phá thông tin trên website Liên đoàn Pickleball Việt Nam."
        />
        <div className="page-wrap">
          <form className="site-search-form" role="search" action={sitePath(searchPage)} method="get">
            <label className="site-search-field">
              <Search className="size-5 shrink-0" aria-hidden="true" />
              <span className="sr-only">Từ khóa tìm kiếm</span>
              <input ref={inputRef} type="search" name="q" defaultValue={query} placeholder="Nhập từ khóa" enterKeyHint="search" />
            </label>
            {type ? <input type="hidden" name="type" value={type} /> : null}
            <Button type="submit">Tìm kiếm</Button>
          </form>

          {query ? (
            <section id="ket-qua" className="site-search-content" aria-labelledby="ket-qua-tieu-de">
              <nav ref={filterRef} className="search-filters" aria-label="Lọc theo loại nội dung">
                <a href={sitePath(resultsPath(query))} aria-current={!type ? "page" : undefined}>Tất cả</a>
                {filters.map(([key, label]) => (
                  <a key={key} href={sitePath(resultsPath(query, key))} aria-current={type === key ? "page" : undefined}>{label}</a>
                ))}
              </nav>
              <div className="search-results-heading">
                <h2 id="ket-qua-tieu-de">Kết quả tìm kiếm</h2>
                <p>{results.length} kết quả cho “{query}”</p>
              </div>
              {results.length ? (
                <ResultList items={results.slice(start, start + PAGE_SIZE)} />
              ) : (
                <div className="search-empty">
                  <h3>Không tìm thấy kết quả phù hợp</h3>
                  <p>Thử dùng từ khóa khác hoặc chọn bộ lọc “Tất cả”.</p>
                </div>
              )}
              {pageCount > 1 ? (
                <nav className="search-pagination" aria-label="Trang kết quả tìm kiếm">
                  {page > 1 ? (
                    <Button variant="secondary" href={resultsPath(query, type, page - 1)} rel="prev" className="search-page-step">
                      <ChevronLeft className="size-4" aria-hidden="true" /> Trang trước
                    </Button>
                  ) : null}
                  <span className="search-page-number" aria-current="page">{page} / {pageCount}</span>
                  {page < pageCount ? (
                    <Button variant="secondary" href={resultsPath(query, type, page + 1)} rel="next" className="search-page-step">
                      Trang sau <ChevronRight className="size-4" aria-hidden="true" />
                    </Button>
                  ) : null}
                </nav>
              ) : null}
            </section>
          ) : (
            <p className="site-search-hint">Nhập từ khóa để tìm tin tức, giải đấu, tài liệu và các nội dung khác.</p>
          )}
        </div>
      </div>
    </SiteLayout>
  )
}
