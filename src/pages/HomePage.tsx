import { useTranslation } from "../i18n"
import { useState } from "react"
import { heroSlides } from "../data/hero"
import { liveArena } from "../data/live"
import { news } from "../data/news"
import { partners } from "../data/partners"
import { statistics } from "../data/stats"
import { tournaments } from "../data/tournaments"
import { formatViDate } from "../lib/format"
import { sitePath } from "../lib/site"
import type { NewsArticle } from "../types"
import { Dialog } from "../components/Dialog"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { HeroSlider } from "../components/HeroSlider"
import { LiveSection } from "../components/LiveSection"
import { NewsSection } from "../components/NewsSection"
import { PartnershipBanner } from "../components/PartnershipBanner"
import { PartnerMarquee } from "../components/PartnerMarquee"
import { StatsSection } from "../components/StatsSection"
import { UpcomingTournamentsSection } from "../components/UpcomingTournamentsSection"

export function HomePage() {
  const { t } = useTranslation()
  const [article, setArticle] = useState<NewsArticle | null>(null)

  return (
    <>
      <Header />
      <main id="noi-dung">
        <HeroSlider slides={heroSlides} suspended={article !== null} />
        <StatsSection items={statistics} />

        <LiveSection arena={liveArena} />

        <NewsSection articles={news} onOpen={setArticle} />

        <UpcomingTournamentsSection tournaments={tournaments} />

        <PartnershipBanner />
        <section aria-label={t("Logo đối tác")} className="border-b border-line bg-white py-8 md:py-10">
          <PartnerMarquee partners={partners} />
        </section>
      </main>
      <Footer />

      <Dialog open={article !== null} title={article?.title ?? "Tin tức"} onClose={() => setArticle(null)}>
        {article ? (
          <article>
            <img
              src={sitePath(article.image)}
              alt={t(article.imageAlt)}
              width={1600}
              height={1000}
              className={`mb-5 aspect-[16/9] w-full rounded-xl object-cover ${article.imagePosition ?? "object-center"}`}
            />
            <p className="text-[13px] font-medium text-signal">
              {t(article.category)}
              <span className="text-muted"> · </span>
              <time dateTime={article.date} className="text-muted">
                {formatViDate(article.date)}
              </time>
            </p>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{t(paragraph)}</p>
              ))}
            </div>
          </article>
        ) : null}
      </Dialog>
    </>
  )
}
