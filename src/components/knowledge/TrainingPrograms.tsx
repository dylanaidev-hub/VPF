import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { trainingPrograms, type TrainingProgram } from "../../data/training.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

export function TrainingPrograms() {
  const [open, setOpen] = useState<TrainingProgram | null>(null)
  const { ref, shown } = useReveal<HTMLUListElement>()

  return (
    <section id="dao-tao" className="bg-paper py-14 md:py-16">
      <div className="page-wrap">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Chương trình đào tạo</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Các chương trình học và phát triển kỹ năng Pickleball dành cho nhiều nhóm đối tượng.
        </p>
        <p className="mt-2 text-sm text-muted">Dữ liệu minh họa, không phải lịch đào tạo chính thức.</p>
        <ul ref={ref} className="knowledge-programs mt-8">
          {trainingPrograms.map((program, index) => (
            <li
              key={program.id}
              id={program.anchor}
              className={cx("knowledge-rise", shown && "is-in")}
              style={{ transitionDelay: shown ? `${index * 90}ms` : undefined }}
            >
              <article className="knowledge-program h-full overflow-hidden rounded-2xl border border-line bg-white">
                <img
                  src={sitePath(program.image)}
                  alt={program.imageAlt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-col p-5">
                  <h3 className="text-xl font-semibold text-ink">{program.name}</h3>
                  <p className="mt-2 text-sm font-medium text-ink">Đối tượng: {program.audience}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{program.description}</p>
                  <button
                    type="button"
                    onClick={() => setOpen(program)}
                    className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-ink"
                  >
                    Xem chương trình
                    <ArrowRight className="size-4 text-brand" aria-hidden />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open !== null} title={open?.name ?? "Chương trình"} onClose={() => setOpen(null)}>
        {open ? (
          <div>
            <p className="text-sm leading-relaxed text-muted">
              Chương trình minh họa, chưa mở đăng ký và không phải lịch khai giảng của Liên đoàn.
            </p>
            <p className="mt-4 text-sm font-medium text-ink">Đối tượng: {open.audience}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">{open.description}</p>
            <h3 className="mt-5 text-sm font-semibold text-ink">Nội dung</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-ink">
              {open.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}
