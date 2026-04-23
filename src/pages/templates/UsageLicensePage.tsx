import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function UsageLicensePage() {
  const [licensor, setLicensor] = useState("")
  const [licensee, setLicensee] = useState("")
  const [work, setWork] = useState("")
  const [mediaTypes, setMediaTypes] = useState("")
  const [territory, setTerritory] = useState("Worldwide")
  const [term, setTerm] = useState("12 months")
  const [exclusivity, setExclusivity] = useState("Non-exclusive")
  const [fee, setFee] = useState("")

  return (
    <TemplateShell slug="usage-license" title="Usage License / Rights Grant" subtitle="Granular usage rights for specific assets. Stop giving away unlimited rights.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Licensor (you, the rights holder)" value={licensor} onChange={setLicensor} />
          <Field label="Licensee (the party getting the rights)" value={licensee} onChange={setLicensee} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Licensed work (what's being licensed)" value={work} onChange={setWork} placeholder="60-second hero video titled 'Summer 2026 Campaign'" />
          <TextArea label="Allowed media types" value={mediaTypes} onChange={setMediaTypes} placeholder="Social media (organic), owned website, email newsletters. Paid ads excluded." />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Territory" value={territory} onChange={setTerritory} placeholder="Worldwide, North America..." />
            <Field label="Term" value={term} onChange={setTerm} placeholder="12 months, in perpetuity..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Exclusivity" value={exclusivity} onChange={setExclusivity} placeholder="Exclusive / Non-exclusive" />
            <Field label="License fee (USD)" value={fee} onChange={setFee} />
          </div>
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>USAGE LICENSE / RIGHTS GRANT</h1>
        <p>This License Agreement, dated <strong>{formatDate(today())}</strong>, is between <strong>{val(licensor, "[Licensor]")}</strong> ("Licensor") and <strong>{val(licensee, "[Licensee]")}</strong> ("Licensee").</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Licensed Work</h2>
        <p style={{ whiteSpace: "pre-line" }}>{val(work, "[Description of the work.]")}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Grant of Rights</h2>
        <p>Subject to payment of the License Fee and the terms below, Licensor grants Licensee a <strong>{val(exclusivity, "non-exclusive")}</strong>, non-transferable, limited license to use the Licensed Work solely as set forth in this Agreement.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Scope</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 8 }}>
          <tbody>
            <tr><td style={{ padding: "5px 0", color: "#666", width: "30%" }}>Media</td><td style={{ padding: "5px 0", fontWeight: 500 }}>{val(mediaTypes)}</td></tr>
            <tr><td style={{ padding: "5px 0", color: "#666" }}>Territory</td><td style={{ padding: "5px 0", fontWeight: 500 }}>{val(territory)}</td></tr>
            <tr><td style={{ padding: "5px 0", color: "#666" }}>Term</td><td style={{ padding: "5px 0", fontWeight: 500 }}>{val(term)}</td></tr>
            <tr><td style={{ padding: "5px 0", color: "#666" }}>Exclusivity</td><td style={{ padding: "5px 0", fontWeight: 500 }}>{val(exclusivity)}</td></tr>
          </tbody>
        </table>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. License Fee</h2>
        <p>Licensee will pay Licensor <strong>${val(fee, "0")}</strong> in exchange for the license granted. The license becomes effective upon receipt of payment.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>5. Reservation of Rights</h2>
        <p>All rights not expressly granted in this Agreement are reserved by Licensor. Licensee shall not sublicense, sell, or otherwise transfer the rights granted. Any use outside the scope defined above requires a separate written agreement and additional compensation.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>6. Credit</h2>
        <p>Where editorially appropriate, Licensee will credit Licensor. Lack of credit does not void this License but Licensor reserves the right to request reasonable credit placement.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Licensor · {val(licensor)}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Licensee · {val(licensee)}</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
