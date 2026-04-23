import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

export default function DepositReceiptPage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [project, setProject] = useState("")
  const [depositDate, setDepositDate] = useState(today())
  const [method, setMethod] = useState("")
  const [remaining, setRemaining] = useState("")

  return (
    <TemplateShell title="Deposit Receipt" subtitle="Formal acknowledgment when a deposit arrives — some clients need it for their books.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="From (your business)" value={from} onChange={setFrom} />
          <Field label="Received from (client)" value={to} onChange={setTo} />
          <Field label="Project" value={project} onChange={setProject} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount received (USD)" value={amount} onChange={setAmount} />
            <Field label="Deposit date" value={depositDate} onChange={setDepositDate} type="date" />
          </div>
          <Field label="Payment method" value={method} onChange={setMethod} placeholder="ACH, Zelle, check, wire" />
          <Field label="Remaining balance (USD)" value={remaining} onChange={setRemaining} />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Deposit Receipt</h1>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>{formatDate(today())}</p>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            <Row label="From" value={val(from)} />
            <Row label="Received from" value={val(to)} />
            <Row label="Project" value={val(project)} />
            <Row label="Deposit date" value={formatDate(depositDate)} />
            <Row label="Payment method" value={val(method)} />
          </tbody>
        </table>

        <div style={{ marginTop: 32, padding: 20, border: "2px solid #000" }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", marginBottom: 8 }}>Amount Received</p>
          <p style={{ fontSize: 28, fontWeight: 700 }}>${val(amount, "0")}</p>
          {remaining && <p style={{ fontSize: 13, color: "#555", marginTop: 8 }}>Remaining balance: <strong>${remaining}</strong></p>}
        </div>

        <p style={{ marginTop: 32, fontSize: 12 }}>This receipt confirms deposit has been received and the project date is reserved. Remaining balance is due per the signed agreement.</p>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td style={{ padding: "6px 0", color: "#666", width: "30%" }}>{label}</td>
      <td style={{ padding: "6px 0", fontWeight: 500 }}>{value}</td>
    </tr>
  )
}
