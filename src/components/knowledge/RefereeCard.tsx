import { ArrowUpRight } from "lucide-react"
import type { PersonnelMember } from "../../data/expertise.mock"
import { sitePath } from "../../lib/site"

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]![0]! : ""
  return `${first}${last}`.toUpperCase()
}

export function RefereePortrait({ member, large = false }: { member: PersonnelMember; large?: boolean }) {
  if (member.portrait) {
    return (
      <img
        className="referee-card-photo"
        src={sitePath(member.portrait)}
        alt=""
        width={large ? 640 : 480}
        height={large ? 800 : 600}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <span className="referee-card-fallback" aria-hidden>
      {initials(member.name)}
    </span>
  )
}

export function RefereeCard({ member, onOpen }: { member: PersonnelMember; onOpen: () => void }) {
  return (
    <button type="button" className="referee-card" onClick={onOpen}>
      <span className="referee-card-media">
        <RefereePortrait member={member} />
        <span className="referee-card-arrow">
          <ArrowUpRight aria-hidden />
        </span>
      </span>
      <span className="referee-card-copy">
        <span className="referee-card-name">{member.name}</span>
        <span className="referee-card-level">{member.level}</span>
        <span className="referee-card-place">{member.province}</span>
      </span>
    </button>
  )
}

export function RefereeDetail({ member }: { member: PersonnelMember }) {
  return (
    <div className="referee-detail">
      <div className="referee-detail-media">
        <RefereePortrait member={member} large />
      </div>
      <div className="referee-detail-copy">
        <p className="referee-detail-level">{member.level}</p>
        <p className="referee-detail-place">{member.province}</p>
        <p className="referee-detail-note">Danh mục này chưa phải danh sách trọng tài được Liên đoàn công bố.</p>
      </div>
    </div>
  )
}
