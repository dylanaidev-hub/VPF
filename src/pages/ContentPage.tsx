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
          <div className="mt-8 max-w-3xl">
            <h1 id="tieu-de-trang" className="page-header-title mt-0">
              {page.title}
            </h1>
            <p className="page-header-description">{page.description}</p>
          </div>
        </Container>
      </article>
    </SiteLayout>
  )
}
