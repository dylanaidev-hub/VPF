import { setPageMetadata, useTranslation } from "../i18n"
import { useEffect, useMemo } from "react"
import { MapPin } from "lucide-react"
import { tournaments } from "../data/tournaments"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { statusLabel, tournamentSlugFromLocation, withStatus } from "../lib/tournaments"
import { Badge } from "../components/Badge"
import { Breadcrumb } from "../components/Breadcrumb"
import { PageHero } from "../components/PageHero"
import { SiteLayout } from "../components/SiteLayout"
import { TournamentDetailTabs } from "../components/tournaments/TournamentDetailTabs"

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

  return (
    <SiteLayout>
      <article className="bg-white">
        <PageHero
          variant="detail"
          title={tournament.name}
          breadcrumbs={[
            { label: "Trang chủ", href: "/index.html" },
            { label: "Giải đấu", href: "/giaidau.html" },
            { label: tournament.name },
          ]}
          beforeTitle={
            <Badge
              tone={tone[tournament.status]}
              className={tournament.status === "ongoing" ? "bg-white text-signal" : undefined}
            >
              {t(statusLabel[tournament.status])}
            </Badge>
          }
        >
          <p className="mt-3 text-sm text-white/85 sm:text-base">
            <time dateTime={tournament.startDate}>{date.rangeLabel}</time>
            <span aria-hidden> · </span>
            {tournament.time}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/85 sm:text-base">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {tournament.venue}, {t(tournament.location)}
          </p>
        </PageHero>

        <div className="page-wrap">
          <p className="border-b border-line py-4 text-sm text-muted">{t(tournament.note)}</p>
          <dl className="tournament-facts">
            <div>
              <dt>{t("Thời gian")}</dt>
              <dd>
                {date.rangeLabel}
                <span className="mt-1 block">{tournament.time}</span>
              </dd>
            </div>
            <div>
              <dt>{t("Địa điểm")}</dt>
              <dd>
                {tournament.venue}
                <span className="mt-1 block">{t(tournament.location)}</span>
              </dd>
            </div>
            <div>
              <dt>{t("Đơn vị tổ chức")}</dt>
              <dd>{tournament.organizer}</dd>
            </div>
            <div>
              <dt>{t("Trạng thái")}</dt>
              <dd>{t(statusLabel[tournament.status])}</dd>
            </div>
          </dl>
          <div className="py-8 min-[1200px]:py-10">
            <TournamentDetailTabs tournament={tournament} />
          </div>
        </div>
      </article>
    </SiteLayout>
  )
}
