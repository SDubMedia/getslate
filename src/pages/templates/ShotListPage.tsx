import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

interface Shot { id: string; num: string; scene: string; description: string; type: string; lens: string; notes: string; done: boolean }
function nanoid() { return Math.random().toString(36).slice(2, 10) }

export default function ShotListPage() {
  const [project, setProject] = useState("")
  const [shootDate, setShootDate] = useState(today())
  const [dp, setDp] = useState("")
  const [shots, setShots] = useState<Shot[]>([
    { id: nanoid(), num: "1", scene: "1", description: "", type: "wide", lens: "24mm", notes: "", done: false },
    { id: nanoid(), num: "2", scene: "1", description: "", type: "medium", lens: "50mm", notes: "", done: false },
    { id: nanoid(), num: "3", scene: "1", description: "", type: "close-up", lens: "85mm", notes: "", done: false },
  ])

  function update(id: string, patch: Partial<Shot>) {
    setShots((p) => p.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  return (
    <TemplateShell title="Shot List" subtitle="Scene-by-scene breakdown. Print, clip to the slate, check shots off as you go.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Project" value={project} onChange={setProject} />
            <Field label="Shoot date" value={shootDate} onChange={setShootDate} type="date" />
            <Field label="DP / director" value={dp} onChange={setDp} />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Shots</h2>
            <button onClick={() => setShots((p) => [...p, { id: nanoid(), num: String(p.length + 1), scene: "", description: "", type: "", lens: "", notes: "", done: false }])} className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]">+ Shot</button>
          </div>
          {shots.map((s) => (
            <div key={s.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-1"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">#</label><input value={s.num} onChange={(e) => update(s.id, { num: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <div className="col-span-1"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Sc</label><input value={s.scene} onChange={(e) => update(s.id, { scene: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <div className="col-span-4"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Description</label><input value={s.description} onChange={(e) => update(s.id, { description: e.target.value })} placeholder="Wide establish, subject enters frame from right" className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Type</label><input value={s.type} onChange={(e) => update(s.id, { type: e.target.value })} placeholder="wide / med / CU" className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Lens</label><input value={s.lens} onChange={(e) => update(s.id, { lens: e.target.value })} placeholder="24mm" className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
              <div className="col-span-2"><label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Notes</label><input value={s.notes} onChange={(e) => update(s.id, { notes: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" /></div>
            </div>
          ))}
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Shot List — {val(project)}</h1>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>{formatDate(shootDate)} · DP: {val(dp)}</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>✓</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>#</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Sc</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Description</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Type</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Lens</th>
              <th style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, textTransform: "uppercase" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {shots.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px 4px", width: 24 }}>☐</td>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>{s.num}</td>
                <td style={{ padding: "8px 4px" }}>{s.scene}</td>
                <td style={{ padding: "8px 4px" }}>{s.description}</td>
                <td style={{ padding: "8px 4px" }}>{s.type}</td>
                <td style={{ padding: "8px 4px" }}>{s.lens}</td>
                <td style={{ padding: "8px 4px" }}>{s.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: 40, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
