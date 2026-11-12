import { BrandIdentitySection } from "../components/library/BrandIdentitySection"
import { LibraryNav } from "../components/library/LibraryNav"
import { MediaLibrarySection } from "../components/library/MediaLibrarySection"
import { MemberOrgsSection } from "../components/library/MemberOrgsSection"
import { MembershipSection } from "../components/library/MembershipSection"
import { TeamsAthletesSection } from "../components/library/TeamsAthletesSection"
import { PageHeader } from "../components/PageHeader"
import { SiteLayout } from "../components/SiteLayout"
import { libraryPage } from "../data/library.mock"

export function LibraryCommunityPage() {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Trang chủ", href: "/index.html" }, { label: libraryPage.title }]}
        eyebrow={libraryPage.eyebrow}
        title={libraryPage.title}
        titleId="thu-vien-cong-dong-tieu-de"
        description={libraryPage.description}
        disclaimer={libraryPage.disclaimer}
        action={<LibraryNav />}
      />
      <BrandIdentitySection />
      <MediaLibrarySection />
      <MemberOrgsSection />
      <TeamsAthletesSection />
      <MembershipSection />
    </SiteLayout>
  )
}
