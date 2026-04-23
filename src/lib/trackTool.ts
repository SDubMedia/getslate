// Fire-and-forget tool event tracking. Silent-fails.
// Dedupes views per session so one pageview = one "view" event.

const SESSION_KEY = "getslate_viewed_tools"

export type ToolEventType = "view" | "download" | "email_captured"

export function trackTool(slug: string, type: ToolEventType) {
  if (type === "view") {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      const viewed: string[] = raw ? JSON.parse(raw) : []
      if (viewed.includes(slug)) return
      viewed.push(slug)
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(viewed))
    } catch { /* ignore */ }
  }

  const params = new URLSearchParams(window.location.search)
  const referrer = document.referrer || null

  fetch("/api/track-tool", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug,
      type,
      referrer,
      utm_source: params.get("utm_source"),
      utm_campaign: params.get("utm_campaign"),
    }),
  }).catch(() => { /* silent */ })
}
