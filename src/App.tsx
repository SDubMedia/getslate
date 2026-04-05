import './index.css'

const APP_URL = "https://slate.sdubmedia.com"

function App() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0e17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0088ff] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block">Pricing</a>
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block">Features</a>
            <a href={APP_URL} className="text-sm text-slate-400 hover:text-white transition-colors">Log In</a>
            <a href={APP_URL} className="px-4 py-2 bg-[#0088ff] text-white text-sm font-medium rounded-lg hover:bg-[#0066dd] transition-colors">
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0088ff]/10 border border-[#0088ff]/20 text-[#0088ff] text-xs font-medium mb-8">
            Built by a production company that needed this too
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Run your production<br />company,
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#0088ff] bg-clip-text text-transparent"> not a spreadsheet.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule shoots, pay crew, invoice clients, and see your real profit — all in one place. No more juggling spreadsheets, texts, and QuickBooks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={APP_URL} className="px-8 py-4 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-all hover:shadow-lg hover:shadow-[#0088ff]/25 text-lg">
              Start Free Trial
            </a>
            <span className="text-sm text-slate-500">14 days free. No credit card required.</span>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Sound familiar?
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-lg text-slate-400">
            <p>"How many hours did Geoff work last month?"</p>
            <p>"I forgot to invoice that client from three weeks ago."</p>
            <p>"My CPA needs my mileage logs and I have... nothing."</p>
            <p>"Am I even making money after paying everyone?"</p>
          </div>
          <p className="text-[#0088ff] font-semibold text-lg mt-8">Slate replaces the chaos with clarity.</p>
        </div>
      </section>

      {/* What Slate Answers */}
      <section id="features" className="py-20 px-6 bg-[#0f1629]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              Know what you're actually making.
            </h2>
            <p className="text-slate-400 text-lg">Every question you've been guessing at — Slate answers it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              emoji="💰"
              title="How much am I actually making?"
              description="See real margins per client, per project. Revenue minus crew costs, travel, and expenses — not just top-line numbers."
            />
            <FeatureCard
              emoji="📋"
              title="Who do I owe and who owes me?"
              description="Track crew pay per project, send professional invoices, and know exactly what's outstanding at any moment."
            />
            <FeatureCard
              emoji="⏱"
              title="Where is my time going?"
              description="Schedule shoots, assign crew with per-role rates, and track billable hours across every project."
            />
            <FeatureCard
              emoji="📊"
              title="Am I profitable or just busy?"
              description="P&L statements, per-client profitability, gross margins. Stop guessing, start knowing."
            />
            <FeatureCard
              emoji="🧾"
              title="What do I need for taxes?"
              description="Mileage logs, expense tracking, 1099 summaries with W-9 storage. Your CPA will love you."
            />
            <FeatureCard
              emoji="🎬"
              title="What's happening on my shoots?"
              description="Project status pipeline from upcoming to delivered. Crew assignments, locations, and deliverables in one view."
            />
          </div>
        </div>
      </section>

      {/* Feature List */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              From shoot day to payday. All in one place.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Production Calendar", desc: "Schedule and track shoots" },
              { label: "Crew Management", desc: "Roles, rates, assignments" },
              { label: "Client Invoicing", desc: "Create, send, get paid" },
              { label: "Billing Summary", desc: "Monthly & annual breakdowns" },
              { label: "Hourly & Flat Rate", desc: "Flexible billing models" },
              { label: "Partner Splits", desc: "Revenue sharing made easy" },
              { label: "Mileage Tracking", desc: "Auto-calculated with Google Maps" },
              { label: "Expense Import", desc: "Upload Chase statements" },
              { label: "P&L Statements", desc: "Real profit visibility" },
              { label: "1099 Summary", desc: "Year-end contractor reports" },
              { label: "Client Portal", desc: "Clients see their projects" },
              { label: "Staff Portal", desc: "Crew sees schedule & pay" },
              { label: "Contractor Invoices", desc: "1099 crew self-service" },
              { label: "CPA Reports", desc: "Print-ready tax documents" },
              { label: "Multi-Role Access", desc: "Owner, partner, staff, client" },
              { label: "Mobile Friendly", desc: "Manage from set or office" },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <p className="text-sm font-semibold text-white">{f.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-[#0f1629]/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              Simple pricing. No surprises.
            </h2>
            <p className="text-slate-400 text-lg">Start free for 14 days. Upgrade when you're ready.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Basic */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Basic</h3>
              <p className="text-sm text-slate-400 mb-6">Everything you need to manage productions</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$19.99</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <a href={APP_URL} className="block w-full py-3 text-center rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors mb-8">
                Start Free Trial
              </a>
              <ul className="space-y-3 text-sm">
                {[
                  "Production Calendar",
                  "Crew Management & Pay Rates",
                  "Client Management",
                  "Invoicing (create, send, track)",
                  "Billing Summary (monthly & annual)",
                  "Reports & Analytics",
                  "Client Portal",
                  "Staff Portal",
                  "Unlimited Projects",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <svg className="w-4 h-4 text-[#0088ff] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-[#0088ff]/50 bg-[#0088ff]/5 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0088ff] text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Pro</h3>
              <p className="text-sm text-slate-400 mb-6">Full business operations suite</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$29.99</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <a href={APP_URL} className="block w-full py-3 text-center rounded-xl bg-[#0088ff] text-white font-medium hover:bg-[#0066dd] transition-colors mb-8">
                Start Free Trial
              </a>
              <ul className="space-y-3 text-sm">
                {[
                  "Everything in Basic, plus:",
                  "Mileage Tracking (Google Maps)",
                  "Expense Tracking (CSV/PDF import)",
                  "Profit & Loss Statements",
                  "1099 Contractor Summary",
                  "W-9 Tax ID Storage",
                  "Partner Revenue Splits",
                  "Spending Budget Tracking",
                  "Content Series (AI Brainstorming)",
                  "CPA-Ready Tax Reports",
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-2 ${i === 0 ? "text-[#0088ff] font-semibold" : "text-slate-300"}`}>
                    {i > 0 && (
                      <svg className="w-4 h-4 text-[#0088ff] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Ditch the spreadsheets. Run your business.
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join production companies who stopped guessing and started knowing. Free for 14 days.
          </p>
          <a href={APP_URL} className="inline-flex px-8 py-4 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-all hover:shadow-lg hover:shadow-[#0088ff]/25 text-lg">
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#0088ff] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </div>
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} Slate by SDub Media. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      <div className="text-3xl mb-4">{emoji}</div>
      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

export default App
