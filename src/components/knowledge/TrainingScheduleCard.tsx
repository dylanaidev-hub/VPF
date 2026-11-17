import { useTranslation } from "../../i18n"
import type { TrainingCourse } from "../../data/trainingSchedule"
import { formatViDate } from "../../lib/format"
import { Badge } from "../Badge"
import { Button } from "../Button"
import "./training-schedule.css"

const registrationStates = {
  open: { label: "Đang mở đăng ký", tone: "live" },
  upcoming: { label: "Sắp mở", tone: "upcoming" },
  closed: { label: "Đã đóng", tone: "finished" },
} as const

function getRegistrationUrl(value?: string) {
  const url = value?.trim()
  if (!url || !/^(?:https?:\/\/[^/\\]|\/(?![/\\]).)/i.test(url)) return undefined
  return URL.canParse(url, "https://example.invalid") ? url : undefined
}

export function TrainingScheduleCard({ course }: { course: TrainingCourse }) {
  const { language, t } = useTranslation()
  const { title, description, startDate, endDate, location, format, audience, registrationStatus } = course
  const [year, month, day] = startDate.split("-")
  const { label, tone } = registrationStates[registrationStatus]
  const registrationUrl = getRegistrationUrl(course.registrationUrl)

  return (
    <li className="training-schedule-card">
      <div className="training-schedule-date" aria-hidden="true">
        <span>{day}</span>
        <span>{language === "en" ? t(`Tháng ${Number(month)}`).slice(0, 3).toUpperCase() : `THG ${Number(month)}`}/{year}</span>
      </div>
      <div className="training-schedule-details">
        <Badge tone={tone} className="justify-self-start">{t(label)}</Badge>
        <h3>{t(title)}</h3>
        <p className="training-schedule-description">{t(description)}</p>
        <dl>
          <div><dt>{t("Đối tượng")}</dt><dd>{t(audience)}</dd></div>
          <div><dt>{t("Địa điểm")}</dt><dd>{t(location)}</dd></div>
          <div><dt>{t("Hình thức")}</dt><dd>{t(format)}</dd></div>
          <div>
            <dt>{t("Thời gian")}</dt>
            <dd>
              <time dateTime={startDate}>{formatViDate(startDate)}</time>
              {endDate !== startDate ? <> – <time dateTime={endDate}>{formatViDate(endDate)}</time></> : null}
            </dd>
          </div>
        </dl>
      </div>
      <div className="training-schedule-action">
        {registrationStatus === "closed" ? <p>{t("Đã đóng đăng ký")}</p> : registrationStatus === "upcoming" ? (
          <Button disabled>{t("Chưa mở đăng ký")}</Button>
        ) : registrationUrl ? (
          <Button href={registrationUrl} aria-label={t("training.register", { title: t(title) })}>{t("Đăng ký ngay")}</Button>
        ) : (
          <>
            <Button disabled>{t("Đăng ký ngay")}</Button>
            <p>{t("Chưa có liên kết đăng ký")}</p>
          </>
        )}
      </div>
    </li>
  )
}
