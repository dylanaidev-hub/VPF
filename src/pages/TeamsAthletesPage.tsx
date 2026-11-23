import { TeamsAthletesSection } from "../components/library/TeamsAthletesSection"
import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { pageHeroes } from "../data/pageHeroes"
import { useFragmentScroll } from "../lib/useFragmentScroll"

export function TeamsAthletesPage() {
  useFragmentScroll()

  return (
    <SiteLayout>
      <PageHero {...pageHeroes.teams} />
      <TeamsAthletesSection />
    </SiteLayout>
  )
}
