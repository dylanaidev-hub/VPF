import { useTranslation } from "../i18n"
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
  title: string
  description?: string
  titleId?: string
  className?: string
  action?: ReactNode
}

export function PageHeader({
  breadcrumb,
  title,
  description,
  titleId,
  className,
  action,
}: PageHeaderProps) {
  const { t } = useTranslation()
  return (
    <header className={cx("page-header page-wrap", className)}>
      <Breadcrumb items={breadcrumb} />
      <h1 id={titleId} className="page-header-title">
        {t(title)}
      </h1>
      {description ? <p className="page-header-description">{t(description)}</p> : null}
      {action ? <div className="page-header-action">{action}</div> : null}
    </header>
  )
}
