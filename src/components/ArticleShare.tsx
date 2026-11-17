import { useEffect, useId, useState } from "react"
import { Link, MessageCircle } from "lucide-react"
import { useTranslation } from "../i18n"
import { Button } from "./Button"

async function copyLink(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    const previousFocus = document.activeElement
    const field = document.createElement("textarea")
    field.value = url
    field.readOnly = true
    field.className = "fixed inset-0 size-px opacity-0"
    document.body.append(field)

    try {
      field.focus({ preventScroll: true })
      field.select()
      return document.execCommand("copy")
    } catch {
      return false
    } finally {
      field.remove()
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
    }
  }
}

const actionClass = "rounded-[10px] whitespace-nowrap hover:bg-paper"

export function ArticleShare({ title, url }: { title: string; url: string }) {
  const { t } = useTranslation()
  const labelId = useId()
  const [notice, setNotice] = useState<{ message: string; manual?: boolean } | null>(null)
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"][href]')?.href
  const articleUrl = canonical || new URL(url, window.location.href).href

  useEffect(() => {
    if (!notice || notice.manual) return
    const timer = window.setTimeout(() => setNotice(null), 5500)
    return () => window.clearTimeout(timer)
  }, [notice])

  const copy = async (forZalo = false) => {
    const copied = await copyLink(articleUrl)
    setNotice({
      message: copied
        ? forZalo
          ? "Đã sao chép liên kết. Mở Zalo và dán vào cuộc trò chuyện."
          : "Đã sao chép liên kết"
        : forZalo
          ? "Hãy sao chép liên kết bên dưới và dán vào cuộc trò chuyện Zalo."
          : "Không thể tự động sao chép. Hãy sao chép liên kết bên dưới.",
      manual: !copied,
    })
  }

  return (
    <div className="mt-8 bg-white" role="group" aria-labelledby={labelId}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p id={labelId} className="text-sm font-semibold text-ink">{t("Chia sẻ bài viết")}</p>
        <div className="flex flex-wrap gap-1">
          <Button variant="text" className={actionClass} onClick={() => void copy()}>
            <Link className="size-4" aria-hidden />
            {t("Sao chép liên kết")}
          </Button>
          <Button
            variant="text"
            className={actionClass}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("Chia sẻ qua Facebook")}
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9a20 20 0 0 0-2.4-.1c-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.7v8z" />
            </svg>
            Facebook
          </Button>
          <Button variant="text" className={actionClass} onClick={() => void copy(true)} aria-label={t("Chia sẻ qua Zalo")}>
            <span className="relative grid size-4 place-items-center" aria-hidden="true">
              <MessageCircle className="absolute inset-0 size-4" />
              <span className="-translate-y-px text-[8px] font-bold">Z</span>
            </span>
            Zalo
          </Button>
          <Button
            variant="text"
            className={actionClass}
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("Chia sẻ qua X")}
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-7.4L5.7 22H2.5l7.4-8.5L2.1 2h6.4l4.4 6.8L18.9 2Zm-1.1 18h1.7L7.5 3.9H5.7z" />
            </svg>
            X
          </Button>
        </div>
      </div>
      <div role="status" aria-atomic="true">
        {notice && (
          <p className={notice.manual
            ? "mt-2 text-sm text-muted"
            : "pointer-events-none fixed inset-x-4 bottom-5 z-50 mx-auto w-fit max-w-[calc(100%-2rem)] rounded-[10px] bg-ink px-4 py-3 text-sm font-medium text-white"}>
            {t(notice.message)}
          </p>
        )}
      </div>
      {notice?.manual ? (
        <input
          aria-label={t("Liên kết bài viết")}
          className="mt-2 min-h-11 w-full rounded-[10px] border border-line px-3 text-sm"
          type="url"
          value={articleUrl}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
        />
      ) : null}
    </div>
  )
}
