import type { ReactNode } from "react"
import { ArrowRight, Download, FileText } from "lucide-react"
import { courseStatuses, resourceGroups, technicalDocuments, type TechnicalCourse, type TechnicalDocument } from "../../data/technicalResources"
import { formatViDate } from "../../lib/format"
import { sitePath } from "../../lib/site"
import { Button } from "../Button"
import { DocumentCard } from "../DocumentCard"
import { DocumentReader } from "../DocumentReader"

export type OpenTechnicalDocument = (document: TechnicalDocument) => void

export function TechnicalSection({ id, title, intro, children }: {
  id: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section className="tech-section" id={id} aria-labelledby={`${id}-heading`}>
      <header className="tech-section-heading">
        <h2 id={`${id}-heading`} className="vpf-section-title">{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </header>
      {children}
    </section>
  )
}

export function DocumentSource({ document }: { document: TechnicalDocument }) {
  return <span className={`tech-tag tech-tag--${document.source}`}>{document.source === "demo" ? "Bản mẫu" : "Chính thức"}</span>
}

export function DownloadTechnicalPdf({ document }: { document: TechnicalDocument }) {
  return (
    <a href={sitePath(document.pdf)} download className="tech-download-link" aria-label={`Tải PDF: ${document.title}`}>
      <Download size={16} aria-hidden="true" /> PDF
    </a>
  )
}

export function FeaturedTechnicalDocument({ document, onOpen }: { document: TechnicalDocument; onOpen: OpenTechnicalDocument }) {
  return (
    <TechnicalSection id="luat-thi-dau" title="Luật thi đấu" intro="Tra cứu bộ luật và các mục cần đối chiếu khi thi đấu.">
      <DocumentCard
        category={document.source === "demo" ? `${document.type} · Bản mẫu` : document.type}
        title={document.title}
        description={document.description}
        documentUrl={document.pdf}
        downloadUrl={document.pdf}
        onRead={() => onOpen(document)}
      />
      <div className="tech-feature">
        {document.cover ? (
          <img className="tech-cover" src={sitePath(document.cover)} alt={`Bìa ${document.title}, ${document.source === "demo" ? "bản mẫu" : "tài liệu chính thức"}`} width={460} height={650} />
        ) : null}
        <div className="tech-feature-info">
          <dl className="tech-document-meta">
            <div><dt>Phiên bản</dt><dd>{document.version ?? "Chưa công bố"}</dd></div>
            <div><dt>Ngày hiệu lực</dt><dd>{document.effectiveOn ? formatViDate(document.effectiveOn) : "Chưa công bố"}</dd></div>
            <div><dt>Cập nhật lần cuối</dt><dd>{document.updatedOn ? formatViDate(document.updatedOn) : "Chưa công bố"}</dd></div>
          </dl>
          <div className="tech-toc">
            <h4>Mục lục</h4>
            <ol>{document.outline.map((section) => <li key={section.title}>{section.title}</li>)}</ol>
          </div>
        </div>
      </div>
    </TechnicalSection>
  )
}

export function TechnicalResourceGroup({ group, onOpen }: {
  group: typeof resourceGroups[number]
  onOpen: OpenTechnicalDocument
}) {
  const related = group.documents.flatMap((id) => {
    const document = technicalDocuments.find((item) => item.id === id)
    return document ? [document] : []
  })
  return (
    <TechnicalSection id={group.id} title={group.title} intro={group.intro}>
      <div className={`tech-topics tech-topics--${group.panels.length}`}>
        {group.panels.map((panel) => (
          <article key={panel.title} className="tech-topic">
            <h3>{panel.title}</h3>
            <ul>{panel.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
      {related.length ? (
        <ul className="tech-related" aria-label={`Tài liệu liên quan đến ${group.title}`}>
          {related.map((document) => (
            <li key={document.id}>
              <FileText size={19} className="tech-file-icon" aria-hidden="true" />
              <div>
                <button type="button" className="tech-text-action" onClick={() => onOpen(document)}>{document.title}</button>
                <p>{document.type} · {document.source === "demo" ? "Bản mẫu" : "Chính thức"}</p>
              </div>
              <DownloadTechnicalPdf document={document} />
            </li>
          ))}
        </ul>
      ) : null}
    </TechnicalSection>
  )
}

function CourseDetails({ course }: { course: TechnicalCourse }) {
  return (
    <dl className="tech-course-meta">
      <div><dt>Đối tượng</dt><dd>{course.audience}</dd></div>
      <div><dt>Thời lượng</dt><dd>{course.duration}</dd></div>
      <div><dt>Hình thức</dt><dd>{course.format}</dd></div>
      {course.deadline ? <div><dt>Hạn đăng ký mẫu</dt><dd><time dateTime={course.deadline}>{formatViDate(course.deadline)}</time></dd></div> : null}
    </dl>
  )
}

export function TechnicalCourseCard({ course, onOpen }: { course: TechnicalCourse; onOpen: (course: TechnicalCourse) => void }) {
  return (
    <article className="tech-course">
      <div className="tech-course-tags">
        <span className={`tech-tag tech-tag--${course.status}`}>{courseStatuses[course.status]}</span>
        <span className="tech-course-sample">Chương trình mẫu</span>
      </div>
      <h3>{course.title}</h3>
      <CourseDetails course={course} />
      <Button variant="secondary" className={course.status === "open" ? "tech-primary" : undefined} onClick={() => onOpen(course)}>
        {course.status === "open" ? "Xem đăng ký mẫu" : "Xem chi tiết"} <ArrowRight size={16} aria-hidden="true" />
      </Button>
    </article>
  )
}

export function CourseModalContent({ course }: { course: TechnicalCourse }) {
  const form = technicalDocuments.find((document) => document.id === "phieu-dang-ky")
  return (
    <div className="tech-course-dialog">
      <span className="tech-tag tech-tag--demo">Chương trình mẫu</span>
      <p>{course.description}</p>
      <CourseDetails course={course} />
      <h3>Nội dung tập huấn</h3>
      <ul>{course.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
      <p>Thông tin dùng để minh họa. Trang này chưa tiếp nhận đăng ký.</p>
      {course.status === "open" && form ? (
        <Button variant="secondary" href={form.pdf} download><Download size={17} aria-hidden="true" /> Tải phiếu đăng ký mẫu</Button>
      ) : null}
    </div>
  )
}

export function DocumentModalContent({ document }: { document: TechnicalDocument }) {
  return (
    <DocumentReader
      documentUrl={document.pdf}
      downloadUrl={document.pdf}
      note={document.source === "demo" ? "Tài liệu minh họa, chưa có hiệu lực áp dụng." : undefined}
    />
  )
}
