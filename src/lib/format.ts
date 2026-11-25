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
  const sameMonth = start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()
  const sameYear = start.getFullYear() === end.getFullYear()
  const startDay = String(start.getDate()).padStart(2, "0")
  const endDay = String(end.getDate()).padStart(2, "0")
  const startMonth = MONTHS[start.getMonth()]
  const endMonth = MONTHS[end.getMonth()]
  const startYear = String(start.getFullYear())
  const endYear = String(end.getFullYear())

  let monthLine: string
  if (sameMonth) {
    monthLine = `${startMonth} · ${startYear}`
  } else if (sameYear) {
    monthLine = `${startMonth}–${endMonth} · ${startYear}`
  } else {
    monthLine = `${startMonth} ${startYear} – ${endMonth} ${endYear}`
  }

  return {
    day: sameDay ? startDay : `${startDay}–${endDay}`,
    month: startMonth,
    year: startYear,
    monthLine,
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
