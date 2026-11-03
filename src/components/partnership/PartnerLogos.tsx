import { verifiedPartners } from "../../data/partnership.mock"
import { sitePath } from "../../lib/site"

export function PartnerLogos() {
  if (verifiedPartners.length === 0) return null

  return (
    <section className="bg-paper py-14 md:py-16" aria-labelledby="doi-tac-dong-hanh">
      <div className="page-wrap">
        <h2 id="doi-tac-dong-hanh" className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Đối tác đồng hành
        </h2>
        <ul className="partnership-logos mt-8">
          {verifiedPartners.map((partner) => (
            <li key={partner.id}>
              <img src={sitePath(partner.logoSrc)} alt={partner.name} className="partnership-logo" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
