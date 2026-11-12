import { cx } from "../lib/cx"
import { vpfStarPaths } from "./vpfStarPaths"

/** Homepage partnership star outlines, with a per-layer scale hook for the Liên đoàn section. */
export function VPFStarPattern({ className }: { className?: string }) {
  return (
    <svg className={cx("fed-brand-star", className)} viewBox="0 0 800 800" fill="none" aria-hidden>
      {vpfStarPaths.map((d, index) => (
        <g
          key={d}
          className="fed-star-layer partner-star-ring"
          style={{ ["--i" as string]: index, ["--swell" as string]: (1.1 + index * 0.008).toFixed(3) }}
        >
          <g className="fed-star-pulse">
            <path className="partner-star-stroke" d={d} />
            <path className="partner-star-glow" d={d} pathLength={100} />
          </g>
        </g>
      ))}
    </svg>
  )
}
