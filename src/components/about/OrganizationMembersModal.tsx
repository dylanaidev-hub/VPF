import { useId, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { getOrgCommitteeMembers, type OrgExplorerCommittee, type OrgExplorerMember } from "../../data/organizationExplorer.mock"
import { sitePath } from "../../lib/site"
import { useRegisterModalPresence } from "../../lib/modalPresence"

function MemberList({ members, emptyLabel }: { members: OrgExplorerMember[]; emptyLabel: string }) {
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
            <h3>{member.name}</h3>
            <p className="fed-org-member-role">{member.position}</p>
            {member.responsibility ? <p className="fed-org-member-duty">{member.responsibility}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function OrganizationMembersModal({ committee, onClose }: {
  committee: OrgExplorerCommittee
  onClose: () => void
}) {
  const titleId = useId()
  const countId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const members = getOrgCommitteeMembers(committee.id)
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

  return createPortal(
    <dialog
      className="fed-org-dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={countId}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <header className="fed-org-dialog-head">
        <div>
          <h2 id={titleId}>{committee.name}</h2>
          <p id={countId}>{members.length} thành viên</p>
        </div>
        <button type="button" className="fed-org-close" aria-label="Đóng danh sách thành viên" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
      </header>
      <div className="fed-org-dialog-body">
        <MemberList members={members} emptyLabel="Chưa có thành viên được công bố cho đơn vị này." />
      </div>
    </dialog>,
    document.body,
  )
}
