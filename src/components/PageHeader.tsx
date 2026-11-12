import type { ReactNode } from "react"
import { cx } from "../lib/cx"
import { Breadcrumb } from "./Breadcrumb"

export type PageHeaderCrumb = {
  label: string
  href?: string
  hideBelow?: "sm"
}

type PageHeaderProps = {
  breadcrumb: PageHeaderCrumb[]
  eyebrow: string
  title: string
  description: string
  disclaimer?: string
  titleId?: string
  className?: string
  action?: ReactNode
}

export function PageHeader({
  breadcrumb,
  eyebrow,
  title,
  description,
  disclaimer,
  titleId,
  className,
  action,
}: PageHeaderProps) {
  return (
    <header className={cx("page-header page-wrap", className)}>
      <Breadcrumb items={breadcrumb} />
      <p className="page-header-eyebrow">{eyebrow}</p>
      <h1 id={titleId} className="page-header-title">
        {title}
      </h1>
      <p className="page-header-description">{description}</p>
      {disclaimer ? <p className="page-header-disclaimer">{disclaimer}</p> : null}
      {action ? <div className="page-header-action">{action}</div> : null}
    </header>
  )
}
