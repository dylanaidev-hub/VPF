import { useMemo, useState } from "react"
import { ArrowRight, ChevronDown, ChevronUp, MapPin, Users } from "lucide-react"
import {
  PREVIEW_TRAINING_COUNT,
  trainingPrograms,
  trainingSection,
  trainingStatusLabel,
  type TrainingProgram,
  type TrainingStatus,
} from "../../data/training.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

export function TrainingPrograms() {
  const [open, setOpen] = useState<TrainingProgram | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [includeCompleted, setIncludeCompleted] = useState(false)
  const { ref, shown } = useReveal<HTMLElement>()
  const hasData = trainingPrograms.length > 0

  const active = useMemo(
    () => trainingPrograms.filter((item) => item.status !== "completed"),
    [],
  )
  const completed = useMemo(
    () => trainingPrograms.filter((item) => item.status === "completed"),
    [],
  )

  const pool = useMemo(() => {
    if (!expanded) return active
    return includeCompleted ? [...active, ...completed] : active
  }, [active, completed, expanded, includeCompleted])

  const visible = expanded ? pool : pool.slice(0, PREVIEW_TRAINING_COUNT)
  const canToggle = active.length > PREVIEW_TRAINING_COUNT || completed.length > 0

  return (
    <section
      id={trainingSection.id}
      ref={ref}
      className={cx("expertise-section expertise-training expertise-rise", shown && "is-in")}
      aria-labelledby="dao-tao-tieu-de"
    >
      <div className="page-wrap">
        <div className="expertise-section-head">
          <h2 id="dao-tao-tieu-de" className="expertise-section-title">
            {trainingSection.title}
          </h2>
          <p className="expertise-section-lead">{trainingSection.description}</p>
          <p className="expertise-note">{trainingSection.illustrativeNote}</p>
        </div>

        {!hasData ? (
          <div className="expertise-empty">
            <p className="text-base font-medium text-ink">{trainingSection.empty}</p>
          </div>
        ) : (
          <>
            <ul className="expertise-event-list">
              {visible.map((program) => {
                const closed = program.status === "completed"
                const cta = closed ? "Chi tiết" : program.ctaLabel === "Đăng ký" ? "Đăng ký" : "Chi tiết"
                return (
                  <li key={program.id} id={program.anchor}>
                    <article className="expertise-event-row">
                      <div className="expertise-event-date" aria-hidden>
                        <span className="expertise-event-day">{program.dateBlock.day}</span>
                        <span className="expertise-event-month">{program.dateBlock.monthYear}</span>
                      </div>
                      <div className="expertise-event-body">
                        <div className="expertise-event-top">
                          <h3 className="expertise-event-title">{program.name}</h3>
                          <StatusBadge status={program.status} />
                        </div>
                        <p className="expertise-event-meta">
                          <Users className="size-3.5 shrink-0" aria-hidden />
                          <span>{program.audience}</span>
                        </p>
                        <p className="expertise-event-meta">
                          <MapPin className="size-3.5 shrink-0" aria-hidden />
                          <span>{program.location}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className={cx("expertise-event-cta", closed && "is-muted")}
                        onClick={() => setOpen(program)}
                      >
                        {cta}
                        <ArrowRight className="size-4" aria-hidden />
                      </button>
                    </article>
                  </li>
                )
              })}
            </ul>

            {canToggle ? (
              <div className="expertise-more">
                {expanded && completed.length > 0 ? (
                  <label className="expertise-more-check">
                    <input
                      type="checkbox"
                      checked={includeCompleted}
                      onChange={(event) => setIncludeCompleted(event.target.checked)}
                    />
                    <span>{trainingSection.showCompletedLabel}</span>
                  </label>
                ) : null}
                <button
                  type="button"
                  className="expertise-more-btn"
                  aria-expanded={expanded}
                  onClick={() => {
                    setExpanded((value) => {
                      if (value) setIncludeCompleted(false)
                      return !value
                    })
                  }}
                >
                  {expanded
                    ? trainingSection.collapseLabel
                    : `${trainingSection.viewAllLabel} (${active.length})`}
                  {expanded ? <ChevronUp className="size-4" aria-hidden /> : <ChevronDown className="size-4" aria-hidden />}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <Dialog open={open !== null} title={open?.name ?? "Chương trình"} onClose={() => setOpen(null)}>
        {open ? (
          <div>
            <p className="text-sm font-medium text-brand-strong">Chương trình minh họa</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Không phải lịch khai giảng hay đợt đăng ký chính thức của Liên đoàn. Dùng để duyệt giao diện chi tiết và
              CTA.
            </p>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-ink">Đối tượng</dt>
                <dd className="mt-1 text-muted">{open.audience}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Thời gian</dt>
                <dd className="mt-1 text-muted">{open.schedule}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Thời lượng</dt>
                <dd className="mt-1 text-muted">{open.duration}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Địa điểm</dt>
                <dd className="mt-1 text-muted">{open.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Trạng thái</dt>
                <dd className="mt-1 text-muted">{trainingStatusLabel[open.status]}</dd>
              </div>
            </dl>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">{open.description}</p>
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

function StatusBadge({ status }: { status: TrainingStatus }) {
  return <span className={cx("expertise-status", `is-${status}`)}>{trainingStatusLabel[status]}</span>
}
