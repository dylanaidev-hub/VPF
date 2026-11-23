/**
 * DEMO — dữ liệu đầy đủ cho trang chi tiết Giải Pickleball Mở rộng Hà Nội 2026.
 * Không phải lịch, kết quả hay điều lệ chính thức của Liên đoàn.
 */
import type { Tournament } from "../types"

type TournamentSourceFields = Omit<
  Tournament,
  "thumbnail" | "thumbnailAlt" | "detailUrl" | "summary" | "scope"
> & {
  summary: string
  scope?: Tournament["scope"]
}

const note =
  "Sự kiện giả định để minh họa giao diện. Không có trong lịch thi đấu chính thức của Liên đoàn Pickleball Việt Nam."

function match(input: {
  id: string
  date: string
  time: string
  court: string
  categoryId: string
  event: string
  round: string
  sideA: string
  sideB: string
  status: "scheduled" | "ongoing" | "finished"
  sets?: string[]
}) {
  const score = input.sets?.join(", ")
  return {
    id: input.id,
    date: input.date,
    time: input.time,
    court: input.court,
    event: input.event,
    categoryId: input.categoryId,
    round: input.round,
    sideA: input.sideA,
    sideB: input.sideB,
    participants: `${input.sideA} – ${input.sideB}`,
    status: input.status,
    score,
    sets: input.sets,
  }
}

