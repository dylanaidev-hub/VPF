import { useTranslation } from "../i18n"
import { Mail, MapPin, Phone } from "lucide-react"
import { federationContactInfo } from "../data/contact"
import { navigation } from "../data/navigation"
import { site } from "../data/site"
import { sitePath } from "../lib/site"
import { BackToTop } from "./BackToTop"
import { Logo } from "./Logo"
import { SocialLinks } from "./SocialLinks"

const discoverIds = ["home", "federation", "news", "tournaments", "partners"]
const categoryIds = ["expertise", "library"]

const discoverLinks = linksById(discoverIds)
const categoryLinks = [
  ...linksById(categoryIds),
  { id: "calendar", label: "Lịch thi đấu", href: "/giaidau.html" },
]

const anchorId: Record<string, string> = {
  expertise: "chuyen-mon",
  library: "thu-vien-cong-dong",
}

export function Footer() {
  const { t } = useTranslation()
  const contact = federationContactInfo
  const office = site.offices[0]
  const addressLine = contact.address
  const showDemoHint = contact.isDemo

  return (
    <>
    <footer className="bg-signal text-white">
      <div className="page-wrap py-16 min-[1200px]:py-20">
        <div className="footer-grid">
          <div id="lien-doan">
            <a href={sitePath("/index.html")} className="brand-home" aria-label={t("Về trang chủ VPF")}>
              <Logo variant="white" />
            </a>
            <p className="mt-5 text-base font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-vpf-gold-wash">{site.englishName}</p>
            <p className="mt-3 text-sm leading-relaxed text-vpf-gold-wash">
              {t("Kết nối cộng đồng, phát triển phong trào và đồng hành cùng Pickleball Việt Nam.")}
            </p>
            <SocialLinks links={contact.socialLinks} tone="dark" className="mt-5" />
          </div>

          <div className="footer-nav-pair">
            <FooterNav title={t("Khám phá")} links={discoverLinks} />
            <FooterNav title={t("Chuyên mục")} links={categoryLinks} />
          </div>

          <div id="lien-he">
            <h2 className="text-[15px] font-semibold">{t("Liên hệ")}</h2>
            <ul className="mt-4 space-y-3 text-sm text-vpf-gold-wash">
              {(addressLine || office) && (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-white" aria-hidden />
                  <span>
                    {addressLine ? (
                      <span className="block text-white">{addressLine}</span>
                    ) : (
                      <span className="block text-white">
                        {t("footer.office", {
                          location: office ? `${office.city}, ${t("Việt Nam")}` : t("Chưa công bố"),
                        })}
                      </span>
                    )}
                    {showDemoHint ? <span className="text-xs">{t("Địa điểm minh họa")}</span> : null}
                  </span>
                </li>
              )}
              {contact.email ? (
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-white" aria-hidden />
                  {contact.isDemo ? (
                    <span>{contact.email}</span>
                  ) : (
                    <a href={`mailto:${contact.email}`} className="transition-colors duration-200 hover:text-brand">
                      {contact.email}
                    </a>
                  )}
                </li>
              ) : (
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-white" aria-hidden />
                  <span>{t("Email: Chưa công bố")}</span>
                </li>
              )}
              {contact.phone ? (
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-white" aria-hidden />
                  <span>Hotline: {contact.phone}</span>
                </li>
              ) : (
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-white" aria-hidden />
                  <span>Hotline: {t("Chưa công bố")}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/25">
        <div className="page-wrap flex flex-col gap-3 py-5 text-[13px] leading-relaxed text-vpf-gold-wash md:flex-row md:items-center md:justify-between">
          <div>
            <p>© 2026 {site.englishName}. All rights reserved.</p>
            <p className="mt-1 text-xs">
              {t("Ảnh sân ngoài trời:")}{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Pickleball_Pros.jpg"
                className="underline decoration-white/30 underline-offset-2 transition-colors duration-200 hover:text-brand"
              >
                Pickleball Pros, Wikimedia Commons
              </a>
              .
            </p>
          </div>
          <p className="flex gap-4">
            <span>{t("Chính sách bảo mật")}</span>
            <span>{t("Điều khoản sử dụng")}</span>
          </p>
        </div>
      </div>
    </footer>
    <BackToTop />
    </>
  )
}

function FooterNav({
  title,
  links,
}: {
  title: string
  links: { id: string; label: string; href: string }[]
}) {
  const { t } = useTranslation()
  return (
    <nav aria-label={t(title)}>
      <h2 className="text-[15px] font-semibold">{t(title)}</h2>
      <ul className="mt-4 flex flex-col gap-3.5">
        {links.map((item) => (
          <li key={item.id}>
            <a
              id={anchorId[item.id]}
              href={sitePath(item.href)}
              className="text-sm text-vpf-gold-wash transition-colors duration-200 hover:text-brand motion-reduce:transition-none"
            >
              {t(item.label)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function linksById(ids: string[]) {
  return ids.flatMap((id) => {
    const item = navigation.find((entry) => entry.id === id)
    return item ? [{ id: item.id, label: item.label, href: item.href }] : []
  })
}
