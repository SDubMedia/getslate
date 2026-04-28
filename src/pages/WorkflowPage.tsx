import { useEffect, useMemo } from "react"
import { useRoute } from "wouter"
import { getWorkflow, WORKFLOWS } from "./workflowContent"
import { getTool } from "../toolRegistry"
import JsonLd from "../components/JsonLd"
import { faqPageSchema, howToSchema, SITE_URL, type Faq } from "../lib/seo"

const APP_URL = "https://slate.sdubmedia.com"
const FREELANCE_URL = "https://freelance.sdubmedia.com"

export default function WorkflowPage() {
  const [, params] = useRoute("/workflow/:slug")
  const slug = params?.slug || ""
  const wf = getWorkflow(slug)

  useEffect(() => {
    if (wf) document.title = wf.pageTitle
    return () => { document.title = "Slate — Production Management for Creative Teams" }
  }, [wf])

  const faqs: Faq[] = useMemo(() => {
    if (!wf) return []
    const audience =
      wf.icp === "freelance"
        ? "freelance video crew (camera ops, editors, DPs, drone pilots)"
        : wf.icp === "production"
        ? "independent video production companies and producer-owners"
        : "video production companies and freelance video crew"
    const cost =
      wf.icp === "freelance"
        ? "Every template and tool linked from this workflow is free. Slate Freelance (the paid app) is free up to 10 gigs, then $9.99/mo Basic or $19.99/mo Pro."
        : "Every template and tool linked from this workflow is free. Slate (the paid app) is free up to 10 projects, then $9.99/mo Basic or $19.99/mo Pro."
    const howSteps = wf.steps.map((s) => s.heading.replace(/^\d+\.\s*/, "")).join(" → ")
    return [
      { q: `What is the ${wf.title.replace(/^How to /i, "").replace(/\?$/, "")} workflow?`, a: wf.intro },
      { q: "Who is this workflow for?", a: `This workflow is built for ${audience}.` },
      { q: "What does this cost?", a: cost },
      { q: "How does this workflow work?", a: `${wf.steps.length} steps, in this order: ${howSteps}. Each step links to a free fillable template you can complete and download as a PDF.` },
    ]
  }, [wf])

  const schemas = useMemo(() => {
    if (!wf) return []
    const url = `${SITE_URL}/workflow/${wf.slug}`
    return [
      howToSchema({
        name: wf.title,
        description: wf.metaDescription,
        url,
        steps: wf.steps.map((s) => {
          const tool = getTool(s.tool)
          return {
            name: s.heading,
            text: s.body,
            ...(tool ? { url: `${SITE_URL}${tool.href}` } : {}),
          }
        }),
      }),
      faqPageSchema(faqs),
    ]
  }, [wf, faqs])

  if (!wf) {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Workflow not found.</h1>
          <p className="text-slate-400 mb-6">Try one of these:</p>
          <div className="space-y-2">
            {WORKFLOWS.map(w => (
              <a key={w.id} href={`/workflow/${w.slug}`} className="block text-[#0088ff] hover:text-[#00d4ff]">{w.title}</a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const ctaHref = wf.icp === "freelance" ? FREELANCE_URL : APP_URL
  const ctaLabel = wf.icp === "freelance" ? "Try Slate Freelance free" : "Try Slate free"

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <JsonLd data={schemas} />
      <header className="border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <a href="/tools" className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]">All tools →</a>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-10">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Workflow</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {wf.title}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">{wf.tagline}</p>
        </div>

        <div className="text-slate-300 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          {wf.intro}
        </div>

        <div className="space-y-8 mb-12">
          {wf.steps.map((step, i) => {
            const tool = getTool(step.tool)
            if (!tool) return null
            return (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#0088ff]/30 transition-colors overflow-hidden">
                <div className="p-5 sm:p-6">
                  <h2 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{step.heading}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{step.body}</p>
                  <a
                    href={tool.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#0088ff]/30 bg-[#0088ff]/5 hover:bg-[#0088ff]/10 px-4 py-2.5 text-sm font-semibold text-[#0088ff] hover:text-[#00d4ff] transition-colors"
                  >
                    <span className="text-lg">{tool.emoji}</span>
                    <span>{tool.title}</span>
                    <span className="text-slate-500 group-hover:text-slate-300">—</span>
                    <span className="text-slate-400 font-normal text-xs hidden sm:inline">{tool.short}</span>
                    <span className="ml-auto">→</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-2xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 sm:p-8 mb-10">
          <p className="text-base text-slate-200 leading-relaxed mb-5">{wf.closer}</p>
          <div className="text-center">
            <a href={ctaHref} className="inline-block px-6 py-3 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-colors">
              {ctaLabel} →
            </a>
            <p className="text-xs text-slate-500 mt-3">10 {wf.icp === "freelance" ? "gigs" : "projects"} free. No credit card.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">FAQ</h3>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={i} className="group rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  <svg className="w-4 h-4 text-slate-500 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Other workflows */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Other workflows</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WORKFLOWS.filter(w => w.slug !== wf.slug).map(w => (
              <a key={w.id} href={`/workflow/${w.slug}`} className="block rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#0088ff]/30 transition-colors p-4">
                <div className="text-sm font-semibold text-white mb-1">{w.title}</div>
                <div className="text-xs text-slate-400">{w.tagline}</div>
              </a>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
