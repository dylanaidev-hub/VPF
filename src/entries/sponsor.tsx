import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { resolveSponsorFromLocation } from "../lib/partnership"
import { SponsorDetailPage, SponsorNotFoundPage } from "../pages/SponsorDetailPage"
import "../index.css"

function SponsorEntry() {
  const sponsor = resolveSponsorFromLocation()

  useEffect(() => {
    if (!sponsor) {
      document.title = "Không tìm thấy nhà tài trợ – Liên đoàn Pickleball Việt Nam"
      return
    }
    document.title = `${sponsor.name} – Liên đoàn Pickleball Việt Nam`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", sponsor.intro)
  }, [sponsor])

  return sponsor ? <SponsorDetailPage sponsor={sponsor} /> : <SponsorNotFoundPage />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SponsorEntry />
  </StrictMode>,
)
