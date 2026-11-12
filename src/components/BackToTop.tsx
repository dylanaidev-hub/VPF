import { useEffect, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"
import { useModalPresence } from "../lib/modalPresence"

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const modalOpen = useModalPresence()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const shown = visible && !modalOpen

  useEffect(() => {
    const update = () => {
      const canScroll = document.documentElement.scrollHeight > window.innerHeight + 1
      const next = canScroll && window.scrollY > 400
      setVisible(next)
      if ((!next || modalOpen) && document.activeElement === buttonRef.current) {
        buttonRef.current?.blur()
      }
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [modalOpen])

  useEffect(() => {
    if (modalOpen && document.activeElement === buttonRef.current) {
      buttonRef.current?.blur()
    }
  }, [modalOpen])

  return (
    <button
      ref={buttonRef}
      type="button"
      className={shown ? "back-top is-on" : "back-top"}
      aria-label="Cuộn lên đầu trang"
      aria-hidden={shown ? undefined : true}
      tabIndex={shown ? 0 : -1}
      disabled={modalOpen}
      onClick={() => {
        if (modalOpen) return
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
