import { Building2, ClipboardList, Globe2, Megaphone, Trophy, Users, type LucideIcon } from "lucide-react"
import { organization, type OrgIcon } from "../../data/organization.mock"
import { Container } from "../Container"
import { SectionHeading } from "../SectionHeading"

const icons: Record<OrgIcon, LucideIcon> = {
  building: Building2,
  clipboard: ClipboardList,
  trophy: Trophy,
  users: Users,
  globe: Globe2,
  megaphone: Megaphone,
}

export function OrganizationChart() {
  return (
    <section className="bg-paper" aria-labelledby="co-cau-tieu-de">
      <Container className="py-16 min-[1200px]:py-24">
        <SectionHeading
          id="co-cau-tieu-de"
          eyebrow={organization.eyebrow}
          title={organization.title}
          subtitle={organization.description}
        />
        <p className="-mt-4 mb-8 text-sm text-muted">{organization.note}</p>
        <div className="relative overflow-hidden rounded-2xl bg-white px-4 py-10 sm:px-8">
          <PickleballMark />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center">
            <p className="max-w-md rounded-xl bg-signal px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm sm:text-base">
              {organization.congress}
            </p>
            <span className="h-8 w-px bg-[#C9C9C6]" aria-hidden />
            <p className="rounded-xl bg-brand px-8 py-3.5 text-center text-sm font-semibold text-ink shadow-sm sm:text-base">
              {organization.board}
            </p>
            <span className="h-8 w-px bg-[#C9C9C6]" aria-hidden />

            <div className="hidden w-full min-[1200px]:block">
              <div className="relative h-px bg-[#C9C9C6]" style={{ marginInline: "8.333%" }} />
              <ul className="grid grid-cols-6">
                {organization.units.map((unit) => (
                  <li key={unit.id} className="flex flex-col items-center px-1.5">
                    <span className="h-6 w-px bg-[#C9C9C6]" aria-hidden />
                    <UnitCard title={unit.title} icon={unit.icon} />
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 min-[1200px]:hidden">
              {organization.units.map((unit) => (
                <li key={unit.id}>
                  <UnitCard title={unit.title} icon={unit.icon} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function UnitCard({ title, icon }: { title: string; icon: OrgIcon }) {
  const Icon = icons[icon]
  return (
    <div className="flex h-full w-full flex-col items-center rounded-xl border border-line bg-white px-3 py-4 text-center shadow-sm transition-colors duration-200 hover:border-brand motion-reduce:transition-none">
      <span className="grid size-10 place-items-center rounded-full bg-brand/15 text-brand">
        <Icon className="size-5" aria-hidden />
      </span>
      <p className="mt-3 text-sm font-semibold leading-snug text-ink">{title}</p>
    </div>
  )
}

function PickleballMark() {
  return (
    <svg viewBox="0 0 200 200" className="pointer-events-none absolute -right-8 top-6 w-56 text-ink/5" aria-hidden>
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeWidth="6" />
      <path d="M100 22v156M22 100h156M44 44l112 112M156 44 44 156" fill="none" stroke="currentColor" strokeWidth="4" />
    </svg>
  )
}
