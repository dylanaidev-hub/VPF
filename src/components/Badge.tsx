import type { ReactNode } from "react"
import { cx } from "../lib/cx"

type Tone = "neutral" | "upcoming" | "live" | "finished" | "important"

const tones: Record<Tone, string> = {
  neutral: "bg-white text-ink",
  upcoming: "bg-brand text-ink",
  live: "bg-signal text-white",
  finished: "border border-line bg-paper text-muted",
  important: "bg-white text-signal",
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md px-2.5 py-1 text-[12px] font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
