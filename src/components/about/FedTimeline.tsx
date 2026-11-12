import { useEffect, useRef, useState } from "react"
import { federationHistory } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReducedMotion } from "../../lib/useReducedMotion"
import { useReveal } from "../../lib/useReveal"

const BALL = 13

type Vec = { x: number; y: number }
type Pose = Vec & { rot: number; sx: number; sy: number }
type Axis = "x" | "y"

type Segment = {
  phase: "drop" | "rebounds" | "flight" | "bounce"
  from: Pose
  to: Vec
  axis: Axis
  arc: number
  spin: number
  goal: number | null
  flightMs: number
  bounceMs: number
  flightStart: number
  bounceStart: number
  arrivalRot: number
  takeoff: boolean
}

const REBOUNDS = [
  { ms: 260, height: 28 },
  { ms: 190, height: 14 },
  { ms: 140, height: 6 },
] as const

const REBOUND_MS = REBOUNDS.reduce((sum, part) => sum + part.ms, 0)

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t
}

function cubic(t: number, p1: number, p2: number) {
  const mt = 1 - t
  return 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t
}

/** Horizontal travel: cubic-bezier(0.33, 0, 0.2, 1). Controlled acceleration, smooth arrival. */
function launchEase(t: number) {
  if (t <= 0) return 0
  if (t >= 1) return 1
  let lo = 0
  let hi = 1
  for (let step = 0; step < 14; step += 1) {
    const mid = (lo + hi) / 2
    if (cubic(mid, 0.33, 0.2) < t) lo = mid
    else hi = mid
  }
  return cubic((lo + hi) / 2, 0, 1)
}

/** Parabola that crests just before mid-flight, then drops with gathering speed. */
function jumpLift(t: number, arc: number) {
  const apex = 0.42
  if (t <= apex) {
    const u = t / apex
    return arc * (1 - (1 - u) ** 2)
  }
  const u = (t - apex) / (1 - apex)
  return arc * (1 - u ** 1.35)
}

function reboundPose(elapsed: number, to: Vec): Pose | null {
  let start = 0
  for (let index = 0; index < REBOUNDS.length; index += 1) {
    const part = REBOUNDS[index]
    if (!part) continue
    const end = start + part.ms
    if (elapsed <= end || index === REBOUNDS.length - 1) {
      const u = clamp01((elapsed - start) / part.ms)
      const edge = Math.min(u, 1 - u)
      const squash = edge < 0.16 ? (1 - edge / 0.16) * 0.7 : 0
      return {
        x: to.x,
        y: to.y - Math.sin(Math.PI * u) * part.height,
        rot: 0,
        sx: 1 + 0.16 * squash,
        sy: 1 - 0.18 * squash,
      }
    }
    start = end
  }
  return null
}

function impactPose(t: number, to: Vec, axis: Axis, arrivalRot: number): Pose {
  const hit = 80 / 310
  const first = 0.68
  let height = 0
  let squash = 0
  if (t < hit) {
    squash = Math.sin((t / hit) * Math.PI) * 0.65
  } else if (t < first) {
    const u = (t - hit) / (first - hit)
    height = Math.sin(Math.PI * u) * 11
    if (u > 0.86) squash = ((u - 0.86) / 0.14) * 0.55
  } else {
    const u = (t - first) / (1 - first)
    height = Math.sin(Math.PI * u) * 3.5
    if (u < 0.18) squash = (1 - u / 0.18) * 0.4
  }
  return {
    x: to.x - (axis === "x" ? height : 0),
    y: to.y - (axis === "y" ? height : 0),
    rot: arrivalRot * (1 - t) ** 2,
    sx: 1 + 0.14 * squash,
    sy: 1 - 0.16 * squash,
  }
}

