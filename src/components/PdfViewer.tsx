import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Minus, Plus, Search } from "lucide-react"
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
import { EventBus, FindState, PDFFindController, PDFLinkService, PDFViewer } from "pdfjs-dist/web/pdf_viewer.mjs"
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import "pdfjs-dist/web/pdf_viewer.css"
import "./pdf-viewer.css"

GlobalWorkerOptions.workerSrc = workerUrl

export default function PdfViewer({ url }: { url: string }) {
  const viewport = useRef<HTMLDivElement>(null)
  const pages = useRef<HTMLDivElement>(null)
  const controls = useRef<{ viewer: PDFViewer; events: EventBus } | null>(null)
  const lastSearch = useRef("")
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [matches, setMatches] = useState("")
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = viewport.current
    const pageArea = pages.current
    if (!container || !pageArea) return

    const lifecycle = new AbortController()
    const events = new EventBus()
    const linkService = new PDFLinkService({ eventBus: events })
    const findController = new PDFFindController({ eventBus: events, linkService })
    const options = {
      container,
      viewer: pageArea,
      eventBus: events,
      linkService,
      findController,
      abortSignal: lifecycle.signal,
    }
    const viewer = new PDFViewer(options)
    linkService.setViewer(viewer)
    controls.current = { viewer, events }

    events.on("pagesinit", () => {
      viewer.currentScaleValue = "page-width"
      setTotal(viewer.pagesCount)
    })
    events.on("pagechanging", ({ pageNumber }: { pageNumber: number }) => setPage(pageNumber))
    events.on("updatefindcontrolstate", ({ state }: { state: number }) => {
      if (state === FindState.NOT_FOUND) setMatches("Không tìm thấy")
      if (state === FindState.PENDING) setMatches("Đang tìm…")
    })
    events.on("updatefindmatchescount", ({ matchesCount }: { matchesCount: { current: number; total: number } }) => {
      if (matchesCount.total) setMatches(`${matchesCount.current} / ${matchesCount.total} kết quả`)
    })

    const resize = new ResizeObserver(() => {
      if (viewer.pagesCount && viewer.currentScaleValue === "page-width") viewer.currentScaleValue = "page-width"
    })
    resize.observe(container)

    const task = getDocument({ url })
    void task.promise.then((document) => {
      if (lifecycle.signal.aborted) return
      linkService.setDocument(document)
      viewer.setDocument(document)
    }).catch(() => {
      if (!lifecycle.signal.aborted) setFailed(true)
    })

    return () => {
      controls.current = null
      viewer.setDocument(null)
      resize.disconnect()
      lifecycle.abort()
      void task.destroy().catch(() => undefined)
    }
  }, [url])

  function changePage(delta: number) {
    const viewer = controls.current?.viewer
    if (viewer) viewer.currentPageNumber = viewer.currentPageNumber + delta
  }

  function find(text: string) {
    controls.current?.events.dispatch("find", {
      source: controls.current,
      type: text && text === lastSearch.current ? "again" : "",
      query: text,
      caseSensitive: false,
      entireWord: false,
      highlightAll: true,
      findPrevious: false,
      matchDiacritics: false,
    })
    lastSearch.current = text
    if (!text) setMatches("")
  }

  return (
    <div className="vpf-pdf">
      {failed ? <p role="alert">Không thể xem PDF tại đây. Bạn có thể mở tệp trong tab mới hoặc tải xuống.</p> : null}
      <div className="vpf-pdf-tools" aria-label="Điều khiển PDF">
        <div>
          <button type="button" aria-label="Trang trước" disabled={page <= 1} onClick={() => changePage(-1)}><ChevronLeft size={17} aria-hidden="true" /></button>
          <span aria-live="polite">{total ? `${page} / ${total}` : "– / –"}</span>
          <button type="button" aria-label="Trang sau" disabled={page >= total} onClick={() => changePage(1)}><ChevronRight size={17} aria-hidden="true" /></button>
        </div>
        <div>
          <button type="button" aria-label="Thu nhỏ" disabled={!total} onClick={() => controls.current?.viewer.updateScale({ steps: -1 })}><Minus size={17} aria-hidden="true" /></button>
          <button type="button" aria-label="Phóng to" disabled={!total} onClick={() => controls.current?.viewer.updateScale({ steps: 1 })}><Plus size={17} aria-hidden="true" /></button>
        </div>
        <form role="search" aria-label="Tìm trong PDF" onSubmit={(event) => { event.preventDefault(); find(query.trim()) }}>
          <input type="search" aria-label="Nội dung tìm trong PDF" placeholder="Tìm trong PDF" value={query} disabled={!total} onChange={(event) => {
            setQuery(event.target.value)
            if (!event.target.value.trim()) find("")
          }} />
          <button type="submit" aria-label="Tìm tiếp trong PDF" disabled={!total || !query.trim()}><Search size={17} aria-hidden="true" /></button>
        </form>
      </div>
      {matches && query.trim() ? <p className="vpf-pdf-matches" role="status">{matches}</p> : null}
      <div className="vpf-pdf-stage" hidden={failed}>
        {!total && !failed ? <p role="status">Đang tải PDF…</p> : null}
        <div ref={viewport} className="vpf-pdf-viewport" role="region" aria-label="Trang tài liệu PDF" tabIndex={0}>
          <div ref={pages} className="pdfViewer" />
        </div>
      </div>
    </div>
  )
}
