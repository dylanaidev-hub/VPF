import { useMemo, useState } from "react"
import { news } from "../data/news"
import { filterNews, NEWS_PAGE_SIZE, selectSpotlight, type NewsCategory, type NewsSort } from "../lib/news"
import { Breadcrumb } from "../components/Breadcrumb"
import { NewsEmpty, NewsGrid, NewsPagination, NewsToolbar } from "../components/news/NewsArchive"
import { NewsSpotlight } from "../components/news/NewsSpotlight"
import { SiteLayout } from "../components/SiteLayout"

export function NewsPage() {
  const featured = useMemo(() => selectSpotlight(news).featured, [])
  const [category, setCategory] = useState<NewsCategory>("Tất cả")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<NewsSort>("newest")
  const [page, setPage] = useState(1)

  const browsing = category === "Tất cả" && query.trim() === ""
  const filtered = useMemo(
    () => filterNews(news, { category, query, sort }),
    [category, query, sort],
  )
  const archive = useMemo(() => {
    if (!browsing || !featured) return filtered
    return filtered.filter((article) => article.id !== featured.id)
  }, [browsing, featured, filtered])
  const pageCount = Math.ceil(archive.length / NEWS_PAGE_SIZE)
  const currentPage = pageCount === 0 ? 1 : Math.min(page, pageCount)
  const showFeatured = Boolean(browsing && currentPage === 1 && featured)
  const visible = archive.slice((currentPage - 1) * NEWS_PAGE_SIZE, currentPage * NEWS_PAGE_SIZE)

  const resetPage = () => setPage(1)
  const clearFilters = () => {
    setCategory("Tất cả")
    setQuery("")
    setSort("newest")
    resetPage()
  }

  return (
    <SiteLayout>
      <article className="bg-white">
        <header className="page-wrap pt-10 pb-6 min-[1200px]:pt-14">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/index.html" }, { label: "Tin tức" }]} />
          <p className="mt-6 flex items-center gap-3 text-[13px] font-medium text-brand-strong">
            <span className="h-px w-8 bg-brand" aria-hidden />
            Tin tức
          </p>
          <h1 id="tin-tuc-trang" className="news-page-title mt-3 text-ink">
            Tin tức Pickleball
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
            Cập nhật những thông tin mới nhất từ Liên đoàn và cộng đồng Pickleball Việt Nam.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Các bài viết đang hiển thị là dữ liệu minh họa, không phải thông cáo chính thức.
          </p>
        </header>

        <div className="page-wrap pb-8">
          <NewsToolbar
            category={category}
            query={query}
            sort={sort}
            onCategory={(next) => {
              setCategory(next)
              resetPage()
            }}
            onQuery={(next) => {
              setQuery(next)
              resetPage()
            }}
            onSort={(next) => {
              setSort(next)
              resetPage()
            }}
          />
        </div>

        {showFeatured && featured ? (
          <div className="page-wrap pb-10">
            <NewsSpotlight featured={featured} />
          </div>
        ) : null}

        <section className="border-t border-line" aria-labelledby="tin-tat-ca">
          <div className="page-wrap py-10 min-[1200px]:py-12">
            <h2 id="tin-tat-ca" className="text-[1.75rem] font-bold tracking-tight text-ink">
              Tất cả bài viết
            </h2>
            <p className="mt-2 text-sm text-muted" aria-live="polite">
              {archive.length} bài viết
            </p>
            <div className="mt-6">
              {visible.length === 0 ? <NewsEmpty onClear={clearFilters} /> : <NewsGrid articles={visible} />}
            </div>
            <NewsPagination page={currentPage} pageCount={pageCount} onPage={setPage} />
          </div>
        </section>
      </article>
    </SiteLayout>
  )
}
