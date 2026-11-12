import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { LibraryCommunityPage } from "../pages/LibraryCommunityPage"
import "../index.css"

/** Giữ /media.html hoạt động; URL chính thức là /thu-vien-cong-dong.html */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LibraryCommunityPage />
  </StrictMode>,
)
