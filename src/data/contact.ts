/**
 * Thông tin liên hệ Liên đoàn — nguồn dùng chung cho FedContact và Footer.
 * WordPress: options page / ACF options (address, phone, email, hours, map, social).
 */

export type ContactSocialId = "facebook" | "youtube" | "instagram"

export type ContactSocialLink = {
  id: ContactSocialId
  label: string
  /** null = chưa có URL chính thức — không tạo link giả. */
  href: string | null
}

export type FederationContactInfo = {
  address: string | null
  phone: string | null
  email: string | null
  workingHours: string | null
  mapEmbedUrl: string | null
  mapDirectionUrl: string | null
  mapTitle: string
  socialLinks: ContactSocialLink[]
  /** true = đang dùng dữ liệu demo để duyệt giao diện. */
  isDemo: boolean
  demoNotice: string
}

/** Bản demo — hiển thị đầy đủ mẫu. Production: đặt isDemo=false và chỉ điền trường đã công bố. */
export const federationContactInfo: FederationContactInfo = {
  isDemo: true,
  address: "123 Đường Minh Họa, Hà Nội, Việt Nam",
  phone: "0900 000 000",
  email: "contact@example.com",
  workingHours: "Thứ 2 – Thứ 6, 08:00 – 17:00",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=H%C3%A0%20N%E1%BB%99i%2C%20Vi%E1%BB%87t%20Nam&z=11&output=embed",
  /** Chỉ điền khi có địa chỉ/trụ sở chính thức. */
  mapDirectionUrl: null,
  mapTitle: "Bản đồ minh họa khu vực Hà Nội, không ghim trụ sở VPF",
  socialLinks: [
    { id: "facebook", label: "Facebook", href: null },
    { id: "youtube", label: "YouTube", href: null },
    { id: "instagram", label: "Instagram", href: null },
  ],
  demoNotice:
    "Thông tin liên hệ bên dưới là dữ liệu demo để duyệt giao diện — chưa phải thông tin chính thức của Liên đoàn.",
}

export const federationContactSection = {
  id: "lien-he",
  title: "Liên hệ Liên đoàn",
  description: "Kết nối với Liên đoàn Pickleball Việt Nam.",
} as const

/** Số điện thoại dùng cho `tel:` (bỏ khoảng trắng). */
export function phoneTelHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "")
  return digits ? `tel:${digits}` : undefined
}

/** Các trường đã có giá trị để hiển thị (ẩn trường trống khi production). */
export function visibleContactRows(info: FederationContactInfo) {
  if (!info.isDemo) {
    return {
      address: info.address,
      phone: info.phone,
      email: info.email,
      workingHours: info.workingHours,
    }
  }
  return {
    address: info.address,
    phone: info.phone,
    email: info.email,
    workingHours: info.workingHours,
  }
}
