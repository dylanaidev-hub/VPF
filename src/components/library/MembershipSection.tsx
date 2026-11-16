import { useState, type FormEvent } from "react"
import { membershipSection, membershipSteps } from "../../data/library.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { Select } from "../Select"
import "./membership-journey.css"

const selectClass = "join-control"
const inputClass = "join-control"

type ApplicantType = (typeof membershipSection.applicantTypes)[number]

export function MembershipSection() {
  const [active, setActive] = useState(0)
  const [applicant, setApplicant] = useState<ApplicantType>("Cá nhân")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [org, setOrg] = useState("")
  const [note, setNote] = useState("")
  const [message, setMessage] = useState("")
  const [messageKind, setMessageKind] = useState<"error" | "success" | "">("")
  const { ref, shown } = useReveal<HTMLElement>()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      setMessageKind("error")
      setMessage("Vui lòng điền họ tên và email.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessageKind("error")
      setMessage("Email chưa đúng định dạng.")
      return
    }
    if (applicant !== "Cá nhân" && !org.trim()) {
      setMessageKind("error")
      setMessage("Vui lòng điền tên câu lạc bộ / đơn vị.")
      return
    }
    setMessageKind("success")
    setMessage(membershipSection.successNote)
  }

  return (
    <section
      id={membershipSection.id}
      ref={ref}
      className={cx("library-section library-join library-rise", shown && "is-in")}
      aria-labelledby="dang-ky-tieu-de"
    >
      <div className="page-wrap">
        <div className="join-layout">
          <div className="join-process">
            <div className="library-section-head">
              <h2 id="dang-ky-tieu-de" className="library-section-title">
                {membershipSection.title}
              </h2>
              <p className="library-section-lead">{membershipSection.description}</p>
            </div>

            <ol className="join-steps">
              {membershipSteps.map((item, index) => {
                const selected = index === active
                const panelId = `dang-ky-${item.id}`
                return (
                  <li key={item.id} className={cx(selected && "is-open", index < active && "is-reached")}>
                    <h3 className="join-step-heading">
                      <button
                        type="button"
                        id={`${panelId}-nut`}
                        className={cx("join-step", selected && "is-active")}
                        aria-expanded={selected}
                        aria-controls={panelId}
                        onClick={() => {
                          if (!selected) setActive(index)
                        }}
                      >
                        <span className="join-step-num">{item.number}</span>
                        <span className="join-step-name">{item.title}</span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      className="join-acc"
                      role="region"
                      aria-labelledby={`${panelId}-nut`}
                      aria-hidden={!selected}
                    >
                      <div className="join-acc-inner">
                        <p className="join-summary">{item.summary}</p>
                        <ul className="join-details">
                          {item.details.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                        <p className="join-note">{membershipSection.note}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <form className="join-form" noValidate onSubmit={onSubmit}>
            <div className="join-fields">
              <label className="join-field">
                <span>Đối tượng</span>
                <Select
                  value={applicant}
                  onChange={(event) => setApplicant(event.target.value as ApplicantType)}
                  className={selectClass}
                >
                  {membershipSection.applicantTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="join-field">
                <span>Họ và tên</span>
                <input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} autoComplete="name" />
              </label>
              <label className="join-field">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
              </label>
              {applicant !== "Cá nhân" ? (
                <label className="join-field">
                  <span>{applicant === "Câu lạc bộ" ? "Tên câu lạc bộ" : "Tên đơn vị tổ chức"}</span>
                  <input value={org} onChange={(event) => setOrg(event.target.value)} className={inputClass} />
                </label>
              ) : null}
              <label className="join-field">
                <span>Ghi chú</span>
                <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} className="join-control" />
              </label>
            </div>

            {message ? (
              <p className={cx("join-message", messageKind === "success" && "is-success")} role="status">
                {message}
              </p>
            ) : null}

            <button type="submit" className="library-btn-primary join-submit">
              {membershipSection.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
