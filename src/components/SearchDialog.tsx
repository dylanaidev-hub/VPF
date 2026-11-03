import { useState } from "react"
import { Search } from "lucide-react"
import type { NewsArticle } from "../types"
import { searchSite, type SearchResult } from "../lib/search"
import { sitePath } from "../lib/site"
import { Dialog } from "./Dialog"

export function SearchDialog({
  open,
  onClose,
  onOpenNews,
}: {
  open: boolean
  onClose: () => void
  onOpenNews: (article: NewsArticle) => void
}) {
  const [query, setQuery] = useState("")
  const results = searchSite(query)

  const choose = (result: SearchResult) => {
    if (result.kind === "news") onOpenNews(result.article)
    onClose()
    setQuery("")
  }

  return (
    <Dialog
      open={open}
      title="Tìm trên trang"
      onClose={() => {
        setQuery("")
        onClose()
      }}
    >
      <label className="flex items-center gap-3 border-b border-line pb-3" htmlFor="o-tim">
        <Search className="size-5 text-muted" aria-hidden />
        <input
          id="o-tim"
          data-autofocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tin tức, giải đấu, chuyên mục"
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
      </label>
      <div className="mt-4">
        {query.trim() === "" ? (
          <p className="text-sm text-muted">Gõ để tìm trong tin tức, lịch giải và menu.</p>
        ) : results.length === 0 ? (
          <p className="text-sm text-muted">Không có kết quả cho “{query.trim()}”.</p>
        ) : (
          <ul className="divide-y divide-line">
            {results.map((result) =>
              result.kind === "section" ? (
                <li key={result.id}>
                  <a
                    href={sitePath(result.href)}
                    className="block py-3 hover:text-brand-strong"
                    onClick={() => {
                      setQuery("")
                      onClose()
                    }}
                  >
                    <ResultBody title={result.title} meta={result.meta} />
                  </a>
                </li>
              ) : result.kind === "tournament" ? (
                <li key={result.id}>
                  <a
                    href={sitePath(result.tournament.detailUrl)}
                    className="block py-3 hover:text-brand-strong"
                    onClick={() => {
                      setQuery("")
                      onClose()
                    }}
                  >
                    <ResultBody title={result.title} meta={result.meta} />
                  </a>
                </li>
              ) : (
                <li key={result.id}>
                  <button type="button" className="block w-full py-3 text-left" onClick={() => choose(result)}>
                    <ResultBody title={result.title} meta={result.meta} />
                  </button>
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    </Dialog>
  )
}

function ResultBody({ title, meta }: { title: string; meta: string }) {
  return (
    <>
      <span className="block text-[12px] font-medium text-muted">{meta}</span>
      <span className="mt-1 block text-[15px] font-medium text-ink">{title}</span>
    </>
  )
}
