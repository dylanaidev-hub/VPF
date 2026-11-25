import { useTranslation } from "../../i18n"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { createPortal } from "react-dom"
import type { FederationMilestone } from "../../data/aboutFederation.mock"
import { sitePath } from "../../lib/site"
import { useReducedMotion } from "../../lib/useReducedMotion"
import { createJourney } from "./timelineBallJourney"

type TimelineProps = {
  milestones: readonly FederationMilestone[]
  activeMilestone: string | null
  galleryId: string
  galleryOpen: boolean
  onSelect: (id: string) => void
}

export function Timeline({ milestones, activeMilestone, galleryId, galleryOpen, onSelect }: TimelineProps) {
  const { t } = useTranslation()
  const cursorRef = useRef<HTMLSpanElement>(null)
  const hoveredMilestone = useRef<HTMLButtonElement | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const journeyRef = useRef<ReturnType<typeof createJourney> | null>(null)
  const ballTarget = useRef<number | null>(null)
  const [landed, setLanded] = useState<number | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const ball = ballRef.current
    if (!wrap || !ball) return
    const journey = createJourney(wrap, ball, itemRefs, reduce, setLanded)
    journeyRef.current = journey
    journey.placeHome()
    setLanded(null)
    const observer = new ResizeObserver(() => journey.remeasure())
    observer.observe(wrap)

    return () => {
      journeyRef.current = null
      ballTarget.current = null
      journey.stop()
      observer.disconnect()
    }
  }, [reduce])

  const hideCursor = () => {
    hoveredMilestone.current?.removeAttribute("data-cursor-active")
    hoveredMilestone.current = null
    cursorRef.current?.removeAttribute("data-visible")
  }

  const positionCursor = (event: PointerEvent<HTMLButtonElement>) => {
    const cursor = cursorRef.current
    if (galleryOpen || event.pointerType !== "mouse" || !cursor?.offsetWidth) return

    const offset = 14
    const gutter = 8
    const axisPosition = (pointer: number, size: number, viewport: number) =>
      pointer + offset + size <= viewport - gutter
        ? pointer + offset
        : Math.max(gutter, pointer - offset - size)

    const x = axisPosition(event.clientX, cursor.offsetWidth, window.innerWidth)
    const y = axisPosition(event.clientY, cursor.offsetHeight, window.innerHeight)
    cursor.style.translate = `${x}px ${y}px`

    if (hoveredMilestone.current === event.currentTarget) return
    hideCursor()
    hoveredMilestone.current = event.currentTarget
    event.currentTarget.setAttribute("data-cursor-active", "")
    cursor.setAttribute("data-visible", "")
  }

  const hideBall = () => {
    ballTarget.current = null
    journeyRef.current?.home()
  }

  const previewMilestone = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    positionCursor(event)
    const journey = journeyRef.current
    if (!journey || galleryOpen || event.pointerType !== "mouse" || ballTarget.current === index) return
    ballTarget.current = index
    journey.aim(index)
  }

  const leaveMilestone = (event: PointerEvent<HTMLButtonElement>) => {
    hideCursor()
    const next = event.relatedTarget
    if (next instanceof Element && wrapRef.current?.contains(next.closest(".fed-track-button"))) return
    hideBall()
  }

  return (
    <>
      <div className="fed-journey" ref={wrapRef}>
        <ol className="fed-track">
          {milestones.map((milestone, index) => (
            <li
              key={milestone.id}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className={landed === index ? "is-landed" : undefined}
            >
              <button
                type="button"
                className="fed-track-button"
                data-active={activeMilestone === milestone.id || undefined}
                aria-haspopup="dialog"
                aria-expanded={galleryOpen && activeMilestone === milestone.id}
                aria-controls={galleryOpen && activeMilestone === milestone.id ? galleryId : undefined}
                onPointerEnter={(event) => previewMilestone(event, index)}
                onPointerMove={(event) => previewMilestone(event, index)}
                onPointerLeave={leaveMilestone}
                onPointerCancel={() => {
                  hideCursor()
                  hideBall()
                }}
                onClick={(event) => {
                  hideCursor()
                  hideBall()
                  event.currentTarget.focus({ preventScroll: true })
                  onSelect(milestone.id)
                }}
              >
                <span className="fed-node" aria-hidden="true" />
                <time dateTime={milestone.id}>{milestone.date}</time>
                <span className="fed-track-title">{t(milestone.title)}</span>
                <span className="fed-track-description">{t(milestone.description)}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="fed-ball" ref={ballRef} aria-hidden="true">
          <img src={sitePath("/assets/pickleball-ball.png")} alt="" width={26} height={26} draggable={false} />
        </div>
      </div>
      {createPortal(
        <span ref={cursorRef} className="fed-milestone-cursor" aria-hidden="true">
          {t("Xem ảnh")}
        </span>,
        document.body,
      )}
    </>
  )
}
