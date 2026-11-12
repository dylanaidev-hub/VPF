import { useEffect, useRef, useState } from "react"
import { federationCommittee, type FederationPerson } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReducedMotion } from "../../lib/useReducedMotion"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"
import { OrganizationExplorerModal } from "./OrganizationExplorerModal"

const LOOP_SECONDS = 72

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]![0]! : ""
  return `${first}${last}`.toUpperCase()
}

function Portrait({ person }: { person: FederationPerson }) {
  if (person.image) {
    return (
      <img
        src={sitePath(person.image)}
        alt={person.imageAlt ?? ""}
        width={440}
        height={550}
        draggable={false}
        style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
      />
    )
  }
  return <span className="fed-lead-avatar">{initials(person.name)}</span>
}

function MemberCard({
  person,
  onOpen,
  inert = false,
}: {
  person: FederationPerson
  onOpen: (person: FederationPerson) => void
  inert?: boolean
}) {
  return (
    <button
      type="button"
      className="fed-lead-card"
      tabIndex={inert ? -1 : 0}
      aria-hidden={inert || undefined}
      onClick={() => {
        if (inert) return
        onOpen(person)
      }}
    >
      <span className="fed-lead-photo">
        <Portrait person={person} />
      </span>
      <span className="fed-lead-name">{person.name}</span>
      <span className="fed-lead-role">{person.title}</span>
      {person.department ? <span className="fed-lead-dept">{person.department}</span> : null}
    </button>
  )
}

function MemberSet({
  people,
  clone = false,
  onOpen,
}: {
  people: FederationPerson[]
  clone?: boolean
  onOpen: (person: FederationPerson) => void
}) {
  return (
    <ul className="fed-lead-set" aria-hidden={clone || undefined} data-clone={clone ? "" : undefined}>
      {people.map((person) => (
        <li key={clone ? `clone-${person.id}` : person.id}>
          <MemberCard person={person} onOpen={onOpen} inert={clone} />
        </li>
      ))}
    </ul>
  )
}

export function FedCommittee() {
  const reveal = useReveal<HTMLElement>()
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<FederationPerson | null>(null)
  const [explorerOpen, setExplorerOpen] = useState(false)
  const data = federationCommittee
  const people = data.people
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const draggingRef = useRef(false)
  const dragMovedRef = useRef(false)
  const pointerIdRef = useRef<number | null>(null)
  const lastXRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport) return

    const measure = () => {
      const primary = track.querySelector<HTMLElement>(".fed-lead-set")
      setWidthRef.current = primary?.getBoundingClientRect().width ?? 0
      if (setWidthRef.current > 0) {
        offsetRef.current = ((offsetRef.current % setWidthRef.current) + setWidthRef.current) % setWidthRef.current
        if (!reduce) track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    const primary = track.querySelector(".fed-lead-set")
    if (primary) observer.observe(primary)
    observer.observe(track)
    window.addEventListener("resize", measure)

    if (reduce) {
      track.style.transform = ""
      return () => {
        observer.disconnect()
        window.removeEventListener("resize", measure)
      }
    }

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const elapsed = Math.min(48, now - last) / 1000
      last = now
      if (setWidthRef.current <= 0) measure()
      const width = setWidthRef.current
      const hovering = viewport.matches(":hover")
      if (width > 0 && !hovering && !draggingRef.current) {
        offsetRef.current += (width / LOOP_SECONDS) * elapsed
        if (offsetRef.current >= width) offsetRef.current -= width
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    const wrap = (value: number) => {
      const width = setWidthRef.current
      if (width <= 0) return value
      let next = value % width
      if (next < 0) next += width
      return next
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return
      draggingRef.current = true
      dragMovedRef.current = false
      pointerIdRef.current = event.pointerId
      lastXRef.current = event.clientX
      viewport.setPointerCapture(event.pointerId)
      viewport.classList.add("is-dragging")
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current || pointerIdRef.current !== event.pointerId) return
      const delta = event.clientX - lastXRef.current
      lastXRef.current = event.clientX
      if (Math.abs(delta) > 0) {
        if (Math.abs(delta) >= 1) dragMovedRef.current = true
        offsetRef.current = wrap(offsetRef.current - delta)
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
      if (dragMovedRef.current) event.preventDefault()
    }

    const endDrag = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) return
      draggingRef.current = false
      pointerIdRef.current = null
      viewport.classList.remove("is-dragging")
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId)
      }
      window.setTimeout(() => {
        dragMovedRef.current = false
      }, 0)
    }

    const onClickCapture = (event: MouseEvent) => {
      if (!dragMovedRef.current) return
      event.preventDefault()
      event.stopPropagation()
    }

    viewport.addEventListener("pointerdown", onPointerDown)
    viewport.addEventListener("pointermove", onPointerMove)
    viewport.addEventListener("pointerup", endDrag)
    viewport.addEventListener("pointercancel", endDrag)
    viewport.addEventListener("click", onClickCapture, true)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", measure)
      viewport.removeEventListener("pointerdown", onPointerDown)
      viewport.removeEventListener("pointermove", onPointerMove)
      viewport.removeEventListener("pointerup", endDrag)
      viewport.removeEventListener("pointercancel", endDrag)
      viewport.removeEventListener("click", onClickCapture, true)
    }
  }, [reduce, people.length])

  const openPerson = (person: FederationPerson) => {
    if (dragMovedRef.current) return
    setSelected(person)
  }

  return (
    <section
      id={data.id}
      ref={reveal.ref}
      className={cx("fed-section fed-lead-board fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="ban-chap-hanh-tieu-de"
    >
      <div className="page-wrap">
        <p className="fed-kicker">{data.eyebrow}</p>
        <h2 id="ban-chap-hanh-tieu-de">{data.title}</h2>
        <p className="fed-note">{data.note}</p>
        <div className="fed-lead-actions">
          <button type="button" className="fed-button fed-button-gold" onClick={() => setExplorerOpen(true)}>
            {data.cta}
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={cx("fed-lead-marquee", reduce && "is-static")}
        tabIndex={0}
        aria-label="Danh sách Ban Chấp hành"
      >
        <div ref={trackRef} className="fed-lead-track">
          <MemberSet people={people} onOpen={openPerson} />
          {reduce ? null : <MemberSet people={people} clone onOpen={openPerson} />}
        </div>
      </div>

      <Dialog open={selected !== null} title={selected?.name ?? data.title} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="fed-modal">
            <div className="fed-modal-photo">
              <Portrait person={selected} />
            </div>
            <div>
              <p className="fed-lead-role">{selected.title}</p>
              <p className="fed-lead-dept">{selected.department}</p>
              <h3>Nhiệm vụ</h3>
              <ul>
                {selected.duties.map((duty) => (
                  <li key={duty}>{duty}</li>
                ))}
              </ul>
              {selected.roster ? (
                <>
                  <h3>Thành viên ban</h3>
                  <ul>
                    {selected.roster.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className="fed-note">{data.note}</p>
            </div>
          </div>
        ) : null}
      </Dialog>

      <OrganizationExplorerModal open={explorerOpen} onClose={() => setExplorerOpen(false)} />
    </section>
  )
}
