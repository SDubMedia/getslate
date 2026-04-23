import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function WrapReportPage() {
  const [client, setClient] = useState("")
  const [project, setProject] = useState("")
  const [date, setDate] = useState(today())
  const [period, setPeriod] = useState("")
  const [summary, setSummary] = useState("")
  const [delivered, setDelivered] = useState("")
  const [hours, setHours] = useState("")
  const [invoiceRef, setInvoiceRef] = useState("")
  const [challenges, setChallenges] = useState("")
  const [nextSteps, setNextSteps] = useState("")
  const [deliverableLink, setDeliverableLink] = useState("")

  return (
    <TemplateShell slug="wrap-report" title="Project Wrap Report" subtitle="End-of-project recap. Sent with the final invoice — makes you look professional.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client" value={client} onChange={setClient} />
            <Field label="Project" value={project} onChange={setProject} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Project period" value={period} onChange={setPeriod} placeholder="Jan 10 – Feb 28, 2026" />
            <Field label="Report date" value={date} onChange={setDate} type="date" />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Project summary" value={summary} onChange={setSummary} />
          <TextArea label="What we delivered" value={delivered} onChange={setDelivered} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Total hours" value={hours} onChange={setHours} />
            <Field label="Invoice reference" value={invoiceRef} onChange={setInvoiceRef} placeholder="INV-2026-042" />
          </div>
          <TextArea label="Challenges + how we handled them" value={challenges} onChange={setChallenges} />
          <TextArea label="Recommended next steps" value={nextSteps} onChange={setNextSteps} placeholder="Quarterly cadence? Pass to a social team? Refresh content in 6 months?" />
          <Field label="Deliverable link" value={deliverableLink} onChange={setDeliverableLink} placeholder="Google Drive, Vimeo, Frame.io..." />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Project Wrap Report</h1>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>{val(project)} · {val(client)} · {val(period)} · {formatDate(date)}</p>
        {[["Project summary", summary], ["What we delivered", delivered], ["Total hours", hours], ["Invoice reference", invoiceRef], ["Challenges", challenges], ["Recommended next steps", nextSteps], ["Deliverable link", deliverableLink]].map(([l, v]) => (
          <div key={l} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 8 }}>{l}</h3>
            <p style={{ fontSize: 13, whiteSpace: "pre-line" }}>{val(v, "—")}</p>
          </div>
        ))}
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
