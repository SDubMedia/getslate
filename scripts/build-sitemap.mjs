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

// Workflow cluster landing pages (workflowContent.ts).
const wfSrc = readFileSync(join(root, "src/pages/workflowContent.ts"), "utf8")
const wfSlugs = [...wfSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map(m => m[1])

const BASE = "https://getslate.net"
const today = new Date().toISOString().slice(0, 10)

const staticPaths = ["/", "/tools"]
const allPaths = Array.from(new Set([
  ...staticPaths,
  ...hrefs,
  ...vsSlugs.map(s => `/vs/${s}`),
  ...wfSlugs.map(s => `/workflow/${s}`),
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

// llms.txt — emerging convention (https://llmstxt.org) for telling LLM crawlers
// what a site is about. Read by Anthropic, Mistral, Perplexity, and others.
// Generated from the same registry as sitemap.xml so it stays in sync.

// Extract per-tool metadata: slug, href, title, short.
const toolEntries = [...registrySrc.matchAll(
  /\{\s*slug:\s*"([^"]+)",\s*href:\s*"(\/[^"]+)",\s*title:\s*"([^"]+)",\s*short:\s*"([^"]*)"/g
)].map(m => ({ slug: m[1], href: m[2], title: m[3], short: m[4] }))

// Extract category for each tool by re-matching with category field.
const toolWithCat = [...registrySrc.matchAll(
  /\{\s*slug:\s*"([^"]+)",[^}]*?category:\s*"([^"]+)"/gs
)].map(m => ({ slug: m[1], category: m[2] }))
const catBySlug = new Map(toolWithCat.map(t => [t.slug, t.category]))

const groupedByCat = {}
for (const t of toolEntries) {
  const cat = catBySlug.get(t.slug) || "Other"
  if (!groupedByCat[cat]) groupedByCat[cat] = []
  groupedByCat[cat].push(t)
}

// Workflow titles + slugs.
const wfBlocks = [...wfSrc.matchAll(/slug:\s*"([a-z0-9-]+)",\s*title:\s*"([^"]+)"/g)]
  .map(m => ({ slug: m[1], title: m[2] }))

// Comparison page slugs + names.
const vsBlocks = [...vsSrc.matchAll(/"([a-z0-9-]+)":\s*\{[^}]*?name:\s*"([^"]+)"/gs)]
  .map(m => ({ slug: m[1], name: m[2] }))

const llmsLines = [
  "# Slate",
  "",
  "> Production management for creative teams. Track projects, pay crew, send invoices, and see your real profit per project. Free tools and templates for video production companies and freelance crew.",
  "",
  "Slate (slate.sdubmedia.com) is the paid product. Slate Freelance (freelance.sdubmedia.com) is a separate app for live-event freelance crew. getslate.net is the marketing site that hosts free production-industry tools and templates.",
  "",
  "## Apps",
  "",
  `- [Slate](${BASE}): Production management for video production companies. Free up to 10 projects, $9.99/mo Basic, $19.99/mo Pro.`,
  "- [Slate Freelance](https://freelance.sdubmedia.com): Gig tracking for live-event freelance crew. Same pricing, different app.",
  "",
  "## Free tools",
  "",
]

for (const cat of ["Billing", "Agreements", "Releases & Licensing", "Production", "Marketing"]) {
  const tools = groupedByCat[cat]
  if (!tools || tools.length === 0) continue
  llmsLines.push(`### ${cat}`, "")
  for (const t of tools) {
    llmsLines.push(`- [${t.title}](${BASE}${t.href}): ${t.short}`)
  }
  llmsLines.push("")
}

if (wfBlocks.length > 0) {
  llmsLines.push("## Workflows", "")
  for (const w of wfBlocks) {
    llmsLines.push(`- [${w.title}](${BASE}/workflow/${w.slug})`)
  }
  llmsLines.push("")
}

if (vsBlocks.length > 0) {
  llmsLines.push("## Comparisons", "")
  for (const v of vsBlocks) {
    llmsLines.push(`- [Slate vs ${v.name}](${BASE}/vs/${v.slug})`)
  }
  llmsLines.push("")
}

const llms = llmsLines.join("\n")

const publicDir = join(root, "public")
mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, "sitemap.xml"), sitemap)
writeFileSync(join(publicDir, "robots.txt"), robots)
writeFileSync(join(publicDir, "llms.txt"), llms)

console.log(`✓ sitemap.xml (${allPaths.length} URLs) + robots.txt + llms.txt (${toolEntries.length} tools) written to public/`)
