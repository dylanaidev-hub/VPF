import starSvg from "../../public/brand/pattern-star.svg?raw"

/** Outlines from /public/brand/pattern-star.svg, inner star first. */
export const vpfStarPaths = [...starSvg.matchAll(/d="([^"]+)"/g)].map((match) => match[1] ?? "")

if (vpfStarPaths.length !== 7) {
  throw new Error("pattern-star.svg no longer has 7 outlines")
}
