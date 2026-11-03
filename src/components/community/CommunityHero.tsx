import { sitePath } from "../../lib/site"
import { Breadcrumb } from "../Breadcrumb"

export function CommunityHero() {
  return (
    <section className="page-wrap pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="community-hero-grid">
        <div className="community-hero-copy min-w-0">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/index.html" }, { label: "Cộng đồng" }]} />
          <p className="mt-6 text-[13px] font-semibold tracking-[0.14em] text-brand-strong">
            CỘNG ĐỒNG PICKLEBALL VIỆT NAM
          </p>
          <h1 className="community-hero-title mt-3">Kết nối đam mê. Lan tỏa Pickleball.</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Khám phá cộng đồng người chơi và câu lạc bộ Pickleball trên khắp Việt Nam.
          </p>
        </div>
        <div className="community-hero-media relative min-w-0">
          <div className="community-hero-frame relative overflow-hidden rounded-[20px]">
            <img
              src={sitePath("/images/outdoor.jpg")}
              alt="Người chơi pickleball trên sân ngoài trời. Ảnh minh họa cho cộng đồng."
              width={1600}
              height={1000}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover object-[center_40%]"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 size-12 rounded-xl bg-brand" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
