import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "./useReducedMotion"

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduce) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: 0.18 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce])

  return { ref, shown }
}
