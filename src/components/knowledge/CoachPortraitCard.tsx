import type { CSSProperties } from "react"
import type { PersonnelMember } from "../../data/expertise.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"

type CoachPortraitCardProps = {
  member: PersonnelMember
  slot: number
  active: boolean
  hidden: boolean
  onSelect: () => void
  onOpen: () => void
}

export function CoachPortraitCard({ member, slot, active, hidden, onSelect, onOpen }: CoachPortraitCardProps) {
  const style = { "--slot": slot, zIndex: 8 - Math.abs(slot) } as CSSProperties
  const portrait = member.portrait ? (
    <img
      src={sitePath(member.portrait)}
      alt=""
      width={864}
      height={1152}
      loading={Math.abs(slot) <= 1 ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={active ? "high" : "auto"}
    />
  ) : null

  const copy = (
    <div className="coach-card-copy">
      <p className="coach-card-name">{member.name}</p>
      {active ? (
        <>
          <p className="coach-card-level">{member.level}</p>
          <p className="coach-card-place">{member.province}</p>
        </>
      ) : null}
    </div>
  )

  if (!active) {
    return (
      <button
        type="button"
        className="coach-card"
        data-slot={slot}
        style={style}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : 0}
        onClick={onSelect}
      >
        <span className="coach-card-media">{portrait}</span>
        {copy}
        <span className="sr-only">Đưa ra giữa</span>
      </button>
    )
  }

  return (
    <article className={cx("coach-card", "is-active")} data-slot={slot} style={style}>
      <div className="coach-card-media">
        {portrait}
        <button type="button" className="coach-view" onClick={onOpen}>
          Xem hồ sơ
        </button>
      </div>
      {copy}
    </article>
  )
}
