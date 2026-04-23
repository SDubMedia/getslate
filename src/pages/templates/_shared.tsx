import type { ReactNode } from "react"

export const APP_URL = "https://slate.sdubmedia.com"

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function formatDate(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

interface ShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function TemplateShell({ title, subtitle, children }: ShellProps) {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <header className="print:hidden border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#0088ff] text-white text-sm font-semibold rounded-lg hover:bg-[#0066dd] transition-colors"
          >
            Download PDF
          </button>
        </div>
      </header>

      <div className="print:hidden max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            {title}
          </h1>
          {subtitle && <p className="text-slate-400 text-base max-w-xl mx-auto">{subtitle}</p>}
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 mb-6 text-xs text-amber-200">
          <strong>Not legal advice.</strong> This is a starting point. Review with a lawyer before signing anything that matters.
        </div>

        {children}

        <div className="mt-12 rounded-xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Manage contracts + signatures in Slate
          </h3>
          <p className="text-slate-400 text-sm mb-4 max-w-lg mx-auto">
            Slate's built-in contracts + proposals get sent, signed, and stored automatically with every project.
          </p>
          <a href={APP_URL} className="inline-block px-5 py-2.5 bg-[#0088ff] text-white font-semibold rounded-lg hover:bg-[#0066dd] transition-colors text-sm">
            Try Slate free →
          </a>
        </div>
      </div>
    </div>
  )
}

export function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
      />
    </div>
  )
}

export function TextArea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
      />
    </div>
  )
}

export function PrintPaper({ children }: { children: ReactNode }) {
  return (
    <div className="hidden print:block bg-white text-black p-12" style={{ colorScheme: "light" }}>
      <div className="max-w-[800px] mx-auto text-sm leading-relaxed" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        {children}
      </div>
    </div>
  )
}

export function val(s: string, fallback = "____________"): string {
  return s.trim() || fallback
}
