import { useEffect } from "react"

export function useFragmentScroll() {
  useEffect(() => {
    // The destination is rendered by React after the browser first reads the fragment.
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ block: "start", behavior: "instant" })
  }, [])
}
