import { useTranslation } from "../../i18n"
import { ArrowUpRight } from "lucide-react"
import { federationIntro } from "../../data/aboutFederation.mock"
import { sitePath } from "../../lib/site"
import { Button } from "../Button"
import { PageHero } from "../PageHero"

export function FedIntro() {
  const { t } = useTranslation()

  return (
    <PageHero
      id={federationIntro.id}
      titleId="gioi-thieu-tieu-de"
      title="Liên đoàn Pickleball Việt Nam"
      interactivePattern
      breadcrumbs={[{ label: "Trang chủ", href: "/index.html" }, { label: "Liên đoàn" }]}
      description={
        <>
          {t("Liên đoàn Pickleball Việt Nam là đầu mối")} <strong className="text-vpf-gold-wash">{t("kết nối")}</strong>{" "}
          {t("người chơi, câu lạc bộ và các hoạt động phong trào trên cả nước. Liên đoàn theo đuổi việc")}{" "}
          <strong className="text-vpf-gold-wash">{t("phát triển")}</strong> {t("pickleball tại Việt Nam theo hướng")}{" "}
          <strong className="text-vpf-gold-wash">{t("chuyên nghiệp")}</strong>
          {t(", nâng dần chuẩn mực thi đấu và tạo vị thế để môn thể thao được nhìn nhận rộng hơn. Vai trò của VPF là gắn cộng đồng lại, mở đường cho phong trào và")}{" "}
          <strong className="text-vpf-gold-wash">{t("đại diện")}</strong> {t("pickleball Việt Nam khi sân chơi vươn ra khu vực.")}
        </>
      }
      action={
        <Button href="#lich-su">
          {t("Khám phá hành trình VPF")}
          <ArrowUpRight className="size-4" aria-hidden />
        </Button>
      }
      markOverlay={
        <img src={sitePath("/brand/logo-horizontal-white.svg")} alt="" width={588} height={219} draggable={false} />
      }
    />
  )
}
