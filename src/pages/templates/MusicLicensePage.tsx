import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function MusicLicensePage() {
  const [requester, setRequester] = useState("")
  const [artist, setArtist] = useState("")
  const [track, setTrack] = useState("")
  const [project, setProject] = useState("")
  const [useDescription, setUseDescription] = useState("")
  const [territory, setTerritory] = useState("Worldwide")
  const [term, setTerm] = useState("In perpetuity")
  const [budget, setBudget] = useState("")

  return (
    <TemplateShell slug="music-license" title="Music License Request" subtitle="Clean ask for sync / background music rights from artists or composers.">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Requester (you / your company)" value={requester} onChange={setRequester} />
          <Field label="Artist / rights holder" value={artist} onChange={setArtist} />
          <Field label="Track title" value={track} onChange={setTrack} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Project / production title" value={project} onChange={setProject} />
          <TextArea label="How the track will be used" value={useDescription} onChange={setUseDescription} placeholder="Background music in a 60-second brand video for [Client]. Single instance. Will play over b-roll under voiceover." />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Territory" value={territory} onChange={setTerritory} />
            <Field label="Term" value={term} onChange={setTerm} />
            <Field label="Budget (USD)" value={budget} onChange={setBudget} />
          </div>
        </section>
      </div>

      <PrintPaper>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>{formatDate(today())}</p>
        <p>Hi {val(artist, "[Artist]")},</p>
        <p style={{ marginTop: 12 }}>I'm {val(requester, "[Requester]")}, producing <strong>{val(project, "[Project]")}</strong>. I'd love to license <em>"{val(track, "[Track]")}"</em> for this production.</p>
        <p style={{ marginTop: 12 }}><strong>How it would be used:</strong></p>
        <p style={{ marginTop: 6, whiteSpace: "pre-line" }}>{val(useDescription, "[Usage details.]")}</p>
        <table style={{ marginTop: 16, fontSize: 13 }}>
          <tbody>
            <tr><td style={{ padding: "4px 16px 4px 0", color: "#666" }}>Territory</td><td>{val(territory)}</td></tr>
            <tr><td style={{ padding: "4px 16px 4px 0", color: "#666" }}>Term</td><td>{val(term)}</td></tr>
            <tr><td style={{ padding: "4px 16px 4px 0", color: "#666" }}>Budget</td><td>${val(budget, "0")}</td></tr>
          </tbody>
        </table>
        <p style={{ marginTop: 16 }}>If this is something you'd consider, could you reply with your rate and any terms you need? Happy to share a rough cut once we're closer so you can hear how it'll be used in context.</p>
        <p style={{ marginTop: 12 }}>Thanks for considering,</p>
        <p style={{ marginTop: 8 }}>— {val(requester, "[Your name]")}</p>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