const schedule = [
  match({
    id: "hn-m01",
    date: "2026-11-15",
    time: "08:30",
    court: "Sân 1",
    categoryId: "don-nam",
    event: "Đơn nam",
    round: "Vòng bảng A",
    sideA: "Nguyễn Minh Khoa",
    sideB: "Trần Đức Anh",
    status: "finished",
    sets: ["11–7", "11–9"],
  }),
  match({
    id: "hn-m02",
    date: "2026-11-15",
    time: "09:15",
    court: "Sân 2",
    categoryId: "don-nu",
    event: "Đơn nữ",
    round: "Vòng bảng A",
    sideA: "Lê Thu Hà",
    sideB: "Phạm Bảo Ngọc",
    status: "finished",
    sets: ["11–8", "9–11", "11–6"],
  }),
  match({
    id: "hn-m03",
    date: "2026-11-15",
    time: "10:00",
    court: "Sân 3",
    categoryId: "doi-nam",
    event: "Đôi nam",
    round: "Vòng bảng",
    sideA: "Đội Thủ đô A",
    sideB: "Đội Tây Hồ",
    status: "finished",
    sets: ["11–5", "11–8"],
  }),
  match({
    id: "hn-m04",
    date: "2026-11-15",
    time: "10:45",
    court: "Sân 1",
    categoryId: "doi-nu",
    event: "Đôi nữ",
    round: "Vòng bảng",
    sideA: "Đôi Long Biên",
    sideB: "Đôi Cầu Giấy",
    status: "finished",
    sets: ["11–9", "8–11", "11–7"],
  }),
  match({
    id: "hn-m05",
    date: "2026-11-15",
    time: "14:00",
    court: "Sân 2",
    categoryId: "doi-nam-nu",
    event: "Đôi nam nữ",
    round: "Vòng bảng",
    sideA: "Cặp Minh họa 01",
    sideB: "Cặp Minh họa 02",
    status: "finished",
    sets: ["11–6", "11–10"],
  }),
  match({
    id: "hn-m06",
    date: "2026-11-15",
    time: "15:00",
    court: "Sân 3",
    categoryId: "don-nam",
    event: "Đơn nam",
    round: "Vòng bảng B",
    sideA: "Hoàng Nhật Nam",
    sideB: "Vũ Quang Huy",
    status: "finished",
    sets: ["11–4", "11–8"],
  }),
  match({
    id: "hn-m07",
    date: "2026-11-16",
    time: "08:30",
    court: "Sân 1",
    categoryId: "don-nu",
    event: "Đơn nữ",
    round: "Tứ kết",
    sideA: "Lê Thu Hà",
    sideB: "Đặng Mai Anh",
    status: "finished",
    sets: ["11–9", "11–7"],
  }),
  match({
    id: "hn-m08",
    date: "2026-11-16",
    time: "09:30",
    court: "Sân 2",
    categoryId: "doi-nam",
    event: "Đôi nam",
    round: "Bán kết",
    sideA: "Đội Thủ đô A",
    sideB: "Đội Đống Đa",
    status: "finished",
    sets: ["11–8", "9–11", "11–5"],
  }),
  match({
    id: "hn-m09",
    date: "2026-11-16",
    time: "10:30",
    court: "Sân 3",
    categoryId: "doi-nu",
    event: "Đôi nữ",
    round: "Bán kết",
    sideA: "Đôi Long Biên",
    sideB: "Đôi Ba Đình",
    status: "finished",
    sets: ["11–6", "11–9"],
  }),
  match({
    id: "hn-m10",
    date: "2026-11-16",
    time: "14:00",
    court: "Sân 1",
    categoryId: "doi-nam-nu",
    event: "Đôi nam nữ",
    round: "Bán kết",
    sideA: "Cặp Minh họa 01",
    sideB: "Cặp Minh họa 03",
    status: "finished",
    sets: ["11–7", "11–8"],
  }),
  match({
    id: "hn-m11",
    date: "2026-11-16",
    time: "15:00",
    court: "Sân 2",
    categoryId: "don-nam",
    event: "Đơn nam",
    round: "Bán kết",
    sideA: "Nguyễn Minh Khoa",
    sideB: "Hoàng Nhật Nam",
    status: "finished",
    sets: ["11–9", "10–12", "11–7"],
  }),
  match({
    id: "hn-m12",
    date: "2026-11-16",
    time: "16:00",
    court: "Sân 3",
    categoryId: "don-nu",
    event: "Đơn nữ",
    round: "Bán kết",
    sideA: "Lê Thu Hà",
    sideB: "Ngô Khánh Linh",
    status: "finished",
    sets: ["11–5", "11–8"],
  }),
  match({
    id: "hn-m13",
    date: "2026-11-17",
    time: "09:00",
    court: "Sân 1",
    categoryId: "doi-nam",
    event: "Đôi nam",
    round: "Chung kết",
    sideA: "Đội Thủ đô A",
    sideB: "Đội Hoàng Mai",
    status: "finished",
    sets: ["11–8", "11–6"],
  }),
  match({
    id: "hn-m14",
    date: "2026-11-17",
    time: "10:00",
    court: "Sân 1",
    categoryId: "doi-nu",
    event: "Đôi nữ",
    round: "Chung kết",
    sideA: "Đôi Long Biên",
    sideB: "Đôi Thanh Xuân",
    status: "finished",
    sets: ["11–9", "8–11", "11–7"],
  }),
  match({
    id: "hn-m15",
    date: "2026-11-17",
    time: "11:00",
    court: "Sân 2",
    categoryId: "doi-nam-nu",
    event: "Đôi nam nữ",
    round: "Chung kết",
    sideA: "Cặp Minh họa 01",
    sideB: "Cặp Minh họa 04",
    status: "finished",
    sets: ["11–7", "11–9"],
  }),
  match({
    id: "hn-m16",
    date: "2026-11-17",
    time: "14:00",
    court: "Sân 1",
    categoryId: "don-nam",
    event: "Đơn nam",
    round: "Chung kết",
    sideA: "Nguyễn Minh Khoa",
    sideB: "Phan Gia Bảo",
    status: "finished",
    sets: ["11–8", "9–11", "11–6"],
  }),
]

const results = schedule
  .filter((item) => item.status === "finished" && item.sets)
  .map((item) => {
    const aWins = item.sets!.filter((set) => {
      const [left, right] = set.split("–").map(Number)
      return left > right
    }).length
    const winner = aWins >= Math.ceil(item.sets!.length / 2) ? item.sideA! : item.sideB!
    const stage =
      item.round.includes("Chung kết") ? ("final" as const) : item.round.includes("bảng") ? ("group" as const) : ("knockout" as const)
    return {
      id: `r-${item.id}`,
      matchId: item.id,
      categoryId: item.categoryId,
      sideA: item.sideA!,
      sideB: item.sideB!,
      score: item.score!,
      sets: item.sets,
      winner,
      round: item.round,
      stage,
    }
  })

