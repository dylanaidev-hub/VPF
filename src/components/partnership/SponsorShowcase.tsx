import { ArrowRight } from "lucide-react"
import {
  mainSponsor,
  mediaSponsors,
  sponsorTierLabel,
  sponsors,
  sponsorsSection,
  type SponsorProfile,
  type SponsorTier,
} from "../../data/partnership.mock"
import { sponsorPath } from "../../lib/partnership"
import { sitePath } from "../../lib/site"
import { SectionHeading } from "../SectionHeading"
import { vpfStarPaths } from "../vpfStarPaths"

const goldSponsors = sponsors.filter((item) => item.tier === "gold")
const silverSponsors = sponsors.filter((item) => item.tier === "silver")

export function SponsorShowcase() {
  return (
    <section id={sponsorsSection.id} className="eco-section eco-sponsors" aria-labelledby="nha-tai-tro-tieu-de">
      <div className="page-wrap">
        <SectionHeading
          id="nha-tai-tro-tieu-de"
          title={sponsorsSection.title}
          subtitle={sponsorsSection.description}
          className="eco-sponsors-head"
        />
        <p className="eco-note">{sponsorsSection.note}</p>

        {mainSponsor ? <MainSponsor sponsor={mainSponsor} /> : null}
        <SponsorTier tone="gold" title={sponsorTierLabel.gold} sponsors={goldSponsors} />
        <SponsorTier tone="silver" title={sponsorTierLabel.silver} sponsors={silverSponsors} />
        <SponsorTier tone="media" title={sponsorTierLabel.media} sponsors={mediaSponsors} />
      </div>
    </section>
  )
}

function MainSponsor({ sponsor }: { sponsor: SponsorProfile }) {
  const href = sitePath(sponsorPath(sponsor.slug))
  return (
    <article className="sponsor-feature">
      <div className="sponsor-feature-label">
        <svg className="sponsor-feature-star" viewBox="0 0 800 800" fill="none" aria-hidden>
          {vpfStarPaths.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <p>{sponsorTierLabel.main}</p>
      </div>
      <a href={href} className="sponsor-feature-logo">
        <img src={sitePath(sponsor.logoSrc)} alt={sponsor.name} width={288} height={96} />
      </a>
      <div className="sponsor-feature-copy">
        <h3>{sponsor.name}</h3>
        <p className="sponsor-feature-sector">{sponsor.sector}</p>
        <p className="sponsor-feature-intro">{sponsor.intro}</p>
        <a href={href} className="eco-type-link">
          Xem giới thiệu
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </article>
  )
}

function SponsorTier({
  tone,
  title,
  sponsors: items,
}: {
  tone: Exclude<SponsorTier, "main">
  title: string
  sponsors: SponsorProfile[]
}) {
  return (
    <div className={`sponsor-tier is-${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((sponsor) => (
          <li key={sponsor.id}>
            <a href={sitePath(sponsorPath(sponsor.slug))} aria-label={sponsor.name}>
              <img src={sitePath(sponsor.logoSrc)} alt="" width={216} height={72} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
