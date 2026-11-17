import { useEffect, useState } from "react"
import { federationCommittee } from "../../data/aboutFederation.mock"
import type { OrgExplorerCommittee } from "../../data/organizationExplorer.mock"
import { OrganizationChart } from "./OrganizationChart"
import { OrganizationMembersModal } from "./OrganizationMembersModal"

export function FedCommittee() {
  const [selected, setSelected] = useState<OrgExplorerCommittee | null>(null)
  const data = federationCommittee

  useEffect(() => {
    if (window.location.hash === `#${data.id}`) {
      document.getElementById(data.id)?.scrollIntoView({ block: "start", behavior: "instant" })
    }
  }, [data.id])

  return (
    <section id={data.id} className="fed-section fed-lead-board" aria-labelledby="ban-chap-hanh-tieu-de">
      <div className="page-wrap">
        <h2 id="ban-chap-hanh-tieu-de">{data.title}</h2>
        <p className="fed-note">{data.note}</p>
        <OrganizationChart onSelect={setSelected} />
      </div>
      {selected ? <OrganizationMembersModal key={selected.id} committee={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  )
}
