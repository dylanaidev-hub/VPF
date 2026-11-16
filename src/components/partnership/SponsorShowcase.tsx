import { ArrowRight } from "lucide-react"
import {
  goldSilverSponsors,
  mainSponsor,
  mediaSponsors,
  sponsorTierLabel,
  sponsorsSection,
} from "../../data/partnership.mock"
import { cx } from "../../lib/cx"
import { sponsorPath } from "../../lib/partnership"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"

export function SponsorShowcase() {
  const { ref, shown } = useReveal<HTMLElement>()

  return (
    <section
      id={sponsorsSection.id}
      ref={ref}
      className={cx("partner-section partner-sponsors partner-rise", shown && "is-in")}
      aria-labelledby="nha-tai-tro-tieu-de"
    >
      <div className="page-wrap">
        <div className="partner-section-head">
          <h2 id="nha-tai-tro-tieu-de" className="partner-section-title">
            {sponsorsSection.title}
          </h2>
          <p className="partner-section-lead">{sponsorsSection.description}</p>
        </div>

        {mainSponsor ? (
          <article className="partner-main-card">
            <a href={sitePath(sponsorPath(mainSponsor.slug))} className="partner-main-logo-wrap">
              <img
                src={sitePath(mainSponsor.logoSrc)}
                alt={mainSponsor.name}
                width={240}
                height={120}
                className="partner-main-logo"
              />
            </a>
            <div className="partner-main-copy">
              <p className="partner-tier-badge">{sponsorTierLabel.main}</p>
              <h3 className="partner-main-name">{mainSponsor.name}</h3>
              <p className="partner-main-sector">{mainSponsor.sector}</p>
              <p className="partner-main-intro">{mainSponsor.intro}</p>
              <a href={sitePath(sponsorPath(mainSponsor.slug))} className="partner-btn-secondary mt-4 inline-flex">
                Xem giới thiệu
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </article>
        ) : null}

        <div className="partner-sponsor-block">
          <h3 className="partner-sponsor-block-title">Nhà tài trợ Vàng – Bạc</h3>
          <ul className="partner-logo-grid">
            {goldSilverSponsors.map((sponsor) => (
              <li key={sponsor.id}>
                <a href={sitePath(sponsorPath(sponsor.slug))} className="partner-logo-card">
                  <span className="partner-logo-frame">
                    <img src={sitePath(sponsor.logoSrc)} alt="" width={160} height={64} loading="lazy" />
                  </span>
                  <span className="partner-logo-name">{sponsor.name}</span>
                  <span className="partner-logo-tier">{sponsorTierLabel[sponsor.tier]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="partner-sponsor-block">
          <h3 className="partner-sponsor-block-title">Đối tác truyền thông – chuyên môn</h3>
          <ul className="partner-logo-grid is-compact">
            {mediaSponsors.map((sponsor) => (
              <li key={sponsor.id}>
                <a href={sitePath(sponsorPath(sponsor.slug))} className="partner-logo-card is-compact">
                  <span className="partner-logo-frame">
                    <img src={sitePath(sponsor.logoSrc)} alt="" width={140} height={56} loading="lazy" />
                  </span>
                  <span className="partner-logo-name">{sponsor.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
