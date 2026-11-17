import type { ReactNode } from "react"
import { technicalSections, type TechnicalCourse, type TechnicalDocument } from "../../data/technicalResources"
import { formatViDate } from "../../lib/format"
import { useReveal } from "../../lib/useReveal"
import { Button } from "../Button"
import { publishedPdf } from "../DocumentCard"
import { DocumentRow } from "../DocumentRow"
import { SectionHeading } from "../SectionHeading"

export function TechnicalSection({ id, intro, children }: {
  id: typeof technicalSections[number]["id"]
  intro: string
  children: ReactNode
}) {
  const { ref, shown } = useReveal<HTMLElement>()
  const index = technicalSections.findIndex((section) => section.id === id)
  const title = technicalSections[index].title

  return (
    <section ref={ref} className="tech-section" id={id} aria-labelledby={`${id}-heading`} data-shown={shown}>
      <div className="tech-section-heading">
        <span className="tech-section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <SectionHeading id={`${id}-heading`} title={title} subtitle={intro} className="tech-heading" />
      </div>
      <div className="tech-section-body">{children}</div>
    </section>
  )
}

export function TechnicalDocumentList({ documents }: { documents: readonly TechnicalDocument[] }) {
  return (
    <ul className="tech-resources">
      {documents.map((document) => {
        const pdf = publishedPdf(document.pdf)
        const status = document.source === "demo" ? "sample" : pdf ? "published" : "draft"
        return (
          <DocumentRow
            key={document.id}
            category={document.type}
            title={document.title}
            description={document.description}
            format={pdf ? "PDF" : undefined}
            status={status}
            fileUrl={pdf || undefined}
          />
        )
      })}
    </ul>
  )
}

export function TechnicalTraining({ courses }: { courses: readonly TechnicalCourse[] }) {
  return (
    <TechnicalSection id="dao-tao" intro="Lịch học và tập huấn dành cho người chơi, trọng tài, huấn luyện viên và câu lạc bộ.">
      {courses.length ? (
        <ul className="tech-training">
          {courses.map((course) => (
            <li key={course.id}>
              <h3>{course.title}</h3>
              <dl>
                <div><dt>Đối tượng</dt><dd>{course.audience}</dd></div>
                <div><dt>Thời gian</dt><dd><time dateTime={course.startsOn}>{formatViDate(course.startsOn)}</time>{course.endsOn ? <> – <time dateTime={course.endsOn}>{formatViDate(course.endsOn)}</time></> : null}</dd></div>
                <div><dt>Địa điểm</dt><dd>{course.venue}</dd></div>
                <div><dt>Trạng thái</dt><dd>{course.status}</dd></div>
              </dl>
              {course.status === "Đang mở đăng ký" && course.registrationUrl ? <Button variant="secondary" href={course.registrationUrl}>Đăng ký</Button> : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="tech-empty">
          <h3>Chưa có lịch đào tạo và tập huấn được công bố</h3>
          <p>Thông tin lớp học sẽ được cập nhật tại đây sau khi Liên đoàn công bố.</p>
        </div>
      )}
    </TechnicalSection>
  )
}
