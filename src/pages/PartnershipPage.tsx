import { PageHeader } from "../components/PageHeader"
import { SiteLayout } from "../components/SiteLayout"
import { PartnershipForm } from "../components/partnership/PartnershipForm"
import { PartnershipImpact } from "../components/partnership/PartnershipImpact"
import { PartnershipOffers } from "../components/partnership/PartnershipOffers"
import { SponsorShowcase } from "../components/partnership/SponsorShowcase"
import { partnershipPage } from "../data/partnership.mock"

export function PartnershipPage() {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Trang chủ", href: "/index.html" }, { label: partnershipPage.title }]}
        eyebrow={partnershipPage.eyebrow}
        title={partnershipPage.title}
        titleId="hop-tac-tieu-de"
        description={partnershipPage.description}
        disclaimer={partnershipPage.disclaimer}
      />
      <PartnershipImpact />
      <SponsorShowcase />
      <PartnershipOffers />
      <PartnershipForm />
    </SiteLayout>
  )
}
