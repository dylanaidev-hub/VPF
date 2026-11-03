import { ArrowRight } from "lucide-react"
import { sitePath } from "../../lib/site"
import { Breadcrumb } from "../Breadcrumb"

export function KnowledgeHero() {
  return (
    <section className="page-wrap pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="knowledge-hero-grid">
        <div className="knowledge-hero-copy min-w-0">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/index.html" }, { label: "Chuyên môn" }]} />
          <p className="mt-6 text-[13px] font-semibold tracking-[0.14em] text-brand-strong">
            TRUNG TÂM KIẾN THỨC PICKLEBALL
          </p>
          <h1 className="knowledge-hero-title mt-3">Nâng tầm chuyên môn. Phát triển đam mê.</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Khám phá luật thi đấu, tài liệu hướng dẫn và các chương trình đào tạo Pickleball.
          </p>
          <a
            href="#kham-pha"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-brand px-5 text-[15px] font-semibold text-ink"
          >
            Khám phá kiến thức
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="knowledge-hero-media relative min-w-0">
          <div className="knowledge-hero-frame relative overflow-hidden rounded-[20px]">
            <img
              src={sitePath("/images/player.jpg")}
              alt="Vận động viên pickleball trên sân. Ảnh minh họa cho trung tâm kiến thức."
              width={1600}
              height={1200}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover object-center"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 size-12 rounded-xl bg-brand" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
