import { publishedPdf } from "../components/DocumentCard"
import { technicalDocuments } from "./technicalResources"
import { demoTrainingCourses, trainingCourses } from "./trainingSchedule"

// Set VITE_TECHNICAL_DEMO_MODE=false at build time for the official library.
const isDemoMode = (import.meta.env.VITE_TECHNICAL_DEMO_MODE ?? "true") === "true"

export const visibleCourses = isDemoMode && !trainingCourses.length ? demoTrainingCourses : trainingCourses
export const visibleDocuments = technicalDocuments.flatMap((document) => {
  const pdf = publishedPdf(document.pdf) || undefined
  return isDemoMode || pdf ? [{ ...document, pdf }] : []
})
