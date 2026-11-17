import { useCallback, useSyncExternalStore } from "react"
import { en } from "./en"
import { vi } from "./vi"

export type Language = "vi" | "en"
type Values = Record<string, string | number>
const storageKey = "vpf-language"
const vietnamese: Readonly<Record<string, string>> = vi
const listeners = new Set<() => void>()

function readLanguage(): Language {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(storageKey) === "en" ? "en" : "vi"
  } catch {
    return "vi"
  }
}

let language = readLanguage()
let sourceTitle = typeof document === "undefined" ? "" : document.title
let sourceDescription = typeof document === "undefined" ? undefined :
  document.querySelector('meta[name="description"]')?.getAttribute("content") ?? undefined

function applyDocumentLanguage() {
  if (typeof document === "undefined") return
  document.documentElement.lang = language
  document.title = sourceTitle.split(" – ").map((part) => translate(part, language)).join(" – ")
  if (sourceDescription) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(sourceDescription, language))
  }
}

applyDocumentLanguage()

export function setPageMetadata(title: string, description = sourceDescription) {
  sourceTitle = title
  sourceDescription = description
  applyDocumentLanguage()
}

export function getCurrentLanguage() {
  return language
}

function applyLanguage(next: Language) {
  if (next === language) return
  language = next
  applyDocumentLanguage()
  listeners.forEach((listener) => listener())
}

export function setLanguage(next: Language) {
  try {
    window.localStorage.setItem(storageKey, next)
  } catch {
    // Language switching remains available during this visit when storage is blocked.
  }
  applyLanguage(next)
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) applyLanguage(readLanguage())
  })
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) applyLanguage(readLanguage())
  })
}

export function translate(key: string, locale: Language, values?: Values) {
  const source = Object.hasOwn(vietnamese, key) ? vietnamese[key] : key
  const message = locale === "en" && Object.hasOwn(en, key) ? en[key] : source
  return values ? message.replace(/\{(\w+)\}/g, (token, name: string) => String(values[name] ?? token)) : message
}

export function t(key: string, values?: Values) {
  return translate(key, getCurrentLanguage(), values)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export function useTranslation() {
  const current = useSyncExternalStore(subscribe, getCurrentLanguage, () => "vi" as const)
  const translateCurrent = useCallback((key: string, values?: Values) => translate(key, current, values), [current])
  return {
    language: current,
    t: translateCurrent,
  }
}
