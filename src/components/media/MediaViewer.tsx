import { useState } from "react"
import { createPortal } from "react-dom"
import type { MediaItem } from "../../data/media.mock"
import { AlbumViewer } from "./AlbumViewer"
import { MediaLightbox } from "./MediaLightbox"
import { VideoViewer } from "./VideoViewer"

export function MediaViewer({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const [albumIndex, setAlbumIndex] = useState<number | null>(null)

  if (item.type === "video") {
    return createPortal(<VideoViewer video={item} onClose={onClose} />, document.body)
  }

  if (item.type === "image") {
    const shot = {
      id: item.id,
      src: item.thumbnail,
      alt: item.imageAlt,
      title: item.title,
      caption: item.description,
    }
    return createPortal(
      <MediaLightbox shots={[shot]} index={0} onIndex={() => {}} onClose={onClose} dismissOnBackdrop />,
      document.body,
    )
  }

  return createPortal(
    <>
      <AlbumViewer
        album={item}
        paused={albumIndex !== null}
        onClose={onClose}
        onOpenShot={(_shot, index) => setAlbumIndex(index)}
      />
      {albumIndex !== null ? (
        <MediaLightbox
          shots={item.images.map((shot) => ({ ...shot, title: item.title }))}
          index={albumIndex}
          onIndex={setAlbumIndex}
          onClose={() => setAlbumIndex(null)}
          dismissOnBackdrop
          lockBodyScroll={false}
        />
      ) : null}
    </>,
    document.body,
  )
}
