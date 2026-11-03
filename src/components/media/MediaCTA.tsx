import { ArrowRight } from "lucide-react"
import { sitePath } from "../../lib/site"

export function MediaCTA() {
  return (
    <section className="page-wrap py-14 md:py-16">
      <div className="media-cta">
        <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Khám phá thêm những hoạt động Pickleball
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Cập nhật các giải đấu và hoạt động đang diễn ra trong cộng đồng Pickleball Việt Nam.
          </p>
          <a
            href={sitePath("/giaidau.html")}
            className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-[10px] bg-brand px-5 text-[15px] font-semibold text-ink"
          >
            Khám phá giải đấu
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <img
          src={sitePath("/images/outdoor.jpg")}
          alt="Sân pickleball ngoài trời. Ảnh minh họa cạnh lời mời xem giải đấu."
          width={1600}
          height={1000}
          loading="lazy"
          className="h-full min-h-56 w-full object-cover"
        />
      </div>
    </section>
  )
}
