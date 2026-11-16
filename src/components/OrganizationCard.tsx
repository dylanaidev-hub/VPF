import { SportsProfileCard } from "./SportsProfileCard"

export function OrganizationCard({
  name,
  location,
  logo,
  onOpen,
  href,
}: {
  name: string
  location: string
  logo: string
  onOpen?: () => void
  href?: string
}) {
  return (
    <SportsProfileCard
      variant="organization"
      name={name}
      image={logo}
      rows={[{ icon: "pin", text: location }]}
      onOpen={onOpen}
      profileUrl={href}
    />
  )
}
