import { aboutHero } from "../../data/aboutPage.mock"
import { sitePath } from "../../lib/site"
import { Breadcrumb } from "../Breadcrumb"
import { Container } from "../Container"

export function AboutHero() {
  return (
    <section className="relative h-[300px] overflow-hidden min-[1200px]:h-[420px]" aria-labelledby="gioi-thieu-tieu-de">
      <img
        src={sitePath(aboutHero.image)}
        alt={aboutHero.imageAlt}
        width={2000}
        height={1333}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/60 to-ink/30" />
      <div className="absolute -bottom-16 -right-10 size-52 rounded-full bg-brand" aria-hidden />
      <div className="absolute -bottom-24 right-24 size-40 rounded-full bg-signal" aria-hidden />
      <Container className="relative flex h-full flex-col justify-end pb-8 sm:pb-10">
        <Breadcrumb items={aboutHero.crumbs} tone="inverse" />
        <h1
          id="gioi-thieu-tieu-de"
          className="mt-4 max-w-3xl text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl min-[1200px]:text-[3.25rem]"
        >
          {aboutHero.title}
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">{aboutHero.description}</p>
      </Container>
    </section>
  )
}
