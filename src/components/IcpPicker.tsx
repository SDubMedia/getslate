export type Icp = "production" | "freelance"

interface Props {
  onPick: (icp: Icp) => void
}

export default function IcpPicker({ onPick }: Props) {
  return (
    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0088ff]/10 border border-[#0088ff]/20 text-[#0088ff] text-xs font-medium mb-8">
        Two tools. Pick the one that fits.
      </div>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
        Which are you?
      </h1>
      <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        We built different tools for different sides of the production world. Tell us yours — we'll show you the right stuff.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <button
          onClick={() => onPick("production")}
          className="group rounded-2xl border border-[#0088ff]/30 bg-[#0088ff]/5 hover:bg-[#0088ff]/10 hover:border-[#0088ff]/60 transition-colors p-6 sm:p-8 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-[#0088ff]/20 flex items-center justify-center mb-5">
            <svg className="w-6 h-6 text-[#0088ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            I run a production company
          </h2>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            You book clients, hire crew, send invoices, track projects. You want to know what you're actually making per client.
          </p>
          <span className="text-sm font-semibold text-[#0088ff] group-hover:text-[#00d4ff]">
            Show me Slate →
          </span>
        </button>

        <button
          onClick={() => onPick("freelance")}
          className="group rounded-2xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/60 transition-colors p-6 sm:p-8 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-5">
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            I'm freelance crew
          </h2>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            You work gigs for different production companies. You need to track hours, gear, mileage, per diem — and invoice people who'll actually pay.
          </p>
          <span className="text-sm font-semibold text-purple-400 group-hover:text-purple-300">
            Show me Slate Freelance →
          </span>
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-8">
        Or <a href="/tools" className="text-slate-400 hover:text-white underline">jump straight to the 31 free tools</a>
      </p>
    </div>
  )
}
