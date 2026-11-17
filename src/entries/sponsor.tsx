import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { setPageMetadata } from "../i18n"
import { resolveSponsorFromLocation } from "../lib/partnership"
import { SponsorDetailPage, SponsorNotFoundPage } from "../pages/SponsorDetailPage"
import "../index.css"

function SponsorEntry() {
  const sponsor = resolveSponsorFromLocation()

  useEffect(() => {
    if (!sponsor) {
      setPageMetadata("Không tìm thấy nhà tài trợ – Liên đoàn Pickleball Việt Nam")
      return
    }
    setPageMetadata(`${sponsor.name} – Liên đoàn Pickleball Việt Nam`, sponsor.intro)
  }, [sponsor])

  return sponsor ? <SponsorDetailPage sponsor={sponsor} /> : <SponsorNotFoundPage />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SponsorEntry />
  </StrictMode>,
)
