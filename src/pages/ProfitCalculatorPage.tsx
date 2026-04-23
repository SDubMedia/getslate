import { useMemo, useState } from "react"

const APP_URL = "https://slate.sdubmedia.com"

interface CrewRate {
  id: string
  role: string
  rate: number
}

interface ProjectType {
  id: string
  name: string
  countPerMonth: number
  hoursPerProject: number
  crewNeeded: number
  clientRate: number // flat per-project rate they bill
}

interface Overhead {
  software: number
  insurance: number
  vehicle: number
  marketing: number
  other: number
}

function nanoid() {
  return Math.random().toString(36).slice(2, 10)
}

function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

const DEFAULT_CREW: CrewRate[] = [
  { id: nanoid(), role: "Main Videographer", rate: 75 },
  { id: nanoid(), role: "Second Videographer", rate: 50 },
  { id: nanoid(), role: "Photographer", rate: 60 },
  { id: nanoid(), role: "Editor", rate: 45 },
]

const DEFAULT_PROJECTS: ProjectType[] = [
  { id: nanoid(), name: "Podcast", countPerMonth: 4, hoursPerProject: 6, crewNeeded: 2, clientRate: 1200 },
  { id: nanoid(), name: "Commercial shoot", countPerMonth: 2, hoursPerProject: 10, crewNeeded: 3, clientRate: 3500 },
  { id: nanoid(), name: "Event coverage", countPerMonth: 1, hoursPerProject: 8, crewNeeded: 2, clientRate: 2500 },
]

const DEFAULT_OVERHEAD: Overhead = {
  software: 300,
  insurance: 150,
  vehicle: 400,
  marketing: 200,
  other: 100,
}

type Step = 1 | 2 | 3 | 4

