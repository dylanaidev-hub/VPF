import type { Partner } from "../types"
import { sitePath } from "../lib/site"

export function PartnerMarquee({
  partners,
  note,
}: {
  partners: Partner[]
  note?: string
}) {
  const logos = partners.filter((partner) => partner.logoSrc)

  if (logos.length === 0) {
    return (
      <div className="page-wrap">
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          Logo đối tác sẽ được đặt tại đây khi có file.
        </p>
      </div>
    )
  }

  const illustrative = logos.every((partner) => partner.illustrative)

  return (
    <div>
      {illustrative && note ? (
        <div className="page-wrap mb-2">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">{note}</p>
        </div>
      ) : null}
      <div
        className="partner-marquee"
        tabIndex={0}
        aria-label={illustrative ? "Logo đối tác minh họa" : "Logo đối tác"}
      >
        <div className="partner-track">
          <LogoSet logos={logos} />
          <LogoSet logos={logos} clone />
        </div>
      </div>
    </div>
  )
}

function LogoSet({ logos, clone = false }: { logos: Partner[]; clone?: boolean }) {
  return (
    <ul className="partner-set" aria-hidden={clone || undefined} data-clone={clone ? "" : undefined}>
      {logos.map((partner) => (
        <li key={clone ? `clone-${partner.id}` : partner.id}>
          <span className="partner-logo" role="img" aria-label={partner.name} tabIndex={clone ? -1 : 0}>
            {partner.logoSrc ? (
              <img src={sitePath(partner.logoSrc)} alt="" draggable={false} loading="lazy" decoding="async" />
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  )
}
