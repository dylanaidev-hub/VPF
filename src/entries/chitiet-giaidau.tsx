import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TournamentDetailPage } from "../pages/TournamentDetailPage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TournamentDetailPage />
  </StrictMode>,
)
