#!/usr/bin/env node
// Generates public/sitemap.xml and public/robots.txt from the registry.
// Runs as a pre-build step so the output ships with every deploy.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const registrySrc = readFileSync(join(root, "src/toolRegistry.ts"), "utf8")

// Parse tool hrefs from the TypeScript source by regex — avoids having
// to transpile/import the TS file at build time.
const hrefs = [...registrySrc.matchAll(/href:\s*"(\/[^"]+)"/g)].map(m => m[1])

// Competitor pages we've written so far (declared in vsContent.ts).
const vsSrc = readFileSync(join(root, "src/pages/vsContent.ts"), "utf8")
const vsSlugs = [...vsSrc.matchAll(/"([a-z0-9-]+)":\s*\{[^}]*?name:/gs)].map(m => m[1])

const BASE = "https://getslate.net"
const today = new Date().toISOString().slice(0, 10)

const staticPaths = ["/", "/tools"]
const allPaths = Array.from(new Set([
  ...staticPaths,
  ...hrefs,
  ...vsSlugs.map(s => `/vs/${s}`),
]))

const urls = allPaths.map(p => {
  const priority = p === "/" ? "1.0" : p === "/tools" ? "0.9" : p.startsWith("/vs/") ? "0.7" : "0.8"
  const changefreq = p === "/" || p === "/tools" ? "weekly" : "monthly"
  return `  <url>
    <loc>${BASE}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}).join("\n")

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`

const publicDir = join(root, "public")
mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, "sitemap.xml"), sitemap)
writeFileSync(join(publicDir, "robots.txt"), robots)

console.log(`✓ sitemap.xml (${allPaths.length} URLs) + robots.txt written to public/`)
