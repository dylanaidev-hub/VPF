import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig, type Plugin } from "vite"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function newsArticlePages(root: string): Plugin {
  return {
    name: "vpf-news-articles",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = req.url?.split("?")[0] ?? ""
        if (/^\/tin-tuc\/[^/]+\/?$/.test(pathname)) req.url = "/article.html"
        next()
      })
    },
    closeBundle() {
      const templatePath = resolve(root, "dist/article.html")
      const template = readFileSync(templatePath, "utf8")
      const source = readFileSync(resolve(root, "src/data/news.mock.ts"), "utf8")
      const articles = [...source.matchAll(/slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"/g)].map(
        (match) => ({ slug: match[1], title: match[2], excerpt: match[3] }),
      )
      if (articles.length === 0) throw new Error("Không đọc được slug tin tức từ news.mock.ts")
      for (const article of articles) {
        const dir = resolve(root, "dist/tin-tuc", article.slug)
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
  "congdong",
  "media",
  "hoptac",
]

export default defineConfig({
  base: pagesBase(),
  appType: "mpa",
  plugins: [react(), tailwindcss(), newsArticlePages(root)],
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(pages.map((name) => [name, resolve(root, `${name}.html`)])),
        article: resolve(root, "article.html"),
        "chitiet-giaidau": resolve(root, "chitiet-giaidau.html"),
      },
    },
  },
})
