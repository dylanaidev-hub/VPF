import { federationContactInfo } from "./contact"

export const site = {
  name: "Liên đoàn Pickleball Việt Nam",
  shortName: "VPF",
  englishName: "Vietnam Pickleball Federation",
  term: "Nhiệm kỳ I (2026–2031)",
  email: federationContactInfo.email,
  emailLabel: federationContactInfo.email
    ? `Email liên hệ: ${federationContactInfo.email}`
    : "Email liên hệ: chưa công bố",
  hotline: federationContactInfo.phone ?? "Chưa công bố",
  contactNotice: federationContactInfo.demoNotice,
  intro:
    "Liên đoàn Pickleball Việt Nam là tổ chức xã hội – nghề nghiệp kết nối người chơi, câu lạc bộ, huấn luyện viên và trọng tài pickleball trên cả nước. Đoạn giới thiệu này là nội dung mẫu cho trang chủ.",
  offices: [
    {
      city: "Hà Nội",
      role: "Trụ sở chính",
      address:
        federationContactInfo.address ??
        "Địa chỉ sẽ được công bố khi Liên đoàn hoàn tất thủ tục trụ sở.",
    },
    {
      city: "TP. Hồ Chí Minh",
      role: "Văn phòng đại diện",
      address: "Địa chỉ sẽ được công bố khi văn phòng phía Nam đi vào hoạt động.",
    },
  ],
}

/** @deprecated Dùng federationContactInfo.socialLinks — giữ export để tương thích. */
export const socialChannels = federationContactInfo.socialLinks.map(({ id, label }) => ({
  id,
  label,
})) as ReadonlyArray<{ id: "facebook" | "youtube" | "instagram"; label: string }>
