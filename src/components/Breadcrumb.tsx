import { ChevronRight } from "lucide-react"
import { cx } from "../lib/cx"
import { sitePath } from "../lib/site"

export function Breadcrumb({
  items,
  tone = "default",
}: {
  items: { label: string; href?: string; hideBelow?: "sm" }[]
  tone?: "default" | "inverse"
}) {
  const inverse = tone === "inverse"

  return (
    <nav aria-label="Đường dẫn">
      <ol className={cx("flex flex-wrap items-center gap-1.5 text-sm", inverse ? "text-white/75" : "text-muted")}>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li
              key={item.label}
              className={cx("flex items-center gap-1.5", item.hideBelow === "sm" && "hidden sm:flex")}
            >
              {index > 0 ? (
                <ChevronRight className={cx("size-3.5", inverse && "text-white/55")} aria-hidden />
              ) : null}
              {item.href && !last ? (
                <a href={sitePath(item.href)} className={inverse ? "hover:text-white" : "hover:text-ink"}>
                  {item.label}
                </a>
              ) : (
                <span
                  className={cx("font-medium", inverse ? "text-white" : "text-ink")}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