export function FedTimeline() {
  const reveal = useReveal<HTMLElement>()
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const motionRef = useRef<Journey | null>(null)
  const touchRef = useRef(0)
  const [hot, setHot] = useState<number | null>(null)
  const [landed, setLanded] = useState<number | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const ball = ballRef.current
    if (!wrap || !ball) return
    let alive = true
    const journey = createJourney(wrap, ball, itemRefs, reduce, (index) => {
      if (alive) setLanded(index)
    })
    motionRef.current = journey
    journey.placeHome()
    const observer = new ResizeObserver(() => journey.remeasure())
    observer.observe(wrap)
    const onTouchOutside = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return
      if (event.target instanceof Node && wrap.contains(event.target)) return
      setHot(null)
      journey.home()
    }
    document.addEventListener("pointerdown", onTouchOutside)
    return () => {
      alive = false
      motionRef.current = null
      journey.stop()
      observer.disconnect()
      document.removeEventListener("pointerdown", onTouchOutside)
    }
  }, [reduce])

  const play = (index: number) => {
    setHot(index)
    motionRef.current?.aim(index)
  }

  const reset = () => {
    setHot(null)
    motionRef.current?.home()
  }

  return (
    <section
      id={federationHistory.id}
      ref={reveal.ref}
      className={cx("fed-band fed-reveal", reveal.shown && "is-in")}
      aria-labelledby="lich-su-tieu-de"
    >
      <div className="page-wrap">
        <p className="fed-kicker">{federationHistory.eyebrow}</p>
        <h2 id="lich-su-tieu-de">{federationHistory.title}</h2>
        <p className="fed-note">{federationHistory.note}</p>
        <div
          className="fed-journey"
          ref={wrapRef}
          onPointerLeave={(event) => {
            if (event.pointerType === "touch") return
            const next = event.relatedTarget
            if (next instanceof Node && wrapRef.current?.contains(next)) return
            if (wrapRef.current?.contains(document.activeElement)) return
            reset()
          }}
        >
          <ol className="fed-track">
            {federationHistory.milestones.map((item, index) => (
              <li
                key={item.id}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                tabIndex={0}
                className={cx(hot === index && "is-hot", landed === index && "is-landed")}
                style={{ transitionDelay: `${index * 90}ms` }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "touch") return
                  if (performance.now() - touchRef.current < 800) return
                  play(index)
                }}
                onPointerDown={(event) => {
                  if (event.pointerType !== "touch") return
                  touchRef.current = performance.now()
                  play(index)
                }}
                onFocus={() => play(index)}
                onBlur={(event) => {
                  const next = event.relatedTarget
                  if (next instanceof Node && wrapRef.current?.contains(next)) return
                  if (wrapRef.current?.matches(":hover")) return
                  reset()
                }}
              >
                <span className="fed-node" aria-hidden />
                <time dateTime={item.date}>{item.date}</time>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
          <div className="fed-ball" ref={ballRef} aria-hidden>
            <img src={sitePath("/assets/pickleball-ball.png")} alt="" width={26} height={26} draggable={false} />
          </div>
        </div>
      </div>
    </section>
  )
}

type Journey = {
  aim: (index: number) => void
  home: () => void
  placeHome: () => void
  remeasure: () => void
  stop: () => void
}

