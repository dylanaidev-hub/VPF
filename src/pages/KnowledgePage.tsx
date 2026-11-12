import { PageHeader } from "../components/PageHeader"
import { SiteLayout } from "../components/SiteLayout"
import { ExpertiseNav } from "../components/knowledge/ExpertiseNav"
import { PersonnelDirectory } from "../components/knowledge/PersonnelDirectory"
import { RulesSection } from "../components/knowledge/RulesSection"
import { TrainingPrograms } from "../components/knowledge/TrainingPrograms"
import { coachSection, coaches, refereeSection, referees } from "../data/expertise.mock"

export function KnowledgePage() {
  return (
    <SiteLayout>
      <PageHeader
        breadcrumb={[{ label: "Trang chủ", href: "/index.html" }, { label: "Chuyên môn" }]}
        eyebrow="Chuyên môn"
        title="Chuyên môn Pickleball"
        titleId="chuyen-mon-tieu-de"
        description="Luật thi đấu, hệ thống trọng tài, huấn luyện viên và chương trình đào tạo của Liên đoàn Pickleball Việt Nam."
        disclaimer="Nội dung trên trang đang dùng dữ liệu minh họa để duyệt giao diện — chưa phải tài liệu hay danh mục chính thức."
      />
      <ExpertiseNav />
      <RulesSection />
      <PersonnelDirectory
        id={refereeSection.id}
        title={refereeSection.title}
        description={refereeSection.description}
        searchLabel={refereeSection.searchLabel}
        empty={refereeSection.empty}
        emptyFiltered={refereeSection.emptyFiltered}
        illustrativeNote={refereeSection.illustrativeNote}
        viewAllLabel={refereeSection.viewAllLabel}
        collapseLabel={refereeSection.collapseLabel}
        members={referees}
        variant="referee"
      />
      <PersonnelDirectory
        id={coachSection.id}
        title={coachSection.title}
        description={coachSection.description}
        searchLabel={coachSection.searchLabel}
        empty={coachSection.empty}
        emptyFiltered={coachSection.emptyFiltered}
        illustrativeNote={coachSection.illustrativeNote}
        viewAllLabel={coachSection.viewAllLabel}
        collapseLabel={coachSection.collapseLabel}
        members={coaches}
        variant="coach"
      />
      <TrainingPrograms />
    </SiteLayout>
  )
}
