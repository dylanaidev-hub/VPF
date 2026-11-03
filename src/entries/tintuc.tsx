import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { NewsPage } from "../pages/NewsPage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NewsPage />
  </StrictMode>,
)
