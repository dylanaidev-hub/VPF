import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TournamentsPage } from "../pages/TournamentsPage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TournamentsPage />
  </StrictMode>,
)
