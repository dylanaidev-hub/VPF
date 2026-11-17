import { useTranslation } from "../i18n"
import { heroSlides } from "../data/hero"
import { liveArena } from "../data/live"
import { news } from "../data/news"
import { partners } from "../data/partners"
import { statistics } from "../data/stats"
import { tournaments } from "../data/tournaments"
import { HeroSlider } from "../components/HeroSlider"
import { LiveSection } from "../components/LiveSection"
import { NewsSection } from "../components/NewsSection"
import { PartnershipBanner } from "../components/PartnershipBanner"
import { PartnerMarquee } from "../components/PartnerMarquee"
import { SiteLayout } from "../components/SiteLayout"
import { StatsSection } from "../components/StatsSection"
import { UpcomingTournamentsSection } from "../components/UpcomingTournamentsSection"

export function HomePage() {
  const { t } = useTranslation()

  return (
    <SiteLayout>
      <HeroSlider slides={heroSlides} />
      <StatsSection items={statistics} />

      <LiveSection arena={liveArena} />

      <NewsSection articles={news} />

      <UpcomingTournamentsSection tournaments={tournaments} />

      <PartnershipBanner />
      <section aria-label={t("Logo đối tác")} className="border-b border-line bg-white py-8 md:py-10">
        <PartnerMarquee partners={partners} />
      </section>
    </SiteLayout>
  )
}
