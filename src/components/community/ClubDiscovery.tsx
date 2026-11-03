import { useMemo, useState } from "react"
import { ArrowRight, Search, X } from "lucide-react"
import { clubCities, clubKinds, clubs, type Club, type ClubKind } from "../../data/clubs.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { foldText } from "../../lib/format"
import { useReveal } from "../../lib/useReveal"
import { Dialog } from "../Dialog"

function fold(value: string) {
  return foldText(value).replace(/đ/g, "d")
}

type ClubDiscoveryProps = {
  query: string
  city: string
  kind: ClubKind
  onQuery: (value: string) => void
  onCity: (value: string) => void
  onKind: (value: ClubKind) => void
  onReset: () => void
}

export function ClubDiscovery({ query, city, kind, onQuery, onCity, onKind, onReset }: ClubDiscoveryProps) {
  const [open, setOpen] = useState<Club | null>(null)
  const { ref, shown } = useReveal<HTMLUListElement>()
  const visible = useMemo(() => {
    const q = fold(query.trim())
    return clubs.filter((club) => {
      if (city !== "Tất cả" && club.city !== city) return false
      if (kind !== "Tất cả" && club.kind !== kind) return false
      if (!q) return true
      return fold(`${club.name} ${club.city} ${club.kind} ${club.searchText}`).includes(q)
    })
  }, [query, city, kind])

  return (
    <section id="tim-cau-lac-bo" className="page-wrap py-14 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Tìm câu lạc bộ phù hợp với bạn</h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Khám phá các câu lạc bộ Pickleball theo khu vực và nhu cầu tham gia.
      </p>
      <p className="mt-2 text-sm text-muted">Tên câu lạc bộ là dữ liệu minh họa, chưa phải danh sách được VPF công nhận.</p>

      <form className="community-filters mt-8" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="relative block min-w-0">
          <span className="sr-only">Tìm tên câu lạc bộ</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Tìm tên câu lạc bộ..."
            className="h-12 w-full rounded-[10px] border border-line bg-white pr-11 pl-10 text-[15px] text-ink"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQuery("")}
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-ink"
              aria-label="Xóa từ khóa"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </label>
        <label className="block min-w-0">
          <span className="sr-only">Tỉnh hoặc thành phố</span>
          <select
            value={city}
            onChange={(event) => onCity(event.target.value)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            {clubCities.map((item) => (
              <option key={item} value={item}>
                {item === "Tất cả" ? "Tất cả tỉnh / thành phố" : item}
              </option>
            ))}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="sr-only">Loại hình câu lạc bộ</span>
          <select
            value={kind}
            onChange={(event) => onKind(event.target.value as ClubKind)}
            className="h-12 w-full rounded-[10px] border border-line bg-white px-3 text-[15px] text-ink"
          >
            {clubKinds.map((item) => (
              <option key={item} value={item}>
                {item === "Tất cả" ? "Tất cả loại hình" : item}
              </option>
            ))}
          </select>
        </label>
      </form>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {visible.length} câu lạc bộ
      </p>

      {visible.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-line bg-paper px-5 py-10 text-center">
          <p className="text-base font-medium text-ink">Không tìm thấy câu lạc bộ phù hợp.</p>
          <button type="button" className="mt-4 text-sm font-semibold text-ink underline" onClick={onReset}>
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <ul ref={ref} className="community-clubs mt-4">
          {visible.map((club, index) => (
            <li
              key={club.id}
              className={cx("community-rise", shown && "is-in")}
              style={{ transitionDelay: shown ? `${index * 70}ms` : undefined }}
            >
              <article className="h-full">
                <button
                  type="button"
                  onClick={() => setOpen(club)}
                  className="community-club group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left"
                >
                  <div className="overflow-hidden">
                    <img
                      src={sitePath(club.image)}
                      alt={club.imageAlt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      className="community-card-image aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[13px] font-semibold text-brand-strong">
                      {club.city}
                      <span className="font-medium text-muted"> · {club.kind}</span>
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-ink">{club.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{club.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      Xem thông tin
                      <ArrowRight className="size-4 text-brand" aria-hidden />
                    </span>
                  </div>
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open !== null} title={open?.name ?? "Câu lạc bộ"} onClose={() => setOpen(null)}>
        {open ? (
          <div>
            <img
              src={sitePath(open.image)}
              alt=""
              width={1600}
              height={1000}
              className="mb-5 aspect-[16/9] w-full rounded-xl object-cover"
            />
            <p className="text-sm font-medium text-ink">
              {open.city} · {open.kind}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">{open.description}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">{open.focus}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{open.rhythm}</p>
            <p className="mt-4 text-sm font-medium text-ink">
              Tên minh họa, chưa phải câu lạc bộ được VPF công nhận. Chưa mở đăng ký tham gia.
            </p>
          </div>
        ) : null}
      </Dialog>
    </section>
  )
}
