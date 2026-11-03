import { Mail, MapPin, Phone } from "lucide-react"
import { navigation } from "../data/navigation"
import { sitePath } from "../lib/site"
import { site, socialChannels } from "../data/site"
import { Logo } from "./Logo"

const discoverIds = ["home", "federation", "news", "tournaments", "partners"]
const categoryIds = ["expertise", "community", "media"]

const discoverLinks = linksById(discoverIds)
const categoryLinks = [
  ...linksById(categoryIds),
  { id: "calendar", label: "Lịch thi đấu", href: "/giaidau.html" },
]

const anchorId: Record<string, string> = {
  expertise: "chuyen-mon",
  community: "cong-dong",
  media: "media",
}

export function Footer() {
  const office = site.offices[0]
  const addressUnpublished = !office || office.address.includes("sẽ được công bố")

  return (
    <footer className="bg-[#18191C] text-white">
      <div className="page-wrap py-16 min-[1200px]:py-20">
        <div className="footer-grid">
          <div id="lien-doan">
            <a href="#dau-trang" aria-label="Về đầu trang">
              <Logo variant="white" />
            </a>
            <p className="mt-5 text-base font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-[#B6B8BD]">{site.englishName}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#B6B8BD]">
              Kết nối cộng đồng, phát triển phong trào và đồng hành cùng Pickleball Việt Nam.
            </p>
            <ul className="mt-5 flex gap-2" aria-label="Mạng xã hội">
              {socialChannels.map((channel) => (
                <li key={channel.id}>
                  <span
                    role="img"
                    aria-label={`${channel.label} — đường dẫn chính thức chưa được công bố`}
                    title="Đường dẫn chính thức chưa được công bố"
                    className="grid size-9 place-items-center rounded-lg border border-[#35373B] text-white transition-colors duration-200 hover:bg-brand/15 motion-reduce:transition-none"
                  >
                    <SocialGlyph name={channel.id} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav-pair">
            <FooterNav title="Khám phá" links={discoverLinks} />
            <FooterNav title="Chuyên mục" links={categoryLinks} />
          </div>

          <div id="lien-he">
            <h2 className="text-[15px] font-semibold">Liên hệ</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#B6B8BD]">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white" aria-hidden />
                <span>
                  <span className="block text-white">
                    Trụ sở: {office ? `${office.city}, Việt Nam` : "Chưa công bố"}
                  </span>
                  {addressUnpublished ? <span className="text-xs">Địa điểm minh họa</span> : null}
                  {!addressUnpublished && office ? <span className="block">{office.address}</span> : null}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-white" aria-hidden />
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-brand">
                    {site.email}
                  </a>
                ) : (
                  <span>Email: Chưa công bố</span>
                )}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-white" aria-hidden />
                <span>Hotline: {site.hotline}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#35373B]">
        <div className="page-wrap flex flex-col gap-3 py-5 text-[13px] leading-relaxed text-[#B6B8BD] md:flex-row md:items-center md:justify-between">
          <div>
            <p>© 2026 {site.englishName}. All rights reserved.</p>
            <p className="mt-1 text-xs">
              Ảnh sân ngoài trời:{" "}
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
            <span>Chính sách bảo mật</span>
            <span>Điều khoản sử dụng</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterNav({
  title,
  links,
}: {
  title: string
  links: { id: string; label: string; href: string }[]
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[15px] font-semibold">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3.5">
        {links.map((item) => (
          <li key={item.id}>
            <a
              id={anchorId[item.id]}
              href={sitePath(item.href)}
              className="text-sm text-[#B6B8BD] transition-colors duration-200 hover:text-brand motion-reduce:transition-none"
            >
              {item.label}
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

function SocialGlyph({ name }: { name: "facebook" | "youtube" | "instagram" }) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path
          fill="currentColor"
          d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.4 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z"
        />
      </svg>
    )
  }
  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path
          fill="currentColor"
          d="M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM10.2 15.4V9l5.2 3.2-5.2 3.2Z"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="currentColor"
        d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Z"
      />
      <path
        fill="currentColor"
        d="M16.7 3H7.3A4.3 4.3 0 0 0 3 7.3v9.4A4.3 4.3 0 0 0 7.3 21h9.4a4.3 4.3 0 0 0 4.3-4.3V7.3A4.3 4.3 0 0 0 16.7 3Zm2.7 13.7a2.7 2.7 0 0 1-2.7 2.7H7.3a2.7 2.7 0 0 1-2.7-2.7V7.3A2.7 2.7 0 0 1 7.3 4.6h9.4a2.7 2.7 0 0 1 2.7 2.7v9.4Z"
      />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" />
    </svg>
  )
}
