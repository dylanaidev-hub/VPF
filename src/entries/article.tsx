import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { news } from "../data/news"
import { articleSlugFromPath } from "../lib/news"
import { ArticlePage } from "../pages/ArticlePage"
import "../index.css"

function ArticleEntry() {
  useEffect(() => {
    const slug = articleSlugFromPath(window.location.pathname)
    const article = news.find((item) => item.slug === slug)
    if (!article) return
    document.title = `${article.title} – Liên đoàn Pickleball Việt Nam`
    document.querySelector('meta[name="description"]')?.setAttribute("content", article.excerpt)
  }, [])

  return <ArticlePage />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ArticleEntry />
  </StrictMode>,
)
