import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { PartnershipPage } from "../pages/PartnershipPage"
import "../index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PartnershipPage />
  </StrictMode>,
)