function createJourney(
  wrap: HTMLDivElement,
  ball: HTMLDivElement,
  itemRefs: { current: Array<HTMLLIElement | null> },
  reduce: boolean,
  onLand: (index: number | null) => void,
): Journey {
  let pose: Pose = { x: 0, y: 0, rot: 0, sx: 1, sy: 1 }
  let segment: Segment | null = null
  let goal: number | null = null
  let frame = 0
  let shown = false

  const paint = () => {
    ball.style.transform = `translate3d(${pose.x - BALL}px, ${pose.y - BALL}px, 0) rotate(${pose.rot}deg) scale(${pose.sx}, ${pose.sy})`
    if (!shown) return
    ball.style.transition = "none"
    ball.style.opacity = "1"
  }

  const reveal = () => {
    shown = true
    ball.style.transition = "none"
    ball.style.opacity = "1"
  }

  const conceal = () => {
    shown = false
    goal = null
    segment = null
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    onLand(null)
    ball.style.transition = reduce ? "none" : "opacity 240ms ease"
    ball.style.opacity = "0"
  }

  const read = () => {
    const bounds = wrap.getBoundingClientRect()
    const points: Vec[] = []
    for (const item of itemRefs.current) {
      const node = item?.querySelector(".fed-node")
      if (!node) continue
      const rect = node.getBoundingClientRect()
      points.push({
        x: rect.left + rect.width / 2 - bounds.left,
        y: rect.top + rect.height / 2 - bounds.top,
      })
    }
    const next = points[1]
    const first = points[0]
    const horizontal = Boolean(next && first && Math.abs(next.x - first.x) > Math.abs(next.y - first.y))
    return { points, horizontal }
  }

  const dock = (point: Vec): Vec => ({ x: point.x, y: point.y })

  const tick = (now: number) => {
    const current = segment
    if (!current) {
      frame = 0
      return
    }
    if (current.phase === "drop") {
      const raw = clamp01((now - current.flightStart) / current.flightMs)
      const fall = raw ** 2.2
      const impact = raw > 0.88 ? (raw - 0.88) / 0.12 : 0
      pose = {
        x: current.to.x,
        y: lerp(current.from.y, current.to.y, fall),
        rot: 0,
        sx: 1 + 0.16 * impact,
        sy: 1 - 0.2 * impact,
      }
      if (raw >= 1) {
        current.phase = "rebounds"
        current.bounceStart = now
        onLand(current.goal)
      }
    } else if (current.phase === "rebounds") {
      const elapsed = now - current.bounceStart
      pose = reboundPose(elapsed, current.to) ?? { x: current.to.x, y: current.to.y, rot: 0, sx: 1, sy: 1 }
      if (elapsed >= current.bounceMs) {
        pose = { x: current.to.x, y: current.to.y, rot: 0, sx: 1, sy: 1 }
        segment = null
        paint()
        frame = 0
        return
      }
    } else if (current.phase === "flight") {
      const raw = clamp01((now - current.flightStart) / current.flightMs)
      const along = launchEase(raw)
      const lift = jumpLift(raw, current.arc)
      const liftNorm = current.arc > 0 ? lift / current.arc : 0
      const takeoffT = current.takeoff ? clamp01((now - current.flightStart) / 80) : 1
      const squeeze = takeoffT < 1 ? Math.sin(takeoffT * Math.PI) * 0.7 : 0
      pose = {
        x: lerp(current.from.x, current.to.x, along) - (current.axis === "x" ? lift : 0),
        y: lerp(current.from.y, current.to.y, along) - (current.axis === "y" ? lift : 0),
        rot: current.from.rot + current.spin * 90 * along,
        sx: 1 + 0.16 * squeeze - 0.03 * liftNorm * (1 - squeeze),
        sy: 1 - 0.18 * squeeze + 0.05 * liftNorm * (1 - squeeze),
      }
      if (raw >= 1) {
        current.phase = "bounce"
        current.bounceStart = now
        current.arrivalRot = pose.rot
        pose = impactPose(0, current.to, current.axis, pose.rot)
        onLand(current.goal)
      }
    } else {
      const t = clamp01((now - current.bounceStart) / current.bounceMs)
      pose = impactPose(t, current.to, current.axis, current.arrivalRot)
      if (t >= 1) {
        pose = { x: current.to.x, y: current.to.y, rot: 0, sx: 1, sy: 1 }
        segment = null
        paint()
        frame = 0
        return
      }
    }
    paint()
    frame = requestAnimationFrame(tick)
  }

  const launch = (to: Vec, nextGoal: number | null) => {
    const layout = read()
    const moving = segment !== null
    if (segment?.goal === nextGoal) return
    if (!moving && goal === nextGoal && Math.hypot(to.x - pose.x, to.y - pose.y) < 1) return
    goal = nextGoal
    onLand(null)
    if (reduce) {
      pose = { x: to.x, y: to.y, rot: 0, sx: 1, sy: 1 }
      segment = null
      paint()
      onLand(nextGoal)
      return
    }
    const dist = Math.hypot(to.x - pose.x, to.y - pose.y)
    const spin = (layout.horizontal ? Math.sign(to.x - pose.x) : Math.sign(to.y - pose.y)) || 1
    const started = performance.now()
    segment = {
      phase: "flight",
      from: { ...pose },
      to,
      axis: layout.horizontal ? "y" : "x",
      arc: layout.horizontal ? Math.min(32, Math.max(18, dist * 0.075)) : Math.min(14, Math.max(8, dist * 0.045)),
      spin,
      goal: nextGoal,
      flightMs: Math.min(540, Math.max(500, 460 + dist * 0.12)),
      bounceMs: 310,
      flightStart: started,
      bounceStart: started,
      arrivalRot: pose.rot,
      takeoff: !moving,
    }
    if (frame === 0) frame = requestAnimationFrame(tick)
  }

  const drop = () => {
    const layout = read()
    const point = layout.points[0]
    if (!point) return
    const to = dock(point)
    if (segment?.goal === 0 && (segment.phase === "drop" || segment.phase === "rebounds")) return
    if (!segment && goal === 0 && shown && Math.hypot(to.x - pose.x, to.y - pose.y) < 1) return
    if (shown) {
      launch(to, 0)
      return
    }
    goal = 0
    onLand(null)
    pose = { x: to.x, y: to.y - 82, rot: 0, sx: 1, sy: 1 }
    reveal()
    if (reduce) {
      pose = { x: to.x, y: to.y, rot: 0, sx: 1, sy: 1 }
      paint()
      onLand(0)
      return
    }
    const started = performance.now()
    segment = {
      phase: "drop",
      from: { ...pose },
      to,
      axis: "y",
      arc: 0,
      spin: 0,
      goal: 0,
      flightMs: 430,
      bounceMs: REBOUND_MS,
      flightStart: started,
      bounceStart: started,
      arrivalRot: 0,
      takeoff: false,
    }
    paint()
    if (frame === 0) frame = requestAnimationFrame(tick)
  }

  return {
    aim(index: number) {
      const layout = read()
      const point = layout.points[index]
      if (!point) return
      const to = dock(point)
      if (!shown && index === 0) {
        drop()
        return
      }
      if (!shown && index > 0) {
        const previous = layout.points[index - 1]
        if (!previous) return
        const parked = dock(previous)
        pose = { x: parked.x, y: parked.y, rot: 0, sx: 1, sy: 1 }
        reveal()
        paint()
      }
      launch(to, index)
    },
    home() {
      if (!shown && !segment) return
      conceal()
    },
    placeHome() {
      shown = false
      goal = null
      segment = null
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      ball.style.transition = "none"
      ball.style.opacity = "0"
    },
    remeasure() {
      if (!shown || segment || goal === null) return
      const layout = read()
      const point = layout.points[goal]
      if (!point) return
      const parked = dock(point)
      pose = { ...pose, x: parked.x, y: parked.y }
      paint()
    },
    stop() {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      segment = null
    },
  }
}
