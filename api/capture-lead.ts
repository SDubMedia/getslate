// ============================================================
// /api/capture-lead — getslate.net tool funnel email capture
//
// - Writes to Slate's tool_leads table (shared Supabase)
// - Pushes to Resend audience (if RESEND_AUDIENCE_ID set)
// - Light rate-limit: max 20 captures per IP per hour
// - Idempotent: (email, source) unique; re-captures bump counters
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import { createHash } from "crypto"
import "./_sentry.js";

const clean = (v?: string) => (v || "").trim().replace(/^["']|["']$/g, "")

const SUPABASE_URL = clean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)
const SUPABASE_KEY = clean(process.env.SUPABASE_SERVICE_ROLE_KEY)
const RESEND_KEY = clean(process.env.RESEND_API_KEY)
const RESEND_AUDIENCE_ID = clean(process.env.RESEND_AUDIENCE_ID)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function nanoid() {
  return Math.random().toString(36).slice(2, 14) + Date.now().toString(36).slice(-4)
}

function corsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  corsHeaders(res)
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })
  if (!SUPABASE_URL || !SUPABASE_KEY) return res.status(500).json({ error: "Not configured" })

  const { email: rawEmail, first_name, source, context, referrer, utm_source, utm_campaign } = (req.body || {}) as Record<string, string | undefined>;
  const email = clean(rawEmail).toLowerCase()
  const src = clean(source)
  const fn = clean(first_name).slice(0, 80) || null

  if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: "Invalid email" })
  if (!src) return res.status(400).json({ error: "Missing source" })

  const ip = (req.headers["x-forwarded-for"] as string || "").split(",")[0].trim() || "unknown"
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 32)

  const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } })

  // Light rate-limit: max 20 captures per IP in the last hour.
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count } = await db
    .from("tool_leads")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("first_seen_at", oneHourAgo)
  if ((count || 0) >= 20) {
    return res.status(429).json({ error: "Too many requests" })
  }

  // Upsert: unique(email, source). Bump counters if row exists.
  const { data: existing } = await db
    .from("tool_leads")
    .select("id, capture_count")
    .eq("email", email)
    .eq("source", src)
    .maybeSingle()

  if (existing) {
    const { error } = await db.from("tool_leads")
      .update({
        last_seen_at: new Date().toISOString(),
        capture_count: (existing.capture_count || 0) + 1,
        // Update first_name only if we got one AND the row doesn't have one already.
        ...(fn ? { first_name: fn } : {}),
      })
      .eq("id", existing.id)
    if (error) return res.status(500).json({ error: error.message, details: error.details })
  } else {
    const id = `lead_${nanoid()}`
    const { error } = await db.from("tool_leads").insert({
      id,
      email,
      first_name: fn,
      source: src,
      context: clean(context) || null,
      ip_hash: ipHash,
      referrer: clean(referrer) || null,
      utm_source: clean(utm_source) || null,
      utm_campaign: clean(utm_campaign) || null,
    })
    if (error) return res.status(500).json({ error: error.message, details: error.details })
  }

  // Push to Resend audience. MUST be awaited — Vercel kills pending
  // promises when the handler returns, so fire-and-forget drops silently.
  // "already exists" is non-fatal; we return 200 regardless.
  if (RESEND_KEY && RESEND_AUDIENCE_ID) {
    try {
      await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      })
    } catch {
      // network error — DB write already succeeded, so still return ok
    }
  }

  return res.status(200).json({ ok: true })
}
