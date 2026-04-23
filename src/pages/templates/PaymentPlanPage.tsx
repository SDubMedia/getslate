import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

interface Installment { id: string; dueDate: string; amount: string }
function nanoid() { return Math.random().toString(36).slice(2, 10) }

export default function PaymentPlanPage() {
  const [provider, setProvider] = useState("")
  const [client, setClient] = useState("")
  const [project, setProject] = useState("")
  const [totalOwed, setTotalOwed] = useState("")
  const [installments, setInstallments] = useState<Installment[]>([
    { id: nanoid(), dueDate: "", amount: "" },
    { id: nanoid(), dueDate: "", amount: "" },
    { id: nanoid(), dueDate: "", amount: "" },
  ])

  function update(id: string, patch: Partial<Installment>) {
    setInstallments((p) => p.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  return (
    <TemplateShell title="Payment Plan Agreement" subtitle="Client can't pay in one chunk? Map out a schedule, get it signed, keep the deal.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Provider (you)" value={provider} onChange={setProvider} />
          <Field label="Client" value={client} onChange={setClient} />
          <Field label="Project / invoice reference" value={project} onChange={setProject} />
          <Field label="Total amount owed (USD)" value={totalOwed} onChange={setTotalOwed} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Installments</h2>
            <button onClick={() => setInstallments((p) => [...p, { id: nanoid(), dueDate: "", amount: "" }])} className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]">+ Add</button>
          </div>
          {installments.map((i, idx) => (
            <div key={i.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-1 text-xs text-slate-500 pb-2">#{idx + 1}</div>
              <div className="col-span-5">
                <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Due date</label>
                <input type="date" value={i.dueDate} onChange={(e) => update(i.id, { dueDate: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none" />
              </div>
              <div className="col-span-5">
                <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Amount (USD)</label>
                <input type="number" value={i.amount} onChange={(e) => update(i.id, { amount: e.target.value })} className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none" />
              </div>
              <button onClick={() => setInstallments((p) => p.filter((x) => x.id !== i.id))} className="col-span-1 text-slate-500 hover:text-red-400 text-sm pb-2">✕</button>
            </div>
          ))}
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>PAYMENT PLAN AGREEMENT</h1>
        <p>This Payment Plan Agreement, dated <strong>{formatDate(today())}</strong>, is between <strong>{val(provider, "[Provider]")}</strong> and <strong>{val(client, "[Client]")}</strong>.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Outstanding Balance</h2>
        <p>Client owes Provider <strong>${val(totalOwed, "0")}</strong> in connection with {val(project, "[project / invoice]")}.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Installment Schedule</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              <th style={{ textAlign: "left", padding: "6px 0", fontSize: 11 }}>#</th>
              <th style={{ textAlign: "left", padding: "6px 0", fontSize: 11 }}>Due Date</th>
              <th style={{ textAlign: "right", padding: "6px 0", fontSize: 11 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {installments.map((i, idx) => (
              <tr key={i.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px 0", fontSize: 13 }}>{idx + 1}</td>
                <td style={{ padding: "8px 0", fontSize: 13 }}>{val(formatDate(i.dueDate))}</td>
                <td style={{ padding: "8px 0", fontSize: 13, textAlign: "right" }}>${val(i.amount, "0")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Default</h2>
        <p>If Client misses an installment by more than 7 days, the entire remaining balance becomes immediately due. Provider may suspend any ongoing work until the full balance is paid.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. No Waiver</h2>
        <p>This plan does not waive any rights Provider has under any prior agreement, including late-payment fees and collection rights.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Provider · {val(provider)}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Client · {val(client)}</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
