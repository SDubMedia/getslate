import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function IcAgreementPage() {
  const [company, setCompany] = useState("")
  const [contractor, setContractor] = useState("")
  const [services, setServices] = useState("")
  const [startDate, setStartDate] = useState(today())
  const [endDate, setEndDate] = useState("")
  const [fee, setFee] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("Net 14 after invoice.")

  return (
    <TemplateShell title="Independent Contractor Agreement (Work-for-Hire)" subtitle="For when YOU hire a 1099 editor, DP, or PA. Includes IP assignment — critical.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Your company (Hirer)" value={company} onChange={setCompany} />
          <Field label="Contractor name" value={contractor} onChange={setContractor} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Services" value={services} onChange={setServices} placeholder="Edit a 3-episode podcast series. Deliver as 1080p MP4 + audio stems." />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start date" value={startDate} onChange={setStartDate} type="date" />
            <Field label="End date" value={endDate} onChange={setEndDate} type="date" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fee (USD)" value={fee} onChange={setFee} />
            <Field label="Payment terms" value={paymentTerms} onChange={setPaymentTerms} />
          </div>
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>INDEPENDENT CONTRACTOR AGREEMENT</h1>
        <p>This Agreement, dated <strong>{formatDate(today())}</strong>, is between <strong>{val(company, "[Company]")}</strong> ("Company") and <strong>{val(contractor, "[Contractor]")}</strong> ("Contractor").</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Services</h2>
        <p style={{ whiteSpace: "pre-line" }}>{val(services, "[Services]")}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Term</h2>
        <p>Starts <strong>{formatDate(startDate)}</strong> and continues until the later of <strong>{val(formatDate(endDate))}</strong> or satisfactory completion of the Services.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Compensation</h2>
        <p>Total fee: <strong>${val(fee, "0")}</strong>. Payment terms: {val(paymentTerms)} Contractor must submit a W-9 before first payment.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. Independent Contractor Status</h2>
        <p>Contractor is an independent contractor and not an employee of Company. Contractor is responsible for all taxes on compensation received hereunder. Nothing in this Agreement creates a partnership, joint venture, or employment relationship.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>5. Work for Hire / IP Assignment</h2>
        <p>All deliverables produced by Contractor under this Agreement (the "Work Product") are considered "works made for hire" under the Copyright Act. To the extent any portion is not a work for hire, Contractor irrevocably assigns to Company all right, title, and interest in and to the Work Product, including all copyrights and other intellectual property rights. Contractor agrees to execute any further documents reasonably necessary to perfect this assignment.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>6. Confidentiality</h2>
        <p>Contractor will not disclose any non-public information of Company or its clients learned in the course of this engagement, except as required by law.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>7. Portfolio Use</h2>
        <p>Contractor may display the Work Product in a personal portfolio for purposes of demonstrating past work, unless Company provides written notice to the contrary.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>8. Termination</h2>
        <p>Either party may terminate this Agreement with 7 days' written notice. Upon termination, Contractor will be paid for Services satisfactorily performed through the termination date.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>9. Indemnification</h2>
        <p>Contractor represents that the Work Product will be original and will not infringe the rights of any third party. Contractor agrees to indemnify Company against any claim arising from breach of this representation.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Company · {val(company)}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Contractor · {val(contractor)}</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
