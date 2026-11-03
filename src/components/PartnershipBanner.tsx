import { partnership } from "../data/partners"
import { sitePath } from "../lib/site"
import { Button } from "./Button"

export function PartnershipBanner() {
  return (
    <section id="hop-tac" data-section className="bg-ink text-white" aria-labelledby="hop-tac-tieu-de">
      <div className="page-wrap grid items-center gap-10 py-16 md:py-20 min-[1200px]:grid-cols-2 min-[1200px]:gap-16 min-[1200px]:py-28">
        <div>
          <p className="flex items-center gap-3 text-[13px] font-medium text-brand">
            <span className="h-px w-8 bg-brand" aria-hidden />
            {partnership.eyebrow}
          </p>
          <h2
            id="hop-tac-tieu-de"
            className="mt-4 max-w-[14ch] text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-4xl min-[1200px]:text-[2.75rem]"
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
        <div className="overflow-hidden rounded-2xl min-[1200px]:justify-self-end">
          <img
            src={sitePath(partnership.image)}
            alt={partnership.imageAlt}
            width={1333}
            height={2000}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover object-[center_22%] min-[1200px]:aspect-[4/5] min-[1200px]:max-h-[520px] min-[1200px]:w-[460px]"
          />
        </div>
      </div>
    </section>
  )
}
