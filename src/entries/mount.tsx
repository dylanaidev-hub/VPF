import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import type { PageContent } from "../data/pages"
import { ContentPage } from "../pages/ContentPage"
import "../index.css"

export function mountPage(page: PageContent) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ContentPage page={page} />
    </StrictMode>,
  )
}
