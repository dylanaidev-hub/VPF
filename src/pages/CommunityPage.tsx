import { useState } from "react"
import { ClubDiscovery } from "../components/community/ClubDiscovery"
import { CommunityActivities } from "../components/community/CommunityActivities"
import { CommunityCTA } from "../components/community/CommunityCTA"
import { CommunityHero } from "../components/community/CommunityHero"
import { CommunityNetwork } from "../components/community/CommunityNetwork"
import { CommunityStats } from "../components/community/CommunityStats"
import { SiteLayout } from "../components/SiteLayout"
import type { ClubKind } from "../data/clubs.mock"

export function CommunityPage() {
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("Tất cả")
  const [kind, setKind] = useState<ClubKind>("Tất cả")

  return (
    <SiteLayout>
      <CommunityHero />
      <CommunityStats />
      <ClubDiscovery
        query={query}
        city={city}
        kind={kind}
        onQuery={setQuery}
        onCity={setCity}
        onKind={setKind}
        onReset={() => {
          setQuery("")
          setCity("Tất cả")
          setKind("Tất cả")
        }}
      />
      <CommunityNetwork city={city} onCity={setCity} />
      <CommunityActivities />
      <CommunityCTA />
    </SiteLayout>
  )
}
