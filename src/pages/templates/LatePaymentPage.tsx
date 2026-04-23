import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

type Tone = "friendly" | "firm" | "final"

export default function LatePaymentPage() {
  const [yourName, setYourName] = useState("")
  const [yourBusiness, setYourBusiness] = useState("")
  const [clientName, setClientName] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceAmount, setInvoiceAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [daysLate, setDaysLate] = useState("14")
  const [tone, setTone] = useState<Tone>("friendly")

  const templates: Record<Tone, string> = {
    friendly: `Hi ${val(clientName, "[Client]")},

Just a gentle reminder that invoice ${val(invoiceNumber, "#____")} for $${val(invoiceAmount, "0")} was due ${val(formatDate(dueDate), "[date]")} and is now ${val(daysLate, "14")} days past due.

I know how easily things slip through the cracks — totally happens on my end too. When you get a moment, could you let me know the status? Happy to resend the invoice or work out a payment plan if that'd help.

Thanks,
${val(yourName, "[Your name]")}
${val(yourBusiness)}`,
    firm: `Hi ${val(clientName, "[Client]")},

I'm following up on invoice ${val(invoiceNumber, "#____")} for $${val(invoiceAmount, "0")}. It was due ${val(formatDate(dueDate), "[date]")} and is now ${val(daysLate, "14")} days overdue.

I'd appreciate an update on when payment will be sent. If there's a problem with the invoice or the work delivered, please let me know so we can resolve it. Otherwise, I'd like to receive payment within the next 5 business days.

Thanks,
${val(yourName, "[Your name]")}
${val(yourBusiness)}`,
    final: `${val(clientName, "[Client]")},

This is a final notice regarding invoice ${val(invoiceNumber, "#____")} for $${val(invoiceAmount, "0")}, which was due ${val(formatDate(dueDate), "[date]")} and is now ${val(daysLate, "14")} days overdue.

If full payment is not received within 7 days of this notice, I will have to pause any ongoing work, refer this account for collections, and pursue legal remedies to recover the amount owed plus any applicable late fees, interest, and costs.

I'd much rather resolve this directly. Please respond today.

${val(yourName, "[Your name]")}
${val(yourBusiness)}`,
  }

  const [body, setBody] = useState(templates.friendly)

  function applyTone(t: Tone) {
    setTone(t)
    setBody(templates[t])
  }

  return (
    <TemplateShell slug="late-payment" title="Late Payment Letter" subtitle="Three tones. Fill in the details, pick the energy, send.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Your name" value={yourName} onChange={setYourName} />
            <Field label="Your business" value={yourBusiness} onChange={setYourBusiness} />
          </div>
          <Field label="Client contact name" value={clientName} onChange={setClientName} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Invoice #" value={invoiceNumber} onChange={setInvoiceNumber} />
            <Field label="Amount (USD)" value={invoiceAmount} onChange={setInvoiceAmount} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Due date" value={dueDate} onChange={setDueDate} type="date" />
            <Field label="Days late" value={daysLate} onChange={setDaysLate} type="number" />
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tone</h2>
          <div className="grid grid-cols-3 gap-2">
            {(["friendly", "firm", "final"] as Tone[]).map((t) => (
              <button
                key={t}
                onClick={() => applyTone(t)}
                className={`px-3 py-2 rounded text-xs font-medium capitalize transition-colors ${
                  tone === t
                    ? t === "friendly" ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                    : t === "firm" ? "bg-amber-500/20 border border-amber-500/50 text-amber-300"
                    : "bg-red-500/20 border border-red-500/50 text-red-300"
                    : "border border-white/10 text-slate-400 hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">Changing tone reloads the template. Edit freely below.</p>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Letter body (editable)" value={body} onChange={setBody} rows={14} />
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(body)}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Copy to clipboard
            </button>
          </div>
        </section>
      </div>

      <PrintPaper>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>{formatDate(today())}</p>
        <div style={{ whiteSpace: "pre-line", fontSize: 13, lineHeight: 1.7 }}>{body}</div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#aaa", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
