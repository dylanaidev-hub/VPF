import { AboutCTA } from "../components/about/AboutCTA"
import { AboutHero } from "../components/about/AboutHero"
import { HistoryTimeline } from "../components/about/HistoryTimeline"
import { LeadershipSection } from "../components/about/LeadershipSection"
import { OrganizationChart } from "../components/about/OrganizationChart"
import { VisionMission } from "../components/about/VisionMission"
import { SiteLayout } from "../components/SiteLayout"

export function AboutPage() {
  return (
    <SiteLayout>
      <AboutHero />
      <HistoryTimeline />
      <VisionMission />
      <OrganizationChart />
      <LeadershipSection />
      <AboutCTA />
    </SiteLayout>
  )
}