export const haNoiTournamentDetail: TournamentSourceFields = {
  id: "mo-rong-ha-noi-2026",
  slug: "mo-rong-ha-noi-2026",
  name: "Giải Pickleball Mở rộng Hà Nội 2026",
  summary:
    "Giải giả định quy tụ các nhóm chơi khu vực Hà Nội, với nội dung đơn và đôi phong trào trên cụm sân trong nhà.",
  description:
    "Giải giả định quy tụ các nhóm chơi khu vực Hà Nội, với nội dung đơn và đôi phong trào trên cụm sân trong nhà. Lịch và kết quả trong dữ liệu này chỉ để xem cách một trang giải trình bày thông tin.",
  objective: "Tạo sân chơi cuối tuần cho các nhóm phong trào tại Hà Nội, theo dữ liệu minh họa.",
  coverImage: "/images/match.jpg",
  coverImageAlt: "Trận đấu pickleball trong nhà. Ảnh minh họa cho giải giả định tại Hà Nội.",
  startDate: "2026-11-15",
  endDate: "2026-11-17",
  location: "Hà Nội",
  venue: "Cụm sân minh họa Hà Nội",
  organizer: "Ban tổ chức minh họa",
  coOrganizer: "Câu lạc bộ Pickleball Hà Nội (minh họa)",
  time: "08:00 – 17:00",
  isFeatured: true,
  illustrative: true,
  note,
  scale: "Quy mô khu vực — khoảng 90–100 vận động viên (demo)",
  audience: "Người chơi phong trào từ 16 tuổi trở lên, ưu tiên hội viên câu lạc bộ khu vực Hà Nội.",
  registrationDeadline: "2026-11-08",
  contact: {
    name: "Ban tổ chức minh họa",
    email: "demo.bt@example.com",
    phone: "0900 000 000",
  },
  stats: {
    athletes: 96,
    teams: 48,
    matches: 16,
    events: 5,
  },
  categories: [
    {
      id: "doi-nam",
      name: "Đôi nam",
      level: "Phong trào",
      ageGroup: "Mở",
      format: "Vòng bảng và loại trực tiếp",
      entrants: 12,
      rounds: 3,
      status: "Đã kết thúc",
      prize: "Cúp + hiện vật minh họa",
    },
    {
      id: "doi-nu",
      name: "Đôi nữ",
      level: "Phong trào",
      ageGroup: "Mở",
      format: "Vòng bảng và loại trực tiếp",
      entrants: 10,
      rounds: 3,
      status: "Đã kết thúc",
      prize: "Cúp + hiện vật minh họa",
    },
    {
      id: "doi-nam-nu",
      name: "Đôi nam nữ",
      level: "Phong trào",
      ageGroup: "Mở",
      format: "Vòng bảng và loại trực tiếp",
      entrants: 14,
      rounds: 3,
      status: "Đã kết thúc",
      prize: "Cúp + hiện vật minh họa",
    },
    {
      id: "don-nam",
      name: "Đơn nam",
      level: "Phong trào",
      ageGroup: "Mở",
      format: "Vòng bảng và loại trực tiếp",
      entrants: 16,
      rounds: 4,
      status: "Đã kết thúc",
      prize: "Cúp + hiện vật minh họa",
    },
    {
      id: "don-nu",
      name: "Đơn nữ",
      level: "Phong trào",
      ageGroup: "Mở",
      format: "Vòng bảng và loại trực tiếp",
      entrants: 12,
      rounds: 4,
      status: "Đã kết thúc",
      prize: "Cúp + hiện vật minh họa",
    },
  ],
  schedule,
  results,
  overview: {
    intro: [
      "Giải Pickleball Mở rộng Hà Nội 2026 là sự kiện minh họa được dựng để thể hiện cách một trang chi tiết giải đấu trình bày lịch trình, nội dung thi đấu và kết quả trên cổng thông tin VPF.",
      "Trong ba ngày thi đấu giả định, các nội dung đơn và đôi diễn ra song song trên ba sân trong nhà. Ban tổ chức minh họa sắp lịch theo khung giờ cố định để người xem dễ theo dõi trên giao diện.",
      "Toàn bộ tên vận động viên, đội, tỷ số và điều lệ dưới đây chỉ phục vụ duyệt giao diện — không phải thông tin chính thức của Liên đoàn Pickleball Việt Nam.",
    ],
    goals:
      "Tạo một sân chơi cuối tuần có cấu trúc rõ ràng cho cộng đồng phong trào, đồng thời kiểm thử trải nghiệm theo dõi lịch và kết quả trên website.",
    audience:
      "Người chơi phong trào từ 16 tuổi trở lên, đã có kinh nghiệm thi đấu câu lạc bộ. Không yêu cầu xếp hạng chính thức trong bản demo này.",
    venueNote:
      "Cụm sân minh họa Hà Nội gồm ba sân trong nhà, khu vực chờ và góc livestream giả định. Địa chỉ chi tiết chưa được công bố vì đây là dữ liệu demo.",
    dayPlan: [
      {
        date: "2026-11-15",
        title: "Ngày 1 — Vòng bảng",
        items: ["Khai mạc ngắn", "Các trận vòng bảng đơn và đôi", "Cập nhật bảng xếp hạng minh họa"],
      },
      {
        date: "2026-11-16",
        title: "Ngày 2 — Vòng loại trực tiếp",
        items: ["Tứ kết và bán kết", "Điều chỉnh sân theo tiến độ", "Chuẩn bị khung giờ chung kết"],
      },
      {
        date: "2026-11-17",
        title: "Ngày 3 — Chung kết",
        items: ["Các trận chung kết", "Lễ trao giải minh họa", "Bế mạc"],
      },
    ],
    prizes: [
      { place: "Vô địch mỗi nội dung", detail: "Cúp và hiện vật minh họa" },
      { place: "Á quân", detail: "Hiện vật minh họa" },
      { place: "Đồng hạng ba", detail: "Hiện vật minh họa (nếu nội dung có tranh hạng ba)" },
    ],
    highlights: [
      "5 nội dung thi đấu đơn và đôi",
      "16 trận minh họa trên 3 sân",
      "Lịch và kết quả đồng bộ trong cùng bộ dữ liệu demo",
      "Gallery khoảnh khắc giả định sau giải",
    ],
  },
  standings: [
    {
      categoryId: "don-nam",
      group: "Bảng A",
      rows: [
        { rank: 1, name: "Nguyễn Minh Khoa", played: 2, won: 2, lost: 0, points: 4 },
        { rank: 2, name: "Trần Đức Anh", played: 2, won: 1, lost: 1, points: 2 },
        { rank: 3, name: "Lý Hoàng Phúc", played: 2, won: 0, lost: 2, points: 0 },
      ],
    },
    {
      categoryId: "don-nam",
      group: "Bảng B",
      rows: [
        { rank: 1, name: "Hoàng Nhật Nam", played: 2, won: 2, lost: 0, points: 4 },
        { rank: 2, name: "Phan Gia Bảo", played: 2, won: 1, lost: 1, points: 2 },
        { rank: 3, name: "Vũ Quang Huy", played: 2, won: 0, lost: 2, points: 0 },
      ],
    },
  ],
  winners: [
    {
      categoryId: "doi-nam",
      categoryName: "Đôi nam",
      champion: "Đội Thủ đô A",
      runnerUp: "Đội Hoàng Mai",
      third: ["Đội Đống Đa"],
    },
    {
      categoryId: "doi-nu",
      categoryName: "Đôi nữ",
      champion: "Đôi Long Biên",
      runnerUp: "Đôi Thanh Xuân",
      third: ["Đôi Ba Đình"],
    },
    {
      categoryId: "doi-nam-nu",
      categoryName: "Đôi nam nữ",
      champion: "Cặp Minh họa 01",
      runnerUp: "Cặp Minh họa 04",
      third: ["Cặp Minh họa 03"],
    },
    {
      categoryId: "don-nam",
      categoryName: "Đơn nam",
      champion: "Nguyễn Minh Khoa",
      runnerUp: "Phan Gia Bảo",
      third: ["Hoàng Nhật Nam"],
    },
    {
      categoryId: "don-nu",
      categoryName: "Đơn nữ",
      champion: "Lê Thu Hà",
      runnerUp: "Ngô Khánh Linh",
      third: ["Đặng Mai Anh"],
    },
  ],
  ruleSections: [
    {
      id: "dieu-kien",
      title: "Điều kiện tham gia",
      bullets: [
        "Người chơi từ 16 tuổi trở lên (demo).",
        "Ưu tiên hội viên câu lạc bộ khu vực Hà Nội trong bản minh họa.",
        "Mỗi người đăng ký tối đa hai nội dung.",
      ],
    },
    {
      id: "dang-ky",
      title: "Đăng ký thi đấu",
      paragraphs: [
        "Ban tổ chức minh họa nhận danh sách trước hạn đăng ký ghi trên trang. Không có kênh nộp hồ sơ thật trên bản demo này.",
      ],
      bullets: ["Hạn đăng ký minh họa: 08.11.2026", "Danh sách xuất phát được khóa trước ngày khai mạc"],
    },
    {
      id: "the-thuc",
      title: "Thể thức thi đấu",
      bullets: [
        "Vòng bảng theo nhóm nhỏ, sau đó loại trực tiếp.",
        "Mỗi trận tối đa 3 set, set đến 11 điểm, cách biệt 2.",
        "Ban tổ chức minh họa có thể rút gọn lịch nếu tiến độ sân chậm.",
      ],
    },
    {
      id: "tinh-diem",
      title: "Quy định tính điểm",
      paragraphs: [
        "Điểm vòng bảng được cộng theo trận thắng. Trường hợp bằng điểm, ưu tiên hiệu số set rồi đối đầu trực tiếp — chỉ áp dụng trong dữ liệu demo.",
      ],
    },
    {
      id: "trang-phuc",
      title: "Quy định trang phục và dụng cụ",
      bullets: [
        "Trang phục thể thao sạch sẽ, không mang đế làm hỏng sàn.",
        "Vợt và bóng theo tiêu chuẩn giải phong trào minh họa.",
      ],
    },
    {
      id: "ky-luat",
      title: "Kỷ luật và khiếu nại",
      paragraphs: [
        "Khiếu nại trong bản demo chỉ mang tính mô tả quy trình: gửi cho trọng tài sân, sau đó chuyển ban tổ chức minh họa nếu cần.",
      ],
    },
    {
      id: "giai-thuong",
      title: "Cơ cấu giải thưởng",
      bullets: [
        "Vô địch / á quân / đồng hạng ba theo từng nội dung.",
        "Hiện vật trao giải trong dữ liệu này là minh họa.",
      ],
    },
    {
      id: "chung",
      title: "Quy định chung",
      paragraphs: [
        "Ban tổ chức minh họa giữ quyền điều chỉnh lịch vì lý do vận hành sân. Mọi thay đổi sẽ được phản ánh trên trang demo khi có cập nhật.",
      ],
    },
  ],
  regulations: {
    summary:
      "Điều lệ minh họa: mỗi nội dung đánh vòng bảng rồi loại trực tiếp, set đấu đến 11 và cách biệt 2. Danh sách vận động viên do ban tổ chức giả định chốt trước ngày thi đấu.",
    documents: [{ id: "hn-dieu-le", title: "Điều lệ giải minh họa — Hà Nội 2026" }],
  },
  gallery: [
    {
      id: "hn-g1",
      type: "image",
      src: "/images/match.jpg",
      alt: "Trận đấu pickleball trong nhà — ảnh minh họa.",
    },
    {
      id: "hn-g2",
      type: "image",
      src: "/images/player.jpg",
      alt: "Vận động viên cầm vợt trên sân — ảnh minh họa.",
    },
    {
      id: "hn-g3",
      type: "image",
      src: "/images/outdoor.jpg",
      alt: "Không khí sân pickleball — ảnh minh họa.",
    },
    {
      id: "hn-g4",
      type: "image",
      src: "/images/match.jpg",
      alt: "Pha bóng trên sân trong nhà — ảnh minh họa.",
    },
    {
      id: "hn-g5",
      type: "image",
      src: "/images/player.jpg",
      alt: "Khoảnh khắc chuẩn bị giao bóng — ảnh minh họa.",
    },
    {
      id: "hn-g6",
      type: "image",
      src: "/images/outdoor.jpg",
      alt: "Toàn cảnh cụm sân minh họa — ảnh minh họa.",
    },
  ],
  champion: "Nguyễn Minh Khoa · Đội Thủ đô A · Đôi Long Biên · Cặp Minh họa 01 · Lê Thu Hà",
}
