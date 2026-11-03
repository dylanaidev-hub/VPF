import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MediaPage } from "../pages/MediaPage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MediaPage />
  </StrictMode>,
)
