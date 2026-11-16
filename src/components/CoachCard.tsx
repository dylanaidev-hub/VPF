import type { Coach } from "../data/coaches.mock"
import { SportsProfileCard, type SportsProfileHighlight, type SportsProfileRow } from "./SportsProfileCard"

export function CoachCard({
  coach,
  variant = "default",
  onOpen,
}: {
  coach: Coach
  variant?: "default" | "compact"
  onOpen?: () => void
}) {
  const compact = variant === "compact"
  const specialties = (coach.specialties ?? []).filter(Boolean).join(" · ")
  const rows: SportsProfileRow[] = []

  if (coach.organization) rows.push({ icon: "users", text: `Đơn vị: ${coach.organization}` })
  if (!compact && coach.location) rows.push({ icon: "pin", text: `Địa phương: ${coach.location}` })
  if (coach.certification) rows.push({ icon: "cap", text: `Chứng chỉ: ${coach.certification}` })
  if (!compact && specialties) rows.push({ icon: "focus", text: `Chuyên môn: ${specialties}` })

  const highlight: SportsProfileHighlight | undefined = compact
    ? undefined
    : coach.achievement
      ? { title: "Thành tích huấn luyện", description: coach.achievement, icon: "trophy" }
      : coach.experience
        ? { title: "Kinh nghiệm huấn luyện", description: coach.experience, icon: "experience" }
        : undefined

  return (
    <SportsProfileCard
      name={coach.name}
      image={coach.image}
      code={coach.coachCode ? `Mã HLV: ${coach.coachCode}` : undefined}
      rows={rows}
      highlight={highlight}
      variant={variant}
      onOpen={onOpen}
      profileUrl={coach.profileUrl}
    />
  )
}
