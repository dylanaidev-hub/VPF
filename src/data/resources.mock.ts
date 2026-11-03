/**
 * Tài liệu chuyên môn minh họa.
 * Khi chuyển WordPress: Custom Post Type `resource`, tệp nằm trong Media Library.
 * Không có file tải về trong bản demo này.
 */
export const resourceCategories = ["Tất cả", "Luật thi đấu", "Đào tạo", "Trọng tài", "Huấn luyện viên"] as const

export type ResourceCategory = (typeof resourceCategories)[number]

export type ResourceDocument = {
  id: string
  slug: string
  title: string
  category: Exclude<ResourceCategory, "Tất cả">
  fileType: string
  updatedAt: string
  summary: string
  /** Chỉ gán khi tệp thật đã được đăng. */
  fileHref?: string
  illustrative: true
}

export const resources: ResourceDocument[] = [
  {
    id: "tong-quan-luat",
    slug: "tong-quan-luat-pickleball-danh-cho-nguoi-moi",
    title: "Tổng quan luật Pickleball dành cho người mới",
    category: "Luật thi đấu",
    fileType: "PDF",
    updatedAt: "2026-09-02",
    summary:
      "Bản tóm tắt minh họa về sân, lưới, giao bóng và lỗi thường gặp. Chưa có tệp PDF chính thức để tải.",
    illustrative: true,
  },
  {
    id: "tinh-diem",
    slug: "huong-dan-cach-tinh-diem",
    title: "Hướng dẫn cách tính điểm",
    category: "Luật thi đấu",
    fileType: "PDF",
    updatedAt: "2026-09-18",
    summary:
      "Bản tóm tắt minh họa: chỉ bên giao bóng ghi điểm, và quyền giao đổi khi có lỗi. Không phải bảng luật chính thức.",
    illustrative: true,
  },
  {
    id: "dieu-hanh",
    slug: "quy-trinh-dieu-hanh-tran-dau",
    title: "Quy trình điều hành trận đấu",
    category: "Trọng tài",
    fileType: "PDF",
    updatedAt: "2026-10-01",
    summary:
      "Các bước minh họa trước trận, trong trận và sau trận. Dùng để xem giao diện thư viện, chưa phải quy trình ban hành.",
    illustrative: true,
  },
  {
    id: "giao-bong",
    slug: "ky-thuat-giao-bong-co-ban",
    title: "Kỹ thuật giao bóng cơ bản",
    category: "Đào tạo",
    fileType: "PDF",
    updatedAt: "2026-10-12",
    summary:
      "Mô tả minh họa tư thế giao dưới tay và hướng bóng qua lưới. Không phải giáo án kỹ thuật chính thức.",
    illustrative: true,
  },
  {
    id: "to-chuc-buoi-tap",
    slug: "phuong-phap-to-chuc-buoi-tap-pickleball",
    title: "Phương pháp tổ chức buổi tập Pickleball",
    category: "Huấn luyện viên",
    fileType: "PDF",
    updatedAt: "2026-10-20",
    summary:
      "Gợi ý minh họa cách chia nhóm, thời lượng và vòng tập. Chưa có tài liệu phát hành để tải về.",
    illustrative: true,
  },
]
