import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { TechnicalLibrary } from "../components/knowledge/TechnicalLibrary"
import { TechnicalNavigation } from "../components/knowledge/TechnicalNavigation"
import { TechnicalDocumentList, TechnicalSection, TechnicalTraining } from "../components/knowledge/TechnicalSections"
import { pageHeroes } from "../data/pageHeroes"
import { resourceGroups, technicalCourses, technicalDocuments } from "../data/technicalResources"
import "../components/knowledge/technical.css"

export function KnowledgePage() {
  return (
    <SiteLayout>
      <PageHero {...pageHeroes.knowledge} variant="compact" />
      <div className="tech-page">
        <div className="page-wrap tech-layout">
          <TechnicalNavigation />
          <div className="tech-content">
            {resourceGroups.map((group) => {
              const documents = group.documents.flatMap((id) => {
                const document = technicalDocuments.find((item) => item.id === id)
                return document ? [document] : []
              })
              return (
                <TechnicalSection key={group.id} id={group.id} intro={group.intro}>
                  <TechnicalDocumentList documents={documents} />
                </TechnicalSection>
              )
            })}
            <TechnicalLibrary documents={technicalDocuments} />
            <TechnicalTraining courses={technicalCourses} />
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
