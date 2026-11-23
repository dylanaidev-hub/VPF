import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig, type Plugin } from "vite"
import { news } from "./src/data/news.mock.ts"
import { getNewsDetailUrl, isNewsDetailPath, newsDetailPage } from "./src/lib/newsRoute.ts"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function newsArticlePages(root: string): Plugin {
  let outDir: string
  let base: string
  return {
    name: "vpf-news-articles",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      base = config.base
    },
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = req.url?.split("?")[0] ?? ""
        const prefix = base !== "/" && pathname.startsWith(base) ? base.slice(0, -1) : ""
        const route = pathname.slice(prefix.length)
        if (route !== newsDetailPage && isNewsDetailPath(route)) req.url = prefix + newsDetailPage
        if (/^\/hop-tac\/[^/]+\/?$/.test(pathname)) req.url = "/hop-tac.html"
        next()
      })
    },
    closeBundle() {
      const templatePath = resolve(outDir, newsDetailPage.slice(1))
      const template = readFileSync(templatePath, "utf8")
      for (const article of news) {
        const canonical = escapeHtml(base + getNewsDetailUrl(article).slice(1))
        const dir = resolve(outDir, "tin-tuc", article.slug)
        mkdirSync(dir, { recursive: true })
        const html = template
          .replace(
            "<title data-article-title>Bài viết – Liên đoàn Pickleball Việt Nam</title>",
            `<title>${escapeHtml(article.title)} – Liên đoàn Pickleball Việt Nam</title>`,
          )
          .replace(
            'content="Tin tức Liên đoàn Pickleball Việt Nam."',
            `content="${escapeHtml(article.excerpt)}"`,
          )
          .replace("</head>", `<link rel="canonical" href="${canonical}" />\n  </head>`)
        writeFileSync(resolve(dir, "index.html"), html)
      }

      const sponsorTemplatePath = resolve(outDir, "hop-tac.html")
      const sponsorTemplate = readFileSync(sponsorTemplatePath, "utf8")
      const sponsorSource = readFileSync(resolve(root, "src/data/partnership.mock.ts"), "utf8")
      const sponsorMatches = [
        ...sponsorSource.matchAll(/slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?intro:\s*"([^"]+)"/g),
      ].map((match) => ({ slug: match[1], name: match[2], intro: match[3] }))
      if (sponsorMatches.length === 0) throw new Error("Không đọc được slug nhà tài trợ từ partnership.mock.ts")
      for (const sponsor of sponsorMatches) {
        const dir = resolve(outDir, "hop-tac", sponsor.slug)
        mkdirSync(dir, { recursive: true })
        const html = sponsorTemplate
          .replace(
            "<title data-sponsor-title>Nhà tài trợ – Liên đoàn Pickleball Việt Nam</title>",
            `<title>${escapeHtml(sponsor.name)} – Liên đoàn Pickleball Việt Nam</title>`,
          )
          .replace(
            'content="Hồ sơ nhà tài trợ minh họa của Liên đoàn Pickleball Việt Nam."',
            `content="${escapeHtml(sponsor.intro)}"`,
          )
        writeFileSync(resolve(dir, "index.html"), html)
      }
    },
  }
}

function pagesBase() {
  const raw = process.env.VITE_BASE?.trim() || "/"
  if (raw === "/") return "/"
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`
}

const root = fileURLToPath(new URL(".", import.meta.url))

const pages = [
  "index",
  "liendoan",
  "tintuc",
  "giaidau",
  "chuyenmon",
  "doi-tuyen-van-dong-vien",
  "thu-vien-cong-dong",
  "media",
  "congdong",
  "hoptac",
  "timkiem",
  "chitiet-tintuc",
]

export default defineConfig({
  base: pagesBase(),
  appType: "mpa",
  plugins: [react(), tailwindcss(), newsArticlePages(root)],
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(pages.map((name) => [name, resolve(root, `${name}.html`)])),
        "hop-tac": resolve(root, "hop-tac.html"),
        "chitiet-giaidau": resolve(root, "chitiet-giaidau.html"),
      },
    },
  },
})
