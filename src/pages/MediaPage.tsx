import { SiteLayout } from "../components/SiteLayout"
import { MediaGallery } from "../components/media/MediaGallery"
import { MediaHero } from "../components/media/MediaHero"

export function MediaPage() {
  return (
    <SiteLayout>
      <MediaHero />
      <MediaGallery />
    </SiteLayout>
  )
}
