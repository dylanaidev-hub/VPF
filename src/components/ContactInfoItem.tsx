import { useTranslation } from "../i18n"
import type { LucideIcon } from "lucide-react"

export function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}) {
  const { t } = useTranslation()

  return (
    <li className="contact-info-item">
      <Icon className="contact-info-item-icon" size={22} strokeWidth={1.75} aria-hidden />
      <div className="contact-info-item-body">
        <p className="contact-info-item-label">{t(label)}</p>
        {href ? (
          <a href={href} className="contact-info-item-value contact-info-item-link">
            {value}
          </a>
        ) : (
          <p className="contact-info-item-value">{value}</p>
        )}
      </div>
    </li>
  )
}
