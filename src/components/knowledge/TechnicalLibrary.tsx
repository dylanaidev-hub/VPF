import { useState } from "react"
import { ArrowDown, ArrowUp, ChevronsUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { documentTypes, type TechnicalDocument } from "../../data/technicalResources"
import { foldText, formatViDate } from "../../lib/format"
import { DocumentSource, DownloadTechnicalPdf, TechnicalSection, type OpenTechnicalDocument } from "./TechnicalSections"

const PAGE_SIZE = 5
const columns = [
  { key: "title", label: "Tên văn bản" },
  { key: "type", label: "Loại văn bản" },
  { key: "reference", label: "Số hiệu" },
  { key: "date", label: "Ngày ban hành" },
] as const
type Column = typeof columns[number]["key"]
type Sort = { key: Column; direction: "ascending" | "descending" }

const documentDate = (document: TechnicalDocument) => document.publishedOn ?? document.sampleDate ?? ""
const normalize = (value: string) => foldText(value).replace(/đ/g, "d").trim()

export function TechnicalLibrary({ documents, onOpen }: { documents: TechnicalDocument[]; onOpen: OpenTechnicalDocument }) {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("")
  const [year, setYear] = useState("")
  const [sort, setSort] = useState<Sort>({ key: "date", direction: "descending" })
  const [page, setPage] = useState(1)

  const term = normalize(query)
  const years = [...new Set(documents.map((document) => documentDate(document).slice(0, 4)))].sort().reverse()
  const matching = documents.filter((document) => (
    normalize(`${document.title} ${document.reference ?? ""}`).includes(term)
    && (!type || document.type === type)
    && (!year || (year === "unpublished" ? !documentDate(document) : documentDate(document).startsWith(year)))
  ))
  matching.sort((a, b) => {
    const left = sort.key === "date" ? documentDate(a) : (a[sort.key] ?? "")
    const right = sort.key === "date" ? documentDate(b) : (b[sort.key] ?? "")
    const order = left.localeCompare(right, "vi", { numeric: true, sensitivity: "base" })
    return sort.direction === "ascending" ? order : -order
  })

  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * PAGE_SIZE
  const visible = matching.slice(start, start + PAGE_SIZE)

  function sortBy(key: Column) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === "ascending" ? "descending" : "ascending",
    }))
    setPage(1)
  }

  function resetFilters() {
    setQuery("")
    setType("")
    setYear("")
    setPage(1)
  }

  return (
    <TechnicalSection id="van-ban-chuyen-mon" title="Văn bản chuyên môn" intro="Tìm và tải văn bản theo tên, số hiệu, loại tài liệu hoặc năm. Ngày và mã của bản mẫu dùng để minh họa thư viện.">
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
            <span>Năm ban hành</span>
            <select value={year} onChange={(event) => { setYear(event.target.value); setPage(1) }}>
              <option value="">Tất cả năm</option>
              {years.map((item) => item ? <option key={item}>{item}</option> : <option key="unpublished" value="unpublished">Chưa công bố</option>)}
            </select>
          </label>
        </div>

        <div className="tech-result-bar">
          <span role="status">{matching.length} văn bản</span>
          {query || type || year ? <button type="button" onClick={resetFilters}>Xóa bộ lọc</button> : null}
        </div>

        {visible.length ? (
          <div className="tech-table-scroll" role="region" aria-label="Danh sách văn bản" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  {columns.map(({ key, label }) => {
                    const direction = sort.key === key ? sort.direction : undefined
                    const Indicator = direction === "ascending" ? ArrowUp : direction === "descending" ? ArrowDown : ChevronsUpDown
                    return <th scope="col" aria-sort={direction} key={key}><button type="button" onClick={() => sortBy(key)}>{label}<Indicator size={14} aria-hidden="true" /></button></th>
                  })}
                  <th scope="col">Tải xuống</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((document) => {
                  const date = documentDate(document)
                  return (
                    <tr key={document.id}>
                      <td><button type="button" className="tech-text-action" onClick={() => onOpen(document)}>{document.title}</button><DocumentSource document={document} /></td>
                      <td>{document.type}</td>
                      <td>{document.reference ?? "Chưa công bố"}</td>
                      <td>{date ? <time dateTime={date}>{formatViDate(date)}</time> : "Chưa công bố"}</td>
                      <td><DownloadTechnicalPdf document={document} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
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
