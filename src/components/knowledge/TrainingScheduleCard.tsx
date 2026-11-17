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
  const { title, description, startDate, endDate, location, format, audience, registrationStatus, source } = course
  const [year, month, day] = startDate.split("-")
  const { label, tone } = registrationStates[registrationStatus]
  const registrationUrl = getRegistrationUrl(course.registrationUrl)

  return (
    <li className="training-schedule-card">
      <div className="training-schedule-date" aria-hidden="true">
        <span>{day}</span>
        <span>THG {Number(month)}/{year}</span>
      </div>
      <div className="training-schedule-details">
        <div className="training-schedule-badges">
          <Badge tone={tone}>{label}</Badge>
          {source === "demo" ? <Badge className="border border-line">Lịch minh họa</Badge> : null}
        </div>
        <h3>{title}</h3>
        <p className="training-schedule-description">{description}</p>
        <dl>
          <div><dt>Đối tượng</dt><dd>{audience}</dd></div>
          <div><dt>Địa điểm</dt><dd>{location}</dd></div>
          <div><dt>Hình thức</dt><dd>{format}</dd></div>
          <div>
            <dt>Thời gian</dt>
            <dd>
              <time dateTime={startDate}>{formatViDate(startDate)}</time>
              {endDate !== startDate ? <> – <time dateTime={endDate}>{formatViDate(endDate)}</time></> : null}
            </dd>
          </div>
        </dl>
      </div>
      <div className="training-schedule-action">
        {registrationStatus === "closed" ? <p>Đã đóng đăng ký</p> : registrationStatus === "upcoming" ? (
          <Button disabled>Chưa mở đăng ký</Button>
        ) : registrationUrl ? (
          <Button href={registrationUrl} aria-label={`Đăng ký ngay: ${title}`}>Đăng ký ngay</Button>
        ) : (
          <>
            <Button disabled>Đăng ký ngay</Button>
            <p>Chưa có liên kết đăng ký</p>
          </>
        )}
      </div>
    </li>
  )
}
