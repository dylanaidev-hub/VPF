import { useEffect, useRef, useState } from "react"
import { Maximize, Minimize2, Pause, Play, Volume2, VolumeX } from "lucide-react"
import type { LiveArena } from "../data/live"
import { broadcastStatusLabel, classifyStream, padScore, presentBroadcast, youtubeCommand } from "../lib/live"
import { cx } from "../lib/cx"
import { sitePath } from "../lib/site"

export function LiveSection({ arena }: { arena: LiveArena }) {
  const matches = arena.matches.map((match) => presentBroadcast(match, arena.tournaments, arena.teams))
  const hasLive = matches.some((item) => item.status === "live")
  const [selectedId, setSelectedId] = useState(
    () => matches.find((item) => item.status === "live")?.id ?? matches[0]?.id ?? "",
  )
  const [muted, setMuted] = useState(true)
  const selected = matches.find((item) => item.id === selectedId) ?? matches[0] ?? null

  return (
    <section id="truc-tiep" data-section className="vpf-arena" aria-labelledby="truc-tiep-tieu-de">
      <div className="page-wrap">
        <header className="vpf-arena-head">
          <div className="min-w-0">
            <h2 id="truc-tiep-tieu-de">VPF LIVE ARENA</h2>
            {selected ? (
              <div key={selected.id} className="vpf-arena-swap">
                <p className="vpf-arena-tournament">{selected.tournamentName}</p>
                <p className="vpf-arena-status">
                  {broadcastStatusLabel[selected.status]}
                  <span aria-hidden> · </span>
                  COURT {selected.court}
                </p>
              </div>
            ) : null}
            <p className="vpf-arena-note">
              Lịch, điểm số và hình ảnh là dữ liệu minh họa, không phải kết quả chính thức.
            </p>
          </div>
          {hasLive ? (
            <p className="vpf-arena-now">
              <span className="vpf-live-dot" aria-hidden />
              LIVE NOW
            </p>
          ) : null}
        </header>

        {selected ? (
          <>
            <LivePlayer match={selected} muted={muted} onToggleMute={() => setMuted((value) => !value)} />
            <div className="vpf-arena-rundown" role="list" aria-label="Lịch phát sóng">
              {matches.map((item) => {
                const pressed = item.id === selected.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="listitem"
                    className={cx("vpf-arena-row", `is-${item.status}`, pressed && "is-selected")}
                    aria-pressed={pressed}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <span className="vpf-arena-row-time">{item.time}</span>
                    <span className="vpf-arena-row-court">COURT {item.court}</span>
                    <span className="vpf-arena-row-meta">
                      <span className="vpf-arena-row-name">{item.name}</span>
                      <span className="vpf-arena-row-sub">
                        {item.stage} · {item.tournamentName}
                      </span>
                    </span>
                    <span className={cx("vpf-arena-pill", `is-${item.status}`)}>{broadcastStatusLabel[item.status]}</span>
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <p className="vpf-arena-empty">Chưa có lịch phát sóng.</p>
        )}
      </div>
    </section>
  )
}

function LivePlayer({
  match,
  muted,
  onToggleMute,
}: {
  match: ReturnType<typeof presentBroadcast>
  muted: boolean
  onToggleMute: () => void
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const youtubeRef = useRef<HTMLIFrameElement>(null)
  const source = classifyStream(match.streamUrl)
  const [playing, setPlaying] = useState(false)
  const [embed, setEmbed] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [seenId, setSeenId] = useState(match.id)
  if (seenId !== match.id) {
    setSeenId(match.id)
    setPlaying(false)
    setEmbed(false)
    setNotice(null)
  }

  useEffect(() => {
    videoRef.current?.pause()
  }, [match.id])

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
    if (embed && source?.kind === "youtube") youtubeCommand(youtubeRef.current, muted ? "mute" : "unMute")
  }, [muted, embed, source?.kind])

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === frameRef.current)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  async function onPlay() {
    if (!source) {
      setPlaying(false)
      setNotice("Chưa có nguồn phát sóng cho trận này.")
      return
    }
    if (source.kind === "hls") {
      setPlaying(false)
      setNotice("Nguồn HLS đã được ghi nhận. Trình phát sẽ gắn khi tích hợp luồng .m3u8.")
      return
    }
    if (source.kind === "youtube") {
      setNotice(null)
      if (!embed) {
        setEmbed(true)
        setPlaying(true)
        return
      }
      youtubeCommand(youtubeRef.current, playing ? "pauseVideo" : "playVideo")
      setPlaying((value) => !value)
      return
    }
    const video = videoRef.current
    if (!video) return
    if (!video.paused) {
      video.pause()
      setPlaying(false)
      return
    }
    video.muted = muted
    try {
      await video.play()
      setPlaying(true)
      setNotice(null)
    } catch {
      setPlaying(false)
      setNotice("Không phát được nguồn video.")
    }
  }

  async function onFullscreen() {
    const node = frameRef.current
    if (!node) return
    try {
      if (document.fullscreenElement === node) await document.exitFullscreen()
      else await node.requestFullscreen()
    } catch {
      setNotice("Trình duyệt không mở được toàn màn hình.")
    }
  }

  return (
    <div ref={frameRef} className={cx("vpf-arena-player", playing && "is-playing")}>
      <img
        src={sitePath(match.thumbnail)}
        alt={match.thumbnailAlt}
        className={cx("vpf-arena-still", (playing || embed) && "is-hidden")}
      />
      {source?.kind === "youtube" && embed ? (
        <iframe
          ref={youtubeRef}
          className="vpf-arena-still"
          src={`${source.src}&autoplay=1&mute=1&playsinline=1&enablejsapi=1`}
          title={`Video demo: ${match.name}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : null}
      {source?.kind === "file" ? (
        <video
          ref={videoRef}
          src={source.src}
          className={cx("vpf-arena-still", !playing && "is-hidden")}
          playsInline
          muted={muted}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      ) : null}

      <p className={cx("vpf-arena-flag", `is-${match.status}`)}>
        {match.status === "live" ? <span className="vpf-live-dot" aria-hidden /> : null}
        {broadcastStatusLabel[match.status]}
      </p>

      <div className="vpf-live-controls">
        {embed && playing ? (
          <button type="button" className="vpf-live-icon" aria-label={`Tạm dừng ${match.name}`} onClick={onPlay}>
            <Pause className="size-5" aria-hidden />
          </button>
        ) : null}
        <button
          type="button"
          className="vpf-live-icon"
          aria-pressed={muted}
          aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
          onClick={onToggleMute}
        >
          {muted ? <VolumeX className="size-5" aria-hidden /> : <Volume2 className="size-5" aria-hidden />}
        </button>
        <button type="button" className="vpf-live-icon" aria-label={fullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"} onClick={onFullscreen}>
          {fullscreen ? <Minimize2 className="size-5" aria-hidden /> : <Maximize className="size-5" aria-hidden />}
        </button>
      </div>

      {embed && playing ? null : (
        <div className="vpf-live-stage">
          <div className="vpf-arena-playpad">
            <button type="button" className="vpf-live-play" aria-label={playing ? `Tạm dừng ${match.name}` : `Phát ${match.name}`} onClick={onPlay}>
              {playing ? <Pause className="size-7" aria-hidden /> : <Play className="size-7" aria-hidden />}
            </button>
          </div>

          <div key={match.id} className="vpf-arena-board vpf-arena-swap" aria-label="Bảng điểm minh họa">
            {notice ? (
              <p role="status" className="vpf-arena-notice">
                {notice}
              </p>
            ) : null}
            <p className="vpf-arena-court">
              COURT {match.court}
              <span aria-hidden> | </span>
              {match.stage}
            </p>
            <p className="vpf-arena-set">SET {match.set}</p>
            <p className="vpf-arena-side">{match.homeName}</p>
            <p className="vpf-arena-score">{padScore(match.homeScore)}</p>
            <p className="vpf-arena-side">{match.awayName}</p>
            <p className="vpf-arena-score">{padScore(match.awayScore)}</p>
            <p className="vpf-arena-mock">Điểm số minh họa, không phải kết quả chính thức.</p>
          </div>
        </div>
      )}
    </div>
  )
}
