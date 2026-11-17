import { useTranslation } from "../i18n"
import { useEffect, useState, type ReactNode } from "react"
import { useReducedMotion } from "../lib/useReducedMotion"
import { cx } from "../lib/cx"
import { Breadcrumb } from "./Breadcrumb"
import { VPFStarPattern } from "./VPFStarPattern"

export type PageHeroCrumb = {
  label: string
  href?: string
}

export type PageHeroProps = {
  title: string
  description?: string
  breadcrumbs: PageHeroCrumb[]
  variant?: "default" | "detail"
  showPattern?: boolean
  titleId?: string
  /** Nội dung ngay trên tiêu đề, ví dụ huy hiệu trạng thái. */
  beforeTitle?: ReactNode
  /** Nút hoặc liên kết sau mô tả, chỉ khi trang thật sự cần. */
  action?: ReactNode
  /** Nội dung sau mô tả, ví dụ ngày và địa điểm. */
  children?: ReactNode
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  variant = "default",
  showPattern = true,
  titleId,
  beforeTitle,
  action,
  children,
}: PageHeroProps) {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduce) return
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [reduce])

  return (
    <header aria-labelledby={titleId} className={cx(
      "page-hero",
      variant === "detail" && "is-detail",
      ready && "is-ready",
      reduce && "is-reduced",
    )}>
      {showPattern ? <div className="page-hero-mark" aria-hidden><VPFStarPattern /></div> : null}
      <div className="page-wrap page-hero-body">
        <div className="page-hero-crumb">
          <Breadcrumb tone="inverse" items={breadcrumbs} />
        </div>
        <div className="page-hero-copy">
          {beforeTitle ? <div className="page-hero-kicker">{beforeTitle}</div> : null}
          <h1 id={titleId} className="page-hero-title">
            {t(title)}
          </h1>
          {description ? <p className="page-hero-description">{t(description)}</p> : null}
          {children ? <div className="page-hero-extra">{children}</div> : null}
          {action ? <div className="page-hero-action">{action}</div> : null}
        </div>
      </div>
    </header>
  )
}
