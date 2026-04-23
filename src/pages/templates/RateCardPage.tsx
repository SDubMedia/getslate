import { useState } from "react"
import { TemplateShell, Field, PrintPaper, val } from "./_shared"

interface Rate {
  id: string
  label: string
  rate: string
  unit: string
}

function nanoid() { return Math.random().toString(36).slice(2, 10) }

export default function RateCardPage() {
  const [businessName, setBusinessName] = useState("")
  const [tagline, setTagline] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [website, setWebsite] = useState("")
  const [rates, setRates] = useState<Rate[]>([
    { id: nanoid(), label: "Full day (10 hours)", rate: "1500", unit: "day" },
    { id: nanoid(), label: "Half day (5 hours)", rate: "850", unit: "half day" },
    { id: nanoid(), label: "Editing", rate: "75", unit: "hour" },
    { id: nanoid(), label: "Overtime", rate: "110", unit: "hour" },
  ])
  const [note, setNote] = useState("Rates valid through end of year. Out-of-area travel billed separately.")

  function update(id: string, patch: Partial<Rate>) {
    setRates((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  return (
    <TemplateShell slug="rate-card" title="Rate Card" subtitle="Clean, downloadable rate sheet. Send to inquiries instead of a text thread.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Business</h2>
          <Field label="Business name" value={businessName} onChange={setBusinessName} placeholder="Your Production Co, LLC" />
          <Field label="Tagline (optional)" value={tagline} onChange={setTagline} placeholder="Video production for growing brands" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email" value={email} onChange={setEmail} type="email" />
            <Field label="Phone" value={phone} onChange={setPhone} />
          </div>
          <Field label="Website" value={website} onChange={setWebsite} />
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rates</h2>
            <button
              onClick={() => setRates((p) => [...p, { id: nanoid(), label: "", rate: "", unit: "hour" }])}
              className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]"
            >+ Add rate</button>
          </div>
          <div className="space-y-2">
            {rates.map((r) => (
              <div key={r.id} className="grid grid-cols-12 gap-2 items-center">
                <input
                  value={r.label}
                  onChange={(e) => update(r.id, { label: e.target.value })}
                  placeholder="Description"
                  className="col-span-6 bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
                />
                <div className="col-span-3 flex items-center">
                  <span className="text-slate-500 text-sm mr-1">$</span>
                  <input value={r.rate} onChange={(e) => update(r.id, { rate: e.target.value })} type="number" min={0} className="flex-1 bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none text-right" />
                </div>
                <input
                  value={r.unit}
                  onChange={(e) => update(r.id, { unit: e.target.value })}
                  placeholder="hour / day"
                  className="col-span-2 bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
                />
                <button onClick={() => setRates((p) => p.filter((x) => x.id !== r.id))} className="col-span-1 text-slate-500 hover:text-red-400 text-sm">✕</button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Footer note (optional)" value={note} onChange={setNote} />
        </section>
      </div>

      <PrintPaper>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{val(businessName, "[Your Business]")}</h1>
          {tagline && <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>{tagline}</p>}
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.8 }}>
            {email && <span>{email}</span>}
            {email && phone && <span> · </span>}
            {phone && <span>{phone}</span>}
            {website && (phone || email) && <span> · </span>}
            {website && <span>{website}</span>}
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 16 }}>Rates</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
          <tbody>
            {rates.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px 0", fontSize: 14 }}>{val(r.label, "—")}</td>
                <td style={{ padding: "12px 0", fontSize: 14, textAlign: "right", fontWeight: 600 }}>${val(r.rate, "0")} / {val(r.unit, "hour")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {note && (
          <p style={{ fontSize: 11, color: "#777", textAlign: "center", marginTop: 40, borderTop: "1px solid #eee", paddingTop: 16 }}>
            {note}
          </p>
        )}
        <p style={{ marginTop: 24, fontSize: 10, color: "#aaa", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
