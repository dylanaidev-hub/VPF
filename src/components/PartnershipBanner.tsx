import { useTranslation } from "../i18n"
import { useState } from "react"
import { partnership } from "../data/partners"
import { cx } from "../lib/cx"
import { useReveal } from "../lib/useReveal"
import { Button } from "./Button"
import { vpfStarPaths } from "./vpfStarPaths"

export function PartnershipBanner() {
  const { t } = useTranslation()
  const { ref, shown } = useReveal<HTMLElement>()
  const [hot, setHot] = useState(false)

  return (
    <section
      id="hop-tac"
      ref={ref}
      data-section
      data-revealed={shown}
      className={cx("partner-hub relative overflow-hidden bg-signal text-white", hot && "is-hot")}
      aria-labelledby="hop-tac-tieu-de"
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
    >
      <div className="page-wrap partner-hub-inner">
        <header className="partner-hub-copy">
          <h2 id="hop-tac-tieu-de" className="vpf-section-title text-white">
            {t(partnership.title)}
          </h2>
          <p className="partner-hub-lead">{t(partnership.description)}</p>
          <ul className="partner-hub-keywords" aria-label={t(partnership.title)}>
            {partnership.keywords.map((item) => (
              <li key={item.id} className="partner-hub-keyword">
                <span className="partner-hub-dot" aria-hidden="true" />
                <span>{t(item.label)}</span>
              </li>
            ))}
          </ul>
          <div className="partner-hub-cta">
            <Button href={partnership.href}>{t(partnership.cta)}</Button>
          </div>
        </header>

        <div className="partner-hub-stage" aria-hidden="true">
          <svg
            className="partner-hub-star"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {vpfStarPaths.map((d) => (
              <g key={d} className="partner-star-ring">
                <path className="partner-star-stroke" d={d} />
                <path className="partner-star-glow" d={d} pathLength={100} />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}
