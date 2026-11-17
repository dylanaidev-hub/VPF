import { publishedPdf } from "../components/DocumentCard"
import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { TechnicalLibrary } from "../components/knowledge/TechnicalLibrary"
import { TechnicalNavigation } from "../components/knowledge/TechnicalNavigation"
import { TechnicalDocumentList, TechnicalSection, TechnicalTraining } from "../components/knowledge/TechnicalSections"
import { pageHeroes } from "../data/pageHeroes"
import { resourceGroups, technicalDocuments } from "../data/technicalResources"
import { demoTrainingCourses, trainingCourses } from "../data/trainingSchedule"
import "../components/knowledge/technical.css"

// Set VITE_TECHNICAL_DEMO_MODE=false at build time for the official library.
const isDemoMode = (import.meta.env.VITE_TECHNICAL_DEMO_MODE ?? "true") === "true"
const visibleCourses = isDemoMode && !trainingCourses.length ? demoTrainingCourses : trainingCourses
const visibleDocuments = technicalDocuments.flatMap((document) => {
  const pdf = publishedPdf(document.pdf) || undefined
  return isDemoMode || pdf ? [{ ...document, pdf }] : []
})

export function KnowledgePage() {
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
