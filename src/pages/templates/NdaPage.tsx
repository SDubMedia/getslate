import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

export default function NdaPage() {
  const [partyA, setPartyA] = useState("")
  const [partyAAddress, setPartyAAddress] = useState("")
  const [partyB, setPartyB] = useState("")
  const [partyBAddress, setPartyBAddress] = useState("")
  const [purpose, setPurpose] = useState("evaluate a potential business relationship between the parties")
  const [termYears, setTermYears] = useState("3")

  return (
    <TemplateShell slug="nda" title="Mutual NDA" subtitle="Both parties protect what they share. Standard short-form agreement.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Party A</h2>
          <Field label="Name / company" value={partyA} onChange={setPartyA} />
          <Field label="Address" value={partyAAddress} onChange={setPartyAAddress} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Party B</h2>
          <Field label="Name / company" value={partyB} onChange={setPartyB} />
          <Field label="Address" value={partyBAddress} onChange={setPartyBAddress} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Purpose (what are you discussing?)" value={purpose} onChange={setPurpose} />
          <Field label="Term (years)" value={termYears} onChange={setTermYears} type="number" />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>MUTUAL NON-DISCLOSURE AGREEMENT</h1>
        <p>This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of <strong>{formatDate(today())}</strong> between <strong>{val(partyA, "[Party A]")}</strong> of {val(partyAAddress)}, and <strong>{val(partyB, "[Party B]")}</strong> of {val(partyBAddress)} (each a "Party," together the "Parties").</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Purpose</h2>
        <p>The Parties wish to {val(purpose)} (the "Purpose") and in connection with the Purpose may disclose to one another certain Confidential Information.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Confidential Information</h2>
        <p>"Confidential Information" means any non-public information disclosed by one Party ("Discloser") to the other ("Recipient"), in any form, that is marked or identified as confidential, or that a reasonable person would understand to be confidential given its nature.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Obligations</h2>
        <p>Recipient agrees to: (a) use Confidential Information solely for the Purpose; (b) protect it using at least the same degree of care it uses for its own confidential information, and in no event less than reasonable care; (c) not disclose it to third parties except to employees, contractors, and advisors who have a need to know and are bound by obligations at least as protective as these; and (d) return or destroy all Confidential Information upon request.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. Exclusions</h2>
        <p>Confidential Information does not include information that: (a) was rightfully known to Recipient without restriction before disclosure; (b) is or becomes publicly available through no fault of Recipient; (c) was independently developed by Recipient without use of the Confidential Information; or (d) is rightfully obtained from a third party without restriction.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>5. Term</h2>
        <p>This Agreement remains in effect for <strong>{val(termYears, "3")}</strong> years from the date above. The confidentiality obligations survive termination.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>6. No License; No Obligation</h2>
        <p>No license or other right is granted by this Agreement. Neither Party is obligated to disclose any information or enter into any business relationship.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>7. Remedies</h2>
        <p>The Parties acknowledge that breach of this Agreement may cause irreparable harm, and that the non-breaching Party may seek injunctive relief in addition to any other remedies available.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Party A · {val(partyA)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Party B · {val(partyB)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
