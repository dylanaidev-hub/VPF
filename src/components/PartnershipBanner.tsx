import { useTranslation } from "../i18n"
import { partnership } from "../data/partners"
import { useReveal } from "../lib/useReveal"
import { Button } from "./Button"
import { vpfStarPaths } from "./vpfStarPaths"

export function PartnershipBanner() {
  const { t } = useTranslation()
  const { ref, shown } = useReveal<HTMLElement>()

  return (
    <section
      id="hop-tac"
      ref={ref}
      data-section
      data-revealed={shown}
      className="partner-hub relative overflow-hidden bg-signal text-white"
      aria-labelledby="hop-tac-tieu-de"
    >
      <div className="page-wrap partner-hub-inner">
        <header className="partner-hub-copy">
          <p className="partner-hub-eyebrow">{t(partnership.eyebrow)}</p>
          <h2 id="hop-tac-tieu-de" className="vpf-section-title text-white">
            {t(partnership.title)}
          </h2>
          <p className="partner-hub-lead">{t(partnership.description)}</p>
          <div className="partner-hub-cta">
            <Button href={partnership.href}>{t(partnership.cta)}</Button>
          </div>
        </header>

        <div className="partner-hub-stage">
          <svg
            className="partner-hub-orbit"
            viewBox="0 0 120 120"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            <circle className="partner-hub-orbit-ring" cx="60" cy="60" r="47" />
            <path className="partner-hub-link" data-link="thuong-hieu" d="M60 42V20" />
            <path className="partner-hub-link" data-link="truyen-thong" d="M73 60H100" />
            <path className="partner-hub-link" data-link="giai-dau" d="M60 75V100" />
            <path className="partner-hub-link" data-link="cong-dong" d="M47 60H20" />
          </svg>
          <svg
            className="partner-hub-star"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            {vpfStarPaths.map((d) => (
              <g key={d} className="partner-star-ring">
                <path className="partner-star-stroke" d={d} />
              </g>
            ))}
          </svg>
          {partnership.pillars.map((pillar) => (
            <article key={pillar.id} className="partner-hub-pillar" data-pillar={pillar.id} tabIndex={0}>
              <h3 className="partner-hub-pillar-label">{t(pillar.label)}</h3>
              <p className="partner-hub-pillar-detail">{t(pillar.detail)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
