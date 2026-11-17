import { useEffect, useState, type ReactNode } from "react"
import { useReducedMotion } from "../lib/useReducedMotion"
import { cx } from "../lib/cx"
import { Breadcrumb } from "./Breadcrumb"
import { StarPattern } from "./StarPattern"
import { VPFStarPattern } from "./VPFStarPattern"

export type PageHeroCrumb = {
  label: string
  href?: string
}

export type PageHeroProps = {
  title: string
  description?: string
  breadcrumbs: PageHeroCrumb[]
  variant?: "default" | "detail" | "compact"
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
  titleId,
  beforeTitle,
  action,
  children,
}: PageHeroProps) {
  const reduce = useReducedMotion()
  const compact = variant === "compact"
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduce || compact) return
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [compact, reduce])

  return (
    <header className={cx("page-hero", variant === "detail" && "is-detail", compact && "is-compact", ready && !compact && "is-ready", reduce && "is-reduced")}>
      {compact ? null : <div className="page-hero-mark" aria-hidden><VPFStarPattern /></div>}
      <div className="page-wrap page-hero-body">
        {compact ? <StarPattern className="page-hero-compact-mark" /> : null}
        <div className="page-hero-crumb">
          <Breadcrumb tone="inverse" items={breadcrumbs} />
        </div>
        <div className="page-hero-copy">
          {beforeTitle ? <div className="page-hero-kicker">{beforeTitle}</div> : null}
          <h1 id={titleId} className="page-hero-title">
            {title}
          </h1>
          {description ? <p className="page-hero-description">{description}</p> : null}
          {children ? <div className="page-hero-extra">{children}</div> : null}
          {action ? <div className="page-hero-action">{action}</div> : null}
        </div>
      </div>
    </header>
  )
}
