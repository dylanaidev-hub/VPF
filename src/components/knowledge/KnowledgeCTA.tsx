import { ArrowRight } from "lucide-react"
import { sitePath } from "../../lib/site"

export function KnowledgeCTA() {
  return (
    <section className="page-wrap pb-16 md:pb-20">
      <div className="knowledge-cta">
        <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Cùng phát triển cộng đồng Pickleball Việt Nam
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Khám phá các hoạt động kết nối, học hỏi và chia sẻ trong cộng đồng.
          </p>
          <a
            href={sitePath("/congdong.html")}
            className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-[10px] bg-brand px-5 text-[15px] font-semibold text-ink"
          >
            Khám phá cộng đồng
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
        <div className="min-h-56 md:min-h-full">
          <img
            src={sitePath("/images/outdoor.jpg")}
            alt="Sân pickleball ngoài trời. Ảnh minh họa cho lời mời vào cộng đồng."
            width={1600}
            height={1000}
            loading="lazy"
            className="h-full min-h-56 w-full object-cover md:min-h-full"
          />
        </div>
      </div>
    </section>
  )
}
