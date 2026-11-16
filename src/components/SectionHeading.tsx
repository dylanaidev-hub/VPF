import type { ReactNode } from "react"
import { cx } from "../lib/cx"

export function SectionHeading({
  title,
  subtitle,
  action,
  id,
  className,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
  id?: string
  className?: string
}) {
  return (
    <div
      className={cx(
        "mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2
          id={id}
          className="vpf-section-title"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
