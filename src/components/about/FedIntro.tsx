import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { VPFStarPattern } from "../VPFStarPattern"
import { federationIntro } from "../../data/aboutFederation.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useReveal } from "../../lib/useReveal"

export function FedIntro() {
  const reveal = useReveal<HTMLElement>()
  const [hot, setHot] = useState(false)

  return (
    <section
      id={federationIntro.id}
      ref={reveal.ref}
      className={cx("fed-brand", reveal.shown && "is-in", hot && "is-hot")}
      aria-labelledby="gioi-thieu-tieu-de"
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
    >
      <div className="page-wrap fed-brand-grid">
        <div className="fed-brand-copy">
          <p className="fed-brand-kicker">Về liên đoàn</p>
          <h1 id="gioi-thieu-tieu-de">Liên đoàn Pickleball Việt Nam</h1>
          <p>
            Liên đoàn Pickleball Việt Nam là đầu mối <span>kết nối</span> người chơi, câu lạc bộ và các
            hoạt động phong trào trên cả nước. Liên đoàn theo đuổi việc <span>phát triển</span> pickleball
            tại Việt Nam theo hướng <span>chuyên nghiệp</span>, nâng dần chuẩn mực thi đấu và tạo vị thế để
            môn thể thao được nhìn nhận rộng hơn. Vai trò của VPF là gắn cộng đồng lại, mở đường cho phong
            trào và <span>đại diện</span> pickleball Việt Nam khi sân chơi vươn ra khu vực.
          </p>
          <a className="fed-brand-cta" href="#lich-su">
            Khám phá hành trình VPF
            <ArrowUpRight aria-hidden />
          </a>
        </div>

        <div className="fed-brand-stage">
          <VPFStarPattern />
          <img
            className="fed-brand-logo"
            src={sitePath("/brand/logo-horizontal-white.svg")}
            alt="Logo Liên đoàn Pickleball Việt Nam"
            width={588}
            height={219}
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
