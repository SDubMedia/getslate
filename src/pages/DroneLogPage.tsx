import { useEffect, useMemo, useState } from "react"
import { useToolCapture } from "../lib/useToolCapture"

const APP_URL = "https://slate.sdubmedia.com"
const STORAGE_KEY = "getslate_drone_log_v1"

interface Flight {
  id: string
  date: string
  pilotName: string
  aircraft: string
  serial: string
  location: string
  purpose: string
  duration: number // minutes
  conditions: string
  notes: string
}

function nanoid() { return Math.random().toString(36).slice(2, 10) }
function today() { return new Date().toISOString().slice(0, 10) }

function emptyFlight(): Flight {
  return {
    id: nanoid(),
    date: today(),
    pilotName: "",
    aircraft: "",
    serial: "",
    location: "",
    purpose: "",
    duration: 0,
    conditions: "",
    notes: "",
  }
}

export default function DroneLogPage() {
  const { onDownload, sheet } = useToolCapture("drone-log")
  const [flights, setFlights] = useState<Flight[]>([])
  const [draft, setDraft] = useState<Flight>(emptyFlight())
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFlights(JSON.parse(raw))
    } catch { /* ignore */ }
    setLoaded(true)
  }, [])

  // Persist on change
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flights))
  }, [flights, loaded])

  function addFlight() {
    if (!draft.date || !draft.pilotName) return
    setFlights((p) => [...p, { ...draft, id: nanoid() }].sort((a, b) => b.date.localeCompare(a.date)))
    setDraft({ ...emptyFlight(), pilotName: draft.pilotName, aircraft: draft.aircraft, serial: draft.serial })
  }

  function removeFlight(id: string) {
    setFlights((p) => p.filter((f) => f.id !== id))
  }

  const totalMinutes = useMemo(() => flights.reduce((s, f) => s + (f.duration || 0), 0), [flights])
  const totalHours = (totalMinutes / 60).toFixed(1)

  function downloadCSV() {
    onDownload(() => {
      const header = ["Date", "Pilot", "Aircraft", "Serial #", "Location", "Purpose", "Duration (min)", "Conditions", "Notes"]
      const lines = [header.join(",")]
      for (const f of flights) {
        lines.push([
          f.date, quote(f.pilotName), quote(f.aircraft), quote(f.serial),
          quote(f.location), quote(f.purpose), String(f.duration),
          quote(f.conditions), quote(f.notes),
        ].join(","))
      }
      const blob = new Blob([lines.join("\n")], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `drone-flight-log-${today()}.csv`
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  function clearAll() {
    if (!confirm("Delete all flight records from this browser? This can't be undone.")) return
    setFlights([])
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <header className="print:hidden border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <div className="flex items-center gap-2">
            <button onClick={() => onDownload()} className="hidden sm:inline-flex px-3 py-2 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-lg hover:bg-white/10 transition-colors">Print PDF</button>
            <button onClick={downloadCSV} disabled={flights.length === 0} className="px-3 py-2 bg-[#0088ff] text-white text-xs font-semibold rounded-lg hover:bg-[#0066dd] transition-colors disabled:opacity-40">Download CSV</button>
          </div>
        </div>
      </header>

      <div className="print:hidden max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Part 107 Drone Flight Log
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Track every flight for FAA compliance + tax records. Everything is stored in this browser — no signup, no server.
          </p>
        </div>

        {/* Add flight */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 mb-6 space-y-3">
          <h2 className="text-sm font-semibold text-foreground mb-1">Add flight</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FieldCompact label="Date" type="date" value={draft.date} onChange={(v) => setDraft((p) => ({ ...p, date: v }))} />
            <FieldCompact label="Pilot (you)" value={draft.pilotName} onChange={(v) => setDraft((p) => ({ ...p, pilotName: v }))} placeholder="Geoff Southworth" />
            <FieldCompact label="Aircraft" value={draft.aircraft} onChange={(v) => setDraft((p) => ({ ...p, aircraft: v }))} placeholder="DJI Mavic 3" />
            <FieldCompact label="Serial #" value={draft.serial} onChange={(v) => setDraft((p) => ({ ...p, serial: v }))} />
            <FieldCompact label="Location" value={draft.location} onChange={(v) => setDraft((p) => ({ ...p, location: v }))} placeholder="City, State or coords" />
            <FieldCompact label="Purpose" value={draft.purpose} onChange={(v) => setDraft((p) => ({ ...p, purpose: v }))} placeholder="Commercial real estate shoot" />
            <FieldCompact label="Duration (min)" type="number" value={String(draft.duration)} onChange={(v) => setDraft((p) => ({ ...p, duration: parseFloat(v) || 0 }))} />
            <FieldCompact label="Conditions" value={draft.conditions} onChange={(v) => setDraft((p) => ({ ...p, conditions: v }))} placeholder="Clear, 5mph wind" />
          </div>
          <FieldCompact label="Notes (incidents, waivers, TFRs)" value={draft.notes} onChange={(v) => setDraft((p) => ({ ...p, notes: v }))} placeholder="Optional" />
          <button
            onClick={addFlight}
            disabled={!draft.date || !draft.pilotName}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0088ff] text-white text-sm font-semibold rounded-lg hover:bg-[#0066dd] transition-colors disabled:opacity-40"
          >
            Add to log
          </button>
        </section>

        {/* Stats */}
        {flights.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Stat label="Flights logged" value={String(flights.length)} />
            <Stat label="Total time" value={`${totalHours} hrs`} />
            <Stat label="This year" value={`${flights.filter((f) => f.date.startsWith(String(new Date().getFullYear()))).length}`} />
          </div>
        )}

        {/* Log table */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Flight log ({flights.length})</h2>
            {flights.length > 0 && (
              <button onClick={clearAll} className="text-[11px] text-red-400 hover:text-red-300 transition-colors">Clear all</button>
            )}
          </div>
          {flights.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">No flights yet. Add your first above.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium">Date</th>
                    <th className="text-left px-3 py-2 font-medium">Aircraft</th>
                    <th className="text-left px-3 py-2 font-medium">Location</th>
                    <th className="text-left px-3 py-2 font-medium">Purpose</th>
                    <th className="text-right px-3 py-2 font-medium">Min</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((f) => (
                    <tr key={f.id} className="border-t border-white/5">
                      <td className="px-3 py-2 text-slate-400 whitespace-nowrap">{f.date}</td>
                      <td className="px-3 py-2 truncate max-w-[140px]">{f.aircraft}{f.serial ? ` (${f.serial})` : ""}</td>
                      <td className="px-3 py-2 truncate max-w-[160px]">{f.location}</td>
                      <td className="px-3 py-2 truncate max-w-[200px]">{f.purpose}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{f.duration}</td>
                      <td className="px-3 py-2 text-right">
                        <button onClick={() => removeFlight(f.id)} className="text-slate-500 hover:text-red-400 text-xs">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 mb-6 text-xs text-amber-200">
          <strong>Reminder.</strong> Data lives in your browser's localStorage. Clearing site data or switching browsers will lose it — download the CSV regularly if it matters.
        </div>

        <div className="rounded-xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Track drone gigs as full projects
          </h3>
          <p className="text-slate-400 text-sm mb-4 max-w-lg mx-auto">
            Slate logs the flight + the client invoice + the editing time + the crew pay together — so at year-end your books match your flight log.
          </p>
          <a href={APP_URL} className="inline-block px-5 py-2.5 bg-[#0088ff] text-white font-semibold rounded-lg hover:bg-[#0066dd] transition-colors text-sm">Try Slate free →</a>
        </div>
      </div>

      {/* Print view */}
      <div className="hidden print:block bg-white text-black p-10" style={{ colorScheme: "light" }}>
        <div className="max-w-[800px] mx-auto" style={{ fontFamily: "-apple-system, sans-serif" }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Drone Flight Log</h1>
          <p style={{ fontSize: 12, color: "#555", marginBottom: 20 }}>
            {flights.length} flights · {totalHours} total hours · As of {today()}
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #000" }}>
                <th style={th}>Date</th>
                <th style={th}>Pilot</th>
                <th style={th}>Aircraft</th>
                <th style={th}>Location</th>
                <th style={th}>Purpose</th>
                <th style={{ ...th, textAlign: "right" }}>Min</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={td}>{f.date}</td>
                  <td style={td}>{f.pilotName}</td>
                  <td style={td}>{f.aircraft}{f.serial ? ` (${f.serial})` : ""}</td>
                  <td style={td}>{f.location}</td>
                  <td style={td}>{f.purpose}</td>
                  <td style={{ ...td, textAlign: "right" }}>{f.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 40, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
        </div>
      </div>

      {sheet}
    </div>
  )
}

const th = { textAlign: "left" as const, padding: "6px 8px", fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.05em", color: "#555" }
const td = { padding: "6px 8px", verticalAlign: "top" as const }

function quote(s: string): string {
  if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`
  return s
}

function FieldCompact({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
      />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{label}</div>
      <div className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{value}</div>
    </div>
  )
}
