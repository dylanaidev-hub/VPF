import { useEffect, useState } from "react"

type Listener = (count: number) => void

let openCount = 0
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((listener) => listener(openCount))
}

/** Registers an open modal for its lifetime. Safe with overlapping modals. */
export function acquireModalPresence() {
  openCount += 1
  emit()
  return () => {
    openCount = Math.max(0, openCount - 1)
    emit()
  }
}

export function subscribeModalPresence(listener: Listener) {
  listeners.add(listener)
  listener(openCount)
  return () => {
    listeners.delete(listener)
  }
}

export function useModalPresence() {
  const [open, setOpen] = useState(() => openCount > 0)

  useEffect(() => subscribeModalPresence((count) => setOpen(count > 0)), [])

  return open
}

/** Call from modal components while `open` is true. */
export function useRegisterModalPresence(open: boolean) {
  useEffect(() => {
    if (!open) return
    return acquireModalPresence()
  }, [open])
}
