import { partnershipBenefits } from "../../data/partnership.mock"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"

export function PartnershipBenefits() {
  const { ref, shown } = useReveal<HTMLUListElement>()

  return (
    <section className="bg-paper py-14 md:py-16" aria-labelledby="gia-tri-hop-tac">
      <div className="page-wrap">
        <h2 id="gia-tri-hop-tac" className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Giá trị của sự đồng hành
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Bốn hướng giá trị để trao đổi. Phạm vi cụ thể chỉ có sau khi hai bên thỏa thuận.
        </p>
        <ul ref={ref} className="partnership-benefits mt-8">
          {partnershipBenefits.map((item, index) => {
            const Icon = item.icon
            return (
              <li
                key={item.id}
                className={cx("partnership-benefit partnership-rise", shown && "is-in")}
                style={{ transitionDelay: shown ? `${index * 70}ms` : undefined }}
              >
                <span className="partnership-benefit-icon" aria-hidden>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
