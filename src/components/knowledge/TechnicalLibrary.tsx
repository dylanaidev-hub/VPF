import { useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { documentTypes, type TechnicalDocument } from "../../data/technicalResources"
import { foldText } from "../../lib/format"
import { TechnicalDocumentList, TechnicalSection } from "./TechnicalSections"

const PAGE_SIZE = 5
const documentDate = (document: TechnicalDocument) => document.publishedOn ?? document.sampleDate ?? ""
const normalize = (value: string) => foldText(value).replace(/đ/g, "d").trim()

export function TechnicalLibrary({ documents }: { documents: TechnicalDocument[] }) {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("")
  const [year, setYear] = useState("")
  const [sort, setSort] = useState("date")
  const [page, setPage] = useState(1)

  const term = normalize(query)
  const years = [...new Set(documents.map((document) => documentDate(document).slice(0, 4)))].sort().reverse()
  const matching = documents.filter((document) => (
    normalize(`${document.title} ${document.reference ?? ""}`).includes(term)
    && (!type || document.type === type)
    && (!year || (year === "unpublished" ? !documentDate(document) : documentDate(document).startsWith(year)))
  ))
  matching.sort((a, b) => sort === "title"
    ? a.title.localeCompare(b.title, "vi", { sensitivity: "base" })
    : documentDate(b).localeCompare(documentDate(a))
  )

  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * PAGE_SIZE
  const visible = matching.slice(start, start + PAGE_SIZE)

  function resetFilters() {
    setQuery("")
    setType("")
    setYear("")
    setPage(1)
  }

  return (
    <TechnicalSection id="van-ban-chuyen-mon" intro="Tìm theo tên, số hiệu, loại tài liệu hoặc năm. Tài liệu minh họa có nhãn Bản mẫu.">
      <div className="tech-library">
        <div className="tech-filters" role="search" aria-label="Tìm văn bản chuyên môn">
          <label>
            <span>Tìm văn bản</span>
            <span className="tech-search-field">
              <Search size={18} aria-hidden="true" />
              <input type="search" value={query} placeholder="Nhập tên hoặc số hiệu" onChange={(event) => { setQuery(event.target.value); setPage(1) }} />
            </span>
          </label>
          <label>
            <span>Loại văn bản</span>
            <select value={type} onChange={(event) => { setType(event.target.value); setPage(1) }}>
              <option value="">Tất cả loại</option>
              {documentTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Năm tài liệu</span>
            <select value={year} onChange={(event) => { setYear(event.target.value); setPage(1) }}>
              <option value="">Tất cả năm</option>
              {years.map((item) => item ? <option key={item}>{item}</option> : <option key="unpublished" value="unpublished">Chưa công bố</option>)}
            </select>
          </label>
          <label>
            <span>Sắp xếp</span>
            <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1) }}>
              <option value="date">Mới nhất</option>
              <option value="title">Tên A–Z</option>
            </select>
          </label>
        </div>

        <div className="tech-result-bar">
          <span role="status">{matching.length} văn bản</span>
          {query || type || year ? <button type="button" onClick={resetFilters}>Xóa bộ lọc</button> : null}
        </div>

        {visible.length ? (
          <TechnicalDocumentList documents={visible} />
        ) : (
          <div className="tech-empty">
            <h3>Không tìm thấy văn bản phù hợp</h3>
            <p>Thử tên, số hiệu khác hoặc xóa bộ lọc để xem toàn bộ tài liệu.</p>
          </div>
        )}

        {pageCount > 1 ? (
          <nav className="tech-pagination" aria-label="Trang kết quả văn bản">
            <span>{start + 1}–{start + visible.length} / {matching.length} văn bản</span>
            <div>
              <button type="button" aria-label="Trang trước" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={18} aria-hidden="true" /></button>
              <span aria-current="page">{currentPage} / {pageCount}</span>
              <button type="button" aria-label="Trang sau" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={18} aria-hidden="true" /></button>
            </div>
          </nav>
        ) : null}
      </div>
    </TechnicalSection>
  )
}
