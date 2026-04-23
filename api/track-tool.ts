// ============================================================
// /api/track-tool — Log tool usage events (view / download / email_captured)
// Append-only. Aggregated by admin.sdubmedia.com for the Tools metrics view.
// No PII — IPs are SHA256-hashed for rate-limit / unique-visitor math only.
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import { createHash } from "crypto"

const clean = (v?: string) => (v || "").trim().replace(/^["']|["']$/g, "")
const SUPABASE_URL = clean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)
const SUPABASE_KEY = clean(process.env.SUPABASE_SERVICE_ROLE_KEY)

const ALLOWED_TYPES = new Set(["view", "download", "email_captured"])
const MAX_SLUG = 60

function nanoid() {
  return Math.random().toString(36).slice(2, 14) + Date.now().toString(36).slice(-4)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })
  if (!SUPABASE_URL || !SUPABASE_KEY) return res.status(500).json({ error: "Not configured" })

  const { slug, type, referrer, utm_source, utm_campaign } = (req.body || {}) as any
  const s = clean(slug).slice(0, MAX_SLUG)
  const t = clean(type)
  if (!s) return res.status(400).json({ error: "Missing slug" })
  if (!ALLOWED_TYPES.has(t)) return res.status(400).json({ error: "Invalid type" })

  const ip = (req.headers["x-forwarded-for"] as string || "").split(",")[0].trim() || "unknown"
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 32)

  const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } })
  await db.from("tool_events").insert({
    id: `evt_${nanoid()}`,
    tool_slug: s,
    event_type: t,
    ip_hash: ipHash,
    referrer: clean(referrer).slice(0, 500) || null,
    utm_source: clean(utm_source).slice(0, 100) || null,
    utm_campaign: clean(utm_campaign).slice(0, 100) || null,
  })
  return res.status(200).json({ ok: true })
}
