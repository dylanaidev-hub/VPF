import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { KnowledgePage } from "../pages/KnowledgePage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KnowledgePage />
  </StrictMode>,
)
