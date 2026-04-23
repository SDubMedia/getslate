import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function ChangeOrderPage() {
  const [provider, setProvider] = useState("")
  const [client, setClient] = useState("")
  const [project, setProject] = useState("")
  const [originalFee, setOriginalFee] = useState("")
  const [originalDelivery, setOriginalDelivery] = useState("")
  const [changeDesc, setChangeDesc] = useState("")
  const [additionalFee, setAdditionalFee] = useState("")
  const [newDelivery, setNewDelivery] = useState("")

  const newTotal = ((parseFloat(originalFee) || 0) + (parseFloat(additionalFee) || 0)).toFixed(2)

  return (
    <TemplateShell title="Change Order" subtitle="Scope changed mid-project — document it, get it signed, protect your margin.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Provider (you)" value={provider} onChange={setProvider} />
          <Field label="Client" value={client} onChange={setClient} />
          <Field label="Project" value={project} onChange={setProject} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Original fee (USD)" value={originalFee} onChange={setOriginalFee} />
            <Field label="Original delivery date" value={originalDelivery} onChange={setOriginalDelivery} type="date" />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Description of change" value={changeDesc} onChange={setChangeDesc} rows={4} placeholder="Client requested an additional deliverable: 5 vertical cut-downs for Instagram Reels." />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Additional fee (USD)" value={additionalFee} onChange={setAdditionalFee} />
            <Field label="New delivery date" value={newDelivery} onChange={setNewDelivery} type="date" />
          </div>
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>CHANGE ORDER</h1>
        <p>This Change Order, dated <strong>{formatDate(today())}</strong>, modifies the agreement between <strong>{val(provider, "[Provider]")}</strong> and <strong>{val(client, "[Client]")}</strong> for the project titled <strong>"{val(project, "[Project]")}"</strong>.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Original Terms</h2>
        <p>Original fee: <strong>${val(originalFee, "0")}</strong>. Original delivery: <strong>{val(formatDate(originalDelivery))}</strong>.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Change</h2>
        <p style={{ whiteSpace: "pre-line" }}>{val(changeDesc, "[Change description.]")}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Revised Terms</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 }}>
          <tbody>
            <tr><td style={{ padding: "6px 0", color: "#666" }}>Additional fee</td><td style={{ padding: "6px 0", textAlign: "right", fontWeight: 500 }}>${val(additionalFee, "0")}</td></tr>
            <tr style={{ borderTop: "2px solid #000" }}><td style={{ padding: "6px 0", fontWeight: 700 }}>New total</td><td style={{ padding: "6px 0", textAlign: "right", fontWeight: 700 }}>${newTotal}</td></tr>
            <tr><td style={{ padding: "6px 0", color: "#666" }}>New delivery date</td><td style={{ padding: "6px 0", textAlign: "right", fontWeight: 500 }}>{val(formatDate(newDelivery))}</td></tr>
          </tbody>
        </table>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. All Other Terms</h2>
        <p>All other terms of the original agreement remain in full force and effect.</p>

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
