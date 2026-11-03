import { useEffect, useMemo } from "react"
import { MapPin } from "lucide-react"
import { tournaments } from "../data/tournaments"
import { formatEventDate } from "../lib/format"
import { sitePath } from "../lib/site"
import { statusLabel, tournamentSlugFromLocation, withStatus } from "../lib/tournaments"
import { Badge } from "../components/Badge"
import { Breadcrumb } from "../components/Breadcrumb"
import { SiteLayout } from "../components/SiteLayout"
import { TournamentDetailTabs } from "../components/tournaments/TournamentDetailTabs"

const tone = {
  upcoming: "upcoming",
  ongoing: "live",
  finished: "finished",
} as const

export function TournamentDetailPage() {
  const slug = tournamentSlugFromLocation()
  const tournament = useMemo(() => {
    if (!slug) return null
    return withStatus(tournaments).find((item) => item.slug === slug) ?? null
  }, [slug])

  useEffect(() => {
    if (!tournament) {
      document.title = "Không tìm thấy giải đấu – Liên đoàn Pickleball Việt Nam"
      return
    }
    document.title = `${tournament.name} – Liên đoàn Pickleball Việt Nam`
    document.querySelector('meta[name="description"]')?.setAttribute("content", tournament.description)
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
          <h1 className="mt-6 text-[2rem] font-bold tracking-tight text-ink">Không tìm thấy giải đấu</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Đường dẫn không khớp với giải nào trong dữ liệu minh họa.
          </p>
          <a
            href={sitePath("/giaidau.html")}
            className="mt-6 inline-flex min-h-12 items-center rounded-[10px] bg-brand px-5 text-[15px] font-medium text-ink"
          >
            Về hệ thống giải đấu
          </a>
        </article>
      </SiteLayout>
    )
  }

  const date = formatEventDate(tournament.startDate, tournament.endDate)

  return (
    <SiteLayout>
      <article className="bg-white">
        <header className="tournament-hero">
          <img
            src={sitePath(tournament.coverImage)}
            alt={tournament.coverImageAlt}
            width={1600}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/25" aria-hidden />
          <div className="page-wrap relative z-10 py-8 sm:py-10">
            <Breadcrumb
              tone="inverse"
              items={[
                { label: "Trang chủ", href: "/index.html" },
                { label: "Giải đấu", href: "/giaidau.html" },
                { label: tournament.name },
              ]}
            />
            <div className="mt-8 max-w-3xl">
              <Badge tone={tone[tournament.status]}>{statusLabel[tournament.status]}</Badge>
              <h1 className="mt-4 text-[2rem] font-bold leading-[1.12] tracking-tight text-white min-[1200px]:text-[2.75rem]">
                {tournament.name}
              </h1>
              <p className="mt-3 text-sm text-white/85 sm:text-base">
                <time dateTime={tournament.startDate}>{date.rangeLabel}</time>
                <span aria-hidden> · </span>
                {tournament.time}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/85 sm:text-base">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {tournament.venue}, {tournament.location}
              </p>
            </div>
          </div>
        </header>

        <div className="page-wrap">
          <p className="border-b border-line py-4 text-sm text-muted">{tournament.note}</p>
          <dl className="tournament-facts">
            <div>
              <dt>Thời gian</dt>
              <dd>
                {date.rangeLabel}
                <span className="mt-1 block">{tournament.time}</span>
              </dd>
            </div>
            <div>
              <dt>Địa điểm</dt>
              <dd>
                {tournament.venue}
                <span className="mt-1 block">{tournament.location}</span>
              </dd>
            </div>
            <div>
              <dt>Đơn vị tổ chức</dt>
              <dd>{tournament.organizer}</dd>
            </div>
            <div>
              <dt>Trạng thái</dt>
              <dd>{statusLabel[tournament.status]}</dd>
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
