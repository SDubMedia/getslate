const APP_URL = "https://slate.sdubmedia.com"

interface Tool {
  title: string
  description: string
  href: string
  emoji: string
  category: string
}

const TOOLS: Tool[] = [
  // Billing / Money
  { title: "Invoice Generator", description: "Fill in a form, download a clean PDF invoice.", href: "/invoice-generator", emoji: "🧾", category: "Billing" },
  { title: "Profit Calculator", description: "3 questions → what you're actually making per month.", href: "/calculator", emoji: "📊", category: "Billing" },
  { title: "Expense Categorizer", description: "Upload a bank CSV → auto-sorted into Schedule C categories.", href: "/expenses", emoji: "💳", category: "Billing" },
  { title: "Rate Card", description: "Clean downloadable rate sheet for client inquiries.", href: "/templates/rate-card", emoji: "💰", category: "Billing" },
  { title: "Late Payment Letter", description: "Friendly / firm / final — pick a tone and go.", href: "/templates/late-payment", emoji: "📩", category: "Billing" },
  { title: "Late Fee Addendum", description: "Amend a contract to add late-payment penalties.", href: "/templates/late-fee-addendum", emoji: "⏰", category: "Billing" },
  { title: "Payment Plan Agreement", description: "Client can't pay in one chunk? Lay out installments.", href: "/templates/payment-plan", emoji: "📅", category: "Billing" },
  { title: "Deposit Receipt", description: "Formal acknowledgment when a deposit arrives.", href: "/templates/deposit-receipt", emoji: "🧾", category: "Billing" },
  { title: "Change Order", description: "Scope crept. Document it, sign it, protect your margin.", href: "/templates/change-order", emoji: "📝", category: "Billing" },
  { title: "Timesheet", description: "Hourly crew logs hours, supervisor signs.", href: "/templates/timesheet", emoji: "⏱", category: "Billing" },
  { title: "W-9 Request Letter", description: "Professional ask for a contractor's W-9.", href: "/templates/w9-request", emoji: "📋", category: "Billing" },

  // Agreements & Legal
  { title: "Video Production Contract", description: "Fillable starting point for commercial video work.", href: "/templates/contract", emoji: "📜", category: "Agreements" },
  { title: "Proposal / Statement of Work", description: "Pre-contract pitch with scope + pricing.", href: "/templates/proposal", emoji: "📄", category: "Agreements" },
  { title: "Independent Contractor Agreement", description: "Hiring a 1099 editor or crew. IP assignment included.", href: "/templates/ic-agreement", emoji: "✍️", category: "Agreements" },
  { title: "Crew Deal Memo", description: "One-page day-rate booking. Send, sign, show up.", href: "/templates/crew-deal-memo", emoji: "🤝", category: "Agreements" },
  { title: "Equipment Rental Agreement", description: "Renting gear to (or from) another crew.", href: "/templates/equipment-rental", emoji: "📦", category: "Agreements" },
  { title: "Mutual NDA", description: "Short-form mutual non-disclosure agreement.", href: "/templates/nda", emoji: "🔒", category: "Agreements" },

  // Releases & Licensing
  { title: "Model Release", description: "Standard adult model release form.", href: "/templates/model-release", emoji: "🪪", category: "Releases & Licensing" },
  { title: "Minor Model Release", description: "Parental consent form for subjects under 18.", href: "/templates/minor-release", emoji: "👶", category: "Releases & Licensing" },
  { title: "Location Release", description: "Permission to shoot on private property.", href: "/templates/location-release", emoji: "📍", category: "Releases & Licensing" },
  { title: "Usage License / Rights Grant", description: "Granular usage rights for specific deliverables.", href: "/templates/usage-license", emoji: "🔑", category: "Releases & Licensing" },
  { title: "Music License Request", description: "Ask for sync / background music rights.", href: "/templates/music-license", emoji: "🎵", category: "Releases & Licensing" },

  // Production
  { title: "Call Sheet", description: "Shoot-day bible: crew, call times, weather, hospital.", href: "/templates/call-sheet", emoji: "📋", category: "Production" },
  { title: "Shot List", description: "Scene-by-scene breakdown with type + lens.", href: "/templates/shot-list", emoji: "🎬", category: "Production" },
  { title: "Creative Brief", description: "Kickoff document — fill out WITH the client.", href: "/templates/creative-brief", emoji: "🧭", category: "Production" },
  { title: "Client Intake Questionnaire", description: "Send before kickoff — their answers become your brief.", href: "/templates/client-intake", emoji: "📥", category: "Production" },
  { title: "Project Wrap Report", description: "End-of-project recap sent with the final invoice.", href: "/templates/wrap-report", emoji: "🎞", category: "Production" },
  { title: "Drone Flight Log (Part 107)", description: "Track every flight for FAA compliance + tax records.", href: "/drone-log", emoji: "🚁", category: "Production" },

  // Marketing
  { title: "Case Study Template", description: "Structure for telling a project story.", href: "/templates/case-study", emoji: "🏆", category: "Marketing" },
  { title: "Press Release", description: "AP-style announcement for project launches.", href: "/templates/press-release", emoji: "📰", category: "Marketing" },
  { title: "Testimonial Request Letter", description: "Short, human ask after a successful project.", href: "/templates/testimonial-request", emoji: "💬", category: "Marketing" },
]

const CATEGORIES = ["Billing", "Agreements", "Releases & Licensing", "Production", "Marketing"]

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <header className="border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <a href={APP_URL} className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff]">Try Slate →</a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Free tools for production pros
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            {TOOLS.length} tools and templates. All run in your browser. No signup. No data leaves your device.
          </p>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.filter((t) => t.category === cat).map((t) => (
                <a
                  key={t.href}
                  href={t.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#0088ff]/40 transition-colors p-5"
                >
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{t.title}</h3>
                  <p className="text-xs text-slate-400 mb-2 leading-relaxed">{t.description}</p>
                  <span className="text-[11px] font-semibold text-[#0088ff] group-hover:text-[#00d4ff]">Open →</span>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 rounded-2xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Want all of this + project tracking in one place?
          </h3>
          <p className="text-slate-400 text-sm mb-5 max-w-lg mx-auto">
            Slate wraps everything above — plus project calendar, crew pay, client invoicing, and real profit visibility — into one app.
          </p>
          <a href={APP_URL} className="inline-block px-6 py-3 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-colors">Try Slate free →</a>
        </div>
      </div>
    </div>
  )
}
