import { useState } from "react"
import { federationCommittee } from "../../data/aboutFederation.mock"
import { Button } from "../Button"
import { OrganizationExplorerModal } from "./OrganizationExplorerModal"

export function FedCommittee() {
  const [open, setOpen] = useState(false)
  const data = federationCommittee

  return (
    <section id={data.id} className="fed-section fed-lead-board" aria-labelledby="ban-chap-hanh-tieu-de">
      <div className="page-wrap">
        <h2 id="ban-chap-hanh-tieu-de">{data.title}</h2>
        <p className="fed-note">{data.note}</p>
        <Button aria-haspopup="dialog" onClick={(event) => {
          event.currentTarget.focus({ preventScroll: true })
          setOpen(true)
        }}>
          {data.cta}
        </Button>
      </div>
      {open ? <OrganizationExplorerModal onClose={() => setOpen(false)} /> : null}
    </section>
  )
}
