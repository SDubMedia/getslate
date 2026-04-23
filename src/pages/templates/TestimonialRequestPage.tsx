import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function TestimonialRequestPage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [project, setProject] = useState("")
  const [questions, setQuestions] = useState(
    "1. What was the problem you were trying to solve when you came to us?\n2. What was the result of working together?\n3. What surprised you about the process?\n4. Would you recommend us to a friend in your industry? Why?"
  )

  return (
    <TemplateShell title="Testimonial Request Letter" subtitle="Short, human ask. Pair with the in-app prompt that fires when a client pays.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="From (your name)" value={from} onChange={setFrom} />
          <Field label="To (client name)" value={to} onChange={setTo} />
          <Field label="Project reference" value={project} onChange={setProject} placeholder="the Q1 podcast series" />
          <TextArea label="Optional guiding questions" value={questions} onChange={setQuestions} rows={6} />
        </section>
      </div>

      <PrintPaper>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>{formatDate(today())}</p>
        <p>Hi {val(to, "[Client]")},</p>
        <p style={{ marginTop: 12 }}>Quick ask — would you be up for writing a short testimonial about working together on {val(project, "[project]")}?</p>
        <p style={{ marginTop: 12 }}>A few sentences is plenty. I know your time is tight. If you want guideposts, a couple questions that might help:</p>
        <div style={{ whiteSpace: "pre-line", marginTop: 12, marginLeft: 16, fontSize: 13 }}>{val(questions)}</div>
        <p style={{ marginTop: 16 }}>Either way — thanks for being great to work with. It mattered.</p>
        <p style={{ marginTop: 20 }}>— {val(from, "[Your name]")}</p>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
