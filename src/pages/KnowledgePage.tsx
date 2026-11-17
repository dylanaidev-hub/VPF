import { useCallback, useState } from "react"
import { Breadcrumb } from "../components/Breadcrumb"
import { Dialog } from "../components/Dialog"
import { SiteLayout } from "../components/SiteLayout"
import { StarPattern } from "../components/StarPattern"
import { TechnicalLibrary } from "../components/knowledge/TechnicalLibrary"
import { TechnicalNavigation } from "../components/knowledge/TechnicalNavigation"
import {
  CourseModalContent,
  DocumentModalContent,
  FeaturedTechnicalDocument,
  TechnicalCourseCard,
  TechnicalResourceGroup,
  TechnicalSection,
} from "../components/knowledge/TechnicalSections"
import { pageHeroes } from "../data/pageHeroes"
import { resourceGroups, technicalCourses, technicalDocuments, type TechnicalCourse, type TechnicalDocument } from "../data/technicalResources"
import "../components/knowledge/technical.css"

type ResourceSelection =
  | { kind: "document"; item: TechnicalDocument }
  | { kind: "course"; item: TechnicalCourse }

export function KnowledgePage() {
  const [selection, setSelection] = useState<ResourceSelection | null>(null)
  const close = useCallback(() => setSelection(null), [])
  const openDocument = (item: TechnicalDocument) => setSelection({ kind: "document", item })
  const openCourse = (item: TechnicalCourse) => setSelection({ kind: "course", item })
  const featured = technicalDocuments.find((item) => item.id === "luat-thi-dau-mau")

  return (
    <SiteLayout>
      <div className="tech-page">
        <header className="tech-hero">
          <div className="page-wrap tech-hero-inner">
            <StarPattern className="tech-hero-star" />
            <Breadcrumb items={pageHeroes.knowledge.breadcrumbs} tone="inverse" />
            <h1>Chuyên môn</h1>
            <p>Hệ thống tài liệu, quy định, hướng dẫn và chương trình đào tạo chuyên môn của Liên đoàn Pickleball Việt Nam.</p>
          </div>
        </header>
        <div className="page-wrap tech-layout">
          <TechnicalNavigation />
          <div className="tech-content">
            {featured ? <FeaturedTechnicalDocument document={featured} onOpen={openDocument} /> : null}
            {resourceGroups.map((group) => <TechnicalResourceGroup key={group.id} group={group} onOpen={openDocument} />)}
            <TechnicalLibrary documents={technicalDocuments} onOpen={openDocument} />
            <TechnicalSection id="dao-tao" title="Đào tạo & tập huấn" intro="Tham khảo cấu trúc chương trình cho người chơi, trọng tài, huấn luyện viên và câu lạc bộ. Lịch và trạng thái đăng ký dưới đây là dữ liệu mẫu.">
              <div className="tech-courses">
                {technicalCourses.map((course) => <TechnicalCourseCard key={course.id} course={course} onOpen={openCourse} />)}
              </div>
            </TechnicalSection>
          </div>
        </div>
      </div>
      <Dialog open={selection !== null} title={selection?.item.title ?? "Chuyên môn"} onClose={close}>
        {selection?.kind === "document" ? <DocumentModalContent document={selection.item} /> : null}
        {selection?.kind === "course" ? <CourseModalContent course={selection.item} /> : null}
      </Dialog>
    </SiteLayout>
  )
}
