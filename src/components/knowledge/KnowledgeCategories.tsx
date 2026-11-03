import { BookOpen, Flag, GraduationCap, Users, type LucideIcon } from "lucide-react"
import { cx } from "../../lib/cx"
import { useReveal } from "../../lib/useReveal"

const categories: { title: string; description: string; href: string; icon: LucideIcon }[] = [
  {
    title: "Luật thi đấu",
    description: "Tìm hiểu quy tắc, thể thức và những kiến thức cần biết khi tham gia Pickleball.",
    href: "#kien-thuc",
    icon: BookOpen,
  },
  {
    title: "Đào tạo",
    description: "Khám phá chương trình đào tạo và phát triển kỹ năng dành cho người chơi.",
    href: "#dao-tao",
    icon: GraduationCap,
  },
  {
    title: "Trọng tài",
    description: "Kiến thức, quy trình và nghiệp vụ điều hành các trận đấu Pickleball.",
    href: "#chuong-trinh-trong-tai",
    icon: Flag,
  },
  {
    title: "Huấn luyện viên",
    description: "Phương pháp huấn luyện và phát triển vận động viên ở nhiều cấp độ.",
    href: "#chuong-trinh-hlv",
    icon: Users,
  },
]

export function KnowledgeCategories() {
  const { ref, shown } = useReveal<HTMLUListElement>()

  return (
    <section id="kham-pha" className="bg-paper py-14 md:py-16">
      <div className="page-wrap">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Khám phá chuyên môn</h2>
        <ul ref={ref} className="knowledge-categories mt-8">
          {categories.map((item, index) => {
            const Icon = item.icon
            return (
              <li
                key={item.title}
                className={cx("knowledge-rise h-full", shown && "is-in")}
                style={{ transitionDelay: shown ? `${index * 80}ms` : undefined }}
              >
                <a href={item.href} className="knowledge-category flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                  <Icon className="size-8 text-brand" aria-hidden />
                  <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
