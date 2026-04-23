import { useMemo, useState } from "react"
import { TOOLS, CATEGORIES, type ToolMeta, type Role, type Icp } from "../toolRegistry"

const APP_URL = "https://slate.sdubmedia.com"

const ROLE_LABELS: { id: Role | "all"; label: string }[] = [
  { id: "all", label: "All roles" },
  { id: "producer", label: "Producer / Owner" },
  { id: "director", label: "Director" },
  { id: "dp", label: "DP" },
  { id: "camera-op", label: "Camera op" },
  { id: "editor", label: "Editor" },
  { id: "solo", label: "Solo shooter" },
  { id: "freelance-crew", label: "Freelance crew" },
  { id: "drone-pilot", label: "Drone pilot" },
]

const ICP_LABELS: { id: Icp | "all"; label: string }[] = [
  { id: "all", label: "Both sides" },
  { id: "production", label: "Production co" },
  { id: "freelance", label: "Freelance" },
]

function matches(t: ToolMeta, query: string, role: Role | "all", icp: Icp | "all"): boolean {
  if (role !== "all" && !t.roles.includes(role)) return false
  if (icp !== "all" && !t.icps.includes(icp) && !t.icps.includes("both")) return false
  if (query) {
    const q = query.toLowerCase()
    if (!t.title.toLowerCase().includes(q) && !t.short.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false
  }
  return true
}

export default function ToolsIndexPage() {
  const [query, setQuery] = useState("")
  const [role, setRole] = useState<Role | "all">("all")
  const [icp, setIcp] = useState<Icp | "all">("all")

  const filtered = useMemo(
    () => TOOLS.filter(t => matches(t, query, role, icp)),
    [query, role, icp]
  )

  const countByCat = (cat: string) => filtered.filter(t => t.category === cat).length

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <header className="border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <a href={APP_URL} className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]">Try Slate →</a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Free tools for production pros
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            {TOOLS.length} tools. Runs in your browser. No signup. No data leaves your device.
          </p>
        </div>

        {/* Search + filters */}
        <div className="sticky top-[57px] sm:top-[65px] z-10 bg-[#0a0e17]/95 backdrop-blur-sm -mx-4 sm:mx-0 px-4 sm:px-0 py-4 mb-6 border-b border-white/5">
          <div className="space-y-3">
            <input
              type="search"
              placeholder="Search tools…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#0088ff] outline-none"
            />
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 mr-1">I'm a:</span>
              {ROLE_LABELS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`px-2.5 py-1 rounded-full border transition-colors ${
                    role === r.id
                      ? "bg-[#0088ff]/20 border-[#0088ff]/50 text-white"
                      : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 mr-1">Side:</span>
              {ICP_LABELS.map(i => (
                <button
                  key={i.id}
                  onClick={() => setIcp(i.id)}
                  className={`px-2.5 py-1 rounded-full border transition-colors ${
                    icp === i.id
                      ? i.id === "freelance" ? "bg-purple-500/20 border-purple-500/50 text-white" : "bg-amber-500/20 border-amber-500/50 text-white"
                      : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {i.label}
                </button>
              ))}
              {(query || role !== "all" || icp !== "all") && (
                <button
                  onClick={() => { setQuery(""); setRole("all"); setIcp("all") }}
                  className="ml-auto text-[11px] text-slate-500 hover:text-white transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="text-[11px] text-slate-500">
              {filtered.length} {filtered.length === 1 ? "tool" : "tools"} match
            </div>
          </div>
        </div>

        {/* Grouped by category */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-10 text-center text-slate-400">
            <p className="text-base mb-2">No tools match those filters.</p>
            <button
              onClick={() => { setQuery(""); setRole("all"); setIcp("all") }}
              className="text-sm text-[#0088ff] hover:text-[#00d4ff]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          CATEGORIES.map(cat => {
            const n = countByCat(cat)
            if (n === 0) return null
            return (
              <div key={cat} className="mb-10">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">{cat} ({n})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.filter(t => t.category === cat).map(t => (
                    <a
                      key={t.href}
                      href={t.href}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#0088ff]/40 transition-colors p-5"
                    >
                      <div className="text-2xl mb-2">{t.emoji}</div>
                      <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{t.title}</h3>
                      <p className="text-xs text-slate-400 mb-2 leading-relaxed">{t.short}</p>
                      <span className="text-[11px] font-semibold text-[#0088ff] group-hover:text-[#00d4ff]">Open →</span>
                    </a>
                  ))}
                </div>
              </div>
            )
          })
        )}

        <div className="mt-12 rounded-2xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Want all of this + project tracking in one place?
          </h3>
          <p className="text-slate-400 text-sm mb-5 max-w-lg mx-auto">
            Slate wraps everything above — plus project calendar, crew pay, client invoicing, and real profit visibility — into one app.
          </p>
          <a href={APP_URL} className="inline-block px-6 py-3 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-colors">Try Slate free →</a>
        </div>
      </div>
    </div>
  )
}
