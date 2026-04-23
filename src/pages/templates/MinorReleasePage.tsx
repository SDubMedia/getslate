import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

export default function MinorReleasePage() {
  const [minorName, setMinorName] = useState("")
  const [minorAge, setMinorAge] = useState("")
  const [parentName, setParentName] = useState("")
  const [parentAddress, setParentAddress] = useState("")
  const [relationship, setRelationship] = useState("Parent / legal guardian")
  const [producerName, setProducerName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [shootDate, setShootDate] = useState(today())
  const [compensation, setCompensation] = useState("the agreed-upon fee")

  return (
    <TemplateShell title="Minor Model Release" subtitle="Required parental consent for anyone under 18. Legally distinct from the adult release.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Minor's full name" value={minorName} onChange={setMinorName} />
            <Field label="Minor's age" value={minorAge} onChange={setMinorAge} type="number" />
          </div>
          <Field label="Parent / guardian name" value={parentName} onChange={setParentName} />
          <Field label="Relationship to minor" value={relationship} onChange={setRelationship} />
          <Field label="Parent / guardian address" value={parentAddress} onChange={setParentAddress} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Producer" value={producerName} onChange={setProducerName} />
          <Field label="Project name" value={projectName} onChange={setProjectName} />
          <Field label="Shoot date" value={shootDate} onChange={setShootDate} type="date" />
          <Field label="Compensation" value={compensation} onChange={setCompensation} />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>MINOR MODEL RELEASE</h1>
        <p>I, <strong>{val(parentName, "[Parent / Guardian]")}</strong>, of {val(parentAddress)}, am the {val(relationship)} of <strong>{val(minorName, "[Minor]")}</strong>, age <strong>{val(minorAge)}</strong> (the "Minor"). I have full legal authority to grant this release on the Minor's behalf.</p>

        <p style={{ marginTop: 12 }}>For good and valuable consideration, including {val(compensation)}, receipt of which is hereby acknowledged, I grant to <strong>{val(producerName, "[Producer]")}</strong> ("Producer") and its assigns, licensees, and successors, the irrevocable right and permission to use photographs, video, audio, and likenesses of the Minor taken on <strong>{formatDate(shootDate)}</strong> in connection with the project titled <strong>"{val(projectName, "[Project]")}"</strong>.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Use</h2>
        <p>The images and recordings may be used for advertising, promotional, editorial, commercial, and educational purposes in any and all media, worldwide, in perpetuity, without further compensation or notice.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Waiver</h2>
        <p>I waive any right on behalf of the Minor or myself to inspect or approve the finished work, and release Producer from any claims arising from the use of the Minor's likeness, including claims of invasion of privacy or defamation.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Representations</h2>
        <p>I am at least 18 years of age and have the full legal right to enter into this release on behalf of the Minor. I have read this release and understand its contents.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>{val(relationship)} · {val(parentName)}</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Witness</p>
            <p style={{ fontSize: 11, color: "#666" }}>Date: __________</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
