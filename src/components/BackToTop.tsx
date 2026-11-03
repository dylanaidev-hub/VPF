import { useEffect, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => {
      const canScroll = document.documentElement.scrollHeight > window.innerHeight + 1
      const next = canScroll && window.scrollY > 400
      setVisible(next)
      if (!next && document.activeElement === buttonRef.current) buttonRef.current?.blur()
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      type="button"
      className={visible ? "back-top is-on" : "back-top"}
      aria-label="Cuộn lên đầu trang"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({
          top: 0,
          behavior: reduce ? "instant" : "smooth",
        })
      }}
    >
      <ArrowUp className="back-top-icon" aria-hidden />
    </button>
  )
}
