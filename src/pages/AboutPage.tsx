import { FedCharter, FedDecision } from "../components/about/FedDocuments"
import { FedCommittee } from "../components/about/FedCommittee"
import { FedContact } from "../components/about/FedContact"
import { FedIntro } from "../components/about/FedIntro"
import { FedMandate } from "../components/about/FedMandate"
import { FedTimeline } from "../components/about/FedTimeline"
import { FedVision } from "../components/about/FedVision"
import { SiteLayout } from "../components/SiteLayout"
import { useFragmentScroll } from "../lib/useFragmentScroll"
import "../components/about/federation.css"

export function AboutPage() {
  useFragmentScroll()

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
