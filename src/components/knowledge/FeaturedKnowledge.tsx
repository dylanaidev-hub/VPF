import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { knowledgeArticles, type KnowledgeArticle } from "../../data/knowledge.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

export function FeaturedKnowledge() {
  const featured = knowledgeArticles.find((item) => item.featured) ?? knowledgeArticles[0]
  const others = knowledgeArticles.filter((item) => item.id !== featured.id)
  const [open, setOpen] = useState<KnowledgeArticle | null>(null)
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section id="kien-thuc" className="page-wrap py-14 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Kiến thức nổi bật</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Nội dung minh họa, chưa phải tài liệu chính thức của Liên đoàn.
        </p>
      <div ref={ref} className="knowledge-feature mt-8">
        <div className={cx("knowledge-rise knowledge-feature-main", shown && "is-in")}>
          <KnowledgeCard article={featured} large onOpen={setOpen} />
        </div>
        <div className="knowledge-feature-side">
          {others.map((article, index) => (
            <div
              key={article.id}
              className={cx("knowledge-rise", shown && "is-in")}
              style={{ transitionDelay: shown ? `${(index + 1) * 90}ms` : undefined }}
            >
              <KnowledgeCard article={article} onOpen={setOpen} />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open !== null} title={open?.title ?? "Hướng dẫn"} onClose={() => setOpen(null)}>
        {open ? (
          <div>
            <img
              src={sitePath(open.image)}
              alt=""
              width={1600}
              height={1000}
              className="mb-5 aspect-[16/9] w-full rounded-xl object-cover"
            />
            <p className="text-[13px] font-semibold text-brand-strong">{open.category}</p>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink">
              {open.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}

function KnowledgeCard({
  article,
  large = false,
  onOpen,
}: {
  article: KnowledgeArticle
  large?: boolean
  onOpen: (article: KnowledgeArticle) => void
}) {
  return (
    <article className="h-full">
      <button
        type="button"
        onClick={() => onOpen(article)}
        className="knowledge-card group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left"
      >
        <div className="overflow-hidden">
          <img
            src={sitePath(article.image)}
            alt={article.imageAlt}
            width={1600}
            height={1000}
            loading="lazy"
            className={cx(
              "knowledge-card-image w-full object-cover",
              large ? "aspect-[16/10]" : "aspect-[16/9]",
            )}
          />
        </div>
        <div className={cx("flex flex-1 flex-col", large ? "p-6" : "p-5")}>
          <p className="text-[13px] font-semibold text-brand-strong">{article.category}</p>
          <h3 className={cx("mt-2 font-semibold text-ink", large ? "text-2xl leading-snug md:text-3xl" : "text-lg leading-snug")}>
            {article.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{article.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
            Xem hướng dẫn
            <ArrowRight className="size-4 text-brand" aria-hidden />
          </span>
        </div>
      </button>
    </article>
  )
}
