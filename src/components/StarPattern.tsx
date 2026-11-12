import { cx } from "../lib/cx"
import { sitePath } from "../lib/site"

export function StarPattern({ className }: { className?: string }) {
  return (
    <img
      src={sitePath("/brand/pattern-star.svg")}
      alt=""
      width={800}
      height={800}
      decoding="async"
      className={cx("vpf-star-mark", className)}
      aria-hidden
    />
  )
}
