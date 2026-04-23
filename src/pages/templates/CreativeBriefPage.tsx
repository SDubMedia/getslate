import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function CreativeBriefPage() {
  const [clientName, setClientName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [author, setAuthor] = useState("")
  const [date, setDate] = useState(today())
  const [background, setBackground] = useState("")
  const [objective, setObjective] = useState("")
  const [audience, setAudience] = useState("")
  const [keyMessage, setKeyMessage] = useState("")
  const [deliverables, setDeliverables] = useState("")
  const [tone, setTone] = useState("")
  const [mandatory, setMandatory] = useState("")
  const [avoid, setAvoid] = useState("")
  const [references, setReferences] = useState("")
  const [success, setSuccess] = useState("")
  const [timeline, setTimeline] = useState("")
  const [budget, setBudget] = useState("")

  return (
    <TemplateShell title="Creative Brief" subtitle="Fill this out WITH the client before any work starts. Saves scope fights later.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client" value={clientName} onChange={setClientName} />
            <Field label="Project name" value={projectName} onChange={setProjectName} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prepared by" value={author} onChange={setAuthor} />
            <Field label="Date" value={date} onChange={setDate} type="date" />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Background / context" value={background} onChange={setBackground} placeholder="What's the bigger picture? What's the market situation?" />
          <TextArea label="Objective (one sentence)" value={objective} onChange={setObjective} rows={2} placeholder="Convince Gen Z watching on YouTube that this product is worth trying." />
          <TextArea label="Target audience" value={audience} onChange={setAudience} placeholder="Primary viewer — demographics, habits, motivations, what keeps them up at night" />
          <TextArea label="Key message (what they should walk away believing)" value={keyMessage} onChange={setKeyMessage} rows={2} />
          <TextArea label="Deliverables" value={deliverables} onChange={setDeliverables} placeholder="1 x 60s hero video, 3 x 15s social cutdowns, 10 still photos for web..." />
          <TextArea label="Tone / style" value={tone} onChange={setTone} placeholder="Warm, optimistic, unpolished — like talking to a friend, not a spokesperson" />
          <TextArea label="Mandatory inclusions" value={mandatory} onChange={setMandatory} placeholder="Brand logo end card, disclaimer text, call to action" />
          <TextArea label="Things to avoid" value={avoid} onChange={setAvoid} placeholder="No competitor mentions, no drone shots, no slow-motion tropes" />
          <TextArea label="References" value={references} onChange={setReferences} placeholder="Links to videos / campaigns the client loves (or hates)" />
          <TextArea label="Success metrics" value={success} onChange={setSuccess} rows={2} placeholder="What does 'this worked' look like? Views? Sign-ups? Internal approval?" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Timeline" value={timeline} onChange={setTimeline} placeholder="Shoot by Apr 10, delivery Apr 24" />
            <Field label="Budget" value={budget} onChange={setBudget} placeholder="$X all-in" />
          </div>
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Creative Brief</h1>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>{val(projectName)} · {val(clientName)} · {formatDate(date)}</p>
        {author && <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>Prepared by {author}</p>}
        <Section label="Background" body={background} />
        <Section label="Objective" body={objective} />
        <Section label="Target Audience" body={audience} />
        <Section label="Key Message" body={keyMessage} />
        <Section label="Deliverables" body={deliverables} />
        <Section label="Tone & Style" body={tone} />
        <Section label="Mandatory Inclusions" body={mandatory} />
        <Section label="Avoid" body={avoid} />
        <Section label="References" body={references} />
        <Section label="Success Metrics" body={success} />
        <Section label="Timeline" body={timeline} inline />
        <Section label="Budget" body={budget} inline />
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}

function Section({ label, body, inline }: { label: string; body: string; inline?: boolean }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: inline ? 4 : 8 }}>{label}</h3>
      <p style={{ fontSize: 13, whiteSpace: "pre-line" }}>{val(body, "—")}</p>
    </div>
  )
}
