import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { TechnicalLibrary } from "../components/knowledge/TechnicalLibrary"
import { TechnicalNavigation } from "../components/knowledge/TechnicalNavigation"
import { TechnicalDocumentList, TechnicalSection, TechnicalTraining } from "../components/knowledge/TechnicalSections"
import { pageHeroes } from "../data/pageHeroes"
import { visibleCourses, visibleDocuments } from "../data/technicalContent"
import { resourceGroups } from "../data/technicalResources"
import { useFragmentScroll } from "../lib/useFragmentScroll"
import "../components/knowledge/technical.css"

export function KnowledgePage() {
  useFragmentScroll()

  return (
    <SiteLayout>
      <PageHero {...pageHeroes.knowledge} />
      <div className="tech-page">
        <div className="page-wrap tech-layout">
          <TechnicalNavigation />
          <div className="tech-content">
            {resourceGroups.map((group) => {
              const documents = group.documents.flatMap((id) => {
                const document = visibleDocuments.find((item) => item.id === id)
                return document ? [document] : []
              })
              return (
                <TechnicalSection key={group.id} id={group.id} intro={group.intro}>
                  <TechnicalDocumentList documents={documents} />
                </TechnicalSection>
              )
            })}
            <TechnicalLibrary documents={visibleDocuments} />
            <TechnicalTraining courses={visibleCourses} />
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
