import { useState } from "react"
import { mediaVideos, playableVideo, type MediaVideo } from "../../data/media.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"

export function VideoGallery() {
  const featured = mediaVideos.find((item) => item.featured) ?? mediaVideos[0]
  const others = mediaVideos.filter((item) => item.id !== featured?.id)
  const [active, setActive] = useState<MediaVideo | null>(null)
  const playing = active ? playableVideo(active.videoUrl) : null

  return (
    <section className="bg-navy py-14 text-white md:py-16" aria-labelledby="video-pickleball">
      <div className="page-wrap">
        <h2 id="video-pickleball" className="text-3xl font-semibold tracking-tight md:text-4xl">
          Pickleball qua từng thước phim
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80">
          Khám phá các khoảnh khắc thi đấu, hoạt động và câu chuyện Pickleball qua video.
        </p>
        <p className="mt-2 text-sm text-white/70">Chưa có tệp video để phát. Ảnh bìa chỉ là minh họa.</p>

        <div className="media-videos mt-8">
          {featured ? <VideoPoster video={featured} large onPlay={setActive} /> : null}
          <div className="media-video-side">
            {others.map((video) => (
              <VideoPoster key={video.id} video={video} onPlay={setActive} />
            ))}
          </div>
        </div>
      </div>

      {active && playing ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4">
          <div className="w-full max-w-4xl" role="dialog" aria-modal="true" aria-label={active.title}>
            <div className="mb-3 flex justify-end">
              <button type="button" className="rounded-[10px] border border-white/30 px-4 py-2 text-sm text-white" onClick={() => setActive(null)}>
                Đóng
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl bg-black">
              {playing.kind === "youtube" ? (
                <iframe
                  src={sitePath(playing.src)}
                  title={active.title}
                  className="h-full w-full"
                  allow="fullscreen"
                  allowFullScreen
                />
              ) : (
                <video src={sitePath(playing.src)} controls className="h-full w-full" preload="metadata">
                  <track kind="captions" />
                </video>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function VideoPoster({
  video,
  large = false,
  onPlay,
}: {
  video: MediaVideo
  large?: boolean
  onPlay: (video: MediaVideo) => void
}) {
  const source = playableVideo(video.videoUrl)
  const visual = (
    <>
      <img
        src={sitePath(video.thumbnail)}
        alt={video.imageAlt}
        loading="lazy"
        className={cx("aspect-video w-full object-cover", video.imagePosition)}
      />
      <span className="absolute inset-0 flex items-end bg-ink/25 p-4">
        <span>
          <span className="block text-sm font-semibold text-white">{video.title}</span>
          {video.duration ? <span className="mt-1 block text-xs text-white/80">{video.duration}</span> : null}
          {source ? null : <span className="mt-1 block text-xs text-white/80">Đang cập nhật video</span>}
        </span>
      </span>
    </>
  )

  if (!source) {
    return (
      <article className={cx("relative overflow-hidden rounded-2xl", large && "min-h-0")}>
        {visual}
      </article>
    )
  }

  return (
    <button type="button" className="group relative block w-full overflow-hidden rounded-2xl text-left" onClick={() => onPlay(video)}>
      {visual}
      <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-sm font-semibold text-ink">
        Phát
      </span>
    </button>
  )
}
