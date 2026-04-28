// Central registry of every free tool on getslate.net.
// Single source of truth for: /tools index, RelatedTools widget,
// homepage featured block, sitemap, metadata.

export type ToolCategory =
  | "Billing"
  | "Agreements"
  | "Releases & Licensing"
  | "Production"
  | "Marketing"

export type ToolCluster =
  | "booking-new-client"
  | "shoot-day"
  | "getting-paid"
  | "closing-out"
  | "legal-stack"

export type Icp = "production" | "freelance" | "both"

export type Role = "producer" | "director" | "editor" | "dp" | "camera-op" | "solo" | "freelance-crew" | "drone-pilot"

export interface ToolMeta {
  slug: string
  href: string
  title: string
  short: string
  emoji: string
  category: ToolCategory
  clusters: ToolCluster[]
  icps: Icp[]
  roles: Role[]
  seoTitle?: string
}

export const TOOLS: ToolMeta[] = [
  // ---- Billing ----
  { slug: "invoice-generator", href: "/invoice-generator", title: "Invoice Generator", short: "Fill a form, download a clean PDF invoice.", emoji: "🧾", category: "Billing", clusters: ["getting-paid"], icps: ["both"], roles: ["producer", "editor", "dp", "camera-op", "solo", "freelance-crew"] },
  { slug: "calculator", href: "/calculator", title: "Profit Calculator", short: "3 questions — what you're actually making per month.", emoji: "📊", category: "Billing", clusters: ["getting-paid"], icps: ["production"], roles: ["producer", "solo"] },
  { slug: "expenses", href: "/expenses", title: "Expense Categorizer", short: "Upload a bank CSV, auto-sorted into Schedule C.", emoji: "💳", category: "Billing", clusters: ["getting-paid"], icps: ["both"], roles: ["producer", "solo", "freelance-crew"] },
  { slug: "rate-card", href: "/templates/rate-card", title: "Rate Card", short: "Clean downloadable rate sheet for client inquiries.", emoji: "💰", category: "Billing", clusters: ["booking-new-client"], icps: ["both"], roles: ["producer", "editor", "dp", "solo", "freelance-crew"] },
  { slug: "late-payment", href: "/templates/late-payment", title: "Late Payment Letter", short: "Friendly / firm / final — pick a tone.", emoji: "📩", category: "Billing", clusters: ["getting-paid"], icps: ["both"], roles: ["producer", "solo"] },
  { slug: "late-fee-addendum", href: "/templates/late-fee-addendum", title: "Late Fee Addendum", short: "Amend a contract to add late-payment penalties.", emoji: "⏰", category: "Billing", clusters: ["getting-paid"], icps: ["both"], roles: ["producer", "solo"] },
  { slug: "payment-plan", href: "/templates/payment-plan", title: "Payment Plan Agreement", short: "Installment schedule when client can't pay up front.", emoji: "📅", category: "Billing", clusters: ["getting-paid"], icps: ["both"], roles: ["producer"] },
  { slug: "deposit-receipt", href: "/templates/deposit-receipt", title: "Deposit Receipt", short: "Formal acknowledgment when a deposit arrives.", emoji: "🧾", category: "Billing", clusters: ["booking-new-client", "getting-paid"], icps: ["both"], roles: ["producer", "solo"] },
  { slug: "change-order", href: "/templates/change-order", title: "Change Order", short: "Document scope creep, get it signed, protect margin.", emoji: "📝", category: "Billing", clusters: ["booking-new-client"], icps: ["both"], roles: ["producer"] },
  { slug: "w9-request", href: "/templates/w9-request", title: "W-9 Request Letter", short: "Professional ask for a contractor's W-9.", emoji: "📋", category: "Billing", clusters: ["getting-paid"], icps: ["production"], roles: ["producer"] },

  // ---- Agreements ----
  { slug: "contract", href: "/templates/contract", title: "Video Production Contract", short: "Fillable starting point for commercial video work.", emoji: "📜", category: "Agreements", clusters: ["booking-new-client", "legal-stack"], icps: ["production"], roles: ["producer", "solo"] },
  { slug: "proposal", href: "/templates/proposal", title: "Proposal / Statement of Work", short: "Pre-contract pitch with scope + line items.", emoji: "📄", category: "Agreements", clusters: ["booking-new-client"], icps: ["production"], roles: ["producer", "solo"] },
  { slug: "ic-agreement", href: "/templates/ic-agreement", title: "Independent Contractor Agreement", short: "Hiring a 1099 editor or crew. IP assignment included.", emoji: "✍️", category: "Agreements", clusters: ["shoot-day", "legal-stack"], icps: ["production"], roles: ["producer"] },
  { slug: "equipment-rental", href: "/templates/equipment-rental", title: "Equipment Rental Agreement", short: "Rent gear to (or from) another crew.", emoji: "📦", category: "Agreements", clusters: ["shoot-day", "legal-stack"], icps: ["both"], roles: ["producer", "dp", "camera-op"] },

  // ---- Releases & Licensing ----
  { slug: "model-release", href: "/templates/model-release", title: "Model Release", short: "Standard adult model release form.", emoji: "🪪", category: "Releases & Licensing", clusters: ["shoot-day", "legal-stack"], icps: ["both"], roles: ["producer", "director", "dp", "solo"] },
  { slug: "minor-release", href: "/templates/minor-release", title: "Minor Model Release", short: "Parental consent for subjects under 18.", emoji: "👶", category: "Releases & Licensing", clusters: ["shoot-day", "legal-stack"], icps: ["both"], roles: ["producer", "director"] },
  { slug: "location-release", href: "/templates/location-release", title: "Location Release", short: "Permission to shoot on private property.", emoji: "📍", category: "Releases & Licensing", clusters: ["shoot-day", "legal-stack"], icps: ["both"], roles: ["producer", "director"] },
  { slug: "usage-license", href: "/templates/usage-license", title: "Usage License", short: "Granular rights grant for specific deliverables.", emoji: "🔑", category: "Releases & Licensing", clusters: ["closing-out", "legal-stack"], icps: ["both"], roles: ["producer", "solo"] },
  { slug: "music-license", href: "/templates/music-license", title: "Music License Request", short: "Ask for sync / background music rights.", emoji: "🎵", category: "Releases & Licensing", clusters: ["legal-stack"], icps: ["both"], roles: ["producer", "editor"] },

  // ---- Production ----
  { slug: "call-sheet", href: "/templates/call-sheet", title: "Call Sheet", short: "Shoot-day bible: crew, call times, weather, hospital.", emoji: "📋", category: "Production", clusters: ["shoot-day"], icps: ["both"], roles: ["producer", "director", "dp"] },
  { slug: "shot-list", href: "/templates/shot-list", title: "Shot List", short: "Scene-by-scene breakdown with lens notes.", emoji: "🎬", category: "Production", clusters: ["shoot-day"], icps: ["both"], roles: ["director", "dp"] },
  { slug: "creative-brief", href: "/templates/creative-brief", title: "Creative Brief", short: "Kickoff document filled out WITH the client.", emoji: "🧭", category: "Production", clusters: ["booking-new-client"], icps: ["production"], roles: ["producer", "director"] },
  { slug: "client-intake", href: "/templates/client-intake", title: "Client Intake Questionnaire", short: "Pre-kickoff form that becomes your brief.", emoji: "📥", category: "Production", clusters: ["booking-new-client"], icps: ["production"], roles: ["producer"] },
  { slug: "wrap-report", href: "/templates/wrap-report", title: "Project Wrap Report", short: "End-of-project recap with final invoice.", emoji: "🎞", category: "Production", clusters: ["closing-out"], icps: ["production"], roles: ["producer", "solo"] },
  { slug: "drone-log", href: "/drone-log", title: "Drone Flight Log (Part 107)", short: "Track every flight for FAA compliance + tax records.", emoji: "🚁", category: "Production", clusters: ["shoot-day"], icps: ["both"], roles: ["drone-pilot", "dp"] },

  // ---- Marketing ----
  { slug: "testimonial-request", href: "/templates/testimonial-request", title: "Testimonial Request Letter", short: "Short, human ask after a successful project.", emoji: "💬", category: "Marketing", clusters: ["closing-out"], icps: ["both"], roles: ["producer", "solo"] },
]

