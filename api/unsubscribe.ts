// ============================================================
// /api/unsubscribe — Marks a tool_lead as unsubscribed.
//
// Token format: <leadId>.<sigBase64url>
// sig = HMAC-SHA256(leadId, UNSUBSCRIBE_SECRET)
//
// GET — shows an HTML confirmation page (email-client-safe)
// POST — RFC 8058 one-click unsubscribe for Gmail/Apple Mail
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import { createHmac, timingSafeEqual } from "crypto"

const clean = (v?: string) => (v || "").trim().replace(/^["']|["']$/g, "")
const SUPABASE_URL = clean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)
const SUPABASE_KEY = clean(process.env.SUPABASE_SERVICE_ROLE_KEY)
const SECRET = clean(process.env.UNSUBSCRIBE_SECRET)

function b64urlEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

function verifyToken(token: string): string | null {
  const dot = token.indexOf(".")
  if (dot < 0) return null
  const leadId = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  if (!leadId || !sig) return null
  const expected = createHmac("sha256", SECRET).update(leadId).digest("base64")
    .replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_")
  return b64urlEq(sig, expected) ? leadId : null
}

function page(title: string, body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { font-family: -apple-system, system-ui, sans-serif; background: #0a0e17; color: #e2e8f0; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .card { max-width: 480px; width: 100%; background: #111827; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; text-align: center; }
  h1 { margin: 0 0 12px; font-size: 22px; font-weight: 700; }
  p { margin: 0 0 16px; color: #94a3b8; line-height: 1.5; }
  a { color: #0088ff; text-decoration: none; }
  a:hover { color: #00d4ff; }
</style></head><body><div class="card">${body}<p style="margin-top:24px; font-size:12px; color:#475569"><a href="https://getslate.net">getslate.net</a></p></div></body></html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "text/html; charset=utf-8")

  if (!SUPABASE_URL || !SUPABASE_KEY || !SECRET) {
    res.status(500).end(page("Error", `<h1>Not configured</h1><p>Reach out to geoff@sdubmedia.com and we'll sort it out.</p>`))
    return
  }

  const token = (req.method === "POST"
    ? clean((req.body?.t as string) || (typeof req.body === "string" ? new URLSearchParams(req.body).get("t") : "") || (req.query?.t as string) || "")
    : clean((req.query?.t as string) || "")
  )

  if (!token) {
    res.status(400).end(page("Missing link", `<h1>Link is missing its token</h1><p>This unsubscribe link looks incomplete. Try the link from your email again — or reply to the email and I'll unsubscribe you by hand.</p>`))
    return
  }

  const leadId = verifyToken(token)
  if (!leadId) {
    res.status(400).end(page("Invalid link", `<h1>Link didn't verify</h1><p>This unsubscribe link is invalid or has been tampered with. Reply to the email and I'll unsubscribe you manually.</p>`))
    return
  }

  const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } })
  const { error } = await db.from("tool_leads")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("id", leadId)
    .is("unsubscribed_at", null)  // idempotent

  if (error) {
    console.error("[unsubscribe]", error)
    res.status(500).end(page("Error", `<h1>Something went wrong</h1><p>Reply to the email and I'll handle it. Sorry about that.</p>`))
    return
  }

  // One-click (POST) just needs a 200. Browser GET gets the confirmation page.
  if (req.method === "POST") {
    res.status(200).end("unsubscribed")
    return
  }
  res.status(200).end(page("Unsubscribed", `<h1>You're off the list</h1><p>No more emails from getslate.net. The free tools stay available forever — use them without signing up any time.</p><p><a href="https://getslate.net/tools">Back to the tools</a></p>`))
}
