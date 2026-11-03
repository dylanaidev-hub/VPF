export type OrgIcon = "building" | "clipboard" | "trophy" | "users" | "globe" | "megaphone"

export type OrgUnit = {
  id: string
  title: string
  icon: OrgIcon
}

export const organization = {
  eyebrow: "Cơ cấu tổ chức",
  title: "Sơ đồ bộ máy điều hành",
  description:
    "VPF hướng đến mô hình tổ chức hiệu quả, bảo đảm công tác quản lý, điều hành và phát triển phong trào Pickleball trên toàn quốc.",
  note: "Sơ đồ là mô hình minh họa, không phải cơ cấu đã được phê duyệt.",
  congress: "Đại hội Liên đoàn Pickleball Việt Nam",
  board: "Ban Chấp hành",
  units: [
    { id: "office", title: "Văn phòng Liên đoàn", icon: "building" },
    { id: "expertise", title: "Ban Chuyên môn", icon: "clipboard" },
    { id: "events", title: "Ban Tổ chức Giải đấu", icon: "trophy" },
    { id: "community", title: "Ban Phát triển Cộng đồng", icon: "users" },
    { id: "partnership", title: "Ban Đối ngoại & Hợp tác", icon: "globe" },
    { id: "media", title: "Ban Truyền thông", icon: "megaphone" },
  ] satisfies OrgUnit[],
}
