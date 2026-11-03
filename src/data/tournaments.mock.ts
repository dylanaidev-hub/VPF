import { tournamentPath } from "../lib/tournaments"
import type { Tournament } from "../types"

const note =
  "Sự kiện giả định để minh họa giao diện. Không có trong lịch thi đấu chính thức của Liên đoàn Pickleball Việt Nam."

const organizer = "Ban tổ chức minh họa"

type TournamentSource = Omit<Tournament, "thumbnail" | "thumbnailAlt" | "detailUrl" | "summary"> & {
  summary: string
}

/**
 * Cùng danh sách giải với Homepage.
 * Sáu giải sau 03.11.2026 giữ nguyên tên, ngày, địa điểm và ảnh.
 * Thêm một giải đã kết thúc để xem tab Kết quả. Trạng thái vẫn tính từ ngày.
 */
export const tournamentsIllustrative = true

const source: TournamentSource[] = [
  {
    id: "mo-rong-ha-noi-2026",
    slug: "mo-rong-ha-noi-2026",
    name: "Giải Pickleball Mở rộng Hà Nội 2026",
    summary:
      "Giải giả định quy tụ các nhóm chơi khu vực Hà Nội, với nội dung đơn và đôi phong trào trên cụm sân trong nhà.",
    description:
      "Giải giả định quy tụ các nhóm chơi khu vực Hà Nội, với nội dung đơn và đôi phong trào trên cụm sân trong nhà. Lịch trong dữ liệu này chỉ để xem cách một trang giải trình bày thông tin.",
    objective: "Tạo sân chơi cuối tuần cho các nhóm phong trào tại Hà Nội, theo dữ liệu minh họa.",
    coverImage: "/images/match.jpg",
    coverImageAlt: "Trận đấu pickleball trong nhà. Ảnh minh họa cho giải giả định tại Hà Nội.",
    startDate: "2026-11-15",
    endDate: "2026-11-17",
    location: "Hà Nội",
    venue: "Cụm sân minh họa Hà Nội",
    organizer,
    time: "08:00 – 17:00",
    isFeatured: true,
    illustrative: true,
    note,
    categories: [
      { id: "don-nam", name: "Đơn nam", level: "Phong trào", ageGroup: "Mở", format: "Loại trực tiếp" },
      { id: "don-nu", name: "Đơn nữ", level: "Phong trào", ageGroup: "Mở", format: "Loại trực tiếp" },
      { id: "doi-nam-nu", name: "Đôi nam nữ", level: "Phong trào", ageGroup: "Mở", format: "Vòng bảng và loại trực tiếp" },
    ],
    schedule: [
      {
        id: "hn-1",
        date: "2026-11-15",
        time: "08:30",
        court: "Sân 1",
        event: "Đơn nam",
        participants: "Vận động viên minh họa 1 – Vận động viên minh họa 2",
        status: "scheduled",
      },
      {
        id: "hn-2",
        date: "2026-11-16",
        time: "14:00",
        court: "Sân 3",
        event: "Đôi nam nữ",
        participants: "Đội minh họa A – Đội minh họa B",
        status: "scheduled",
      },
    ],
    results: [],
    regulations: {
      summary:
        "Điều lệ minh họa: mỗi nội dung đánh nhánh thắng, set đấu đến 11 và cách biệt 2. Danh sách vận động viên do ban tổ chức giả định chốt trước ngày thi đấu.",
      documents: [{ id: "hn-dieu-le", title: "Điều lệ giải minh họa — Hà Nội 2026" }],
    },
  },
  {
    id: "cong-dong-tphcm-2026",
    slug: "cong-dong-tphcm-2026",
    name: "Giải Pickleball Cộng đồng TP. Hồ Chí Minh 2026",
    summary:
      "Sân chơi cuối tuần giả định cho người chơi nhiều trình độ, ưu tiên giao lưu giữa các câu lạc bộ trong thành phố.",
    description:
      "Sân chơi cuối tuần giả định cho người chơi nhiều trình độ, ưu tiên giao lưu giữa các câu lạc bộ trong thành phố. Không gắn với bảng xếp hạng chính thức.",
    objective: "Kết nối các nhóm chơi trong thành phố qua một cuối tuần giao lưu, theo kịch bản minh họa.",
    coverImage: "/images/player.jpg",
    coverImageAlt: "Vận động viên pickleball trên sân. Ảnh minh họa cho giải giả định tại TP. Hồ Chí Minh.",
    startDate: "2026-11-21",
    endDate: "2026-11-22",
    location: "TP. Hồ Chí Minh",
    venue: "Cụm sân minh họa TP. Hồ Chí Minh",
    organizer,
    time: "07:30 – 17:30",
    isFeatured: false,
    illustrative: true,
    note,
    categories: [
      { id: "don-nam", name: "Đơn nam", level: "Mở", ageGroup: "18+", format: "Vòng tròn" },
      { id: "doi-nam", name: "Đôi nam", level: "Mở", ageGroup: "18+", format: "Vòng tròn" },
      { id: "doi-nu", name: "Đôi nữ", level: "Mở", ageGroup: "18+", format: "Vòng tròn" },
    ],
    schedule: [
      {
        id: "hcm-1",
        date: "2026-11-21",
        time: "07:45",
        court: "Sân 2",
        event: "Đôi nam",
        participants: "Đội minh họa C – Đội minh họa D",
        status: "scheduled",
      },
    ],
    results: [],
    regulations: {
      summary:
        "Điều lệ minh họa ưu tiên giao lưu: mỗi cặp đánh tối đa ba trận trong ngày, thời gian mỗi trận được giới hạn để nhiều đội được lên sân.",
      documents: [{ id: "hcm-dieu-le", title: "Điều lệ giao lưu minh họa — TP. Hồ Chí Minh 2026" }],
    },
  },
  {
    id: "giao-luu-da-nang-2026",
    slug: "giao-luu-da-nang-2026",
    name: "Giải Pickleball Giao lưu Đà Nẵng 2026",
    summary:
      "Buổi giao lưu giả định dành cho các nhóm chơi miền Trung, lịch đánh ngắn và xoay vòng để nhiều người được lên sân.",
    description:
      "Buổi giao lưu giả định dành cho các nhóm chơi miền Trung, lịch đánh ngắn và xoay vòng để nhiều người được lên sân.",
    objective: "Cho các nhóm miền Trung một lịch đánh ngắn, xoay vòng, trong dữ liệu minh họa.",
    coverImage: "/images/outdoor.jpg",
    coverImageAlt: "Pha bóng pickleball ngoài trời. Ảnh minh họa cho giải giả định tại Đà Nẵng.",
    startDate: "2026-11-28",
    endDate: "2026-11-29",
    location: "Đà Nẵng",
    venue: "Sân ngoài trời minh họa Đà Nẵng",
    organizer,
    time: "08:00 – 16:30",
    isFeatured: false,
    illustrative: true,
    note,
    categories: [
      { id: "doi-nam-nu", name: "Đôi nam nữ", level: "Giao lưu", ageGroup: "Mở", format: "Xoay vòng" },
      { id: "don-nu", name: "Đơn nữ", level: "Giao lưu", ageGroup: "Mở", format: "Xoay vòng" },
    ],
    schedule: [
      {
        id: "dn-1",
        date: "2026-11-28",
        time: "08:15",
        court: "Sân A",
        event: "Đôi nam nữ",
        participants: "Đội minh họa E – Đội minh họa F",
        status: "scheduled",
      },
      {
        id: "dn-2",
        date: "2026-11-29",
        time: "09:00",
        court: "Sân B",
        event: "Đơn nữ",
        participants: "Vận động viên minh họa 3 – Vận động viên minh họa 4",
        status: "scheduled",
      },
    ],
    results: [],
    regulations: {
      summary: "Điều lệ minh họa không tính thứ hạng. Trọng tài sân điều phối xoay vòng theo giờ đã chia.",
      documents: [{ id: "dn-dieu-le", title: "Ghi chú giao lưu minh họa — Đà Nẵng 2026" }],
    },
  },
  {
    id: "dong-doi-mien-nam-2026",
    slug: "dong-doi-mien-nam-2026",
    name: "Giải Pickleball Đồng đội Miền Nam 2026",
    summary: "Thể thức đồng đội giả định: mỗi câu lạc bộ cử một tổ vận động viên, tính điểm theo loạt trận trong ngày.",
    description:
      "Thể thức đồng đội giả định: mỗi câu lạc bộ cử một tổ vận động viên, tính điểm theo loạt trận trong ngày. Tên đội trong lịch là nhãn minh họa.",
    objective: "Minh họa một giải đồng đội, nơi điểm được cộng theo loạt trận chứ không theo một nội dung đơn.",
    coverImage: "/images/match.jpg",
    coverImageAlt: "Đôi vận động viên pickleball trên sân thi đấu. Ảnh minh họa.",
    startDate: "2026-12-05",
    endDate: "2026-12-06",
    location: "Bình Dương",
    venue: "Nhà thi đấu minh họa Bình Dương",
    organizer,
    time: "08:00 – 17:00",
    isFeatured: false,
    illustrative: true,
    note,
    categories: [
      { id: "dong-doi", name: "Đồng đội", level: "Câu lạc bộ", ageGroup: "Mở", format: "Loạt trận, tính điểm" },
      { id: "doi-nam", name: "Đôi nam", level: "Câu lạc bộ", ageGroup: "Mở", format: "Một trận trong loạt" },
      { id: "doi-nu", name: "Đôi nữ", level: "Câu lạc bộ", ageGroup: "Mở", format: "Một trận trong loạt" },
    ],
    schedule: [
      {
        id: "bd-1",
        date: "2026-12-05",
        time: "08:30",
        court: "Sân 1",
        event: "Đồng đội",
        participants: "Đội minh họa G – Đội minh họa H",
        status: "scheduled",
      },
    ],
    results: [],
    regulations: {
      summary:
        "Điều lệ minh họa: mỗi đội đăng ký một tổ. Điểm loạt trận được cộng sau khi đủ các nội dung trong ngày. Không có bảng xếp hạng chính thức.",
      documents: [{ id: "bd-dieu-le", title: "Điều lệ đồng đội minh họa — Bình Dương 2026" }],
    },
  },
  {
    id: "phong-trao-mien-bac-2026",
    slug: "phong-trao-mien-bac-2026",
    name: "Giải Pickleball Phong trào Miền Bắc 2026",
    summary: "Giải phong trào giả định mở cho hội viên câu lạc bộ phía Bắc, không gắn với một bảng xếp hạng chính thức.",
    description:
      "Giải phong trào giả định mở cho hội viên câu lạc bộ phía Bắc, không gắn với một bảng xếp hạng chính thức.",
    objective: "Mở một lịch phong trào cho các câu lạc bộ phía Bắc trong bộ dữ liệu demo.",
    coverImage: "/images/outdoor.jpg",
    coverImageAlt: "Vận động viên pickleball đang thi đấu. Ảnh minh họa.",
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    location: "Hải Phòng",
    venue: "Sân minh họa Hải Phòng",
    organizer,
    time: "08:00 – 17:00",
    isFeatured: false,
    illustrative: true,
    note,
    categories: [
      { id: "don-nam", name: "Đơn nam", level: "Phong trào", ageGroup: "30+", format: "Loại trực tiếp" },
      { id: "don-nu", name: "Đơn nữ", level: "Phong trào", ageGroup: "30+", format: "Loại trực tiếp" },
      { id: "doi-nam-nu", name: "Đôi nam nữ", level: "Phong trào", ageGroup: "Mở", format: "Loại trực tiếp" },
    ],
    schedule: [
      {
        id: "hp-1",
        date: "2026-12-12",
        time: "09:00",
        court: "Sân 2",
        event: "Đơn nam",
        participants: "Vận động viên minh họa 5 – Vận động viên minh họa 6",
        status: "scheduled",
      },
    ],
    results: [],
    regulations: {
      summary: "Điều lệ minh họa giới hạn mỗi người một nội dung đơn và một nội dung đôi. Không công bố thứ hạng chính thức.",
      documents: [{ id: "hp-dieu-le", title: "Điều lệ phong trào minh họa — Hải Phòng 2026" }],
    },
  },
  {
    id: "giao-luu-cuoi-nam-2026",
    slug: "giao-luu-cuoi-nam-2026",
    name: "Giải Pickleball Giao lưu Cuối năm 2026",
    summary: "Điểm hẹn giả định cuối năm cho các nhóm chơi đồng bằng sông Cửu Long, theo hình thức giao lưu không tính thứ hạng.",
    description:
      "Điểm hẹn giả định cuối năm cho các nhóm chơi đồng bằng sông Cửu Long, theo hình thức giao lưu không tính thứ hạng. Lịch trận chưa được ban tổ chức minh họa cập nhật.",
    objective: "Giữ một điểm hẹn cuối năm trong lịch minh họa, chưa có lịch trận chi tiết.",
    coverImage: "/images/player.jpg",
    coverImageAlt: "Người chơi pickleball cầm vợt trên sân. Ảnh minh họa.",
    startDate: "2026-12-19",
    endDate: "2026-12-20",
    location: "Cần Thơ",
    venue: "Sân minh họa Cần Thơ",
    organizer,
    time: "07:30 – 16:30",
    isFeatured: false,
    illustrative: true,
    note,
    categories: [{ id: "doi-nam-nu", name: "Đôi nam nữ", level: "Giao lưu", ageGroup: "Mở", format: "Chưa chốt" }],
    schedule: [],
    results: [],
    regulations: {
      summary: "Ghi chú minh họa: giải không tính thứ hạng. Điều lệ chi tiết sẽ chỉ xuất hiện khi có tài liệu thật.",
      documents: [{ id: "ct-dieu-le", title: "Ghi chú giao lưu minh họa — Cần Thơ 2026" }],
    },
  },
  {
    id: "giao-huu-hue-2026",
    slug: "giao-huu-hue-2026",
    name: "Giải Pickleball Giao hữu Huế 2026",
    summary: "Giải giao hữu giả định đã kết thúc, dùng để xem cách trang chi tiết trình bày kết quả minh họa.",
    description:
      "Giải giao hữu giả định đã kết thúc, dùng để xem cách trang chi tiết trình bày kết quả minh họa. Tên đội và tỷ số không phải kết quả thi đấu thật.",
    objective: "Cho giao diện một giải đã khép lại, với lịch và kết quả đều được đánh dấu là dữ liệu demo.",
    coverImage: "/images/outdoor.jpg",
    coverImageAlt: "Pha bóng pickleball ngoài trời. Ảnh minh họa cho giải giả định tại Huế.",
    startDate: "2026-10-17",
    endDate: "2026-10-18",
    location: "Huế",
    venue: "Sân minh họa Huế",
    organizer,
    time: "08:00 – 16:00",
    isFeatured: false,
    illustrative: true,
    note,
    categories: [
      { id: "don-nam", name: "Đơn nam", level: "Giao hữu", ageGroup: "Mở", format: "Loại trực tiếp" },
      { id: "doi-nam", name: "Đôi nam", level: "Giao hữu", ageGroup: "Mở", format: "Loại trực tiếp" },
    ],
    schedule: [
      {
        id: "hue-1",
        date: "2026-10-17",
        time: "09:00",
        court: "Sân 1",
        event: "Đơn nam",
        participants: "Vận động viên minh họa 1 – Vận động viên minh họa 2",
        status: "finished",
      },
      {
        id: "hue-2",
        date: "2026-10-18",
        time: "15:00",
        court: "Sân 1",
        event: "Đôi nam",
        participants: "Đội minh họa A – Đội minh họa B",
        status: "finished",
      },
    ],
    results: [
      {
        id: "hue-r1",
        sideA: "Vận động viên minh họa 1",
        sideB: "Vận động viên minh họa 2",
        score: "11–8, 9–11, 11–6",
        winner: "Vận động viên minh họa 1",
        round: "Chung kết đơn nam",
      },
      {
        id: "hue-r2",
        sideA: "Đội minh họa A",
        sideB: "Đội minh họa B",
        score: "11–7, 11–9",
        winner: "Đội minh họa A",
        round: "Chung kết đôi nam",
      },
    ],
    regulations: {
      summary: "Điều lệ minh họa của giải đã kết thúc: set đến 11, cách biệt 2, không có tài liệu tải về.",
      documents: [{ id: "hue-dieu-le", title: "Điều lệ giao hữu minh họa — Huế 2026" }],
    },
  },
]

export const tournaments: Tournament[] = source.map((item) => ({
  ...item,
  thumbnail: item.coverImage,
  thumbnailAlt: item.coverImageAlt,
  detailUrl: tournamentPath(item.slug),
}))
