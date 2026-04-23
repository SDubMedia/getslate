import { useEffect, useState } from "react"
import { trackTool } from "../lib/trackTool"

interface Props {
  slug: string
  open: boolean
  onClose: () => void
}

type Status = "idle" | "submitting" | "success" | "error"

const DISMISSED_KEY = "getslate_email_sheet_dismissed"

export function hasDismissedEmailSheet(): boolean {
  try { return sessionStorage.getItem(DISMISSED_KEY) === "1" } catch { return false }
}

export function markEmailSheetSeen() {
  try { sessionStorage.setItem(DISMISSED_KEY, "1") } catch { /* ignore */ }
}

export default function EmailCaptureSheet({ slug, open, onClose }: Props) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      setEmail("")
      setStatus("idle")
      setError("")
    }
  }, [open])

  function dismiss() {
    markEmailSheetSeen()
    onClose()
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    setError("")
    const params = new URLSearchParams(window.location.search)
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: slug,
          context: "download-sheet",
          referrer: document.referrer || null,
          utm_source: params.get("utm_source"),
          utm_campaign: params.get("utm_campaign"),
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || body.error) {
        setStatus("error")
        setError(body.error || "Couldn't save that. Try again?")
        return
      }
      trackTool(slug, "email_captured")
      setStatus("success")
      markEmailSheetSeen()
      // Auto-close after a beat
      setTimeout(onClose, 2500)
    } catch (err: any) {
      setStatus("error")
      setError(err?.message || "Something went wrong.")
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none print:hidden">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
        onClick={dismiss}
        aria-hidden
      />

      {/* Sheet */}
      <div className="relative pointer-events-auto w-full sm:max-w-md sm:mx-4 bg-[#0a0e17] border border-white/10 sm:rounded-2xl rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom">
        <div className="p-6 sm:p-7">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">📬</div>
              <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                You're on the list
              </h3>
              <p className="text-sm text-slate-400">We'll send useful stuff for production pros. No spam.</p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-3">
                  <h3 className="text-lg font-semibold text-white leading-tight mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                    Get this + 30 more tools
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    One email with the full toolkit. We'll also send occasional updates when we ship something useful. No spam, unsubscribe anytime.
                  </p>
                </div>
                <button
                  onClick={dismiss}
                  className="text-slate-500 hover:text-white text-xl leading-none shrink-0 -mt-1 -mr-1 p-1"
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>

              <form onSubmit={submit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === "submitting"}
                  autoFocus
                  className="w-full bg-[#111827] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#0088ff] outline-none disabled:opacity-50"
                />
                {error && (
                  <p className="text-xs text-red-300">{error}</p>
                )}
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={status === "submitting" || !email}
                    className="flex-1 bg-[#0088ff] text-white font-semibold rounded-lg py-3 text-sm hover:bg-[#0066dd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Saving…" : "Send me the toolkit"}
                  </button>
                  <button
                    type="button"
                    onClick={dismiss}
                    disabled={status === "submitting"}
                    className="px-4 py-3 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Not now
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
