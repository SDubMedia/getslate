import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

export default function LocationReleasePage() {
  const [ownerName, setOwnerName] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [locationAddress, setLocationAddress] = useState("")
  const [producerName, setProducerName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [shootDate, setShootDate] = useState(today())
  const [compensation, setCompensation] = useState("the agreed-upon location fee")

  return (
    <TemplateShell title="Location Release Form" subtitle="Permission to shoot on private property.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Property owner name" value={ownerName} onChange={setOwnerName} />
          <Field label="Owner address" value={ownerAddress} onChange={setOwnerAddress} />
          <Field label="Location being released" value={locationAddress} onChange={setLocationAddress} placeholder="Address of the property to be filmed" />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Producer / company" value={producerName} onChange={setProducerName} />
          <Field label="Project name" value={projectName} onChange={setProjectName} />
          <Field label="Shoot date" value={shootDate} onChange={setShootDate} type="date" />
          <Field label="Compensation" value={compensation} onChange={setCompensation} />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>LOCATION RELEASE</h1>
        <p>I, <strong>{val(ownerName, "[Owner]")}</strong>, of {val(ownerAddress)}, am the owner or authorized representative of the property located at <strong>{val(locationAddress, "[Location]")}</strong> (the "Property"). For good and valuable consideration, including {val(compensation)}, receipt of which is hereby acknowledged, I grant to <strong>{val(producerName, "[Producer]")}</strong> ("Producer") the right to enter the Property on <strong>{val(formatDate(shootDate))}</strong> and on any date Producer reasonably requires, to film, photograph, and record the Property in connection with the project titled <strong>"{val(projectName, "[Project]")}"</strong>.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Use</h2>
        <p>Producer may use the resulting footage, photographs, and recordings for any lawful purpose, in any medium, worldwide, in perpetuity, without further compensation or approval from me.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Condition of Property</h2>
        <p>Producer will use reasonable care and leave the Property in substantially the same condition. Producer is responsible for any damage caused by Producer's crew or equipment during the shoot, normal wear and tear excepted.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Representations</h2>
        <p>I represent that I have full authority to grant this release and that I am not aware of any third-party claim that would interfere with Producer's use of the Property.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. Release</h2>
        <p>I release Producer and its assigns from any claims arising from the use of the Property's likeness.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Owner · {val(ownerName)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Producer · {val(producerName)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
