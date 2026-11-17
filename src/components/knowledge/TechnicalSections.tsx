import { useTranslation } from "../../i18n"
import type { ReactNode } from "react"
import { technicalSections, type TechnicalDocument } from "../../data/technicalResources"
import type { TrainingCourse } from "../../data/trainingSchedule"
import { useReveal } from "../../lib/useReveal"
import { DocumentRow } from "../DocumentRow"
import { SectionHeading } from "../SectionHeading"
import { TrainingScheduleCard } from "./TrainingScheduleCard"

export function TechnicalSection({ id, intro, children }: {
  id: typeof technicalSections[number]["id"]
  intro: string
  children: ReactNode
}) {
  const { t } = useTranslation()
  const { ref, shown } = useReveal<HTMLElement>()
  const index = technicalSections.findIndex((section) => section.id === id)
  const title = technicalSections[index].title

  return (
    <section ref={ref} className="tech-section" id={id} aria-labelledby={`${id}-heading`} data-shown={shown}>
      <div className="tech-section-heading">
        <span className="tech-section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <SectionHeading id={`${id}-heading`} title={t(title)} subtitle={t(intro)} className="tech-heading" />
      </div>
      <div className="tech-section-body">{children}</div>
    </section>
  )
}

export function TechnicalDocumentList({ documents }: { documents: readonly TechnicalDocument[] }) {
  const { t } = useTranslation()
  if (!documents.length) return null

  return (
    <ul className="tech-resources">
      {documents.map((document) => (
        <DocumentRow
          key={document.id}
          category={document.type}
          title={t(document.title)}
          description={t(document.description)}
          format={document.pdf ? "PDF" : undefined}
          {...(document.pdf
            ? { fileUrl: document.pdf }
            : { unavailableMessage: "Tài liệu demo chưa có file tải xuống" })}
        />
      ))}
    </ul>
  )
}

export function TechnicalTraining({ courses }: { courses: readonly TrainingCourse[] }) {
  const { t } = useTranslation()
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date())
  const schedule = courses.toSorted((a, b) =>
    Number(a.endDate < today) - Number(b.endDate < today) || a.startDate.localeCompare(b.startDate),
  )
  const intro = "Lịch học và tập huấn dành cho người chơi, trọng tài, huấn luyện viên và câu lạc bộ."
  const demoNote = courses.some((course) => course.source === "demo") ? ` ${t("Các khóa bên dưới là dữ liệu minh họa.")}` : ""

  return (
    <TechnicalSection id="dao-tao" intro={t(intro) + demoNote}>
      {schedule.length ? (
        <ul className="training-schedule">
          {schedule.map((course) => (
            <TrainingScheduleCard key={course.id} course={course} />
          ))}
        </ul>
      ) : (
        <div className="tech-empty">
          <h3>{t("Chưa có lịch đào tạo và tập huấn được công bố")}</h3>
          <p>{t("Thông tin lớp học sẽ được cập nhật tại đây sau khi Liên đoàn công bố.")}</p>
        </div>
      )}
    </TechnicalSection>
  )
}
