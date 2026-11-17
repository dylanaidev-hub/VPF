import { formatEventDate, formatViDate } from "../lib/format"
import { libraryRecordPath } from "../lib/libraryLinks"
import { newsPath } from "../lib/news"
import { sponsorPath } from "../lib/partnership"
import type { SearchItem } from "../lib/search"
import { federationNav } from "./aboutFederation.mock"
import { coaches } from "./coaches.mock"
import { athletes, brandSection, memberOrgs, memberSection, membershipSection, teamsSection } from "./library.mock"
import { news } from "./news"
import { pages } from "./pages"
import { sponsors } from "./partnership.mock"
import { visibleCourses, visibleDocuments } from "./technicalContent"
import { resourceGroups, technicalSections } from "./technicalResources"
import { tournaments } from "./tournaments"

const documentSections = new Map<string, string>(
  resourceGroups.flatMap((group) => group.documents.map((id) => [id, group.id] as const)),
)

export const siteSearchIndex: SearchItem[] = [
  ...news.map<SearchItem>((article) => ({
    id: `news-${article.id}`,
    type: "news",
    title: article.title,
    description: article.excerpt,
    date: article.publishedAt,
    keywords: [article.category, ...article.body],
    meta: `${article.category} · ${formatViDate(article.date)}`,
    url: newsPath(article),
  })),
  ...tournaments.map<SearchItem>((event) => ({
    id: `tournament-${event.id}`,
    type: "tournament",
    title: event.name,
    description: event.summary || event.description,
    keywords: [event.location, event.venue, event.description, ...event.categories.map(({ name }) => name)],
    date: event.startDate,
    meta: `${event.location} · ${formatEventDate(event.startDate, event.endDate).rangeLabel}`,
    url: event.detailUrl,
  })),
  ...visibleDocuments.map<SearchItem>((document) => {
    const section = documentSections.get(document.id)
    return {
      id: `document-${document.id}`,
      type: "document",
      title: document.title,
      description: document.description,
      keywords: [document.type, document.reference ?? ""],
      date: document.publishedOn ?? document.sampleDate,
      meta: [document.type, document.pdf && "PDF", document.source === "demo" && "Tài liệu minh họa"].filter(Boolean).join(" · "),
      url: section
        ? `/chuyenmon.html#${section}`
        : `/chuyenmon.html?document=${encodeURIComponent(document.id)}#van-ban-chuyen-mon`,
    }
  }),
  ...visibleCourses.map<SearchItem>((course) => ({
    id: `course-${course.id}`,
    type: "document",
    label: "Đào tạo & tập huấn",
    title: course.title,
    description: course.description,
    keywords: [course.audience, course.format, course.location],
    date: course.startDate,
    meta: [course.location, formatViDate(course.startDate), course.source === "demo" && "Dữ liệu minh họa"].filter(Boolean).join(" · "),
    url: "/chuyenmon.html#dao-tao",
  })),
  ...memberOrgs.map<SearchItem>((member) => ({
    id: `member-${member.id}`,
    type: "member",
    title: member.name,
    description: member.description,
    keywords: [member.province, "câu lạc bộ", "CLB"],
    meta: [member.province, member.illustrative && "Đơn vị minh họa"].filter(Boolean).join(" · "),
    url: libraryRecordPath("member", member.id),
  })),
  ...athletes.map<SearchItem>((person) => ({
    id: `athlete-${person.id}`,
    type: "athlete",
    title: person.name,
    description: person.bio,
    keywords: [person.playerCode ?? "", person.category, person.club ?? "", person.location ?? "", ...(person.competitionTypes ?? [])],
    meta: [person.club, person.location, person.illustrative && "Hồ sơ minh họa"].filter(Boolean).join(" · "),
    url: person.profileUrl || libraryRecordPath("athlete", person.id),
  })),
  ...coaches.map<SearchItem>((person) => ({
    id: `coach-${person.id}`,
    type: "page",
    label: "Huấn luyện viên",
    title: person.name,
    description: person.experience,
    keywords: ["huấn luyện viên", person.coachCode ?? "", person.certification ?? "", person.organization ?? "", person.location ?? "", ...(person.specialties ?? [])],
    meta: [person.organization, person.location, "Hồ sơ minh họa"].filter(Boolean).join(" · "),
    url: person.profileUrl || libraryRecordPath("coach", person.id),
  })),
  ...Object.values(pages).map<SearchItem>((page) => ({
    id: `page-${page.id}`, type: "page", title: page.title, description: page.description, keywords: [page.crumb, page.eyebrow], url: `/${page.file}`,
  })),
  { id: "page-home", type: "page", title: "Trang chủ", keywords: ["Liên đoàn Pickleball Việt Nam", "VPF"], url: "/index.html" },
  ...federationNav.filter(({ href }) => href !== "#gioi-thieu").map<SearchItem>(({ href, label }) => ({
    id: `federation-${href.slice(1)}`, type: "page", title: label, meta: "Liên đoàn", keywords: [label, "Liên đoàn Pickleball Việt Nam"], url: `/liendoan.html${href}`,
  })),
  ...technicalSections.map<SearchItem>((section) => ({
    id: `section-${section.id}`, type: "document", title: section.title, meta: "Chuyên môn", url: `/chuyenmon.html#${section.id}`,
  })),
  ...[brandSection, memberSection, teamsSection, membershipSection].map<SearchItem>((section) => ({
    id: `section-${section.id}`, type: "page", title: section.title, meta: "Thư viện & Cộng đồng", url: `/thu-vien-cong-dong.html#${section.id}`,
  })),
  { id: "section-anh-video", type: "page", title: "Ảnh & Video", keywords: ["thư viện truyền thông"], url: "/thu-vien-cong-dong.html#anh-video" },
  ...sponsors.map<SearchItem>((sponsor) => ({
    id: `sponsor-${sponsor.id}`, type: "page", label: "Nhà tài trợ", title: sponsor.name, description: sponsor.intro, meta: "Hồ sơ minh họa", url: sponsorPath(sponsor.slug),
  })),
]
