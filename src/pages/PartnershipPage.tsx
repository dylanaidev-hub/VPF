import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { pageHeroes } from "../data/pageHeroes"
import { PartnershipForm } from "../components/partnership/PartnershipForm"
import { PartnershipImpact } from "../components/partnership/PartnershipImpact"
import { PartnershipOffers } from "../components/partnership/PartnershipOffers"
import { SponsorShowcase } from "../components/partnership/SponsorShowcase"

export function PartnershipPage() {
  return (
    <SiteLayout>
      <PageHero {...pageHeroes.partnership} />
      <PartnershipImpact />
      <SponsorShowcase />
      <PartnershipOffers />
      <PartnershipForm />
    </SiteLayout>
  )
}
