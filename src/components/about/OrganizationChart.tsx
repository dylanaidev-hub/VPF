import { ArrowRight } from "lucide-react"
import { getOrgCommittee, getOrgUnitCommittees, organizationExplorer, type OrgExplorerCommittee } from "../../data/organizationExplorer.mock"

function OrganizationNode({ committee, onSelect }: {
  committee: OrgExplorerCommittee
  onSelect: (committee: OrgExplorerCommittee) => void
}) {
  return (
    <button
      type="button"
      className="fed-org-node"
      aria-haspopup="dialog"
      onClick={(event) => {
        event.currentTarget.focus({ preventScroll: true })
        onSelect(committee)
      }}
    >
      <span className="fed-org-node-name">{committee.name}</span>
      <span className="fed-org-node-meta">
        {committee.memberIds.length} thành viên
        <ArrowRight className="fed-org-node-arrow" size={16} aria-hidden="true" />
      </span>
    </button>
  )
}

export function OrganizationChart({ onSelect }: {
  onSelect: (committee: OrgExplorerCommittee) => void
}) {
  const board = getOrgCommittee(organizationExplorer.boardCommitteeId)
  const committees = getOrgUnitCommittees()

  return (
    <div className="fed-org-chart" role="group" aria-label="Sơ đồ tổ chức Liên đoàn">
      {board ? (
        <div className="fed-org-board">
          <OrganizationNode committee={board} onSelect={onSelect} />
        </div>
      ) : null}
      <ul className="fed-org-grid">
        {committees.map((committee) => (
          <li key={committee.id}>
            <OrganizationNode committee={committee} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </div>
  )
}
