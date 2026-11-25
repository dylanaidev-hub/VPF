import { useTranslation } from "../../i18n"
import { sponsorTierLabel, type SponsorProfile } from "../../data/partnership.mock"
import { sponsorPath } from "../../lib/partnership"
import { sitePath } from "../../lib/site"

export function PartnerSpotlightItem({ sponsor }: { sponsor: SponsorProfile }) {
  const { t } = useTranslation()
  const href = sitePath(sponsorPath(sponsor.slug))
  const tier = t(sponsorTierLabel[sponsor.tier])

  return (
    <a href={href} className="partner-spotlight-item" aria-label={`${sponsor.name}. ${tier}`}>
      <span className="partner-spotlight-item-logo">
        <img src={sitePath(sponsor.logoSrc)} alt="" width={160} height={64} loading="lazy" />
      </span>
      <span className="partner-spotlight-item-copy">
        <span className="partner-spotlight-item-name">{sponsor.name}</span>
        <span className="partner-spotlight-item-tier">{tier}</span>
      </span>
    </a>
  )
}
