import { useState, type FormEvent } from "react"
import { partnershipTypeOptions } from "../../data/partnership.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"

type Field = "name" | "organization" | "email" | "phone" | "type" | "message"

type Values = Record<Field, string>

const empty: Values = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  type: "",
  message: "",
}

const labels: Record<Field, string> = {
  name: "Họ và tên",
  organization: "Doanh nghiệp / Tổ chức",
  email: "Email",
  phone: "Số điện thoại",
  type: "Hình thức hợp tác",
  message: "Nội dung đề xuất",
}

export function PartnershipForm() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState("")
  const { ref, shown } = useReveal<HTMLDivElement>()

  const setField = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatus("")
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate(values)
    setErrors(next)
    const first = (Object.keys(next) as Field[]).find((field) => next[field])
    if (first) {
      setStatus("")
      document.getElementById(fieldId(first))?.focus()
      return
    }
    setStatus(
      "Chưa thể gửi đề xuất. Kênh tiếp nhận đang chờ tích hợp. Nội dung vừa nhập không được chuyển đến VPF và không được lưu trên trình duyệt.",
    )
  }

  return (
    <section id="de-xuat" className="bg-paper py-14 md:py-16" aria-labelledby="gui-de-xuat">
      <div className="page-wrap">
        <div ref={ref} className={cx("partnership-form-panel partnership-rise", shown && "is-in")}>
          <h2 id="gui-de-xuat" className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Gửi đề xuất hợp tác
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Chia sẻ thông tin và nhu cầu hợp tác để VPF có thể xem xét đề xuất.
          </p>
          <p className="partnership-notice" role="note">
            Chức năng gửi đang chờ tích hợp. Biểu mẫu kiểm tra thông tin tại chỗ. Dữ liệu không được gửi đi và không được lưu.
          </p>

          <form className="mt-8" noValidate onSubmit={onSubmit}>
            <div className="partnership-form-grid">
              <Field
                id="name"
                value={values.name}
                error={errors.name}
                autoComplete="name"
                onChange={(value) => setField("name", value)}
              />
              <Field
                id="organization"
                value={values.organization}
                error={errors.organization}
                autoComplete="organization"
                onChange={(value) => setField("organization", value)}
              />
              <Field
                id="email"
                type="email"
                value={values.email}
                error={errors.email}
                autoComplete="email"
                onChange={(value) => setField("email", value)}
              />
              <Field
                id="phone"
                type="tel"
                value={values.phone}
                error={errors.phone}
                autoComplete="tel"
                onChange={(value) => setField("phone", value)}
              />
              <div className="partnership-field">
                <label htmlFor={fieldId("type")}>
                  {labels.type}
                  <RequiredMark />
                </label>
                <select
                  id={fieldId("type")}
                  name="type"
                  value={values.type}
                  aria-invalid={errors.type ? true : undefined}
                  aria-describedby={errors.type ? errorId("type") : undefined}
                  onChange={(event) => setField("type", event.target.value)}
                >
                  <option value="">Chọn hình thức</option>
                  {partnershipTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.type ? (
                  <p id={errorId("type")} className="partnership-error">
                    {errors.type}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="partnership-field mt-4">
              <label htmlFor={fieldId("message")}>
                {labels.message}
                <RequiredMark />
              </label>
              <textarea
                id={fieldId("message")}
                name="message"
                rows={6}
                value={values.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? errorId("message") : undefined}
                onChange={(event) => setField("message", event.target.value)}
              />
              {errors.message ? (
                <p id={errorId("message")} className="partnership-error">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" className="partnership-submit">
                Gửi đề xuất
              </button>
              {status ? (
                <p className="text-sm leading-relaxed text-ink" role="status">
                  {status}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: Field
  value: string
  error?: string
  onChange: (value: string) => void
  type?: "text" | "email" | "tel"
  autoComplete: string
}) {
  return (
    <div className="partnership-field">
      <label htmlFor={fieldId(id)}>
        {labels[id]}
        <RequiredMark />
      </label>
      <input
        id={fieldId(id)}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId(id)} className="partnership-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function RequiredMark() {
  return (
    <span className="text-signal" aria-hidden>
      {" "}
      *
    </span>
  )
}

function fieldId(field: Field) {
  return `hop-tac-${field}`
}

function errorId(field: Field) {
  return `hop-tac-${field}-loi`
}

function validate(values: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  const name = values.name.trim()
  const organization = values.organization.trim()
  const email = values.email.trim()
  const phone = values.phone.replace(/[\s.-]/g, "")
  const message = values.message.trim()

  if (name.length < 2 || name.length > 80) errors.name = "Họ và tên cần từ 2 đến 80 ký tự."
  if (organization.length < 2 || organization.length > 120) {
    errors.organization = "Tên doanh nghiệp hoặc tổ chức cần từ 2 đến 120 ký tự."
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    errors.email = "Email chưa đúng định dạng."
  }
  if (!/^(?:\+84|84|0)\d{9}$/.test(phone)) {
    errors.phone = "Số điện thoại cần 10 số bắt đầu bằng 0, hoặc dạng +84."
  }
  if (!partnershipTypeOptions.includes(values.type as (typeof partnershipTypeOptions)[number])) {
    errors.type = "Vui lòng chọn hình thức hợp tác."
  }
  if (message.length < 20 || message.length > 1500) {
    errors.message = "Nội dung đề xuất cần từ 20 đến 1500 ký tự."
  }
  return errors
}
