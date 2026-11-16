import { partnership } from "../data/partners"
import { Button } from "./Button"
import { vpfStarPaths } from "./vpfStarPaths"

export function PartnershipBanner() {
  return (
    <section id="hop-tac" data-section className="partner-banner relative overflow-hidden bg-signal text-white" aria-labelledby="hop-tac-tieu-de">
      <div className="page-wrap grid items-center gap-10 py-13 md:py-15 min-[1200px]:grid-cols-2 min-[1200px]:gap-16">
        <div>
          <h2
            id="hop-tac-tieu-de"
            className="vpf-section-title max-w-[14ch] text-white"
          >
            {partnership.title}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 md:text-base">
            {partnership.description}
          </p>
          <div className="mt-8">
            <Button href={partnership.href}>{partnership.cta}</Button>
          </div>
        </div>
        <div className="partner-star" aria-hidden>
          <svg className="partner-star-svg" viewBox="0 0 800 800" fill="none">
            <g className="partner-star-shape">
              {vpfStarPaths.map((d) => (
                <g key={d} className="partner-star-ring">
                  <path className="partner-star-stroke" d={d} />
                  <path className="partner-star-glow" d={d} pathLength={100} />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
