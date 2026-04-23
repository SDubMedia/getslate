import { useMemo, useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

interface Line { id: string; description: string; quantity: number; rate: number }
function nanoid() { return Math.random().toString(36).slice(2, 10) }
function money(n: number): string { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) }

export default function ProposalPage() {
  const [fromName, setFromName] = useState("")
  const [fromContact, setFromContact] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientContact, setClientContact] = useState("")
  const [projectName, setProjectName] = useState("")
  const [summary, setSummary] = useState("")
  const [scope, setScope] = useState("")
  const [deliverables, setDeliverables] = useState("")
  const [timeline, setTimeline] = useState("")
  const [terms, setTerms] = useState("50% deposit on acceptance. Balance due Net 14 after final delivery. Proposal valid 30 days.")
  const [validUntil, setValidUntil] = useState("")
  const [lines, setLines] = useState<Line[]>([
    { id: nanoid(), description: "Pre-production (scripting, planning)", quantity: 1, rate: 800 },
    { id: nanoid(), description: "Production day", quantity: 1, rate: 2000 },
    { id: nanoid(), description: "Post-production (edit, color, mix)", quantity: 1, rate: 1500 },
  ])

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.quantity * l.rate, 0), [lines])

  function update(id: string, patch: Partial<Line>) { setLines((p) => p.map((l) => (l.id === id ? { ...l, ...patch } : l))) }

  return (
    <TemplateShell slug="proposal" title="Proposal / Statement of Work" subtitle="Pre-contract pitch. Send this before the contract — if they say yes, contract follows.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">From</h2>
          <Field label="Your business" value={fromName} onChange={setFromName} />
          <Field label="Contact" value={fromContact} onChange={setFromContact} placeholder="Email · phone" />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prepared for</h2>
          <Field label="Client" value={clientName} onChange={setClientName} />
          <Field label="Client contact" value={clientContact} onChange={setClientContact} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Project name" value={projectName} onChange={setProjectName} />
          <TextArea label="Executive summary" value={summary} onChange={setSummary} placeholder="Brief paragraph: what we're building, for whom, why it matters." />
          <TextArea label="Scope of work" value={scope} onChange={setScope} />
          <TextArea label="Deliverables" value={deliverables} onChange={setDeliverables} />
          <TextArea label="Timeline" value={timeline} onChange={setTimeline} rows={3} placeholder="Week 1: pre-pro + call&#10;Week 2: shoot&#10;Week 3-4: edit&#10;Week 5: delivery" />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Investment</h2>
            <button onClick={() => setLines((p) => [...p, { id: nanoid(), description: "", quantity: 1, rate: 0 }])} className="text-xs font-semibold text-[#0088ff]">+ Line</button>
          </div>
          {lines.map((l) => (
            <div key={l.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-7"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Description</label><input value={l.description} onChange={(e) => update(l.id, { description: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Qty</label><input type="number" value={l.quantity} onChange={(e) => update(l.id, { quantity: parseFloat(e.target.value) || 0 })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Rate</label><input type="number" value={l.rate} onChange={(e) => update(l.id, { rate: parseFloat(e.target.value) || 0 })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <button onClick={() => setLines((p) => p.filter((x) => x.id !== l.id))} className="col-span-1 text-slate-500 hover:text-red-400 text-sm pb-2">✕</button>
            </div>
          ))}
          <p className="text-sm text-right text-slate-300">Total: <span className="font-bold">{money(subtotal)}</span></p>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Terms" value={terms} onChange={setTerms} rows={3} />
          <Field label="Valid until" value={validUntil} onChange={setValidUntil} type="date" />
        </section>
      </div>

      <PrintPaper>
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", marginBottom: 6 }}>Proposal</p>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{val(projectName, "[Project]")}</h1>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>Prepared for {val(clientName)} by {val(fromName)} · {formatDate(today())}</p>

        {summary && <Section label="Executive summary" body={summary} />}
        {scope && <Section label="Scope of work" body={scope} />}
        {deliverables && <Section label="Deliverables" body={deliverables} />}
        {timeline && <Section label="Timeline" body={timeline} />}

        <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 8, marginTop: 24 }}>Investment</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 16 }}>
          <thead><tr style={{ borderBottom: "2px solid #000" }}>
            <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Item</th>
            <th style={{ textAlign: "right", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Qty</th>
            <th style={{ textAlign: "right", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Rate</th>
            <th style={{ textAlign: "right", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Amount</th>
          </tr></thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px 4px" }}>{l.description}</td>
                <td style={{ padding: "8px 4px", textAlign: "right" }}>{l.quantity}</td>
                <td style={{ padding: "8px 4px", textAlign: "right" }}>{money(l.rate)}</td>
                <td style={{ padding: "8px 4px", textAlign: "right", fontWeight: 500 }}>{money(l.quantity * l.rate)}</td>
              </tr>
            ))}
            <tr style={{ borderTop: "2px solid #000" }}>
              <td colSpan={3} style={{ padding: "10px 4px", textAlign: "right", fontWeight: 700 }}>Total investment</td>
              <td style={{ padding: "10px 4px", textAlign: "right", fontWeight: 700, fontSize: 15 }}>{money(subtotal)}</td>
            </tr>
          </tbody>
        </table>

        {terms && <Section label="Terms" body={terms} />}
        {validUntil && <p style={{ fontSize: 12, fontStyle: "italic", color: "#555" }}>Proposal valid until {formatDate(validUntil)}.</p>}

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Accepted · {val(clientName)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 8 }}>{label}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line" }}>{body}</p>
    </div>
  )
}
