import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function CrewDealMemoPage() {
  const [production, setProduction] = useState("")
  const [crewName, setCrewName] = useState("")
  const [role, setRole] = useState("")
  const [shootDate, setShootDate] = useState(today())
  const [callTime, setCallTime] = useState("07:00")
  const [location, setLocation] = useState("")
  const [dayRate, setDayRate] = useState("")
  const [otRate, setOtRate] = useState("")
  const [perDiem, setPerDiem] = useState("")
  const [mileage, setMileage] = useState("yes")
  const [gearIncluded, setGearIncluded] = useState("")
  const [notes, setNotes] = useState("")

  return (
    <TemplateShell slug="crew-deal-memo" title="Crew Deal Memo" subtitle="One-page day-rate booking. Send, sign, show up.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Production company" value={production} onChange={setProduction} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Crew member name" value={crewName} onChange={setCrewName} />
            <Field label="Role" value={role} onChange={setRole} placeholder="A1, DP, Editor" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Shoot date" value={shootDate} onChange={setShootDate} type="date" />
            <Field label="Call time" value={callTime} onChange={setCallTime} type="time" />
            <Field label="Mileage reimbursed?" value={mileage} onChange={setMileage} placeholder="yes/no/IRS rate" />
          </div>
          <Field label="Location" value={location} onChange={setLocation} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Day rate (USD)" value={dayRate} onChange={setDayRate} />
            <Field label="OT rate (USD/hr after 10hr)" value={otRate} onChange={setOtRate} />
            <Field label="Per diem (USD)" value={perDiem} onChange={setPerDiem} />
          </div>
          <Field label="Gear included" value={gearIncluded} onChange={setGearIncluded} placeholder="Body, 2 lenses, basic audio kit" />
          <TextArea label="Notes" value={notes} onChange={setNotes} rows={2} />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>CREW DEAL MEMO</h1>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>{formatDate(today())}</p>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            <Row l="Production" v={val(production)} />
            <Row l="Crew member" v={val(crewName)} />
            <Row l="Role" v={val(role)} />
            <Row l="Shoot date" v={formatDate(shootDate)} />
            <Row l="Call time" v={val(callTime)} />
            <Row l="Location" v={val(location)} />
            <Row l="Day rate" v={`$${val(dayRate, "0")}`} />
            <Row l="OT rate (after 10 hrs)" v={`$${val(otRate, "0")}/hr`} />
            <Row l="Per diem" v={`$${val(perDiem, "0")}`} />
            <Row l="Mileage" v={val(mileage)} />
            <Row l="Gear provided" v={val(gearIncluded)} />
          </tbody>
        </table>

        {notes && (<p style={{ marginTop: 20, fontSize: 13 }}><strong>Notes:</strong> {notes}</p>)}

        <h2 style={{ fontSize: 13, marginTop: 24, marginBottom: 8 }}>Terms</h2>
        <p style={{ fontSize: 12 }}>Cancellation within 48 hours of call time: 50% of day rate owed. Same-day cancellation or postponement: 100% of day rate owed. Crew member is engaged as a 1099 independent contractor and will be paid within 14 days of shoot day upon receipt of W-9 and invoice.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Production · {val(production)}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Crew · {val(crewName)}</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}

function Row({ l, v }: { l: string; v: string }) {
  return <tr><td style={{ padding: "5px 0", color: "#666", width: "35%" }}>{l}</td><td style={{ padding: "5px 0", fontWeight: 500 }}>{v}</td></tr>
}
