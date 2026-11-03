import { useState, type ReactNode } from "react"
import { formatViDate } from "../lib/format"
import { sitePath } from "../lib/site"
import type { NavItem, NewsArticle } from "../types"
import { Dialog } from "./Dialog"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { SearchDialog } from "./SearchDialog"

export function SiteLayout({
  children,
  navigation,
}: {
  children: ReactNode
  navigation?: NavItem[]
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [article, setArticle] = useState<NewsArticle | null>(null)

  return (
    <>
      <Header searchOpen={searchOpen} onSearch={() => setSearchOpen(true)} items={navigation} />
      <main id="noi-dung">{children}</main>
      <Footer />

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenNews={setArticle}
      />

      <Dialog open={article !== null} title={article?.title ?? "Tin tức"} onClose={() => setArticle(null)}>
        {article ? (
          <article>
            <img
              src={sitePath(article.image)}
              alt={article.imageAlt}
              width={1600}
              height={1000}
              className={`mb-5 aspect-[16/9] w-full rounded-xl object-cover ${article.imagePosition ?? "object-center"}`}
            />
            <p className="text-[13px] font-medium text-signal">
              {article.category}
              <span className="text-muted"> · </span>
              <time dateTime={article.date} className="text-muted">
                {formatViDate(article.date)}
              </time>
            </p>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ) : null}
      </Dialog>
    </>
  )
}
