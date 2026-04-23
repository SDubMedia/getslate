import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

interface Row { id: string; date: string; project: string; in: string; out: string; breakMin: string; notes: string }
function nanoid() { return Math.random().toString(36).slice(2, 10) }

function hoursWorked(inT: string, outT: string, breakMin: string): number {
  if (!inT || !outT) return 0
  const [ih, im] = inT.split(":").map(Number)
  const [oh, om] = outT.split(":").map(Number)
  let mins = (oh * 60 + om) - (ih * 60 + im) - (parseInt(breakMin) || 0)
  if (mins < 0) mins = 0
  return mins / 60
}

export default function TimesheetPage() {
  const [name, setName] = useState("")
  const [weekEnding, setWeekEnding] = useState(today())
  const [employer, setEmployer] = useState("")
  const [rows, setRows] = useState<Row[]>([
    { id: nanoid(), date: "", project: "", in: "", out: "", breakMin: "30", notes: "" },
  ])

  function update(id: string, patch: Partial<Row>) {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const totalHours = rows.reduce((s, r) => s + hoursWorked(r.in, r.out, r.breakMin), 0)

  return (
    <TemplateShell slug="timesheet" title="Timesheet / Timecard" subtitle="Hourly crew logs hours, client signs, you invoice against it.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" value={name} onChange={setName} />
            <Field label="Week ending" value={weekEnding} onChange={setWeekEnding} type="date" />
          </div>
          <Field label="Employer / production company" value={employer} onChange={setEmployer} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Entries</h2>
            <button onClick={() => setRows((p) => [...p, { id: nanoid(), date: "", project: "", in: "", out: "", breakMin: "30", notes: "" }])} className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]">+ Row</button>
          </div>
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Date</label><input type="date" value={r.date} onChange={(e) => update(r.id, { date: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white focus:border-[#0088ff] outline-none" /></div>
                <div className="col-span-3"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Project</label><input value={r.project} onChange={(e) => update(r.id, { project: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white focus:border-[#0088ff] outline-none" /></div>
                <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">In</label><input type="time" value={r.in} onChange={(e) => update(r.id, { in: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white focus:border-[#0088ff] outline-none" /></div>
                <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Out</label><input type="time" value={r.out} onChange={(e) => update(r.id, { out: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white focus:border-[#0088ff] outline-none" /></div>
                <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Break (min)</label><input type="number" value={r.breakMin} onChange={(e) => update(r.id, { breakMin: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white focus:border-[#0088ff] outline-none" /></div>
                <button onClick={() => setRows((p) => p.filter((x) => x.id !== r.id))} className="col-span-1 text-slate-500 hover:text-red-400 text-sm pb-2">✕</button>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-right">Total: <span className="font-semibold text-foreground">{totalHours.toFixed(2)} hrs</span></p>
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Timesheet</h1>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>{val(name)} · Week ending {formatDate(weekEnding)} · {val(employer)}</p>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Project</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>In</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Out</th>
              <th style={{ textAlign: "right", padding: "6px 4px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Break (min)</th>
              <th style={{ textAlign: "right", padding: "6px 4px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Hrs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "6px 4px" }}>{formatDate(r.date)}</td>
                <td style={{ padding: "6px 4px" }}>{r.project}</td>
                <td style={{ padding: "6px 4px" }}>{r.in}</td>
                <td style={{ padding: "6px 4px" }}>{r.out}</td>
                <td style={{ padding: "6px 4px", textAlign: "right" }}>{r.breakMin}</td>
                <td style={{ padding: "6px 4px", textAlign: "right", fontWeight: 500 }}>{hoursWorked(r.in, r.out, r.breakMin).toFixed(2)}</td>
              </tr>
            ))}
            <tr><td colSpan={5} style={{ padding: "8px 4px", textAlign: "right", borderTop: "2px solid #000", fontWeight: 700 }}>Total</td><td style={{ padding: "8px 4px", textAlign: "right", borderTop: "2px solid #000", fontWeight: 700 }}>{totalHours.toFixed(2)}</td></tr>
          </tbody>
        </table>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Crew · {val(name)}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Approved by (supervisor)</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
