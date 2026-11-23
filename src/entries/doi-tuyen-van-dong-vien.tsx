import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TeamsAthletesPage } from "../pages/TeamsAthletesPage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TeamsAthletesPage />
  </StrictMode>,
)
