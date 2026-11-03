import { communityActivities } from "../../data/communityActivities.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"

export function CommunityActivities() {
  const featured = communityActivities.find((item) => item.featured) ?? communityActivities[0]
  const others = communityActivities.filter((item) => item.id !== featured.id)
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section className="page-wrap py-14 md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Hoạt động cộng đồng</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Hoạt động minh họa, chưa phải lịch sinh hoạt của Liên đoàn.
        </p>
      <div ref={ref} className="community-activities mt-8">
        <article className={cx("community-rise community-activity-main overflow-hidden rounded-2xl border border-line bg-white", shown && "is-in")}>
          <div className="overflow-hidden">
            <img
              src={sitePath(featured.image)}
              alt={featured.imageAlt}
              width={1600}
              height={1000}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold leading-snug text-ink md:text-3xl">{featured.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{featured.description}</p>
          </div>
        </article>
        <div className="community-activity-side">
          {others.map((activity, index) => (
            <article
              key={activity.id}
              className={cx("community-rise overflow-hidden rounded-2xl border border-line bg-white", shown && "is-in")}
              style={{ transitionDelay: shown ? `${(index + 1) * 90}ms` : undefined }}
            >
              <div className="overflow-hidden">
                <img
                  src={sitePath(activity.image)}
                  alt={activity.imageAlt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug text-ink">{activity.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{activity.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
