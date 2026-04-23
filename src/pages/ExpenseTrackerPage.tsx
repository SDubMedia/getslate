import { useMemo, useState } from "react"

const APP_URL = "https://slate.sdubmedia.com"

// Schedule C category + keywords that typically map to it
const CATEGORIES: { name: string; keywords: string[] }[] = [
  { name: "Advertising", keywords: ["facebook", "meta ad", "google ad", "instagram ad", "linkedin ad", "advertising", "marketing", "promo", "boost"] },
  { name: "Car & truck", keywords: ["uber", "lyft", "gas", "shell", "chevron", "exxon", "bp ", "mobil", "parking", "toll", "dmv", "auto", "tire"] },
  { name: "Contract labor", keywords: ["contractor", "freelance", "upwork", "fiverr", "1099", "venmo", "cash app"] },
  { name: "Insurance", keywords: ["insurance", "policy", "state farm", "geico", "progressive", "hiscox"] },
  { name: "Legal & professional", keywords: ["legal", "attorney", "lawyer", "accountant", "cpa", "bookkeep", "turbotax", "quickbooks", "freshbooks"] },
  { name: "Office expense", keywords: ["office", "staples", "paper", "ink", "printer", "supplies"] },
  { name: "Rent", keywords: ["rent", "lease", "wework", "regus"] },
  { name: "Repairs & maintenance", keywords: ["repair", "maintenance", "fix"] },
  { name: "Software & subscriptions", keywords: ["adobe", "google workspace", "dropbox", "notion", "slack", "figma", "github", "chatgpt", "anthropic", "openai", "canva", "zoom", "apple.com/bill", "itunes", "icloud", "spotify", "netflix"] },
  { name: "Supplies", keywords: ["supplies", "materials", "amazon"] },
  { name: "Taxes & licenses", keywords: ["tax", "license", "irs", "franchise", "secretary of state"] },
  { name: "Travel", keywords: ["hotel", "marriott", "hilton", "airbnb", "vrbo", "delta", "united", "american air", "southwest", "jetblue", "airline", "flight"] },
  { name: "Meals", keywords: ["restaurant", "starbucks", "chipotle", "mcdonald", "coffee", "doordash", "grubhub", "ubereats", "food"] },
  { name: "Utilities", keywords: ["electric", "water", "comcast", "xfinity", "verizon", "at&t", "t-mobile", "internet", "phone", "utility"] },
  { name: "Equipment", keywords: ["bhphoto", "b&h", "adorama", "lens", "camera", "gimbal", "tripod", "drone", "gopro", "sony", "canon", "dell", "macbook", "imac"] },
  { name: "Other", keywords: [] },
]

interface Row {
  date: string
  description: string
  amount: number
  category: string
}

function categorize(description: string): string {
  const lc = description.toLowerCase()
  for (const c of CATEGORIES) {
    for (const kw of c.keywords) {
      if (lc.includes(kw)) return c.name
    }
  }
  return "Other"
}

function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

// Minimal CSV parser: splits on newlines + commas, handles quoted fields.
function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let cur: string[] = []
  let field = ""
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (ch === '"') inQuotes = false
      else field += ch
    } else {
      if (ch === '"') inQuotes = true
      else if (ch === ",") { cur.push(field); field = "" }
      else if (ch === "\n") { cur.push(field); rows.push(cur); cur = []; field = "" }
      else if (ch === "\r") { /* skip */ }
      else field += ch
    }
  }
  if (field || cur.length > 0) { cur.push(field); rows.push(cur) }
  return rows.filter((r) => r.some((x) => x.trim()))
}

function pickColumns(header: string[]): { date: number; desc: number; amount: number } {
  const lower = header.map((h) => h.toLowerCase().trim())
  const findBy = (keys: string[]) => lower.findIndex((h) => keys.some((k) => h.includes(k)))
  return {
    date: findBy(["date", "posted"]),
    desc: findBy(["desc", "merchant", "name", "detail", "memo", "payee"]),
    amount: findBy(["amount", "debit", "total", "charge"]),
  }
}

