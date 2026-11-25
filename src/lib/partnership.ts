import {
  getSponsorBySlug,
  sponsors,
  type SponsorHighlight,
  type SponsorProfile,
} from "../data/partnership.mock"

export function sponsorPath(slug: string) {
  return `/hop-tac/${encodeURIComponent(slug)}/`
}

/** Tối đa 4 ảnh preview cho section Dấu ấn đồng hành. */
export function getSponsorHighlights(sponsor: SponsorProfile): SponsorHighlight[] {
  return (sponsor.highlights ?? []).slice(0, 4)
}

/** Tối đa 3 nhà tài trợ khác — ưu tiên cùng hạng mục. */
export function getOtherSponsors(sponsor: SponsorProfile, limit = 3): SponsorProfile[] {
  const rest = sponsors.filter((item) => item.id !== sponsor.id)
  const sameTier = rest.filter((item) => item.tier === sponsor.tier)
  const others = rest.filter((item) => item.tier !== sponsor.tier)
  return [...sameTier, ...others].slice(0, limit)
}

export function sponsorSlugFromPath(pathname: string) {
  const match = pathname.match(/\/hop-tac\/([^/]+)\/?$/)
  if (!match) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}

/** Trang chi tiết nhà tài trợ (`/hop-tac/{slug}/`) hoặc template hop-tac.html. */
export function isSponsorDetailPath(pathname: string) {
  return pathname === "/hop-tac.html" || sponsorSlugFromPath(pathname) !== null
}

export function isPartnershipNavPath(pathname: string) {
  return pathname === "/hoptac.html" || pathname === "/hop-tac.html" || isSponsorDetailPath(pathname)
}

export function resolveSponsorFromLocation(pathname = window.location.pathname) {
  return getSponsorBySlug(sponsorSlugFromPath(pathname))
}

export const sponsorSlugs = sponsors.map((item) => item.slug)
