import { aboutCta } from "../../data/aboutPage.mock"
import { sitePath } from "../../lib/site"
import { Button } from "../Button"
import { Container } from "../Container"
import { StarPattern } from "../StarPattern"

export function AboutCTA() {
  return (
    <section className="bg-white pb-16 min-[1200px]:pb-24" aria-labelledby="gioi-thieu-cta">
      <Container>
        <div className="relative isolate min-h-[220px] overflow-hidden rounded-2xl md:min-h-[260px]">
          <img
            src={sitePath(aboutCta.image)}
            alt={aboutCta.imageAlt}
            width={2000}
            height={1333}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <StarPattern />
          <div className="relative flex min-h-[220px] flex-col justify-center px-6 py-10 sm:px-10 md:min-h-[260px] md:px-14">
            <h2 id="gioi-thieu-cta" className="max-w-[16ch] text-[1.75rem] font-bold leading-[1.15] text-white sm:text-4xl">
              {aboutCta.title}
            </h2>
            <p className="mt-3 text-base text-white/80">{aboutCta.description}</p>
            <div className="mt-6">
              <Button href={aboutCta.href}>{aboutCta.cta}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
