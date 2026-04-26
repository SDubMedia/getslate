// ============================================================
// /api/testimonials — Public GET of approved testimonials only.
// Fronted by HomePage; returns empty array on misconfig so the page
// falls back to hardcoded copy instead of crashing.
// ============================================================

import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import "./_sentry.js";

const clean = (v?: string) => (v || "").trim().replace(/^["']|["']$/g, "")
const SUPABASE_URL = clean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)
const SUPABASE_KEY = clean(process.env.SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" })

  if (!SUPABASE_URL || !SUPABASE_KEY) return res.status(200).json({ testimonials: [] })

  const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } })
  const { data, error } = await db
    .from("testimonials")
    .select("id, content, author_name, author_company, approved_at")
    .eq("status", "approved")
    .order("approved_at", { ascending: false })
    .limit(4)

  if (error) {
    console.error("[testimonials]", error)
    return res.status(200).json({ testimonials: [] })
  }

  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")
  return res.status(200).json({ testimonials: data || [] })
}
