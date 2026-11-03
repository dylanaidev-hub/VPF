import { ChevronDown } from "lucide-react"
import type { SelectHTMLAttributes } from "react"
import { cx } from "../lib/cx"

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="select-wrap">
      <select className={cx("select-control", className)} {...props}>
        {children}
      </select>
      <ChevronDown className="select-chevron" aria-hidden />
    </span>
  )
}
