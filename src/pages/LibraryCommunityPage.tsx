import { BrandIdentitySection } from "../components/library/BrandIdentitySection"
import { LibraryNav } from "../components/library/LibraryNav"
import { MediaLibrarySection } from "../components/library/MediaLibrarySection"
import { MemberOrgsSection } from "../components/library/MemberOrgsSection"
import { MembershipSection } from "../components/library/MembershipSection"
import { TeamsAthletesSection } from "../components/library/TeamsAthletesSection"
import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { pageHeroes } from "../data/pageHeroes"

export function LibraryCommunityPage() {
  return (
    <SiteLayout>
      <PageHero {...pageHeroes.library} />
      <div className="page-wrap py-5">
        <LibraryNav />
      </div>
      <BrandIdentitySection />
      <MediaLibrarySection />
      <MemberOrgsSection />
      <TeamsAthletesSection />
      <MembershipSection />
    </SiteLayout>
  )
}
