import { SiteLayout } from "../components/SiteLayout"
import { CooperationTypes } from "../components/partnership/CooperationTypes"
import { PartnerLogos } from "../components/partnership/PartnerLogos"
import { PartnershipBenefits } from "../components/partnership/PartnershipBenefits"
import { PartnershipForm } from "../components/partnership/PartnershipForm"
import { PartnershipHero } from "../components/partnership/PartnershipHero"

export function PartnershipPage() {
  return (
    <SiteLayout>
      <PartnershipHero />
      <PartnershipBenefits />
      <CooperationTypes />
      <PartnerLogos />
      <PartnershipForm />
    </SiteLayout>
  )
}
