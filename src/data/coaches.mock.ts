/**
 * Hồ sơ huấn luyện viên minh họa cho giao diện.
 * Mã, đơn vị, cấp độ và phần mô tả không phải chứng chỉ hay phân công của Liên đoàn.
 * Ảnh dùng lại chân dung demo đã có — không gán ảnh của người này cho tên khác.
 */

export type Coach = {
  id: string
  name: string
  image: string
  coachCode?: string
  organization?: string
  location?: string
  certification?: string
  specialties?: string[]
  experience?: string
  achievement?: string
  profileUrl?: string
}

export const coaches: Coach[] = [
  {
    id: "hlv-01",
    name: "Mai Khánh Vy",
    image: "/images/coaches/coach-01.webp",
    coachCode: "VPF-HLV001",
    organization: "CLB Pickleball Hà Nội",
    location: "Hà Nội",
    certification: "Huấn luyện viên cấp 1",
    specialties: ["Kỹ thuật cơ bản"],
    experience: "Hướng dẫn người mới cách cầm vợt, tư thế và những đường bóng cơ bản trên sân.",
  },
  {
    id: "hlv-02",
    name: "Trịnh Bảo Long",
    image: "/images/coaches/coach-02.webp",
    coachCode: "VPF-HLV002",
    organization: "CLB Pickleball Sài Gòn",
    location: "TP. Hồ Chí Minh",
    certification: "Huấn luyện viên cấp 1",
    specialties: ["Chiến thuật đôi"],
    experience: "Tập trung vào vị trí đứng và cách phối hợp khi đánh đôi.",
  },
  {
    id: "hlv-03",
    name: "Lý Thanh Tâm",
    image: "/images/coaches/coach-03.webp",
    coachCode: "VPF-HLV003",
    organization: "CLB Pickleball Đà Nẵng",
    location: "Đà Nẵng",
    certification: "Huấn luyện viên cấp 2",
    specialties: ["Phương pháp giảng dạy"],
    experience: "Sắp xếp bài tập theo từng nhóm trình độ để người chơi dễ theo dõi.",
  },
  {
    id: "hlv-04",
    name: "Phan Nhật Quang",
    image: "/images/coaches/coach-04.webp",
    coachCode: "VPF-HLV004",
    organization: "CLB Pickleball Hải Phòng",
    location: "Hải Phòng",
    certification: "Huấn luyện viên cấp 2",
    specialties: ["Thể lực", "Di chuyển"],
    experience: "Chú trọng bước chân, thăng bằng và sức bền khi di chuyển trên sân.",
  },
  {
    id: "hlv-05",
    name: "Võ Minh Trang",
    image: "/images/coaches/coach-05.webp",
    coachCode: "VPF-HLV005",
    organization: "CLB Pickleball Cần Thơ",
    location: "Cần Thơ",
    certification: "Huấn luyện viên cấp 3",
    specialties: ["Người mới bắt đầu"],
    experience: "Đồng hành với người mới làm quen sân, luật chơi cơ bản và nhịp giao bóng.",
  },
  {
    id: "hlv-06",
    name: "Hồ Tuấn Anh",
    image: "/images/coaches/coach-06.webp",
    coachCode: "VPF-HLV006",
    organization: "CLB Pickleball Khánh Hòa",
    location: "Khánh Hòa",
    certification: "Huấn luyện viên cấp 1",
    specialties: ["Giao bóng", "Trả giao"],
    experience: "Luyện giao bóng và cách trả giao trong các tình huống thường gặp.",
  },
  {
    id: "hlv-07",
    name: "Nguyễn Hà My",
    image: "/images/coaches/coach-07.webp",
    coachCode: "VPF-HLV007",
    organization: "CLB Pickleball Bình Dương",
    location: "Bình Dương",
    certification: "Huấn luyện viên cấp 2",
    specialties: ["Tổ chức buổi tập"],
    experience: "Sắp xếp nhóm tập, thời lượng và bài tập cho một buổi trên sân.",
  },
  {
    id: "hlv-08",
    name: "Đinh Gia Hân",
    image: "/images/coaches/coach-08.webp",
    coachCode: "VPF-HLV008",
    organization: "CLB Pickleball Huế",
    location: "Huế",
    certification: "Huấn luyện viên cấp 3",
    specialties: ["Kỹ thuật volley"],
    experience: "Hướng dẫn kỹ thuật volley và khoảng cách tiếp cận lưới.",
  },
  {
    id: "hlv-09",
    name: "Bùi Nhật Nam",
    image: "/images/coaches/coach-09.webp",
    coachCode: "VPF-HLV009",
    organization: "CLB Pickleball Hà Nội",
    location: "Hà Nội",
    certification: "Huấn luyện viên cấp 1",
    specialties: ["Huấn luyện trẻ em"],
    experience: "Buổi tập cho trẻ em, ưu tiên an toàn, vui chơi và kỹ thuật đơn giản.",
  },
  {
    id: "hlv-10",
    name: "Cao Thanh Bình",
    image: "/images/coaches/coach-10.webp",
    coachCode: "VPF-HLV010",
    organization: "CLB Pickleball Sài Gòn",
    location: "TP. Hồ Chí Minh",
    certification: "Huấn luyện viên cấp 2",
    specialties: ["Chuẩn bị thi đấu"],
    experience: "Giúp người chơi sắp xếp khởi động và nhịp trận trước giờ thi đấu.",
  },
]
