import { useMemo, useState } from "react"
import { FileText, Search, X } from "lucide-react"
import { resourceCategories, resources, type ResourceCategory, type ResourceDocument } from "../../data/resources.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { foldText, formatViDate } from "../../lib/format"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

function fold(value: string) {
  return foldText(value).replace(/đ/g, "d")
}

export function ResourcesLibrary() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<ResourceCategory>("Tất cả")
  const [open, setOpen] = useState<ResourceDocument | null>(null)
  const { ref, shown } = useReveal<HTMLUListElement>()

  const visible = useMemo(() => {
    const q = fold(query.trim())
    return resources.filter((item) => {
      const inCategory = category === "Tất cả" || item.category === category
      if (!inCategory) return false
      if (!q) return true
      return fold(`${item.title} ${item.category}`).includes(q)
    })
  }, [query, category])

  return (
    <section id="thu-vien" className="page-wrap py-14 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Thư viện tài liệu chuyên môn</h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Tổng hợp tài liệu tham khảo, hướng dẫn và kiến thức phục vụ hoạt động Pickleball.
      </p>

      <form role="search" className="mt-8" onSubmit={(event) => event.preventDefault()}>
        <label className="relative block">
          <span className="sr-only">Tìm tài liệu</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm tài liệu..."
            className="h-12 w-full rounded-[10px] border border-line bg-white pr-11 pl-10 text-[15px] text-ink"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-ink"
              aria-label="Xóa từ khóa"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </label>
      </form>

      <div className="knowledge-filters mt-4" role="tablist" aria-label="Danh mục tài liệu">
        {resourceCategories.map((item) => {
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
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {visible.length} tài liệu
      </p>

      {visible.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-line bg-paper px-5 py-10 text-center">
          <p className="text-base font-medium text-ink">Không tìm thấy tài liệu phù hợp.</p>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-ink underline"
            onClick={() => {
              setQuery("")
              setCategory("Tất cả")
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <ul ref={ref} className="mt-2 border-t border-line">
          {visible.map((item, index) => (
            <li
              key={item.id}
              className={cx("knowledge-rise border-b border-line", shown && "is-in")}
              style={{ transitionDelay: shown ? `${index * 70}ms` : undefined }}
            >
              <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                <FileText className="size-6 shrink-0 text-brand" aria-hidden />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.category}
                    <span> · </span>
                    {item.fileType}
                    <span> · </span>
                    <time dateTime={item.updatedAt}>Cập nhật {formatViDate(item.updatedAt)}</time>
                  </p>
                </div>
                {item.fileHref ? (
                  <a href={sitePath(item.fileHref)} className="shrink-0 text-sm font-semibold text-ink">
                    Xem tài liệu
                  </a>
                ) : (
                  <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                    <span className="text-sm text-muted">Đang cập nhật tài liệu</span>
                    <button type="button" onClick={() => setOpen(item)} className="text-sm font-semibold text-ink">
                      Xem tóm tắt
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open !== null} title={open?.title ?? "Tài liệu"} onClose={() => setOpen(null)}>
        {open ? (
          <div>
            <p className="text-sm text-muted">
              {open.category} · {open.fileType} · Cập nhật {formatViDate(open.updatedAt)}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">{open.summary}</p>
            <p className="mt-4 text-sm font-medium text-ink">Đang cập nhật tài liệu. Chưa có tệp để tải về.</p>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}
