import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, val } from "./_shared"

export default function CaseStudyPage() {
  const [clientName, setClientName] = useState("")
  const [industry, setIndustry] = useState("")
  const [projectName, setProjectName] = useState("")
  const [heroLine, setHeroLine] = useState("")
  const [challenge, setChallenge] = useState("")
  const [approach, setApproach] = useState("")
  const [deliverables, setDeliverables] = useState("")
  const [results, setResults] = useState("")
  const [quote, setQuote] = useState("")
  const [quoteAuthor, setQuoteAuthor] = useState("")
  const [metric1Label, setMetric1Label] = useState("")
  const [metric1Value, setMetric1Value] = useState("")
  const [metric2Label, setMetric2Label] = useState("")
  const [metric2Value, setMetric2Value] = useState("")
  const [metric3Label, setMetric3Label] = useState("")
  const [metric3Value, setMetric3Value] = useState("")

  return (
    <TemplateShell slug="case-study" title="Case Study Template" subtitle="Structure for telling a project story. Fill out, print, drop in your portfolio.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client name" value={clientName} onChange={setClientName} />
            <Field label="Industry" value={industry} onChange={setIndustry} />
          </div>
          <Field label="Project name" value={projectName} onChange={setProjectName} />
          <Field label="One-line hero statement" value={heroLine} onChange={setHeroLine} placeholder="How we helped a regional brand 3x their video output." />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="The challenge" value={challenge} onChange={setChallenge} />
          <TextArea label="Our approach" value={approach} onChange={setApproach} />
          <TextArea label="Deliverables" value={deliverables} onChange={setDeliverables} />
          <TextArea label="The results" value={results} onChange={setResults} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Key metrics (optional)</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Metric 1 label" value={metric1Label} onChange={setMetric1Label} placeholder="Views" />
            <Field label="Metric 1 value" value={metric1Value} onChange={setMetric1Value} placeholder="2.4M" />
            <Field label="Metric 2 label" value={metric2Label} onChange={setMetric2Label} placeholder="Sign-ups" />
            <Field label="Metric 2 value" value={metric2Value} onChange={setMetric2Value} placeholder="+140%" />
            <Field label="Metric 3 label" value={metric3Label} onChange={setMetric3Label} placeholder="Content pieces" />
            <Field label="Metric 3 value" value={metric3Value} onChange={setMetric3Value} placeholder="24" />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Client quote" value={quote} onChange={setQuote} />
          <Field label="Quote author" value={quoteAuthor} onChange={setQuoteAuthor} placeholder="Jane Doe, CEO" />
        </section>
      </div>

      <PrintPaper>
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", marginBottom: 8 }}>Case Study · {val(industry)}</p>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{val(projectName, "[Project]")}</h1>
        <p style={{ fontSize: 16, color: "#444", marginBottom: 24 }}>{val(heroLine, "[One-line hero.]")}</p>

        {(metric1Value || metric2Value || metric3Value) && (
          <div style={{ display: "flex", gap: 24, marginBottom: 32, padding: "16px 0", borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd" }}>
            {[[metric1Label, metric1Value], [metric2Label, metric2Value], [metric3Label, metric3Value]].filter(([, v]) => v).map(([l, v], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 700 }}>{v}</p>
                <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#777" }}>{l}</p>
              </div>
            ))}
          </div>
        )}

        <Section label="Client" body={clientName} />
        <Section label="The challenge" body={challenge} />
        <Section label="Our approach" body={approach} />
        <Section label="Deliverables" body={deliverables} />
        <Section label="The results" body={results} />

        {quote && (
          <blockquote style={{ borderLeft: "3px solid #000", paddingLeft: 16, margin: "32px 0", fontStyle: "italic" }}>
            "{quote}"
            {quoteAuthor && <p style={{ fontStyle: "normal", fontSize: 12, marginTop: 8 }}>— {quoteAuthor}</p>}
          </blockquote>
        )}
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}

function Section({ label, body }: { label: string; body: string }) {
  if (!body) return null
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 8 }}>{label}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line" }}>{body}</p>
    </div>
  )
}
