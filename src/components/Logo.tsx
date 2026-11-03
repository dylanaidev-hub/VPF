import { cx } from "../lib/cx"
import { sitePath } from "../lib/site"

export function Logo({
  variant = "color",
  className,
}: {
  variant?: "color" | "white"
  className?: string
}) {
  const src =
    variant === "white"
      ? "/brand/logo-horizontal-white.svg"
      : "/brand/logo-horizontal-color.svg"

  return (
    <img
      src={sitePath(src)}
      alt="Liên đoàn Pickleball Việt Nam"
      width={588}
      height={219}
      className={cx("h-11 w-auto", className)}
    />
  )
}