export default function ProfitCalculatorPage() {
  const [step, setStep] = useState<Step>(1)
  const [crew, setCrew] = useState<CrewRate[]>(DEFAULT_CREW)
  const [projects, setProjects] = useState<ProjectType[]>(DEFAULT_PROJECTS)
  const [overhead, setOverhead] = useState<Overhead>(DEFAULT_OVERHEAD)

  // Simplified crew cost: project pays N crew at the avg crew rate for its hours.
  const avgCrewRate = useMemo(() => {
    if (crew.length === 0) return 0
    return crew.reduce((s, c) => s + c.rate, 0) / crew.length
  }, [crew])

  const monthlyRevenue = useMemo(
    () => projects.reduce((s, p) => s + p.countPerMonth * p.clientRate, 0),
    [projects]
  )

  const monthlyCrewCost = useMemo(
    () =>
      projects.reduce(
        (s, p) => s + p.countPerMonth * p.hoursPerProject * p.crewNeeded * avgCrewRate,
        0
      ),
    [projects, avgCrewRate]
  )

  const monthlyOverhead =
    overhead.software + overhead.insurance + overhead.vehicle + overhead.marketing + overhead.other

  const monthlyProfit = monthlyRevenue - monthlyCrewCost - monthlyOverhead
  const marginPct = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0

  const perProjectAnalysis = useMemo(() => {
    return projects.map((p) => {
      const revenue = p.clientRate
      const crewCost = p.hoursPerProject * p.crewNeeded * avgCrewRate
      const margin = revenue - crewCost
      const marginPct = revenue > 0 ? (margin / revenue) * 100 : 0
      return { ...p, revenue, crewCost, margin, marginPct }
    }).sort((a, b) => a.marginPct - b.marginPct)
  }, [projects, avgCrewRate])

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <span className="text-xs text-slate-500">Free tool</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Production Company Profit Calculator
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Answer 3 questions. See what you're actually making — and where the margin is leaking.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setStep(n as Step)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                step === n
                  ? "bg-[#0088ff] text-white"
                  : step > n
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-slate-500"
              }`}
            >
              {n === 4 ? "Results" : `Step ${n}`}
            </button>
          ))}
        </div>

        {/* Step 1: Crew rates */}
        {step === 1 && (
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 space-y-5">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>1. What do you pay your crew?</h2>
              <p className="text-sm text-slate-400">Hourly rate per role. Rough averages are fine.</p>
            </div>

            <div className="space-y-2">
              {crew.map((c) => (
                <div key={c.id} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={c.role}
                    onChange={(e) => setCrew((prev) => prev.map((x) => (x.id === c.id ? { ...x, role: e.target.value } : x)))}
                    className="col-span-8 bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
                    placeholder="Role (e.g. Editor)"
                  />
                  <div className="col-span-3 flex items-center">
                    <span className="text-slate-500 text-sm mr-1">$</span>
                    <input
                      type="number"
                      value={c.rate}
                      min={0}
                      onChange={(e) => setCrew((prev) => prev.map((x) => (x.id === c.id ? { ...x, rate: parseFloat(e.target.value) || 0 } : x)))}
                      className="flex-1 bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none text-right"
                    />
                    <span className="text-slate-500 text-xs ml-2">/hr</span>
                  </div>
                  <button
                    onClick={() => setCrew((prev) => prev.filter((x) => x.id !== c.id))}
                    className="col-span-1 text-slate-500 hover:text-red-400 text-sm"
                    aria-label="Remove role"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => setCrew((prev) => [...prev, { id: nanoid(), role: "", rate: 0 }])}
                className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]"
              >
                + Add role
              </button>
            </div>

            <StepNav step={1} setStep={setStep} />
          </section>
        )}

        {/* Step 2: Project mix */}
        {step === 2 && (
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 space-y-5">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>2. What do you shoot each month?</h2>
              <p className="text-sm text-slate-400">Average count, hours per shoot, crew needed, and what you charge.</p>
            </div>

            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      value={p.name}
                      onChange={(e) => setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, name: e.target.value } : x)))}
                      className="flex-1 bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm font-semibold text-white focus:border-[#0088ff] outline-none"
                      placeholder="Project type (e.g. Podcast)"
                    />
                    {projects.length > 1 && (
                      <button onClick={() => setProjects((prev) => prev.filter((x) => x.id !== p.id))} className="text-slate-500 hover:text-red-400 text-sm">✕</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <NumField label="Per month" value={p.countPerMonth} onChange={(v) => setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, countPerMonth: v } : x)))} step={1} />
                    <NumField label="Hrs each" value={p.hoursPerProject} onChange={(v) => setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, hoursPerProject: v } : x)))} step={0.5} />
                    <NumField label="Crew #" value={p.crewNeeded} onChange={(v) => setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, crewNeeded: v } : x)))} step={1} />
                    <NumField label="Client $" value={p.clientRate} onChange={(v) => setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, clientRate: v } : x)))} step={50} />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setProjects((prev) => [...prev, { id: nanoid(), name: "", countPerMonth: 1, hoursPerProject: 4, crewNeeded: 2, clientRate: 1000 }])}
                className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]"
              >
                + Add project type
              </button>
            </div>

            <StepNav step={2} setStep={setStep} />
          </section>
        )}

        {/* Step 3: Overhead */}
        {step === 3 && (
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 space-y-5">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>3. Monthly overhead</h2>
              <p className="text-sm text-slate-400">Fixed costs that exist whether you shoot or not.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NumField label="Software / subscriptions" value={overhead.software} onChange={(v) => setOverhead((p) => ({ ...p, software: v }))} step={25} />
              <NumField label="Insurance" value={overhead.insurance} onChange={(v) => setOverhead((p) => ({ ...p, insurance: v }))} step={25} />
              <NumField label="Vehicle / fuel" value={overhead.vehicle} onChange={(v) => setOverhead((p) => ({ ...p, vehicle: v }))} step={25} />
              <NumField label="Marketing" value={overhead.marketing} onChange={(v) => setOverhead((p) => ({ ...p, marketing: v }))} step={25} />
              <NumField label="Other" value={overhead.other} onChange={(v) => setOverhead((p) => ({ ...p, other: v }))} step={25} />
            </div>

            <StepNav step={3} setStep={setStep} />
          </section>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <section className="space-y-5">
            <div className="rounded-xl border-2 border-[#0088ff]/50 bg-[#0088ff]/5 p-6 sm:p-8">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">You're actually making</div>
                <div className={`text-4xl sm:text-5xl font-bold mb-2 ${monthlyProfit >= 0 ? "text-emerald-400" : "text-red-400"}`} style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                  {money(monthlyProfit)}/mo
                </div>
                <div className="text-sm text-slate-300">
                  at <span className="font-semibold">{marginPct.toFixed(1)}%</span> margin
                </div>
                {monthlyProfit < 0 && (
                  <div className="mt-3 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 inline-block">
                    You're losing money. Either rates are too low or overhead is too high.
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatCard label="Revenue" value={money(monthlyRevenue)} />
              <StatCard label="Crew cost" value={money(monthlyCrewCost)} tone="negative" />
              <StatCard label="Overhead" value={money(monthlyOverhead)} tone="negative" />
            </div>

            {/* Per-project breakdown */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">Where the margin is leaking</h3>
              <div className="space-y-2">
                {perProjectAnalysis.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${p.marginPct < 30 ? "bg-red-400" : p.marginPct < 50 ? "bg-amber-400" : "bg-emerald-400"}`} />
                      <span className="truncate">{p.name || "Untitled"}</span>
                      {i === 0 && p.marginPct < 50 && <span className="text-[10px] text-red-300 uppercase tracking-wider shrink-0">worst</span>}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="tabular-nums">{money(p.margin)} per shoot</div>
                      <div className="text-[11px] text-slate-500 tabular-nums">{p.marginPct.toFixed(0)}% margin</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Simplified: uses your average crew rate across all roles. Real-world margins depend on which specific crew worked each project. Slate tracks this exactly.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 text-center">
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                Stop guessing. Track this per project, continuously.
              </h3>
              <p className="text-slate-400 text-sm mb-4 max-w-lg mx-auto">
                Slate logs every shoot, every crew hour, every invoice — and shows you real profit per client. Free up to 10 projects.
              </p>
              <a
                href={APP_URL}
                className="inline-block px-5 py-2.5 bg-[#0088ff] text-white font-semibold rounded-lg hover:bg-[#0066dd] transition-colors text-sm"
              >
                Try Slate free →
              </a>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                ← Start over
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function StepNav({ step, setStep }: { step: Step; setStep: (s: Step) => void }) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-white/10">
      <button
        onClick={() => setStep(Math.max(1, step - 1) as Step)}
        disabled={step === 1}
        className="text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ← Back
      </button>
      <button
        onClick={() => setStep(Math.min(4, step + 1) as Step)}
        className="px-5 py-2 bg-[#0088ff] text-white text-sm font-semibold rounded-lg hover:bg-[#0066dd] transition-colors"
      >
        {step === 3 ? "See results →" : "Next →"}
      </button>
    </div>
  )
}

function NumField({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <input
        type="number"
        value={value}
        min={0}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
      />
    </div>
  )
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "negative" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{label}</div>
      <div className={`text-xl font-bold tabular-nums ${tone === "negative" ? "text-red-300" : "text-white"}`} style={{ fontFamily: "'Space Grotesk', system-ui" }}>
        {value}
      </div>
    </div>
  )
}
