import { setPageMetadata, useTranslation } from "../i18n"
import { useEffect, useMemo } from "react"
import { tournaments } from "../data/tournaments"
import { formatEventDate } from "../lib/format"
import { selectRelatedFromCatalog } from "../lib/tournamentDetail"
import { sitePath } from "../lib/site"
import { statusLabel, tournamentSlugFromLocation, withStatus } from "../lib/tournaments"
import { Badge } from "../components/Badge"
import { Breadcrumb } from "../components/Breadcrumb"
import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { TournamentHighlights } from "../components/tournaments/detail/TournamentHighlights"
import { TournamentRelated } from "../components/tournaments/detail/TournamentRelated"
import { TournamentDetailTabs } from "../components/tournaments/TournamentDetailTabs"
import "../components/tournaments/tournament-detail.css"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

export function TournamentDetailPage() {
  const { t } = useTranslation()
  const slug = tournamentSlugFromLocation()
  const tournament = useMemo(() => {
    if (!slug) return null
    return withStatus(tournaments).find((item) => item.slug === slug) ?? null
  }, [slug])

  const related = useMemo(
    () => (tournament ? selectRelatedFromCatalog(tournament, tournaments, 3) : []),
    [tournament],
  )

  useEffect(() => {
    if (!tournament) {
      setPageMetadata("Không tìm thấy giải đấu – Liên đoàn Pickleball Việt Nam")
      return
    }
    setPageMetadata(`${tournament.name} – Liên đoàn Pickleball Việt Nam`, tournament.description)
  }, [tournament])

  if (!tournament) {
    return (
      <SiteLayout>
        <article className="page-wrap py-14">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/index.html" },
              { label: "Giải đấu", href: "/giaidau.html" },
              { label: "Không tìm thấy" },
            ]}
          />
          <h1 className="mt-6 text-[2rem] font-bold tracking-tight text-ink">{t("Không tìm thấy giải đấu")}</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            {t("Đường dẫn không khớp với giải nào trên hệ thống.")}
          </p>
          <a
            href={sitePath("/giaidau.html")}
            className="mt-6 inline-flex min-h-12 items-center rounded-[10px] bg-brand px-5 text-[15px] font-medium text-ink"
          >
            {t("Về hệ thống giải đấu")}
          </a>
        </article>
      </SiteLayout>
    )
  }

  const date = formatEventDate(tournament.startDate, tournament.endDate)
  const place =
    tournament.scope === "international" && tournament.country
      ? `${tournament.location}, ${tournament.country}`
      : t(tournament.location)
  const heroDescription = `${date.rangeLabel} · ${place}`

  return (
    <SiteLayout>
      <article className="td-page">
        <PageHero
          variant="detail"
          title={tournament.name}
          titleId="giai-dau-chi-tiet-tieu-de"
          description={heroDescription}
          breadcrumbs={[
            { label: "Trang chủ", href: "/index.html" },
            { label: "Giải đấu", href: "/giaidau.html" },
            { label: tournament.name },
          ]}
          beforeTitle={
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                tone={tone[tournament.status]}
                className={tournament.status === "ongoing" ? "bg-white text-signal" : undefined}
              >
                {t(statusLabel[tournament.status])}
              </Badge>
              {tournament.illustrative ? (
                <Badge tone="important" className="bg-white/15 text-white">
                  {t("Dữ liệu minh họa")}
                </Badge>
              ) : null}
            </div>
          }
        />
        <div className="page-wrap td-shell">
          <p className="td-note">{t(tournament.note)}</p>
          <TournamentHighlights tournament={tournament} />
          <TournamentDetailTabs tournament={tournament} />
          <TournamentRelated items={related} />
        </div>
      </article>
    </SiteLayout>
  )
}
