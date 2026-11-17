import { useTranslation } from "../../i18n"
import { ChevronRight } from "lucide-react"

export function BrandCategoryItem({
  index,
  title,
  detail,
  pressed,
  onSelect,
}: {
  index: string
  title: string
  detail: string
  pressed?: boolean
  onSelect: () => void
}) {
  const { t } = useTranslation()
  return (
    <li>
      <button
        type="button"
        className="brand-category"
        aria-expanded={pressed}
        onClick={onSelect}
      >
        <span className="brand-category-index">{index}</span>
        <span className="brand-category-copy">
          <span className="brand-category-title">{t(title)}</span>
          <span className="brand-category-detail">{t(detail)}</span>
        </span>
        <ChevronRight className="brand-category-chevron" aria-hidden />
      </button>
    </li>
  )
}
