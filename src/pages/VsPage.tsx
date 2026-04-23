import { useRoute } from "wouter"
import { VS_CONTENT, type VsEntry } from "./vsContent"

const APP_URL = "https://slate.sdubmedia.com"
const FREELANCE_URL = "https://freelance.sdubmedia.com"

export default function VsPage() {
  const [, params] = useRoute("/vs/:competitor")
  const slug = params?.competitor || ""
  const entry = VS_CONTENT[slug]

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Not a comparison we've written yet.</h1>
          <p className="text-slate-400 mb-6">We compare Slate to: {Object.keys(VS_CONTENT).join(", ")}.</p>
          <a href="/" className="px-5 py-2.5 bg-[#0088ff] text-white font-semibold rounded-lg hover:bg-[#0066dd] transition-colors">Back home</a>
        </div>
      </div>
    )
  }

  return <VsArticle entry={entry} />
}

function VsArticle({ entry }: { entry: VsEntry }) {
  const ctaHref = entry.slateProduct === "freelance" ? FREELANCE_URL : APP_URL
  const ctaLabel = entry.slateProduct === "freelance" ? "Try Slate Freelance free" : "Try Slate free"

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <header className="border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <a href={ctaHref} className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff] transition-colors">Try Slate →</a>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-10">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Honest comparison</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Slate vs {entry.name}
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">{entry.intro}</p>
        </div>

        {/* Who each is for */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-5">
            <div className="text-xs font-semibold text-[#0088ff] uppercase tracking-wider mb-2">Slate is for</div>
            <p className="text-sm text-slate-200 leading-relaxed">{entry.slateFor}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{entry.name} is for</div>
            <p className="text-sm text-slate-200 leading-relaxed">{entry.competitorFor}</p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="text-left px-4 py-3 font-medium">Feature</th>
                <th className="text-left px-4 py-3 font-medium">Slate</th>
                <th className="text-left px-4 py-3 font-medium">{entry.name}</th>
              </tr>
            </thead>
            <tbody>
              {entry.compareTable.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-slate-400">{row.feature}</td>
                  <td className="px-4 py-3">{row.slate}</td>
                  <td className="px-4 py-3 text-slate-400">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* When to pick each */}
        <div className="space-y-5 mb-10">
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Pick Slate if…</h2>
            <ul className="space-y-2">
              {entry.pickSlate.map((x, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-[#0088ff] shrink-0">✓</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Pick {entry.name} if…</h2>
            <ul className="space-y-2">
              {entry.pickCompetitor.map((x, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-slate-500 shrink-0">✓</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Verdict */}
        <div className="rounded-xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 sm:p-8 mb-10">
          <div className="text-xs font-semibold text-[#0088ff] uppercase tracking-wider mb-2">Our take</div>
          <p className="text-base text-slate-200 leading-relaxed">{entry.verdict}</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href={ctaHref} className="inline-block px-6 py-3 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-colors">
            {ctaLabel} →
          </a>
          <p className="text-xs text-slate-500 mt-3">10 projects free. No credit card.</p>
        </div>
      </article>
    </div>
  )
}
