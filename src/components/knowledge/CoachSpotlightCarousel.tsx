import { useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Coach } from "../../data/coaches.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"
import { CoachCard } from "../CoachCard"
import { Dialog } from "../Dialog"

function wrapOffset(index: number, active: number, count: number) {
  let diff = index - active
  const half = count / 2
  if (diff > half) diff -= count
  if (diff < -half) diff += count
  return diff
}

export function CoachSpotlightCarousel({
  id,
  title,
  description,
  members,
}: {
  id: string
  title: string
  description: string
  members: Coach[]
}) {
  const { ref, shown } = useReveal<HTMLElement>()
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<Coach | null>(null)
  const drag = useRef({ x: 0, pointer: -1, moved: false })
  const ignoreClick = useRef(false)
  const count = members.length
  const current = members[active]
  const reach = 1

  const step = (delta: number) => {
    if (count === 0) return
    setActive((value) => (value + delta + count) % count)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    drag.current = { x: event.clientX, pointer: event.pointerId, moved: false }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current.pointer !== event.pointerId) return
    if (Math.abs(event.clientX - drag.current.x) > 12) drag.current.moved = true
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current.pointer !== event.pointerId) return
    const delta = event.clientX - drag.current.x
    drag.current.pointer = -1
    if (!drag.current.moved || Math.abs(delta) < 48) return
    ignoreClick.current = true
    step(delta < 0 ? 1 : -1)
  }

  return (
    <section
      id={id}
      ref={ref}
      className={cx("expertise-section expertise-rise coach-spotlight", shown && "is-in")}
      aria-labelledby={`${id}-tieu-de`}
      aria-roledescription="trình chiếu"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault()
          step(1)
        } else if (event.key === "ArrowLeft") {
          event.preventDefault()
          step(-1)
        }
      }}
    >
      <div className="page-wrap">
        <div className="expertise-section-head">
          <h2 id={`${id}-tieu-de`} className="expertise-section-title">
            {title}
          </h2>
          <p className="expertise-section-lead">{description}</p>
        </div>

        {count === 0 || !current ? (
          <div className="expertise-empty">
            <p className="text-base font-medium text-ink">Chưa có danh mục huấn luyện viên được công bố.</p>
          </div>
        ) : (
          <>
            <div
              className="coach-stage"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                drag.current.pointer = -1
              }}
              onClickCapture={(event) => {
                if (!ignoreClick.current) return
                event.preventDefault()
                event.stopPropagation()
                ignoreClick.current = false
              }}
            >
              {members.map((member, index) => {
                const slot = wrapOffset(index, active, count)
                if (Math.abs(slot) > 3) return null
                return (
                  <div
                    key={member.id}
                    className={cx("coach-card", slot === 0 && "is-active")}
                    style={{ ["--slot" as string]: slot }}
                    data-slot={slot}
                    aria-hidden={Math.abs(slot) > reach || undefined}
                    inert={Math.abs(slot) > reach || undefined}
                  >
                    <CoachCard
                      coach={member}
                      onOpen={slot === 0 ? () => setOpen(member) : () => setActive(index)}
                    />
                  </div>
                )
              })}
            </div>
            <p className="sr-only" aria-live="polite">
              {current.name}. {current.certification ?? ""}. {current.location ?? ""}.
            </p>
            <div className="coach-toolbar">
              <div
                className="coach-progress"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={count}
                aria-valuenow={active + 1}
                aria-label="Vị trí trong danh sách huấn luyện viên"
              >
                <span style={{ width: `${((active + 1) / count) * 100}%` }} />
              </div>
              <div className="coach-nav">
                <button type="button" aria-label="Huấn luyện viên trước" onClick={() => step(-1)}>
                  <ChevronLeft aria-hidden />
                </button>
                <button type="button" aria-label="Huấn luyện viên sau" onClick={() => step(1)}>
                  <ChevronRight aria-hidden />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Dialog open={Boolean(open)} title={open?.name ?? ""} onClose={() => setOpen(null)}>
        {open ? <CoachDetail member={open} /> : null}
      </Dialog>
    </section>
  )
}

function CoachDetail({ member }: { member: Coach }) {
  const specialties = (member.specialties ?? []).filter(Boolean).join(" · ")
  return (
    <div className="coach-detail">
      <div className="coach-detail-media">
        <img src={sitePath(member.image)} alt="" width={864} height={1152} />
      </div>
      <div>
        {member.coachCode ? <p className="coach-detail-level">Mã HLV: {member.coachCode}</p> : null}
        {member.certification ? <p className="coach-detail-place">{member.certification}</p> : null}
        {member.organization ? <p className="coach-detail-place">{member.organization}</p> : null}
        {member.location ? <p className="coach-detail-place">{member.location}</p> : null}
        {specialties ? <p className="coach-detail-focus">Chuyên môn: {specialties}</p> : null}
        {member.experience ? <p className="coach-detail-bio">{member.experience}</p> : null}
        {member.achievement ? <p className="coach-detail-bio">{member.achievement}</p> : null}
        <p className="coach-detail-note">Danh mục này chưa phải danh sách huấn luyện viên được Liên đoàn công bố.</p>
      </div>
    </div>
  )
}
