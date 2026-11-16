import { useState, type FormEvent } from "react"
import { membershipSection, membershipSteps } from "../../data/library.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"
import { Select } from "../Select"

const selectClass = "h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
const inputClass =
  "h-12 w-full rounded-[10px] border border-line bg-white px-4 text-[15px] text-ink outline-none"

type ApplicantType = (typeof membershipSection.applicantTypes)[number]

export function MembershipSection() {
  const [active, setActive] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [applicant, setApplicant] = useState<ApplicantType>("Cá nhân")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [org, setOrg] = useState("")
  const [note, setNote] = useState("")
  const [status, setStatus] = useState("")
  const { ref, shown } = useReveal<HTMLElement>()
  const step = membershipSteps[active]!

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      setStatus("Vui lòng điền họ tên và email.")
      return
    }
    if (applicant !== "Cá nhân" && !org.trim()) {
      setStatus("Vui lòng điền tên câu lạc bộ / đơn vị.")
      return
    }
    setStatus(
      "Chưa thể gửi đăng ký. Biểu mẫu đang ở chế độ minh họa — dữ liệu không được gửi đi và không được lưu.",
    )
  }

  return (
    <section
      id={membershipSection.id}
      ref={ref}
      className={cx("library-section library-join library-rise", shown && "is-in")}
      aria-labelledby="dang-ky-tieu-de"
    >
      <div className="page-wrap">
        <div className="library-section-head">
          <h2 id="dang-ky-tieu-de" className="library-section-title">
            {membershipSection.title}
          </h2>
          <p className="library-section-lead">{membershipSection.description}</p>
        </div>

        <ol className="library-steps">
          {membershipSteps.map((item, index) => {
            const selected = index === active
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={cx("library-step", selected && "is-active")}
                  aria-current={selected ? "step" : undefined}
                  onClick={() => setActive(index)}
                >
                  <span className="library-step-num">{item.number}</span>
                  <span className="library-step-copy">
                    <span className="library-step-title">{item.title}</span>
                    <span className="library-step-summary">{item.summary}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <article className="library-step-panel">
          <h3 className="library-step-panel-title">
            {step.number}. {step.title}
          </h3>
          <ul className="library-step-details">
            {step.details.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <button type="button" className="library-btn-primary mt-5" onClick={() => setFormOpen(true)}>
            {membershipSection.ctaLabel}
          </button>
        </article>
      </div>

      <Dialog open={formOpen} title={membershipSection.ctaLabel} onClose={() => setFormOpen(false)}>
        <p className="text-sm font-medium text-brand-strong">Biểu mẫu minh họa</p>
        <p className="mt-2 text-sm text-muted">
          Chưa có kênh tiếp nhận chính thức. Thông tin nhập chỉ dùng để kiểm tra giao diện.
        </p>
        <form className="mt-5 space-y-4" noValidate onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Đối tượng</span>
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
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Họ và tên</span>
            <input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              autoComplete="email"
            />
          </label>
          {applicant !== "Cá nhân" ? (
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">
                {applicant === "Câu lạc bộ" ? "Tên câu lạc bộ" : "Tên đơn vị tổ chức"}
              </span>
              <input value={org} onChange={(event) => setOrg(event.target.value)} className={inputClass} />
            </label>
          ) : null}
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Ghi chú</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              className="w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none"
            />
          </label>
          {status ? <p className="text-sm text-muted">{status}</p> : null}
          <button type="submit" className="library-btn-primary">
            Gửi đăng ký (demo)
          </button>
        </form>
      </Dialog>
    </section>
  )
}
