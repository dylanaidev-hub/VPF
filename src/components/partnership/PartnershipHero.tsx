import { ArrowRight } from "lucide-react"
import { sitePath } from "../../lib/site"
import { Breadcrumb } from "../Breadcrumb"

export function PartnershipHero() {
  return (
    <section className="page-wrap pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="partnership-hero-grid">
        <div className="partnership-hero-copy min-w-0">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/index.html" }, { label: "Hợp tác" }]} />
          <p className="mt-6 text-[13px] font-semibold tracking-[0.14em] text-brand-strong">PARTNER WITH VPF</p>
          <h1 className="partnership-hero-title mt-3">Cùng kiến tạo tương lai Pickleball Việt Nam.</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Kết nối nguồn lực, phát triển phong trào và tạo nên những giá trị bền vững thông qua hợp tác thể thao.
          </p>
          <a href="#de-xuat" className="partnership-hero-cta">
            Gửi đề xuất hợp tác
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <figure className="min-w-0">
          <div className="partnership-hero-frame overflow-hidden rounded-[20px]">
            <img
              src={sitePath("/images/match.jpg")}
              alt="Một cụm sân pickleball trong nhà đang có người thi đấu. Ảnh minh họa, không phải sự kiện hợp tác chính thức."
              width={1600}
              height={1066}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover object-[center_45%]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Ảnh minh họa môn pickleball, không phải hồ sơ một chương trình hợp tác.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
