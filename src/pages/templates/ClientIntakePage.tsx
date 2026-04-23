import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function ClientIntakePage() {
  const [clientName, setClientName] = useState("")
  const [website, setWebsite] = useState("")
  const [contact, setContact] = useState("")
  const [date, setDate] = useState(today())
  const [business, setBusiness] = useState("")
  const [problem, setProblem] = useState("")
  const [goal, setGoal] = useState("")
  const [audience, setAudience] = useState("")
  const [deliverables, setDeliverables] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [references, setReferences] = useState("")
  const [hates, setHates] = useState("")
  const [stakeholders, setStakeholders] = useState("")
  const [worked, setWorked] = useState("")

  return (
    <TemplateShell title="Client Intake Questionnaire" subtitle="Send before kickoff. Their answers become your creative brief.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Client / company" value={clientName} onChange={setClientName} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Primary contact" value={contact} onChange={setContact} />
            <Field label="Website" value={website} onChange={setWebsite} />
          </div>
          <Field label="Date" value={date} onChange={setDate} type="date" />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Tell us about your business" value={business} onChange={setBusiness} />
          <TextArea label="What problem are we solving?" value={problem} onChange={setProblem} />
          <TextArea label="What's the goal of this project?" value={goal} onChange={setGoal} />
          <TextArea label="Who is the audience?" value={audience} onChange={setAudience} />
          <TextArea label="What deliverables do you need?" value={deliverables} onChange={setDeliverables} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Budget range" value={budget} onChange={setBudget} />
            <Field label="Timeline" value={timeline} onChange={setTimeline} />
          </div>
          <TextArea label="References / inspiration" value={references} onChange={setReferences} placeholder="Links, styles, brands you love" />
          <TextArea label="What would you hate to see" value={hates} onChange={setHates} />
          <TextArea label="Decision-makers / stakeholders" value={stakeholders} onChange={setStakeholders} placeholder="Who needs to sign off on the final?" />
          <TextArea label="Have you done this before?" value={worked} onChange={setWorked} placeholder="What worked, what didn't, what are you trying differently?" />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Client Intake Questionnaire</h1>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>{val(clientName)} · {formatDate(date)}</p>
        {contact && <p style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Contact: {contact}</p>}
        {website && <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>Website: {website}</p>}
        {[["About the business", business], ["Problem we're solving", problem], ["Project goal", goal], ["Target audience", audience], ["Deliverables needed", deliverables], ["Budget range", budget], ["Timeline", timeline], ["References / inspiration", references], ["Things to avoid", hates], ["Decision-makers", stakeholders], ["Past experience", worked]].map(([l, v]) => (
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
