import { useEffect, useState } from "react"

export function useReveal<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!node) return
    const mark = () => setShown(true)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mark()
      return
    }
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0) mark()
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) mark()
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node])

  return { ref: setNode, shown }
}
