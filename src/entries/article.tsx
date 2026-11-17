import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { setPageMetadata } from "../i18n"
import { getNewsBySlug, getNewsSlug } from "../lib/news"
import { ArticlePage } from "../pages/ArticlePage"
import "../index.css"

const article = getNewsBySlug(getNewsSlug(window.location))
setPageMetadata(`${article?.title ?? "Không tìm thấy bài viết"} – Liên đoàn Pickleball Việt Nam`, article?.excerpt)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ArticlePage article={article} />
  </StrictMode>,
)
