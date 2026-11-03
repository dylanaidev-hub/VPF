import { Breadcrumb } from "../Breadcrumb"

export function MediaHero() {
  return (
    <header className="page-wrap pb-2 pt-8 md:pt-10">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/index.html" }, { label: "Media" }]} />
      <p className="mt-5 text-[13px] font-semibold tracking-[0.14em] text-brand-strong">VPF MEDIA CENTER</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Khoảnh khắc tạo nên đam mê.
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Khám phá những hình ảnh, video và khoảnh khắc đáng nhớ của Pickleball Việt Nam.
      </p>
    </header>
  )
}
