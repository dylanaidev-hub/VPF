import { useEffect, useState } from "react"
import type { ImgHTMLAttributes } from "react"
import { sitePath } from "../lib/site"

const FALLBACK = "/images/match.jpg"

export function NewsImage({
  src,
  alt,
  className,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const [current, setCurrent] = useState(src)

  useEffect(() => {
    setCurrent(src)
  }, [src])

  return (
    <img
      {...rest}
      src={sitePath(current)}
      alt={alt}
      className={className}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK)
      }}
    />
  )
}
