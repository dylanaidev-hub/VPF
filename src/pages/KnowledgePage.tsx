import { useCallback, useState } from "react"
import { Dialog } from "../components/Dialog"
import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { TechnicalLibrary } from "../components/knowledge/TechnicalLibrary"
import { TechnicalNavigation } from "../components/knowledge/TechnicalNavigation"
import { DocumentModalContent, TechnicalDocumentList, TechnicalSection, TechnicalTraining } from "../components/knowledge/TechnicalSections"
import { pageHeroes } from "../data/pageHeroes"
import { resourceGroups, technicalCourses, technicalDocuments, type TechnicalDocument } from "../data/technicalResources"
import "../components/knowledge/technical.css"

export function KnowledgePage() {
  const [selection, setSelection] = useState<TechnicalDocument | null>(null)
  const close = useCallback(() => setSelection(null), [])

  return (
    <SiteLayout>
      <PageHero {...pageHeroes.knowledge} variant="compact" />
      <div className="tech-page">
        <div className="page-wrap">
          <TechnicalNavigation />
          {resourceGroups.map((group) => {
            const documents = group.documents.flatMap((id) => {
              const document = technicalDocuments.find((item) => item.id === id)
              return document ? [document] : []
            })
            return (
              <TechnicalSection key={group.id} id={group.id} intro={group.intro}>
                <TechnicalDocumentList documents={documents} onOpen={setSelection} />
              </TechnicalSection>
            )
          })}
          <TechnicalLibrary documents={technicalDocuments} onOpen={setSelection} />
          <TechnicalTraining courses={technicalCourses} />
        </div>
      </div>
      <Dialog open={selection !== null} title={selection?.title ?? "Chuyên môn"} onClose={close}>
        {selection ? <DocumentModalContent document={selection} /> : null}
      </Dialog>
    </SiteLayout>
  )
}
