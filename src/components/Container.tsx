import type { ReactNode } from "react"
import { cx } from "../lib/cx"

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("page-wrap", className)}>{children}</div>
}
