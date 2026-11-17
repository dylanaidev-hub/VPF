import { useId, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import {
  getOrgCommittee,
  getOrgCommitteeMembers,
  getOrgUnitCommittees,
  organizationExplorer,
  type OrgExplorerCommittee,
  type OrgExplorerMember,
} from "../../data/organizationExplorer.mock"
import { sitePath } from "../../lib/site"
import { useRegisterModalPresence } from "../../lib/modalPresence"
import { useReducedMotion } from "../../lib/useReducedMotion"

export function CommitteeCard({ committee, selected, rosterId, onSelect }: {
  committee: OrgExplorerCommittee
  selected: boolean
  rosterId: string
  onSelect: (committeeId: string) => void
}) {
  return (
    <button
      type="button"
      className="fed-org-node"
      aria-pressed={selected}
      aria-controls={rosterId}
      onClick={() => onSelect(committee.id)}
    >
      <span className="fed-org-node-name">{committee.name}</span>
      <span className="fed-org-node-meta">{committee.memberIds.length} thành viên</span>
    </button>
  )
}

function OrganizationChart({ selected, rosterId, onSelect }: {
  selected: string
  rosterId: string
  onSelect: (id: string) => void
}) {
  const board = getOrgCommittee(organizationExplorer.boardCommitteeId)
  const committees = getOrgUnitCommittees()

  return (
    <div className="fed-org-chart" role="region" aria-label="Sơ đồ các ban" tabIndex={0}>
      {board ? (
        <div className="fed-org-board">
          <CommitteeCard committee={board} selected={selected === board.id} rosterId={rosterId} onSelect={onSelect} />
        </div>
      ) : null}
      <ul className="fed-org-grid">
        {committees.map((committee) => (
          <li key={committee.id}>
            <CommitteeCard committee={committee} selected={selected === committee.id} rosterId={rosterId} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MemberList({ members, emptyLabel }: { members: OrgExplorerMember[]; emptyLabel: string }) {
  if (!members.length) return <p className="fed-org-empty">{emptyLabel}</p>

  return (
    <ul className="fed-org-members">
      {members.map((member) => (
        <li key={member.id} className="fed-org-member">
          {member.avatar ? (
            <img
              className="fed-org-member-photo"
              src={sitePath(member.avatar)}
              alt={member.avatarAlt ?? ""}
              width={64}
              height={64}
              style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
            />
          ) : null}
          <div className="fed-org-member-copy">
            <h4>{member.name}</h4>
            <p className="fed-org-member-role">{member.position}</p>
            {member.responsibility ? <p className="fed-org-member-duty">{member.responsibility}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function OrganizationExplorerModal({ onClose }: { onClose: () => void }) {
  const data = organizationExplorer
  const titleId = useId()
  const descId = useId()
  const rosterId = useId()
  const rosterTitleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const rosterRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [selectedId, setSelectedId] = useState(data.boardCommitteeId)
  const selected = getOrgCommittee(selectedId, data)
  const members = getOrgCommitteeMembers(selectedId, data)
  useRegisterModalPresence(true)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus({ preventScroll: true })
    }
  }, [])

  function selectCommittee(id: string) {
    setSelectedId(id)
    const body = bodyRef.current
    const roster = rosterRef.current
    if (!body || !roster) return
    roster.scrollTop = 0
    if (window.matchMedia("(max-width: 767px)").matches) {
      body.scrollTo({
        top: roster.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop,
        behavior: reduce ? "instant" : "smooth",
      })
    }
  }

  return createPortal(
    <dialog
      className="fed-org-dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <header className="fed-org-dialog-head">
        <div>
          <h2 id={titleId}>{data.title}</h2>
          <p id={descId}>{data.description}</p>
        </div>
        <button type="button" className="fed-org-close" aria-label="Đóng sơ đồ tổ chức" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
      </header>
      <div className="fed-org-dialog-body" ref={bodyRef}>
        <OrganizationChart selected={selectedId} rosterId={rosterId} onSelect={selectCommittee} />
        <section id={rosterId} ref={rosterRef} className="fed-org-detail" aria-labelledby={rosterTitleId} tabIndex={0}>
          <div key={selectedId} className="fed-org-detail-content">
            <header className="fed-org-detail-head" aria-live="polite">
              <h3 id={rosterTitleId}>{selected?.name}</h3>
              <p>{members.length} thành viên</p>
            </header>
            <MemberList members={members} emptyLabel="Chưa có thành viên được công bố cho đơn vị này." />
          </div>
        </section>
      </div>
    </dialog>,
    document.body,
  )
}
