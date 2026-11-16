import { Button } from "../components/Button"
import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { PartnershipBenefits } from "../components/partnership/PartnershipBenefits"
import { PartnershipForm } from "../components/partnership/PartnershipForm"
import { PartnershipOffers } from "../components/partnership/PartnershipOffers"
import { PartnershipValues } from "../components/partnership/PartnershipValues"
import { SponsorShowcase } from "../components/partnership/SponsorShowcase"
import { pageHeroes } from "../data/pageHeroes"
import { partnershipHero } from "../data/partnership.mock"
import "../components/partnership/partnership-ecosystem.css"

export function PartnershipPage() {
  return (
    <SiteLayout>
      <article className="bg-white">
        <PageHero
          {...pageHeroes.partnership}
          action={
            <div className="flex flex-wrap items-center gap-3">
              <Button href={partnershipHero.primaryHref}>{partnershipHero.primaryLabel}</Button>
              <Button href={partnershipHero.secondaryHref} variant="outline">
                {partnershipHero.secondaryLabel}
              </Button>
            </div>
          }
        />
        <PartnershipValues />
        <PartnershipOffers />
        <SponsorShowcase />
        <PartnershipBenefits />
        <PartnershipForm />
      </article>
    </SiteLayout>
  )
}
