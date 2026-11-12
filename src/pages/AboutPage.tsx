import { FedCharter, FedDecision } from "../components/about/FedDocuments"
import { FedCommittee } from "../components/about/FedCommittee"
import { FedContact } from "../components/about/FedContact"
import { FedIntro } from "../components/about/FedIntro"
import { FedMandate } from "../components/about/FedMandate"
import { FedTimeline } from "../components/about/FedTimeline"
import { FedVision } from "../components/about/FedVision"
import { SiteLayout } from "../components/SiteLayout"
import "../components/about/federation.css"

export function AboutPage() {
  return (
    <SiteLayout>
      <FedIntro />
      <FedTimeline />
      <FedDecision />
      <FedVision />
      <FedMandate />
      <FedCharter />
      <FedCommittee />
      <FedContact />
    </SiteLayout>
  )
}
