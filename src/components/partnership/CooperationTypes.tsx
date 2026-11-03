import { cooperationTypes } from "../../data/partnership.mock"

export function CooperationTypes() {
  return (
    <section className="page-wrap py-14 md:py-16" aria-labelledby="hinh-thuc-hop-tac">
      <h2 id="hinh-thuc-hop-tac" className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Các hình thức hợp tác
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Các hướng làm việc để bắt đầu trao đổi. Chưa có gói tài trợ, mức phí hoặc quyền lợi được công bố.
      </p>
      <ol className="mt-8">
        {cooperationTypes.map((item, index) => (
          <li key={item.id} className="partnership-type">
            <span className="partnership-type-index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
