import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { pageHeroes } from "../data/pageHeroes"
import { ExpertiseNav } from "../components/knowledge/ExpertiseNav"
import { CoachSpotlightCarousel } from "../components/knowledge/CoachSpotlightCarousel"
import { PersonnelDirectory } from "../components/knowledge/PersonnelDirectory"
import { RulesSection } from "../components/knowledge/RulesSection"
import { TrainingPrograms } from "../components/knowledge/TrainingPrograms"
import { coachSection, coaches, refereeSection, referees } from "../data/expertise.mock"

export function KnowledgePage() {
  return (
    <SiteLayout>
      <PageHero {...pageHeroes.knowledge} />
      <ExpertiseNav />
      <RulesSection />
      <PersonnelDirectory
        id={refereeSection.id}
        title={refereeSection.title}
        description={refereeSection.description}
        searchLabel={refereeSection.searchLabel}
        empty={refereeSection.empty}
        emptyFiltered={refereeSection.emptyFiltered}
        illustrativeNote={refereeSection.illustrativeNote}
        viewAllLabel={refereeSection.viewAllLabel}
        collapseLabel={refereeSection.collapseLabel}
        members={referees}
        variant="referee"
      />
      <CoachSpotlightCarousel
        id={coachSection.id}
        title={coachSection.title}
        description={coachSection.description}
        members={coaches}
      />
      <TrainingPrograms />
    </SiteLayout>
  )
}
