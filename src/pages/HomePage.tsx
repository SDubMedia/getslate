const APP_URL = "https://slate.sdubmedia.com"
const FREELANCE_URL = "https://freelance.sdubmedia.com"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0e17]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold text-white tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#tools" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block">Free tools</a>
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
      <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 px-6 overflow-hidden">
        {/* Animated gradient blobs */}
        <style>{`
          @keyframes heroBlob1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(80px, -60px) scale(1.1); }
            50% { transform: translate(-40px, 80px) scale(0.95); }
            75% { transform: translate(60px, 40px) scale(1.05); }
          }
          @keyframes heroBlob2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-60px, 40px) scale(1.05); }
            50% { transform: translate(50px, -70px) scale(1.1); }
            75% { transform: translate(-80px, -20px) scale(0.95); }
          }
          @keyframes heroBlob3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(40px, 60px) scale(0.95); }
            50% { transform: translate(-60px, -40px) scale(1.1); }
            75% { transform: translate(20px, -80px) scale(1.05); }
          }
          @keyframes heroFlare {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            50% { transform: translate(-30%, -60%) scale(1.3); opacity: 0.5; }
          }
          @keyframes heroBokeh {
            0%, 100% { transform: translateY(0); opacity: 0.15; }
            50% { transform: translateY(-25px); opacity: 0.3; }
          }
        `}</style>
        {/* Blob 1 — Blue */}
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none" style={{
          background: "radial-gradient(circle, #0088ff 0%, transparent 70%)",
          top: "-15%", left: "-5%", filter: "blur(80px)",
          animation: "heroBlob1 10s ease-in-out infinite",
        }} />
        {/* Blob 2 — Cyan */}
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none" style={{
          background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
          top: "10%", right: "-5%", filter: "blur(80px)",
          animation: "heroBlob2 12s ease-in-out infinite",
        }} />
        {/* Blob 3 — Purple */}
        <div className="absolute w-[450px] h-[450px] rounded-full opacity-15 pointer-events-none" style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          top: "30%", left: "30%", filter: "blur(90px)",
          animation: "heroBlob3 11s ease-in-out infinite",
        }} />
        {/* Lens flare */}
        <div className="absolute pointer-events-none" style={{
          width: 350, height: 140,
          top: "20%", left: "55%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, rgba(0,136,255,0.04) 40%, transparent 70%)",
          transform: "rotate(-15deg)",
          animation: "heroFlare 15s ease-in-out infinite",
        }} />
        {/* Bokeh dots */}
        {[
          { size: 10, x: "20%", y: "15%", dur: "5s", delay: "0s" },
          { size: 8, x: "70%", y: "25%", dur: "4s", delay: "1.5s" },
          { size: 12, x: "80%", y: "60%", dur: "5.5s", delay: "0.5s" },
          { size: 7, x: "35%", y: "70%", dur: "4.5s", delay: "2s" },
          { size: 9, x: "55%", y: "45%", dur: "4.8s", delay: "0.8s" },
          { size: 6, x: "10%", y: "50%", dur: "3.8s", delay: "1.2s" },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            width: dot.size, height: dot.size, left: dot.x, top: dot.y,
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            animation: `heroBokeh ${dot.dur} ease-in-out ${dot.delay} infinite`,
          }} />
        ))}

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0088ff]/10 border border-[#0088ff]/20 text-[#0088ff] text-xs font-medium mb-8">
            Built for a production company, by a production company
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Run your production company,
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#0088ff] bg-clip-text text-transparent"> not a spreadsheet.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule shoots, pay crew, invoice clients, and see your real profit — all in one place. No more juggling spreadsheets, texts, and QuickBooks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={APP_URL} className="px-8 py-4 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-all hover:shadow-lg hover:shadow-[#0088ff]/25 text-lg">
              Get Started Free
            </a>
            <span className="text-sm text-slate-500">10 projects free, forever. No credit card.</span>
          </div>
        </div>
      </section>

      {/* Dashboard preview — CSS mockup. Swap for a real screenshot when available. */}
      <section className="pb-14 sm:pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0088ff]/10 to-transparent blur-3xl -z-10" />

            {/* Mock window chrome */}
            <div className="rounded-t-xl bg-[#0f1629] border border-white/10 border-b-0 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 text-center text-xs text-slate-500">slate.sdubmedia.com</div>
            </div>

            {/* Dashboard body */}
            <div className="rounded-b-xl bg-[#0a0e17] border border-white/10 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Dashboard</h3>
                  <p className="text-xs text-slate-500">SDub Media · 2026</p>
                </div>
                <div className="text-xs text-slate-500 hidden sm:block">April 18</div>
              </div>

              {/* Status cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Upcoming", value: "7", color: "text-[#0088ff]", bg: "bg-[#0088ff]/10" },
                  { label: "In Editing", value: "4", color: "text-amber-400", bg: "bg-amber-500/10" },
                  { label: "Outstanding", value: "$12,450", color: "text-purple-300", bg: "bg-purple-500/10" },
                  { label: "Completed", value: "23", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                ].map((s, i) => (
                  <div key={i} className={`rounded-lg border border-white/5 ${s.bg} p-3`}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{s.label}</div>
                    <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'Space Grotesk', system-ui" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Two-column: revenue + upcoming */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Revenue chart (CSS bars) */}
                <div className="md:col-span-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-slate-500">Revenue</div>
                      <div className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>$48,720</div>
                    </div>
                    <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">↑ 18%</div>
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {[35, 55, 42, 68, 52, 78, 88].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t bg-gradient-to-t from-[#0088ff] to-[#00d4ff] opacity-80" style={{ height: `${h}%` }} />
                        <div className="text-[9px] text-slate-600">
                          {["O","N","D","J","F","M","A"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming list */}
                <div className="md:col-span-2 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="text-xs text-slate-500 mb-3">Upcoming shoots</div>
                  <div className="space-y-2.5">
                    {[
                      { name: "CBSR Podcast", date: "Apr 22", color: "bg-[#0088ff]" },
                      { name: "Acme Brand Shoot", date: "Apr 24", color: "bg-purple-500" },
                      { name: "Headshots — Studio", date: "Apr 28", color: "bg-amber-500" },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className={`w-1 h-6 ${p.color} rounded-full`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-white truncate">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-600 mt-4">Dashboard preview · actual data shown once you sign in</p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-14 sm:py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
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

      {/* Who this is for */}
      <section className="py-14 sm:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              Two products. Pick the one that fits.
            </h2>
            <p className="text-slate-400">We split production companies and freelancers into separate apps because their problems are actually different.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Production companies */}
            <div className="rounded-2xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 sm:p-8">
              <div className="w-10 h-10 rounded-lg bg-[#0088ff]/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#0088ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                Slate — for production companies
              </h3>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                You run the show. Crew work for you. You send invoices to clients. You need to know who's profitable, who owes you, and what your actual margins are.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                {[
                  "Solo operator to ~10-person shop",
                  "Photo, video, podcast, live-event production",
                  "You invoice clients (hourly or flat-rate)",
                  "You pay crew per project",
                  "You want P&L + partner splits visible",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#0088ff] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={APP_URL} className="mt-6 inline-block text-sm font-semibold text-[#0088ff] hover:text-[#00d4ff] transition-colors">
                Start with Slate →
              </a>
            </div>

            {/* Freelancers */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 sm:p-8">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                Freelance — for live-event crew
              </h3>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                You're on the other side. You work gigs for different production companies. You need to track your hours, gear, mileage, per diem — and invoice them so you actually get paid.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                {[
                  "A1/A2, videographer, projectionist, editor, etc.",
                  "You work W-9 / 1099 for multiple clients",
                  "You clock in/out with overtime rules",
                  "You bill gear rentals + per diem + mileage",
                  "You need invoices the production co will actually pay",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={FREELANCE_URL} className="mt-6 inline-block text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                Start with Freelance →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Slate Answers */}
      <section id="features" className="py-14 sm:py-20 px-6 bg-[#0f1629]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
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
      <section className="py-14 sm:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              <span className="block sm:inline">From shoot day to payday.</span>{" "}
              <span className="block sm:inline">All in one place.</span>
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

      {/* Testimonials */}
      <section className="py-14 sm:py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              Built by people who needed this.
            </h2>
            <p className="text-slate-400">Real production crews. Real problems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Geoff — founder story */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-slate-200 text-lg leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                "I kept losing invoices. I had no idea which clients were actually profitable. My P&L lived in my head. I built Slate because nothing else was designed for how a production company actually runs."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0088ff] to-[#00d4ff] flex items-center justify-center text-white font-bold text-sm">
                  GS
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Geoff Southworth</p>
                  <p className="text-xs text-slate-500">Founder · SDub Media</p>
                </div>
              </div>
            </div>

            {/* Dave — Freelance design partner */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-slate-200 text-lg leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                "Between clock-ins, per diem, gear rentals, and mileage, tracking a gig is a second job. Slate Freelance finally matches how live-event work actually bills."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  DK
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Dave Kole</p>
                  <p className="text-xs text-slate-500">Projectionist · ATLAS Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section id="tools" className="py-14 sm:py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              Free tools for production pros
            </h2>
            <p className="text-slate-400">Use them without signing up. They stand alone — and they'll make Slate feel obvious.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="/invoice-generator" className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#0088ff]/40 transition-colors p-6">
              <div className="text-3xl mb-3">🧾</div>
              <h3 className="text-base font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Invoice Generator</h3>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">Fill in a form, download a clean PDF invoice. No signup.</p>
              <span className="text-xs font-semibold text-[#0088ff] group-hover:text-[#00d4ff]">Open →</span>
            </a>
            <a href="/calculator" className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#0088ff]/40 transition-colors p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-base font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Profit Calculator</h3>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">Answer 3 questions. See what you're actually making per month.</p>
              <span className="text-xs font-semibold text-[#0088ff] group-hover:text-[#00d4ff]">Open →</span>
            </a>
            <a href="/expenses" className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#0088ff]/40 transition-colors p-6">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="text-base font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Expense Categorizer</h3>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed">Paste a bank CSV. We auto-sort it into Schedule C categories.</p>
              <span className="text-xs font-semibold text-[#0088ff] group-hover:text-[#00d4ff]">Open →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-14 sm:py-20 px-6 bg-[#0f1629]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              Simple pricing. No surprises.
            </h2>
            <p className="text-slate-400 text-lg">Start free. Upgrade when you outgrow it.</p>
          </div>

          {/* Production Company Plans */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#0088ff]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0088ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>For Production Companies</h3>
                <p className="text-sm text-slate-400">Manage your crew, clients, and finances</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Free</h3>
                <p className="text-sm text-slate-400 mb-6">Try it on a real project</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-slate-500 text-sm">/forever</span>
                </div>
                <a href={APP_URL} className="block w-full py-3 text-center rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors mb-8">
                  Get Started
                </a>
                <ul className="space-y-3 text-sm">
                  {[
                    "10 Projects (lifetime)",
                    "Production Calendar",
                    "Crew Management",
                    "Client Management",
                    "Invoicing (create, send, track)",
                    "Reports & Analytics",
                    "Client & Staff Portals",
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

              {/* Basic */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Basic</h3>
                <p className="text-sm text-slate-400 mb-6">Everything you need to manage productions</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$9.99</span>
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
              <div className="rounded-2xl border-2 border-[#0088ff]/50 bg-[#0088ff]/5 p-6 sm:p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0088ff] text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Pro</h3>
                <p className="text-sm text-slate-400 mb-6">Full business operations suite</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$19.99</span>
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

          {/* Freelancer Plans */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>For Freelancers</h3>
                <p className="text-sm text-slate-400">Gig management for live-event crew</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Free</h3>
                <p className="text-sm text-slate-400 mb-6">Try it on a real gig</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-slate-500 text-sm">/forever</span>
                </div>
                <a href={FREELANCE_URL} className="block w-full py-3 text-center rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors mb-8">
                  Get Started
                </a>
                <ul className="space-y-3 text-sm">
                  {[
                    "10 Active Gigs (lifetime)",
                    "Calendar + Personal Sync",
                    "Clock In/Out + Overtime",
                    "Gear Rental Billing",
                    "Invoice Generation",
                    "Mileage Log (IRS rate)",
                    "Per Diem Tracking",
                    "Unlimited Clients",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <svg className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Freelance */}
              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.03] p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Freelance</h3>
                <p className="text-sm text-slate-400 mb-6">Everything to manage your gigs and get paid</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$9.99</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <a href={FREELANCE_URL} className="block w-full py-3 text-center rounded-xl border border-purple-500/30 text-white font-medium hover:bg-purple-500/10 transition-colors mb-8">
                  Start Free Trial
                </a>
                <ul className="space-y-3 text-sm">
                  {[
                    "Unlimited Gigs",
                    "Gig Calendar + Personal Sync",
                    "Daily Briefing Card",
                    "Clock In/Out + Overtime Tracking",
                    "Expense Capture (10 scans/mo)",
                    "Gear Rental Billing",
                    "Invoice Generation (branded)",
                    "Unlimited Clients",
                    "Per Diem Tracking",
                    "Mileage Log (IRS rate)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <svg className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Freelance Pro */}
              <div className="rounded-2xl border-2 border-purple-500/50 bg-purple-500/5 p-6 sm:p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                  BEST VALUE
                </div>
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Freelance Pro</h3>
                <p className="text-sm text-slate-400 mb-6">AI-powered automation for serious freelancers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$19.99</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <a href={FREELANCE_URL} className="block w-full py-3 text-center rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors mb-8">
                  Start Free Trial
                </a>
                <ul className="space-y-3 text-sm">
                  {[
                    "Everything in Freelance, plus:",
                    "AI Receipt Scanning (50 scans/mo)",
                    "AI Deal Memo Parsing (auto-fill gigs)",
                    "GSA Per Diem Auto-Lookup",
                    "Nearby Coffee & Food Finder",
                    "P&L Statements + Tax Prep",
                    "Rest Period Violation Alerts",
                    "Weather on Briefing Card",
                    "Document Wallet (travel docs)",
                    "Priority Support",
                  ].map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 ${i === 0 ? "text-purple-400 font-semibold" : "text-slate-300"}`}>
                      {i > 0 && (
                        <svg className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              Questions we hear a lot
            </h2>
            <p className="text-slate-400">If we miss yours, <a href="mailto:support@sdubmedia.com" className="text-[#0088ff] hover:underline">email us</a> — a real person answers.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Do I have to quit QuickBooks?",
                a: "No. Slate isn't accounting software — it's the operations layer that feeds your accounting. Keep QuickBooks for books and taxes; use Slate for scheduling, crew pay, invoicing, and profitability. Export CSVs any time."
              },
              {
                q: "What's included in the free tier?",
                a: "Both apps are free up to 10 projects (Slate) or 10 gigs (Freelance), with core features unlocked — calendar, clients, invoicing, reports, and more. When you hit the cap, upgrade to Basic ($9.99/mo) for unlimited work or Pro ($19.99/mo) to add AI scanning, P&L, and advanced tools."
              },
              {
                q: "Can I invite my crew? What can they see?",
                a: "Yes. Four roles: Owner (you), Partner (co-owner access), Staff (their schedule + their pay), Client (their projects only). Per-user feature overrides if the defaults don't fit."
              },
              {
                q: "Is my data safe? Where does it live?",
                a: "Postgres on Supabase, encrypted in transit and at rest. Row-level security scopes every query to your org — nobody else can see your data, not even other Slate customers. We never sell your data and never train AI models on it."
              },
              {
                q: "Can I export my data?",
                a: "Yes. CSV export on reports, invoices, billing summaries, and mileage. On account deletion, we remove your data within 30 days. Your data is yours."
              },
              {
                q: "What happens if I cancel?",
                a: "You keep access through the end of your current billing period. Your data stays — nothing is deleted. If you come back, everything's right where you left it. Pro-only features hide on free/Basic, but the underlying records are preserved."
              },
              {
                q: "Can I switch between Basic and Pro?",
                a: "Any time, from the Subscription link in the sidebar. Stripe handles proration automatically — no double-charging."
              },
              {
                q: "I'm a freelancer, not a company. Is Slate for me?",
                a: "Not Slate — but Slate Freelance is. It's a separate app tuned for live-event freelancers (clock in/out, overtime, gear billing, mileage, per diem). Same team. freelance.sdubmedia.com."
              },
            ].map((item, i) => (
              <details key={i} className="group rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  <svg className="w-4 h-4 text-slate-500 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Ditch the spreadsheets. Run your business.
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join production companies who stopped guessing and started knowing. 10 projects free to start.
          </p>
          <a href={APP_URL} className="inline-flex px-8 py-4 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-all hover:shadow-lg hover:shadow-[#0088ff]/25 text-lg">
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-6 h-6 rounded-md" />
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a href={APP_URL} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Slate App</a>
              <a href={FREELANCE_URL} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Freelance App</a>
              <a href="/invoice-generator" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Invoice Generator</a>
              <a href="/calculator" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Profit Calculator</a>
              <a href="/expenses" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Expense Categorizer</a>
              <a href="/vs/wrapbook" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">vs Wrapbook</a>
              <a href="/vs/studio-binder" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">vs StudioBinder</a>
              <a href="/vs/honeybook" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">vs Honeybook</a>
              <a href={`${APP_URL}/terms`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</a>
              <a href={`${APP_URL}/refund`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Refunds</a>
              <a href={`${APP_URL}/privacy`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
              <a href="mailto:support@sdubmedia.com" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Support</a>
            </div>
            <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} SDub Media LLC</p>
          </div>
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

