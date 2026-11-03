import { useState } from "react"
import { leadership, type Leader } from "../../data/leadership.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { Container } from "../Container"
import { Dialog } from "../Dialog"
import { SectionHeading } from "../SectionHeading"

export function LeadershipSection() {
  const [open, setOpen] = useState(false)
  const featured = leadership.leaders.find((leader) => leader.featured) ?? leadership.leaders[0]
  const others = leadership.leaders.filter((leader) => leader.id !== featured.id)

  return (
    <section className="bg-white" aria-labelledby="lanh-dao-tieu-de">
      <Container className="py-16 min-[1200px]:py-24">
        <SectionHeading
          id="lanh-dao-tieu-de"
          eyebrow={leadership.eyebrow}
          title={leadership.title}
          action={
            <button
              type="button"
              className="inline-flex min-h-12 items-center rounded-[10px] border border-line px-5 text-[15px] font-medium text-ink transition-colors duration-200 hover:border-brand hover:bg-brand"
              onClick={() => setOpen(true)}
            >
              {leadership.cta}
            </button>
          }
        />
        <p className="-mt-4 mb-8 text-sm text-muted">{leadership.note}</p>
        <ul className="about-leaders">
          <li>
            <LeaderCard leader={featured} featured />
          </li>
          {others.map((leader) => (
            <li key={leader.id}>
              <LeaderCard leader={leader} />
            </li>
          ))}
        </ul>
      </Container>

      <Dialog open={open} title={leadership.title} onClose={() => setOpen(false)}>
        <p className="text-sm leading-relaxed text-muted">{leadership.note}</p>
        <ul className="mt-5 divide-y divide-line">
          {leadership.leaders.map((leader) => (
            <li key={leader.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="font-semibold text-ink">{leader.name}</p>
                <p className="text-sm text-muted">{leader.position}</p>
              </div>
              {leader.responsibility ? <p className="text-sm text-ink">{leader.responsibility}</p> : null}
            </li>
          ))}
        </ul>
      </Dialog>
    </section>
  )
}

function LeaderCard({ leader, featured = false }: { leader: Leader; featured?: boolean }) {
  return (
    <article
      className={cx(
        "leader-card flex h-full flex-col overflow-hidden rounded-2xl transition duration-200 motion-reduce:transition-none",
        featured
          ? "bg-signal text-white"
          : "border border-line bg-white hover:-translate-y-0.5 hover:border-brand motion-reduce:hover:translate-y-0",
      )}
    >
      <div className={cx("relative min-h-48 flex-[2]", featured ? "bg-signal" : "bg-paper")}>
        {leader.image ? (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={sitePath(leader.image)}
              alt={leader.imageAlt}
              width={933}
              height={1400}
              loading="lazy"
              decoding="async"
              className="leader-photo h-full w-full object-cover"
              style={{ objectPosition: leader.objectPosition ?? "center 20%" }}
            />
          </div>
        ) : (
          <Silhouette light={featured} />
        )}
        {featured ? <span className="absolute -bottom-8 -right-8 size-28 rounded-full bg-brand" aria-hidden /> : null}
      </div>
      <div className="flex flex-[1] flex-col justify-end p-5">
        <h3 className={cx("font-bold", featured ? "text-2xl" : "text-base text-ink")}>{leader.name}</h3>
        <p className={cx("mt-1 text-sm", featured ? "text-white/80" : "text-muted")}>{leader.position}</p>
        {leader.responsibility ? <p className="mt-1 text-sm font-medium text-brand-strong">{leader.responsibility}</p> : null}
      </div>
    </article>
  )
}

function Silhouette({ light }: { light: boolean }) {
  const fill = light ? "#FFFFFF" : "#18232E"
  return (
    <svg viewBox="0 0 200 240" className="absolute inset-0 m-auto h-[78%] w-auto" aria-hidden>
      <circle cx="100" cy="86" r="36" fill={fill} opacity="0.92" />
      <path d="M38 228c8-58 34-86 62-86s54 28 62 86" fill={fill} opacity="0.92" />
    </svg>
  )
}
