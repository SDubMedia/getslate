import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function ModelReleasePage() {
  const [modelName, setModelName] = useState("")
  const [modelAddress, setModelAddress] = useState("")
  const [producerName, setProducerName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [shootDate, setShootDate] = useState(today())
  const [compensation, setCompensation] = useState("the agreed-upon fee")
  const [usage, setUsage] = useState("advertising, promotional, editorial, commercial, and educational use in any and all media, worldwide, in perpetuity")

  return (
    <TemplateShell title="Model Release Form" subtitle="Standard adult model release — for photos and video.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Model's full legal name" value={modelName} onChange={setModelName} />
          <Field label="Model's address" value={modelAddress} onChange={setModelAddress} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Producer / photographer / company" value={producerName} onChange={setProducerName} placeholder="Your Production Co, LLC" />
          <Field label="Project or shoot name" value={projectName} onChange={setProjectName} placeholder="Spring 2026 Campaign" />
          <Field label="Shoot date" value={shootDate} onChange={setShootDate} type="date" />
          <Field label="Compensation" value={compensation} onChange={setCompensation} />
          <TextArea label="Usage scope" value={usage} onChange={setUsage} />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>ADULT MODEL RELEASE</h1>
        <p>For good and valuable consideration, including {val(compensation)}, receipt of which is hereby acknowledged, I, <strong>{val(modelName, "[Model]")}</strong>, whose address is {val(modelAddress)}, grant to <strong>{val(producerName, "[Producer]")}</strong> ("Producer"), and its assigns, licensees, and successors, the irrevocable right and permission to use photographs, video, audio, and likenesses of me taken on <strong>{val(formatDate(shootDate))}</strong> in connection with the project titled <strong>"{val(projectName, "[Project]")}"</strong>.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Use</h2>
        <p>The images and recordings may be used for {val(usage)}, without further compensation or notice to me.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Ownership</h2>
        <p>I acknowledge that Producer owns all rights in and to the images, recordings, and derivative works.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Waiver</h2>
        <p>I waive any right to inspect or approve the finished work. I release Producer and its assigns from any claims relating to the use of my likeness, including claims of invasion of privacy or defamation.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. Representations</h2>
        <p>I am at least 18 years of age and have the full right to enter into this release. I have read this release and understand its contents.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Model · {val(modelName)}</p>
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
