import { ArrowRight } from "lucide-react"

export function CommunityCTA() {
  return (
    <section className="page-wrap pb-16 md:pb-20">
      <div className="community-cta">
        <p className="text-[13px] font-semibold tracking-[0.14em] text-brand-strong">CỘNG ĐỒNG</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          Cùng xây dựng cộng đồng Pickleball Việt Nam
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Kết nối, chia sẻ và đồng hành cùng sự phát triển của phong trào Pickleball.
        </p>
        <a
          href="#tim-cau-lac-bo"
          className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-[10px] bg-brand px-5 text-[15px] font-semibold text-ink"
        >
          Khám phá các câu lạc bộ
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  )
}
