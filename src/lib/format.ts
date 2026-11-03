const MONTHS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
]

export function parseIsoDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day)
}

export function formatViDate(iso: string) {
  const [year, month, day] = iso.split("-")
  return `${day}.${month}.${year}`
}

export function formatEventDate(startDate: string, endDate: string) {
  const start = parseIsoDate(startDate)
  const end = parseIsoDate(endDate)
  const sameDay = startDate === endDate
  const startDay = String(start.getDate()).padStart(2, "0")
  const endDay = String(end.getDate()).padStart(2, "0")

  return {
    day: sameDay ? startDay : `${startDay}–${endDay}`,
    month: MONTHS[start.getMonth()],
    year: String(start.getFullYear()),
    rangeLabel: sameDay
      ? `${startDay}.${String(start.getMonth() + 1).padStart(2, "0")}.${start.getFullYear()}`
      : `${formatViDate(startDate)} – ${formatViDate(endDate)}`,
  }
}

export function foldText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}
