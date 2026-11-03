import type { PageContent } from "../data/pages"
import { Breadcrumb } from "../components/Breadcrumb"
import { Container } from "../components/Container"
import { SiteLayout } from "../components/SiteLayout"

export function ContentPage({ page }: { page: PageContent }) {
  return (
    <SiteLayout>
      <article aria-labelledby="tieu-de-trang" className="bg-white">
        <Container className="py-14 md:py-20 min-[1200px]:py-24">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/index.html" }, { label: page.crumb }]} />
          <div className="mt-10 max-w-3xl">
            <p className="flex items-center gap-3 text-[13px] font-medium text-brand-strong">
              <span className="h-px w-8 bg-brand" aria-hidden />
              {page.eyebrow}
            </p>
            <h1
              id="tieu-de-trang"
              className="mt-4 text-[2rem] font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl min-[1200px]:text-[2.75rem]"
            >
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">{page.description}</p>
            <p className="mt-8 max-w-2xl rounded-2xl border border-line bg-paper px-5 py-4 text-sm leading-relaxed text-muted">
              {page.note}
            </p>
          </div>
        </Container>
      </article>
    </SiteLayout>
  )
}
