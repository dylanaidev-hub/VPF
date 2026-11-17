import { useTranslation } from "../../i18n"
import { playableVideo, type MediaVideo } from "../../data/media.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { Dialog } from "../Dialog"

export function VideoViewer({ video, onClose }: { video: MediaVideo; onClose: () => void }) {
  const { t } = useTranslation()
  const source = playableVideo(video.videoUrl)

  return (
    <Dialog open title={video.title} onClose={onClose}>
      {source ? (
        <p className="mb-3 text-sm leading-relaxed text-muted">{t(video.description)}</p>
      ) : null}
      {source?.kind === "youtube" ? (
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe src={sitePath(source.src)} title={t(video.title)} className="h-full w-full" allow="fullscreen" allowFullScreen />
        </div>
      ) : null}
      {source?.kind === "file" ? (
        <video src={sitePath(source.src)} controls preload="metadata" className="aspect-video w-full rounded-xl bg-black">
          <track kind="captions" />
        </video>
      ) : null}
      {source ? null : (
        <figure>
          <img
            src={sitePath(video.thumbnail)}
            alt={t(video.imageAlt)}
            className={cx("aspect-video w-full rounded-xl object-cover", video.imagePosition)}
          />
          <figcaption className="mt-3 space-y-1 text-sm text-muted">
            {video.illustrative ? <p className="font-medium text-brand-strong">{t("Video minh họa")}</p> : null}
            <p>{t("Chưa có tệp hoặc nguồn phát hợp lệ.")}</p>
          </figcaption>
        </figure>
      )}
    </Dialog>
  )
}
