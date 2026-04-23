import { useState } from "react"
import { TemplateShell, Field, PrintPaper, today, formatDate, val } from "./_shared"

interface Crew { id: string; name: string; role: string; call: string; contact: string }
interface Sched { id: string; time: string; activity: string }
function nanoid() { return Math.random().toString(36).slice(2, 10) }

export default function CallSheetPage() {
  const [production, setProduction] = useState("")
  const [project, setProject] = useState("")
  const [shootDate, setShootDate] = useState(today())
  const [dayOf, setDayOf] = useState("1")
  const [totalDays, setTotalDays] = useState("1")
  const [generalCall, setGeneralCall] = useState("07:00")
  const [wrapEstimate, setWrapEstimate] = useState("18:00")
  const [locationName, setLocationName] = useState("")
  const [locationAddress, setLocationAddress] = useState("")
  const [parkingNotes, setParkingNotes] = useState("")
  const [weather, setWeather] = useState("")
  const [sunrise, setSunrise] = useState("")
  const [sunset, setSunset] = useState("")
  const [nearestHospital, setNearestHospital] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [notes, setNotes] = useState("")
  const [crew, setCrew] = useState<Crew[]>([
    { id: nanoid(), name: "", role: "Director", call: "07:00", contact: "" },
    { id: nanoid(), name: "", role: "DP", call: "07:00", contact: "" },
    { id: nanoid(), name: "", role: "Producer", call: "07:00", contact: "" },
    { id: nanoid(), name: "", role: "Camera A", call: "07:00", contact: "" },
    { id: nanoid(), name: "", role: "Sound", call: "07:00", contact: "" },
    { id: nanoid(), name: "", role: "Gaffer", call: "07:00", contact: "" },
  ])
  const [schedule, setSchedule] = useState<Sched[]>([
    { id: nanoid(), time: "07:00", activity: "Crew call + breakfast" },
    { id: nanoid(), time: "08:00", activity: "Setup" },
    { id: nanoid(), time: "09:00", activity: "Talent arrives + H&M" },
    { id: nanoid(), time: "10:00", activity: "Scene 1 rolls" },
    { id: nanoid(), time: "13:00", activity: "Lunch (1 hr)" },
    { id: nanoid(), time: "14:00", activity: "Scene 2 rolls" },
    { id: nanoid(), time: "17:30", activity: "Wrap + load out" },
  ])

  function updateCrew(id: string, patch: Partial<Crew>) { setCrew((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r))) }
  function updateSched(id: string, patch: Partial<Sched>) { setSchedule((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r))) }

  return (
    <TemplateShell slug="call-sheet" title="Call Sheet" subtitle="Shoot-day bible. Call times, crew, weather, hospital, schedule — print one per crew member.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Production company" value={production} onChange={setProduction} />
            <Field label="Project" value={project} onChange={setProject} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Field label="Shoot date" value={shootDate} onChange={setShootDate} type="date" />
            <Field label="Day" value={dayOf} onChange={setDayOf} type="number" />
            <Field label="of" value={totalDays} onChange={setTotalDays} type="number" />
            <Field label="General call" value={generalCall} onChange={setGeneralCall} type="time" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Field label="Est. wrap" value={wrapEstimate} onChange={setWrapEstimate} type="time" />
            <Field label="Sunrise" value={sunrise} onChange={setSunrise} type="time" />
            <Field label="Sunset" value={sunset} onChange={setSunset} type="time" />
            <Field label="Weather" value={weather} onChange={setWeather} placeholder="72°F, sunny" />
          </div>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Location name" value={locationName} onChange={setLocationName} />
          <Field label="Location address" value={locationAddress} onChange={setLocationAddress} />
          <Field label="Parking" value={parkingNotes} onChange={setParkingNotes} placeholder="Street parking on Main; crew lot behind building" />
          <Field label="Nearest hospital" value={nearestHospital} onChange={setNearestHospital} />
          <Field label="Emergency contact (on set)" value={emergencyContact} onChange={setEmergencyContact} />
          <Field label="Notes" value={notes} onChange={setNotes} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Crew</h2>
            <button onClick={() => setCrew((p) => [...p, { id: nanoid(), name: "", role: "", call: "07:00", contact: "" }])} className="text-xs font-semibold text-[#0088ff]">+ Crew</button>
          </div>
          {crew.map((c) => (
            <div key={c.id} className="grid grid-cols-12 gap-2">
              <input value={c.role} onChange={(e) => updateCrew(c.id, { role: e.target.value })} placeholder="Role" className="col-span-3 bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" />
              <input value={c.name} onChange={(e) => updateCrew(c.id, { name: e.target.value })} placeholder="Name" className="col-span-4 bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" />
              <input type="time" value={c.call} onChange={(e) => updateCrew(c.id, { call: e.target.value })} className="col-span-2 bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" />
              <input value={c.contact} onChange={(e) => updateCrew(c.id, { contact: e.target.value })} placeholder="Phone" className="col-span-3 bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" />
            </div>
          ))}
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</h2>
            <button onClick={() => setSchedule((p) => [...p, { id: nanoid(), time: "", activity: "" }])} className="text-xs font-semibold text-[#0088ff]">+ Item</button>
          </div>
          {schedule.map((s) => (
            <div key={s.id} className="grid grid-cols-12 gap-2">
              <input type="time" value={s.time} onChange={(e) => updateSched(s.id, { time: e.target.value })} className="col-span-2 bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" />
              <input value={s.activity} onChange={(e) => updateSched(s.id, { activity: e.target.value })} placeholder="What's happening" className="col-span-10 bg-[#111827] border border-white/10 rounded-md px-2 py-2 text-xs text-white outline-none focus:border-[#0088ff]" />
            </div>
          ))}
        </section>
      </div>

      <PrintPaper>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #000", paddingBottom: 8, marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666" }}>{val(production)}</p>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>{val(project, "[Project]")}</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 14, fontWeight: 700 }}>Day {dayOf} of {totalDays}</p>
            <p style={{ fontSize: 13 }}>{formatDate(shootDate)}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 12, marginBottom: 16 }}>
          <div>
            <Row l="General call" v={val(generalCall)} bold />
            <Row l="Est. wrap" v={val(wrapEstimate)} />
            <Row l="Sunrise" v={val(sunrise)} />
            <Row l="Sunset" v={val(sunset)} />
            <Row l="Weather" v={val(weather)} />
          </div>
          <div>
            <Row l="Location" v={val(locationName)} bold />
            <Row l="Address" v={val(locationAddress)} />
            <Row l="Parking" v={val(parkingNotes)} />
            <Row l="Hospital" v={val(nearestHospital)} />
            <Row l="Emergency" v={val(emergencyContact)} />
          </div>
        </div>

        <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", marginBottom: 6 }}>Crew</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, marginBottom: 16 }}>
          <thead><tr style={{ borderBottom: "1px solid #000" }}>
            <th style={{ textAlign: "left", padding: "4px 6px", fontSize: 10, textTransform: "uppercase" }}>Role</th>
            <th style={{ textAlign: "left", padding: "4px 6px", fontSize: 10, textTransform: "uppercase" }}>Name</th>
            <th style={{ textAlign: "left", padding: "4px 6px", fontSize: 10, textTransform: "uppercase" }}>Call</th>
            <th style={{ textAlign: "left", padding: "4px 6px", fontSize: 10, textTransform: "uppercase" }}>Contact</th>
          </tr></thead>
          <tbody>
            {crew.filter((c) => c.name || c.role).map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "4px 6px", fontWeight: 600 }}>{c.role}</td>
                <td style={{ padding: "4px 6px" }}>{c.name}</td>
                <td style={{ padding: "4px 6px" }}>{c.call}</td>
                <td style={{ padding: "4px 6px" }}>{c.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", marginBottom: 6 }}>Schedule</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <tbody>
            {schedule.filter((s) => s.time || s.activity).map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "4px 6px", fontWeight: 600, width: 80 }}>{s.time}</td>
                <td style={{ padding: "4px 6px" }}>{s.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {notes && <p style={{ marginTop: 16, fontSize: 12, fontStyle: "italic" }}>{notes}</p>}
        <p style={{ marginTop: 32, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}

function Row({ l, v, bold }: { l: string; v: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", padding: "3px 0", borderBottom: "1px solid #eee" }}>
      <span style={{ width: 90, color: "#666", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</span>
      <span style={{ flex: 1, fontWeight: bold ? 700 : 400 }}>{v}</span>
    </div>
  )
}
