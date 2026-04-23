import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

export default function W9RequestPage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [amountPaid, setAmountPaid] = useState("")
  const [year, setYear] = useState(String(new Date().getFullYear() - 1))
  const [dueDate, setDueDate] = useState("")

  return (
    <TemplateShell slug="w9-request" title="W-9 Request Letter" subtitle="Professional ask for a contractor's W-9 before year-end.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="From (your business)" value={from} onChange={setFrom} />
          <Field label="To (contractor name)" value={to} onChange={setTo} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount paid in year (USD)" value={amountPaid} onChange={setAmountPaid} />
            <Field label="Tax year" value={year} onChange={setYear} />
          </div>
          <Field label="Requested return by" value={dueDate} onChange={setDueDate} type="date" />
        </section>
      </div>

      <PrintPaper>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>{formatDate(today())}</p>
        <p>Hi {val(to, "[Contractor]")},</p>
        <p style={{ marginTop: 12 }}>We paid you <strong>${val(amountPaid, "0")}</strong> during <strong>{val(year)}</strong>, which means we need to issue you a 1099-NEC. To file that, I need a signed W-9 on file.</p>
        <p style={{ marginTop: 12 }}>Could you send a completed W-9 by <strong>{val(formatDate(dueDate), "[date]")}</strong>? You can grab the blank form here: <em>irs.gov/pub/irs-pdf/fw9.pdf</em></p>
        <p style={{ marginTop: 12 }}>Email it back as a PDF — we'll handle the rest. Thanks for making tax season less painful.</p>
        <p style={{ marginTop: 20 }}>— {val(from, "[Your business]")}</p>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
