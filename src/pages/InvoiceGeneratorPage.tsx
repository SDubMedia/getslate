import { useMemo, useState } from "react"

const APP_URL = "https://slate.sdubmedia.com"

interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
}

function nanoid() {
  return Math.random().toString(36).slice(2, 10)
}

function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

function today(): string {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function daysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export default function InvoiceGeneratorPage() {
  // From (your business)
  const [fromName, setFromName] = useState("")
  const [fromEmail, setFromEmail] = useState("")
  const [fromAddress, setFromAddress] = useState("")
  const [fromPhone, setFromPhone] = useState("")

  // To (the client)
  const [toName, setToName] = useState("")
  const [toEmail, setToEmail] = useState("")
  const [toAddress, setToAddress] = useState("")

  // Invoice meta
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001")
  const [issueDate, setIssueDate] = useState(today())
  const [dueDate, setDueDate] = useState(daysFromNow(14))
  const [notes, setNotes] = useState("")

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { id: nanoid(), description: "Production day", quantity: 1, rate: 1500 },
  ])
  const [taxRate, setTaxRate] = useState(0)

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.quantity * it.rate, 0),
    [items]
  )
  const tax = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate])
  const total = subtotal + tax

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function addItem() {
    setItems((prev) => [...prev, { id: nanoid(), description: "", quantity: 1, rate: 0 }])
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  function printInvoice() {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      {/* Screen-only header — hidden when printing */}
      <header className="print:hidden border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Slate" className="w-7 h-7 rounded-lg" />
            <span className="text-base font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Slate</span>
          </a>
          <button
            onClick={printInvoice}
            className="px-4 py-2 bg-[#0088ff] text-white text-sm font-semibold rounded-lg hover:bg-[#0066dd] transition-colors"
          >
            Download PDF
          </button>
        </div>
      </header>

      {/* Screen-only form — hidden when printing */}
      <div className="print:hidden max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Free Invoice Generator
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            For production companies + freelance crew. Fill in the fields, click Download PDF, and the browser saves a clean invoice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* From */}
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">From (you)</h2>
            <TextField label="Business name" value={fromName} onChange={setFromName} placeholder="Your production company" />
            <TextField label="Email" value={fromEmail} onChange={setFromEmail} placeholder="you@example.com" type="email" />
            <TextField label="Address" value={fromAddress} onChange={setFromAddress} placeholder="123 Main St, City, State ZIP" multiline />
            <TextField label="Phone" value={fromPhone} onChange={setFromPhone} placeholder="(555) 555-5555" />
          </section>

          {/* To */}
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bill to (client)</h2>
            <TextField label="Client name" value={toName} onChange={setToName} placeholder="Client company" />
            <TextField label="Email" value={toEmail} onChange={setToEmail} placeholder="billing@client.com" type="email" />
            <TextField label="Address" value={toAddress} onChange={setToAddress} placeholder="Optional" multiline />
          </section>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <TextField label="Invoice #" value={invoiceNumber} onChange={setInvoiceNumber} />
          <TextField label="Issue date" value={issueDate} onChange={setIssueDate} type="date" />
          <TextField label="Due date" value={dueDate} onChange={setDueDate} type="date" />
        </div>

        {/* Line items */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Line items</h2>
            <button onClick={addItem} className="text-xs font-semibold text-[#0088ff] hover:text-[#00d4ff] transition-colors">
              + Add line
            </button>
          </div>

          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-12 sm:col-span-6">
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Description</label>
                  <input
                    value={it.description}
                    onChange={(e) => updateItem(it.id, { description: e.target.value })}
                    placeholder="Podcast production — April"
                    className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Qty</label>
                  <input
                    type="number"
                    value={it.quantity}
                    min={0}
                    step={0.25}
                    onChange={(e) => updateItem(it.id, { quantity: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">Rate $</label>
                  <input
                    type="number"
                    value={it.rate}
                    min={0}
                    step={1}
                    onChange={(e) => updateItem(it.id, { rate: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2 flex items-end">
                  <div className="w-full text-right">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total</div>
                    <div className="py-2 text-sm tabular-nums">{money(it.quantity * it.rate)}</div>
                  </div>
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(it.id)}
                      className="ml-2 mb-2 text-slate-500 hover:text-red-400 transition-colors text-xs"
                      aria-label="Remove line"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-5 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <label className="text-slate-400">Tax rate</label>
              <input
                type="number"
                value={taxRate}
                min={0}
                max={100}
                step={0.1}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-16 bg-[#111827] border border-white/10 rounded-md px-2 py-1 text-sm text-white text-right focus:border-[#0088ff] outline-none"
              />
              <span className="text-slate-400">%</span>
            </div>
            <div className="text-right space-y-1 text-sm">
              <div><span className="text-slate-400">Subtotal:</span> <span className="tabular-nums font-medium">{money(subtotal)}</span></div>
              {taxRate > 0 && (
                <div><span className="text-slate-400">Tax ({taxRate}%):</span> <span className="tabular-nums font-medium">{money(tax)}</span></div>
              )}
              <div className="text-lg font-bold"><span className="text-slate-400 text-sm font-medium">Total:</span> <span className="tabular-nums ml-2">{money(total)}</span></div>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Notes / payment terms (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Net 14. Zelle: you@example.com"
            className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
          />
        </section>

        {/* Download CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pb-16">
          <button
            onClick={printInvoice}
            className="px-6 py-3 bg-[#0088ff] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-colors text-base w-full sm:w-auto"
          >
            Download PDF
          </button>
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Opens your browser's print dialog — pick "Save as PDF" as the destination.
          </span>
        </div>

        {/* Plug */}
        <div className="rounded-xl border border-[#0088ff]/30 bg-[#0088ff]/5 p-6 text-center mb-8">
          <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
            Tired of building invoices from scratch every month?
          </h3>
          <p className="text-slate-400 text-sm mb-4 max-w-lg mx-auto">
            Slate tracks your projects, crew, and clients — then builds invoices automatically from the work you've already logged. Free up to 10 projects.
          </p>
          <a
            href={APP_URL}
            className="inline-block px-5 py-2.5 bg-[#0088ff] text-white font-semibold rounded-lg hover:bg-[#0066dd] transition-colors text-sm"
          >
            Try Slate free →
          </a>
        </div>
      </div>

      {/* Print-only invoice — clean white paper */}
      <div className="hidden print:block bg-white text-black p-12" style={{ colorScheme: "light" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-1">{fromName || "Your Business"}</h1>
              <div className="text-sm text-gray-600 whitespace-pre-line">{fromAddress}</div>
              <div className="text-sm text-gray-600">{fromEmail}</div>
              <div className="text-sm text-gray-600">{fromPhone}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold uppercase tracking-wider text-gray-500 mb-1">Invoice</div>
              <div className="text-sm"><span className="text-gray-500">#</span> {invoiceNumber}</div>
              <div className="text-sm"><span className="text-gray-500">Issued:</span> {issueDate}</div>
              <div className="text-sm"><span className="text-gray-500">Due:</span> {dueDate}</div>
            </div>
          </div>

          <div className="mb-10">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Bill to</div>
            <div className="text-base font-semibold">{toName || "Client Name"}</div>
            <div className="text-sm text-gray-600 whitespace-pre-line">{toAddress}</div>
            <div className="text-sm text-gray-600">{toEmail}</div>
          </div>

          <table className="w-full mb-10">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-2 text-xs uppercase tracking-wider text-gray-700">Description</th>
                <th className="text-right py-2 text-xs uppercase tracking-wider text-gray-700 w-20">Qty</th>
                <th className="text-right py-2 text-xs uppercase tracking-wider text-gray-700 w-24">Rate</th>
                <th className="text-right py-2 text-xs uppercase tracking-wider text-gray-700 w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-gray-200">
                  <td className="py-3 text-sm align-top">{it.description || "—"}</td>
                  <td className="py-3 text-sm text-right tabular-nums align-top">{it.quantity}</td>
                  <td className="py-3 text-sm text-right tabular-nums align-top">{money(it.rate)}</td>
                  <td className="py-3 text-sm text-right tabular-nums align-top font-medium">{money(it.quantity * it.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-10">
            <div className="w-72 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="tabular-nums">{money(subtotal)}</span>
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({taxRate}%)</span>
                  <span className="tabular-nums">{money(tax)}</span>
                </div>
              )}
              <div className="flex justify-between border-t-2 border-black pt-2 text-base font-bold">
                <span>Total</span>
                <span className="tabular-nums">{money(total)}</span>
              </div>
            </div>
          </div>

          {notes && (
            <div className="border-t border-gray-200 pt-4 mb-10">
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Notes</div>
              <div className="text-sm text-gray-700 whitespace-pre-line">{notes}</div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
            Generated free by Slate · getslate.net
          </div>
        </div>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  multiline?: boolean
}

function TextField({ label, value, onChange, placeholder, type = "text", multiline }: FieldProps) {
  return (
    <div>
      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-[#0088ff] outline-none"
        />
      )}
    </div>
  )
}
