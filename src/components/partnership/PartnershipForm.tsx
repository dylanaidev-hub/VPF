import { useTranslation } from "../../i18n"
import { useState, type FormEvent } from "react"
import { contactSection, partnershipTypeOptions } from "../../data/partnership.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"
import { Button } from "../Button"
import { SectionHeading } from "../SectionHeading"
import { Select } from "../Select"

type Field = "name" | "organization" | "email" | "phone" | "type" | "message" | "consent"

type Values = {
  name: string
  organization: string
  email: string
  phone: string
  type: string
  message: string
  consent: boolean
}

const empty: Values = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  type: "",
  message: "",
  consent: false,
}

const labels: Record<Exclude<Field, "consent">, string> = {
  name: "Họ tên",
  organization: "Doanh nghiệp/Tổ chức",
  email: "Email",
  phone: "Số điện thoại",
  type: "Hình thức quan tâm",
  message: "Nội dung đề xuất",
}

export function PartnershipForm() {
  const { t } = useTranslation()
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<"idle" | "processing" | "demo-ok">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const { ref, shown } = useReveal<HTMLDivElement>()
  const processing = status === "processing"

  const setField = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== "idle") {
      setStatus("idle")
      setStatusMessage("")
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (processing) return
    const next = validate(values)
    setErrors(next)
    const first = (Object.keys(next) as Field[]).find((field) => next[field])
    if (first) {
      setStatus("idle")
      setStatusMessage("")
      document.getElementById(fieldId(first))?.focus()
      return
    }

    setStatus("processing")
    setStatusMessage("Đang kiểm tra biểu mẫu minh họa…")
    window.setTimeout(() => {
      setStatus("demo-ok")
      setStatusMessage(
        "Biểu mẫu đã được kiểm tra thành công ở chế độ minh họa. Dữ liệu không được gửi đến VPF và không được lưu trên trình duyệt.",
      )
    }, 650)
  }

  return (
    <section
      id={contactSection.id}
      className="eco-section eco-contact"
      aria-labelledby="lien-he-hop-tac-tieu-de"
    >
      <div className="page-wrap">
        <div ref={ref} className={cx("eco-form", shown && "is-in")}>
          <SectionHeading
            id="lien-he-hop-tac-tieu-de"
            title={t(contactSection.title)}
            subtitle={t(contactSection.description)}
          />
          <p className="partnership-notice" role="note">
            {t(contactSection.note)}
          </p>

          <form className="mt-8" noValidate onSubmit={onSubmit}>
            <div className="partnership-form-grid">
              <Field
                id="name"
                value={values.name}
                error={errors.name}
                autoComplete="name"
                required
                disabled={processing}
                onChange={(value) => setField("name", value)}
              />
              <Field
                id="organization"
                value={values.organization}
                error={errors.organization}
                autoComplete="organization"
                required
                disabled={processing}
                onChange={(value) => setField("organization", value)}
              />
              <Field
                id="email"
                type="email"
                value={values.email}
                error={errors.email}
                autoComplete="email"
                required
                disabled={processing}
                onChange={(value) => setField("email", value)}
              />
              <Field
                id="phone"
                type="tel"
                value={values.phone}
                error={errors.phone}
                autoComplete="tel"
                disabled={processing}
                onChange={(value) => setField("phone", value)}
              />
              <div className="partnership-field sm:col-span-2">
                <label htmlFor={fieldId("type")}>
                  {t(labels.type)}
                  <RequiredMark />
                </label>
                <Select
                  id={fieldId("type")}
                  name="type"
                  value={values.type}
                  disabled={processing}
                  aria-invalid={errors.type ? true : undefined}
                  aria-describedby={errors.type ? errorId("type") : undefined}
                  onChange={(event) => setField("type", event.target.value)}
                  className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
                >
                  <option value="">{t("Chọn hình thức")}</option>
                  {partnershipTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {t(option)}
                    </option>
                  ))}
                </Select>
                {errors.type ? (
                  <p id={errorId("type")} className="partnership-error">
                    {t(errors.type)}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="partnership-field mt-4">
              <label htmlFor={fieldId("message")}>{t(labels.message)}</label>
              <textarea
                id={fieldId("message")}
                name="message"
                rows={5}
                value={values.message}
                disabled={processing}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? errorId("message") : undefined}
                onChange={(event) => setField("message", event.target.value)}
              />
              {errors.message ? (
                <p id={errorId("message")} className="partnership-error">
                  {t(errors.message)}
                </p>
              ) : null}
            </div>

            <div className="mt-5">
              <label className="partner-consent" htmlFor={fieldId("consent")}>
                <input
                  id={fieldId("consent")}
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  disabled={processing}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? errorId("consent") : undefined}
                  onChange={(event) => setField("consent", event.target.checked)}
                />
                <span>{t(contactSection.consentLabel)}</span>
              </label>
              {errors.consent ? (
                <p id={errorId("consent")} className="partnership-error">
                  {t(errors.consent)}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" disabled={processing || status === "demo-ok"}>
                {processing ? t("Đang xử lý…") : t(contactSection.ctaLabel)}
              </Button>
              {statusMessage ? (
                <p
                  className={cx("text-sm leading-relaxed", status === "demo-ok" ? "text-ink" : "text-muted")}
                  role="status"
                >
                  {t(statusMessage)}
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
  required,
  disabled,
}: {
  id: Exclude<Field, "consent" | "type" | "message">
  value: string
  error?: string
  onChange: (value: string) => void
  type?: "text" | "email" | "tel"
  autoComplete: string
  required?: boolean
  disabled?: boolean
}) {
  const { t } = useTranslation()
  return (
    <div className="partnership-field">
      <label htmlFor={fieldId(id)}>
        {t(labels[id])}
        {required ? <RequiredMark /> : null}
      </label>
      <input
        id={fieldId(id)}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId(id)} className="partnership-error">
          {t(error)}
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
  const phoneRaw = values.phone.trim()
  const phone = phoneRaw.replace(/[\s.-]/g, "")
  const message = values.message.trim()

  if (name.length < 2 || name.length > 80) errors.name = "Họ tên cần từ 2 đến 80 ký tự."
  if (organization.length < 2 || organization.length > 120) {
    errors.organization = "Tên doanh nghiệp hoặc tổ chức cần từ 2 đến 120 ký tự."
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    errors.email = "Email chưa đúng định dạng."
  }
  if (phoneRaw && !/^(?:\+84|84|0)\d{9}$/.test(phone)) {
    errors.phone = "Số điện thoại cần 10 số bắt đầu bằng 0, hoặc dạng +84."
  }
  if (!partnershipTypeOptions.includes(values.type as (typeof partnershipTypeOptions)[number])) {
    errors.type = "Vui lòng chọn hình thức quan tâm."
  }
  if (message && (message.length < 10 || message.length > 1500)) {
    errors.message = "Nội dung đề xuất cần từ 10 đến 1500 ký tự khi điền."
  }
  if (!values.consent) errors.consent = "Vui lòng đồng ý với chính sách bảo mật để tiếp tục."
  return errors
}
