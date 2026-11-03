import type { NavItem } from "../types"

/**
 * Dropdown chỉ khi có từ 2 mục con.
 * Một mục con thì menu cha trỏ thẳng tới URL đó và giữ tên menu cha.
 */
export function presentNavItem(item: NavItem): NavItem {
  const children = item.children ?? []
  if (children.length === 1) {
    return { id: item.id, label: item.label, href: children[0].href }
  }
  if (children.length < 2) {
    return { id: item.id, label: item.label, href: item.href }
  }
  return item
}

export const navigation: NavItem[] = [
  { id: "home", label: "Trang chủ", href: "/index.html" },
  {
    id: "federation",
    label: "Liên đoàn",
    href: "/liendoan.html",
    children: [{ id: "about", label: "Về Liên đoàn", href: "/liendoan.html" }],
  },
  { id: "news", label: "Tin tức", href: "/tintuc.html" },
  { id: "tournaments", label: "Giải đấu", href: "/giaidau.html" },
  {
    id: "expertise",
    label: "Chuyên môn",
    href: "/chuyenmon.html",
    children: [{ id: "framework", label: "Khung chuyên môn", href: "/chuyenmon.html" }],
  },
  {
    id: "community",
    label: "Cộng đồng",
    href: "/congdong.html",
    children: [{ id: "members", label: "Hội viên và câu lạc bộ", href: "/congdong.html" }],
  },
  { id: "media", label: "Media", href: "/media.html" },
  { id: "partners", label: "Hợp tác", href: "/hoptac.html" },
]
