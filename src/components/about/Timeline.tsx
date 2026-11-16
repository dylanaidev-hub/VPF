import { useRef, type PointerEvent } from "react"
import { createPortal } from "react-dom"
import { Images } from "lucide-react"
import type { FederationMilestone } from "../../data/aboutFederation.mock"

type TimelineProps = {
  milestones: readonly FederationMilestone[]
  activeMilestone: string | null
  galleryId: string
  galleryOpen: boolean
  onSelect: (id: string) => void
}

export function Timeline({ milestones, activeMilestone, galleryId, galleryOpen, onSelect }: TimelineProps) {
  const cursorRef = useRef<HTMLSpanElement>(null)
  const hoveredMilestone = useRef<HTMLButtonElement | null>(null)

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

  return (
    <>
      <ol className="fed-track">
        {milestones.map((milestone) => (
          <li key={milestone.id}>
            <button
              type="button"
              className="fed-track-button"
              data-active={activeMilestone === milestone.id || undefined}
              aria-haspopup="dialog"
              aria-expanded={galleryOpen && activeMilestone === milestone.id}
              aria-controls={galleryOpen && activeMilestone === milestone.id ? galleryId : undefined}
              onPointerEnter={positionCursor}
              onPointerMove={positionCursor}
              onPointerLeave={hideCursor}
              onPointerCancel={hideCursor}
              onClick={(event) => {
                hideCursor()
                event.currentTarget.focus({ preventScroll: true })
                onSelect(milestone.id)
              }}
            >
              <span className="fed-node" aria-hidden="true" />
              <time dateTime={milestone.id}>{milestone.date}</time>
              <span className="fed-track-title">{milestone.title}</span>
              <span className="fed-track-description">{milestone.description}</span>
            </button>
          </li>
        ))}
      </ol>
      {createPortal(
        <span ref={cursorRef} className="fed-milestone-cursor" aria-hidden="true">
          <Images size={15} />
          Xem ảnh
        </span>,
        document.body,
      )}
    </>
  )
}
