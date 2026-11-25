import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import {
  isMediaAlbum,
  isMediaImage,
  type MediaItem,
} from "../../data/media.mock"
import { MediaLightbox, type LightboxShot } from "./MediaLightbox"
import { VideoViewer } from "./VideoViewer"

export type MediaViewerItem = {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  thumbnail?: string
}

type GalleryProps = {
  items: MediaViewerItem[]
  initialIndex?: number
  title?: string
  description?: string
  isOpen?: boolean
  onClose: () => void
  dismissOnBackdrop?: boolean
}

type MediaItemProps = {
  item: MediaItem
  onClose: () => void
}

export function MediaViewer(props: GalleryProps | MediaItemProps) {
  if ("item" in props) return <MediaItemViewer item={props.item} onClose={props.onClose} />
  return <GalleryViewer {...props} />
}

function GalleryViewer({
  items,
  initialIndex = 0,
  title,
  description,
  isOpen = true,
  onClose,
  dismissOnBackdrop = true,
}: GalleryProps) {
  const [index, setIndex] = useState(clampIndex(initialIndex, items.length))

  useEffect(() => {
    setIndex(clampIndex(initialIndex, items.length))
  }, [initialIndex, items])

  if (!isOpen || items.length === 0) return null

  const shots: LightboxShot[] = items.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    caption: item.description?.trim() || item.title?.trim() || item.alt,
    title: item.title,
    description: item.description,
    thumbnail: item.thumbnail,
  }))

  return createPortal(
    <MediaLightbox
      shots={shots}
      index={index}
      onIndex={setIndex}
      onClose={onClose}
      galleryTitle={title}
      galleryDescription={description}
      dismissOnBackdrop={dismissOnBackdrop}
    />,
    document.body,
  )
}

function MediaItemViewer({ item, onClose }: MediaItemProps) {
  if (isMediaImage(item)) {
    return (
      <GalleryViewer
        items={[
          {
            id: item.id,
            src: item.thumbnail,
            alt: item.imageAlt,
            title: item.title,
            description: item.description,
            thumbnail: item.thumbnail,
          },
        ]}
        title={item.title}
        description={item.description}
        onClose={onClose}
      />
    )
  }

  if (isMediaAlbum(item)) {
    return (
      <GalleryViewer
        items={item.images.map((shot) => ({
          id: shot.id,
          src: shot.src,
          alt: shot.alt,
          title: shot.caption || item.title,
          description: shot.caption,
          thumbnail: shot.src,
        }))}
        title={item.title}
        description={item.description}
        onClose={onClose}
      />
    )
  }

  return <VideoViewer video={item} onClose={onClose} />
}

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0
  return Math.min(Math.max(index, 0), length - 1)
}