export default function ExpenseTrackerPage() {
  const [raw, setRaw] = useState("")
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState("")

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = String(e.target?.result || "")
      setRaw(text)
      parseAndCategorize(text)
    }
    reader.readAsText(file)
  }

  function parseAndCategorize(text: string) {
    setError("")
    const parsed = parseCSV(text)
    if (parsed.length < 2) {
      setError("Couldn't find any rows. Make sure the file has a header row and at least one transaction.")
      setRows([])
      return
    }
    const cols = pickColumns(parsed[0])
    if (cols.desc === -1 || cols.amount === -1) {
      setError("Couldn't detect Description and Amount columns. Make sure the header has labels like 'Description' and 'Amount'.")
      setRows([])
      return
    }
    const out: Row[] = []
    for (let i = 1; i < parsed.length; i++) {
      const r = parsed[i]
      const desc = (r[cols.desc] || "").trim()
      const amountRaw = (r[cols.amount] || "0").replace(/[$,]/g, "").trim()
      const amount = parseFloat(amountRaw) || 0
      if (!desc || amount === 0) continue
      out.push({
        date: cols.date >= 0 ? (r[cols.date] || "").trim() : "",
        description: desc,
        amount: Math.abs(amount),
        category: categorize(desc),
      })
    }
    setRows(out)
  }

  const totalByCategory = useMemo(() => {
    const m: Record<string, number> = {}
    for (const r of rows) m[r.category] = (m[r.category] || 0) + r.amount
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [rows])

  const grandTotal = useMemo(() => rows.reduce((s, r) => s + r.amount, 0), [rows])

  function updateCategory(idx: number, cat: string) {
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, category: cat } : r)))
  }

  function downloadCSV() {
    const header = ["Date", "Description", "Amount", "Category"]
    const lines = [header.join(",")]
    for (const r of rows) {
      lines.push([r.date, `"${r.description.replace(/"/g, '""')}"`, r.amount.toFixed(2), r.category].join(","))
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "categorized-expenses.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <header className="border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <span className="text-xs text-slate-500">Free tool</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Bank Statement Expense Categorizer
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Paste your bank CSV or upload a file. We'll auto-categorize every transaction into Schedule C categories so tax prep is painless.
          </p>
        </div>

        {/* Upload */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <label className="flex-1 cursor-pointer">
              <input type="file" accept=".csv,text/csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} className="hidden" />
              <div className="px-4 py-3 bg-[#0088ff] text-white font-semibold rounded-lg text-center text-sm hover:bg-[#0066dd] transition-colors">
                Upload CSV
              </div>
            </label>
            <button
              onClick={() => parseAndCategorize(raw)}
              disabled={!raw.trim()}
              className="px-4 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg text-sm hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Categorize pasted text
            </button>
          </div>

          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="…or paste CSV directly here. Format: Date,Description,Amount (header row required)"
            rows={4}
            className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-xs font-mono text-white focus:border-[#0088ff] outline-none"
          />

          {error && (
            <div className="mt-3 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <p className="text-[11px] text-slate-500 mt-3">
            Nothing leaves your browser. Parsing + categorization happens client-side.
          </p>
        </section>

        {/* Results */}
        {rows.length > 0 && (
          <>
            {/* Category summary */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Totals by category</h2>
                  <p className="text-xs text-slate-500">{rows.length} transactions · {money(grandTotal)} total</p>
                </div>
                <button onClick={downloadCSV} className="px-3 py-2 bg-[#0088ff] text-white text-xs font-semibold rounded-lg hover:bg-[#0066dd] transition-colors">
                  Download CSV
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {totalByCategory.map(([cat, amt]) => {
                  const pct = (amt / grandTotal) * 100
                  return (
                    <div key={cat} className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                      <span className="text-sm truncate">{cat}</span>
                      <div className="text-right shrink-0">
                        <div className="text-sm tabular-nums font-medium">{money(amt)}</div>
                        <div className="text-[10px] text-slate-500 tabular-nums">{pct.toFixed(1)}%</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Line-by-line */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden mb-6">
              <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">Line-by-line (click a category to re-assign)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium">Date</th>
                      <th className="text-left px-4 py-2 font-medium">Description</th>
                      <th className="text-right px-4 py-2 font-medium">Amount</th>
                      <th className="text-left px-4 py-2 font-medium">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className="border-t border-white/5">
                        <td className="px-4 py-2 text-slate-400 whitespace-nowrap">{r.date || "—"}</td>
                        <td className="px-4 py-2 truncate max-w-[280px]">{r.description}</td>
                        <td className="px-4 py-2 text-right tabular-nums">{money(r.amount)}</td>
                        <td className="px-4 py-2">
                          <select
                            value={r.category}
                            onChange={(e) => updateCategory(i, e.target.value)}
                            className="bg-[#111827] border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-[#0088ff] outline-none"
                          >
                            {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div className="rounded-xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Tired of categorizing bank statements once a year?
          </h3>
          <p className="text-slate-400 text-sm mb-4 max-w-lg mx-auto">
            Slate Pro imports your Chase / Amex / BofA CSVs continuously, learns your category preferences, and generates a tax-ready P&L on demand.
          </p>
          <a href={APP_URL} className="inline-block px-5 py-2.5 bg-[#0088ff] text-white font-semibold rounded-lg hover:bg-[#0066dd] transition-colors text-sm">
            Try Slate free →
          </a>
        </div>
      </div>
    </div>
  )
}
