import { useTranslation } from "../i18n"
import type { ContactSocialId, ContactSocialLink } from "../data/contact"
import { cx } from "../lib/cx"

export function SocialLinks({
  links,
  tone = "light",
  className,
}: {
  links: readonly ContactSocialLink[]
  tone?: "light" | "dark"
  className?: string
}) {
  const { t } = useTranslation()

  return (
    <ul className={cx("social-links", tone === "dark" && "is-dark", className)} aria-label={t("Mạng xã hội")}>
      {links.map((channel) => {
        const unavailable = !channel.href
        const label = unavailable
          ? t("footer.socialUnavailable", { name: channel.label })
          : channel.label

        if (unavailable) {
          return (
            <li key={channel.id}>
              <span
                role="img"
                aria-label={label}
                title={t("Đường dẫn chính thức chưa được công bố")}
                className="social-links-btn"
              >
                <SocialGlyph name={channel.id} />
              </span>
            </li>
          )
        }

        return (
          <li key={channel.id}>
            <a
              href={channel.href!}
              className="social-links-btn"
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <SocialGlyph name={channel.id} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function SocialGlyph({ name }: { name: ContactSocialId }) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path
          fill="currentColor"
          d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.4 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z"
        />
      </svg>
    )
  }
  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path
          fill="currentColor"
          d="M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM10.2 15.4V9l5.2 3.2-5.2 3.2Z"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="currentColor"
        d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Z"
      />
      <path
        fill="currentColor"
        d="M16.7 3H7.3A4.3 4.3 0 0 0 3 7.3v9.4A4.3 4.3 0 0 0 7.3 21h9.4a4.3 4.3 0 0 0 4.3-4.3V7.3A4.3 4.3 0 0 0 16.7 3Zm2.7 13.7a2.7 2.7 0 0 1-2.7 2.7H7.3a2.7 2.7 0 0 1-2.7-2.7V7.3A2.7 2.7 0 0 1 7.3 4.6h9.4a2.7 2.7 0 0 1 2.7 2.7v9.4Z"
      />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" />
    </svg>
  )
}