export const CATEGORIES: ToolCategory[] = [
  "Billing",
  "Agreements",
  "Releases & Licensing",
  "Production",
  "Marketing",
]

export const CLUSTERS: { id: ToolCluster; label: string; description: string }[] = [
  { id: "booking-new-client", label: "Booking a new client", description: "From inquiry to signed contract." },
  { id: "shoot-day", label: "Shoot day", description: "Everything you need on set." },
  { id: "getting-paid", label: "Getting paid", description: "Invoicing + collections + tax prep." },
  { id: "closing-out", label: "Closing out", description: "Wrap, testimonial, case study, press." },
  { id: "legal-stack", label: "Legal stack", description: "Every contract + release + license you need." },
]

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug)
}

export function relatedTools(slug: string, limit = 3): ToolMeta[] {
  const current = getTool(slug)
  if (!current) return []
  const scored = TOOLS
    .filter((t) => t.slug !== slug)
    .map((t) => ({
      tool: t,
      score: t.clusters.filter((c) => current.clusters.includes(c)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((x) => x.tool)
}

export function toolsInCluster(cluster: ToolCluster): ToolMeta[] {
  return TOOLS.filter((t) => t.clusters.includes(cluster))
}

export function toolsForIcp(icp: "production" | "freelance"): ToolMeta[] {
  return TOOLS.filter((t) => t.icps.includes(icp) || t.icps.includes("both"))
}

export function toolsForRole(role: Role): ToolMeta[] {
  return TOOLS.filter((t) => t.roles.includes(role))
}
