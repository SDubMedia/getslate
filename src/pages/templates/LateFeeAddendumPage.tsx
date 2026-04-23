import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

export default function LateFeeAddendumPage() {
  const [provider, setProvider] = useState("")
  const [client, setClient] = useState("")
  const [originalDate, setOriginalDate] = useState("")
  const [projectName, setProjectName] = useState("")
  const [graceDays, setGraceDays] = useState("7")
  const [feeType, setFeeType] = useState("percent")
  const [feeAmount, setFeeAmount] = useState("1.5")

  return (
    <TemplateShell title="Late Fee Addendum" subtitle="Amends an existing contract to add late-payment penalties. Both parties sign.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Provider (you)" value={provider} onChange={setProvider} />
          <Field label="Client" value={client} onChange={setClient} />
          <Field label="Original agreement dated" value={originalDate} onChange={setOriginalDate} type="date" />
          <Field label="Project name" value={projectName} onChange={setProjectName} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Grace period (days after due date)" value={graceDays} onChange={setGraceDays} type="number" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Fee type</label>
              <select
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
              >
                <option value="percent">Percentage per month</option>
                <option value="flat">Flat fee</option>
              </select>
            </div>
            <Field label={feeType === "percent" ? "% per month" : "Flat fee (USD)"} value={feeAmount} onChange={setFeeAmount} />
          </div>
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>LATE FEE ADDENDUM</h1>
        <p>This Addendum, dated <strong>{formatDate(today())}</strong>, amends the agreement between <strong>{val(provider, "[Provider]")}</strong> and <strong>{val(client, "[Client]")}</strong> originally dated <strong>{val(formatDate(originalDate), "[date]")}</strong> regarding the project titled <strong>"{val(projectName, "[Project]")}"</strong> (the "Agreement").</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Late Payment Fees</h2>
        <p>Any amount not paid within <strong>{val(graceDays, "7")}</strong> days of the invoice due date shall incur a late fee of {feeType === "percent" ? <><strong>{val(feeAmount, "1.5")}%</strong> per month</> : <>a flat <strong>${val(feeAmount, "0")}</strong></>} on the unpaid balance, compounding monthly until paid in full.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Suspension of Work</h2>
        <p>Provider may suspend all work, including delivery of final deliverables, if invoices are more than 30 days past due. Work resumes upon full payment of outstanding amounts plus accrued late fees.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Collection Costs</h2>
        <p>If Provider is forced to pursue collection, Client agrees to reimburse reasonable collection costs, including attorneys' fees.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. All Other Terms</h2>
        <p>All other terms of the Agreement remain in full force and effect.</p>

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
