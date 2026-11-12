import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { LibraryCommunityPage } from "../pages/LibraryCommunityPage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LibraryCommunityPage />
  </StrictMode>,
)
