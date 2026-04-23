import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function PressReleasePage() {
  const [headline, setHeadline] = useState("")
  const [subhead, setSubhead] = useState("")
  const [city, setCity] = useState("")
  const [releaseDate, setReleaseDate] = useState(today())
  const [lede, setLede] = useState("")
  const [body, setBody] = useState("")
  const [quote, setQuote] = useState("")
  const [quoteAttribution, setQuoteAttribution] = useState("")
  const [about, setAbout] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  return (
    <TemplateShell title="Press Release Template" subtitle="AP-style announcement. For project launches, company news, milestones.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Headline" value={headline} onChange={setHeadline} placeholder="Your Production Co Launches Flagship Series for Major Brand" />
          <Field label="Subheadline (optional)" value={subhead} onChange={setSubhead} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City / dateline" value={city} onChange={setCity} placeholder="Nashville, TN" />
            <Field label="Release date" value={releaseDate} onChange={setReleaseDate} type="date" />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Lede (1 sentence, summarize everything)" value={lede} onChange={setLede} rows={2} />
          <TextArea label="Body (context, details, why it matters)" value={body} onChange={setBody} rows={6} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Quote" value={quote} onChange={setQuote} rows={3} />
          <Field label="Quote attribution" value={quoteAttribution} onChange={setQuoteAttribution} placeholder="Jane Smith, CEO of Client Co" />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="About your company (boilerplate)" value={about} onChange={setAbout} rows={3} />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Contact name" value={contactName} onChange={setContactName} />
            <Field label="Email" value={contactEmail} onChange={setContactEmail} />
            <Field label="Phone" value={contactPhone} onChange={setContactPhone} />
          </div>
        </section>
      </div>

      <PrintPaper>
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", marginBottom: 8 }}>For Immediate Release</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{val(headline, "[Headline]")}</h1>
        {subhead && <p style={{ fontSize: 14, color: "#444", marginBottom: 16 }}>{subhead}</p>}
        <p style={{ fontSize: 11, color: "#666", marginBottom: 20 }}>{val(city, "[City]")} — {formatDate(releaseDate)}</p>
        <p style={{ marginBottom: 12 }}><strong>{val(lede, "[Lede sentence.]")}</strong></p>
        <div style={{ whiteSpace: "pre-line", marginBottom: 16 }}>{val(body, "[Body paragraphs.]")}</div>
        {quote && (
          <blockquote style={{ borderLeft: "3px solid #000", paddingLeft: 16, margin: "20px 0", fontStyle: "italic" }}>
            "{quote}"
            {quoteAttribution && <p style={{ fontStyle: "normal", fontSize: 12, marginTop: 8 }}>— {quoteAttribution}</p>}
          </blockquote>
        )}
        {about && (
          <>
            <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginTop: 24, marginBottom: 6 }}>About</h3>
            <p style={{ fontSize: 12 }}>{about}</p>
          </>
        )}
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginTop: 20, marginBottom: 6 }}>Media Contact</h3>
        <p style={{ fontSize: 12 }}>{val(contactName)}<br />{contactEmail}<br />{contactPhone}</p>
        <p style={{ textAlign: "center", marginTop: 24, letterSpacing: "0.1em" }}>###</p>
        <p style={{ marginTop: 32, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
