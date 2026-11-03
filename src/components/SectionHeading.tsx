import type { ReactNode } from "react"
import { cx } from "../lib/cx"

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  id,
  className,
}: {
  eyebrow?: string
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
        {eyebrow ? (
          <p className="mb-3 flex items-center gap-3 text-[13px] font-medium text-brand-strong">
            <span className="h-px w-8 bg-brand" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={id}
          className="text-[2rem] font-bold leading-[1.15] tracking-tight text-ink min-[1200px]:text-[2.75rem]"
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
