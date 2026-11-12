import { getSponsorBySlug, sponsors } from "../data/partnership.mock"

export function sponsorPath(slug: string) {
  return `/hop-tac/${encodeURIComponent(slug)}/`
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

export function resolveSponsorFromLocation(pathname = window.location.pathname) {
  return getSponsorBySlug(sponsorSlugFromPath(pathname))
}

export const sponsorSlugs = sponsors.map((item) => item.slug)
