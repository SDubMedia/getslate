import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function ContractTemplatePage() {
  const [providerName, setProviderName] = useState("")
  const [providerAddress, setProviderAddress] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [projectName, setProjectName] = useState("")
  const [scope, setScope] = useState("")
  const [deliverables, setDeliverables] = useState("")
  const [shootDate, setShootDate] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [totalFee, setTotalFee] = useState("")
  const [deposit, setDeposit] = useState("")
  const [terms, setTerms] = useState("Net 14 after final delivery.")
  const [cancellation, setCancellation] = useState("If Client cancels within 7 days of the shoot date, the deposit is non-refundable.")
  const [usage, setUsage] = useState("Client receives full rights to use the final deliverables for commercial and promotional purposes. Provider retains the right to use all footage for portfolio and marketing.")

  return (
    <TemplateShell
      title="Video Production Contract"
      subtitle="Fill in the fields, download as PDF, edit in Word if you need. Starting point for simple commercial video work."
    >
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Provider (you)</h2>
          <Field label="Business name" value={providerName} onChange={setProviderName} placeholder="Your Production Co, LLC" />
          <Field label="Address" value={providerAddress} onChange={setProviderAddress} placeholder="123 Main St, Nashville TN 37203" />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</h2>
          <Field label="Client business / individual" value={clientName} onChange={setClientName} />
          <Field label="Address" value={clientAddress} onChange={setClientAddress} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</h2>
          <Field label="Project name" value={projectName} onChange={setProjectName} placeholder="Q2 Podcast Series" />
          <TextArea label="Scope of work" value={scope} onChange={setScope} placeholder="6 x 30-minute podcast episodes, shot in one day at Client's studio..." />
          <TextArea label="Deliverables" value={deliverables} onChange={setDeliverables} placeholder="- 6 edited episode videos (1080p, 16:9)&#10;- 6 audio-only MP3s&#10;- 18 social-media short cuts (vertical, captioned)" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Shoot date" value={shootDate} onChange={setShootDate} type="date" />
            <Field label="Delivery date" value={deliveryDate} onChange={setDeliveryDate} type="date" />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Money</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Total fee (USD)" value={totalFee} onChange={setTotalFee} placeholder="5000" />
            <Field label="Deposit (USD)" value={deposit} onChange={setDeposit} placeholder="2500" />
          </div>
          <Field label="Payment terms" value={terms} onChange={setTerms} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Legal</h2>
          <TextArea label="Cancellation policy" value={cancellation} onChange={setCancellation} />
          <TextArea label="Usage rights" value={usage} onChange={setUsage} />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>VIDEO PRODUCTION AGREEMENT</h1>
        <p>This Video Production Agreement ("Agreement") is entered into as of <strong>{formatDate(today())}</strong> between <strong>{val(providerName, "[Provider]")}</strong> ("Provider"), located at {val(providerAddress)}, and <strong>{val(clientName, "[Client]")}</strong> ("Client"), located at {val(clientAddress)}.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Project</h2>
        <p>Provider will produce the project titled <strong>"{val(projectName, "[Project]")}"</strong> for Client.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Scope of Work</h2>
        <p style={{ whiteSpace: "pre-line" }}>{val(scope, "[Scope of work to be defined.]")}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Deliverables</h2>
        <p style={{ whiteSpace: "pre-line" }}>{val(deliverables, "[Deliverables to be defined.]")}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. Schedule</h2>
        <p>Shoot date: <strong>{val(formatDate(shootDate))}</strong>. Final delivery by <strong>{val(formatDate(deliveryDate))}</strong>, subject to Client's timely review + feedback.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>5. Compensation</h2>
        <p>Total fee: <strong>${val(totalFee, "0")}</strong>. A deposit of <strong>${val(deposit, "0")}</strong> is due upon signing to reserve the shoot date. Remaining balance is due per the following terms: {val(terms)}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>6. Cancellation</h2>
        <p>{val(cancellation)}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>7. Usage Rights</h2>
        <p>{val(usage)}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>8. Revisions</h2>
        <p>Client is entitled to two (2) rounds of reasonable revisions per deliverable. Additional rounds billed at Provider's standard rate.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>9. Liability</h2>
        <p>Provider's total liability under this Agreement shall not exceed the total fee paid. Neither party is liable for indirect or consequential damages.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>10. Signatures</h2>
        <div style={{ marginTop: 32, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Provider · {val(providerName)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Client · {val(clientName)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>
          Generated free by Slate · getslate.net
        </p>
      </PrintPaper>
    </TemplateShell>
  )
}
