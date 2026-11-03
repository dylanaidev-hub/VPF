import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { cx } from "../lib/cx"
import { sitePath } from "../lib/site"

type Variant = "primary" | "outline" | "text"

type Common = {
  variant?: Variant
  className?: string
  children: ReactNode
}

type ButtonProps = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type LinkProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string
  }

const variants: Record<Variant, string> = {
  primary:
    "min-h-12 rounded-[10px] bg-brand px-5 text-[15px] text-ink hover:bg-[#de8414] focus-visible:outline-ink",
  outline:
    "min-h-12 rounded-[10px] border border-white/85 bg-transparent px-5 text-[15px] text-white hover:bg-white hover:text-ink",
  text: "text-sm text-ink hover:text-brand-strong",
}

function classes(variant: Variant, className?: string) {
  return cx(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors",
    variants[variant],
    className,
  )
}

function isLink(props: ButtonProps | LinkProps): props is LinkProps {
  return typeof props.href === "string"
}

export function Button(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary"
  if (isLink(props)) {
    const { href, className, children, ...rest } = props
    delete rest.variant
    return (
      <a href={sitePath(href)} className={classes(variant, className)} {...rest}>
        {children}
      </a>
    )
  }

  const { className, children, type = "button", ...rest } = props
  delete rest.variant
  return (
    <button type={type} className={classes(variant, className)} {...rest}>
      {children}
    </button>
  )
}
