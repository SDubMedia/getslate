// Honest comparisons between Slate and common competitors.
// Keep it factual; don't trash the competitors — readers notice.

export interface VsRow {
  feature: string
  slate: string
  competitor: string
}

export interface VsEntry {
  name: string
  slateProduct: "slate" | "freelance"
  intro: string
  slateFor: string
  competitorFor: string
  compareTable: VsRow[]
  pickSlate: string[]
  pickCompetitor: string[]
  verdict: string
  // Competitor-specific CTA override. If omitted, a generic "Try Slate free" is used.
  ctaLabel?: string
  ctaSubtitle?: string
}

export const VS_CONTENT: Record<string, VsEntry> = {
  "wrapbook": {
    name: "Wrapbook",
    slateProduct: "slate",
    intro:
      "Both are production-industry tools, but they solve different problems. Wrapbook is payroll-first for union productions. Slate is operations-first for independent production companies. Here's when each makes sense.",
    slateFor: "Independent production companies (1-10 crew) tracking projects, clients, invoices, and real profit per shoot — without needing union payroll.",
    competitorFor: "Productions with union crew (IATSE, Teamsters) that need start paperwork, W2 payroll, and tax compliance at scale.",
    compareTable: [
      { feature: "Built for", slate: "Small/mid production shops", competitor: "Large & union productions" },
      { feature: "Starting price", slate: "Free (10 projects)", competitor: "% of payroll processed" },
      { feature: "Paid crew as W2", slate: "No (you pay your crew however)", competitor: "Yes (core feature)" },
      { feature: "1099 contractor support", slate: "Yes", competitor: "Yes" },
      { feature: "Client invoicing", slate: "Yes (built-in)", competitor: "No" },
      { feature: "Per-client profit", slate: "Yes (P&L by client)", competitor: "No" },
      { feature: "Project calendar", slate: "Yes (with crew + location)", competitor: "Limited" },
      { feature: "Mileage tracking", slate: "Yes (Google Maps)", competitor: "No" },
      { feature: "Union compliance", slate: "No", competitor: "Yes" },
    ],
    pickSlate: [
      "You bill clients for productions and want to know your real margin per shoot.",
      "You pay crew as 1099 contractors, not W2 employees.",
      "You want to schedule shoots, track crew hours, and send invoices in one tool.",
      "Your team is under ~10 people and growth isn't the bottleneck — ops visibility is.",
    ],
    pickCompetitor: [
      "You run union productions with IATSE/Teamsters and need compliant W2 payroll.",
      "You have a line producer / production accountant who runs the financial side.",
      "You process >$500K/yr in crew payroll and need full tax compliance handling.",
    ],
    verdict:
      "These aren't really competing tools — Wrapbook is a payroll platform, Slate is an operations platform. If you're a 1-10 person video or photo shop running your own shoots, invoicing clients, and paying crew as 1099s, Slate is built for your workflow. If you're running union productions with scale, use Wrapbook for payroll and complement with something like Slate for project visibility.",
    ctaLabel: "Keep Wrapbook. Add Slate for ops.",
    ctaSubtitle: "10 projects free — see what Wrapbook can't show you.",
  },

  "studio-binder": {
    name: "StudioBinder",
    slateProduct: "slate",
    intro:
      "StudioBinder is a pre-production planning tool — shot lists, storyboards, call sheets, scheduling. Slate is a business-operations tool — projects, clients, invoices, profit. Most working production companies eventually need both.",
    slateFor: "Production companies running 5+ jobs/month who need to know who they're profitable with, what's outstanding, and how much time went where.",
    competitorFor: "Directors, DPs, and productions deep in pre-production — breakdowns, shot lists, call sheets, script supervision.",
    compareTable: [
      { feature: "Phase of production", slate: "Production + post + billing", competitor: "Pre-production + on-set" },
      { feature: "Shot lists & storyboards", slate: "No", competitor: "Yes (core)" },
      { feature: "Call sheets", slate: "Basic (project details)", competitor: "Yes (detailed, industry-standard)" },
      { feature: "Script breakdowns", slate: "No", competitor: "Yes" },
      { feature: "Client invoicing", slate: "Yes (built-in)", competitor: "No" },
      { feature: "P&L / profit per client", slate: "Yes", competitor: "No" },
      { feature: "Crew pay tracking", slate: "Yes (hours + rates)", competitor: "No" },
      { feature: "Mileage + expenses", slate: "Yes", competitor: "No" },
      { feature: "Starting price", slate: "Free (10 projects)", competitor: "Free tier + paid plans" },
    ],
    pickSlate: [
      "You need to know which clients are actually profitable.",
      "You invoice clients and want that tracked with the project, not in a separate spreadsheet.",
      "Your crew is paid hourly or per project and you need the numbers tied to individual shoots.",
      "Shot planning isn't your bottleneck — knowing what you're making is.",
    ],
    pickCompetitor: [
      "You spend a lot of time in pre-production: shot lists, storyboards, breakdowns.",
      "You run narrative projects (short films, commercials) where detailed call sheets matter.",
      "You're a DP/director more than a production company owner.",
    ],
    verdict:
      "These tools don't really overlap. StudioBinder is best-in-class for what it does — script-to-screen pre-production planning. Slate handles the business side. If you use StudioBinder for shoot planning, Slate fits alongside it for the client/money/margin side. Most 1-10 person shops need both eventually.",
    ctaLabel: "Plan in StudioBinder. Bill + track profit in Slate.",
    ctaSubtitle: "10 projects free — the business side of production.",
  },

  "sprout-studio": {
    name: "Sprout Studio",
    slateProduct: "slate",
    intro:
      "Sprout Studio is purpose-built for photographers — galleries, proofing, online stores, contracts. Slate is for production companies (video + photo) that also need profit visibility, crew management, and project tracking.",
    slateFor: "Production companies — especially ones doing video and photo — who need ops visibility beyond just client galleries.",
    competitorFor: "Wedding and portrait photographers focused on client-facing experience: galleries, proofing, print sales.",
    compareTable: [
      { feature: "Primary use", slate: "Project ops + profit tracking", competitor: "Client galleries + proofing" },
      { feature: "Client galleries", slate: "Links only (BYO gallery host)", competitor: "Yes (full gallery platform)" },
      { feature: "Online print sales", slate: "No", competitor: "Yes (core feature)" },
      { feature: "Video projects", slate: "Yes", competitor: "Limited" },
      { feature: "Crew management (multi-person)", slate: "Yes", competitor: "Limited" },
      { feature: "Invoice + P&L", slate: "Yes (built-in)", competitor: "Basic invoicing" },
      { feature: "Contracts + proposals", slate: "Yes", competitor: "Yes" },
      { feature: "Mileage + expenses", slate: "Yes", competitor: "Limited" },
      { feature: "Starting price", slate: "Free (10 projects)", competitor: "~$37/mo and up" },
    ],
    pickSlate: [
      "You do video (or video + photo), not just photo.",
      "You run a team of 2+ people and need crew hours, rates, and assignments tracked.",
      "You want to see real per-client profit, not just top-line revenue.",
      "You already host galleries elsewhere (Pixieset, CloudSpot, Pic-Time) and need the business layer.",
    ],
    pickCompetitor: [
      "You're a solo photographer where the client-gallery experience is the core deliverable.",
      "You run online print sales and that's a real revenue stream.",
      "Your bottleneck is client proofing workflow, not ops visibility.",
    ],
    verdict:
      "Complementary more than competitive. Sprout is great if you need an integrated gallery + proofing + print store. Slate handles the business layer — projects, crew, profit, invoices — and works alongside any gallery host. Many production companies use Slate + Pixieset and get more flexibility than a bundled tool.",
    ctaLabel: "Keep your galleries. Run the business in Slate.",
    ctaSubtitle: "10 projects free — built for multi-service shops, not just photographers.",
  },

  "honeybook": {
    name: "Honeybook",
    slateProduct: "slate",
    intro:
      "Honeybook is a CRM + client-workflow tool used broadly across creative services. Slate is focused specifically on production companies — projects, crew, profit. If you're in video/photo production, Slate is more purpose-built for your workflow.",
    slateFor: "Video + photo production companies who want project ops, crew tracking, invoices, and real profit visibility — not just a CRM.",
    competitorFor: "Creative service businesses (planners, designers, coaches, photographers) who want CRM, inquiry-to-booked workflow, and basic invoicing.",
    compareTable: [
      { feature: "Primary use", slate: "Production ops + profit", competitor: "CRM + client workflow" },
      { feature: "Inquiry pipeline", slate: "Yes (lead pipeline)", competitor: "Yes (core feature)" },
      { feature: "Proposals + contracts", slate: "Yes", competitor: "Yes" },
      { feature: "Invoicing", slate: "Yes (Stripe built-in)", competitor: "Yes" },
      { feature: "Crew management", slate: "Yes (hours, rates, roles)", competitor: "Limited" },
      { feature: "Per-project profit", slate: "Yes (P&L by client)", competitor: "No" },
      { feature: "Mileage + expenses", slate: "Yes", competitor: "Limited" },
      { feature: "Multi-role access (owner/staff/client)", slate: "Yes", competitor: "Limited" },
      { feature: "Starting price", slate: "Free (10 projects)", competitor: "~$19-39/mo" },
    ],
    pickSlate: [
      "You're in video or photo production specifically, not general creative services.",
      "You need to track what crew you paid and what you invoiced the client for — together.",
      "Profit per client / project matters more to you than a fancy CRM pipeline.",
      "You have crew (even just 1-2 contractors) and need them in the tool.",
    ],
    pickCompetitor: [
      "You're a wedding planner, coach, designer, or general creative services business.",
      "Inquiry-to-booking workflow is the biggest pain — not operations.",
      "You want a more mature CRM with long-standing templates and community.",
    ],
    verdict:
      "Honeybook is broader — designed for any creative service. Slate is narrower and deeper — designed specifically for production companies. If production is your industry, Slate fits your vocabulary (projects, shoots, crew, editors) and your numbers (per-project P&L, mileage, crew multipliers). If you're not in production, Honeybook probably fits better.",
    ctaLabel: "Switch to Slate — built for production, not generic creatives.",
    ctaSubtitle: "10 projects free — import your client list and go.",
  },

  "dubsado": {
    name: "Dubsado",
    slateProduct: "freelance",
    intro:
      "Dubsado is a flexible CRM used widely by freelancers. Slate Freelance is specifically built for live-event freelance crew — A1/A2, videographers, projectionists, editors working gigs across production companies.",
    slateFor: "Live-event and production freelance crew who work W-9/1099 across multiple clients and need gig tracking, overtime, gear billing, per diem, and compliant invoices.",
    competitorFor: "Freelancers in creative services (coaches, designers, planners, photographers) who want a customizable CRM with forms + workflows.",
    compareTable: [
      { feature: "Primary use", slate: "Gig tracking + compliant invoicing", competitor: "CRM + client workflow" },
      { feature: "Clock in/out + overtime rules", slate: "Yes (core feature)", competitor: "No" },
      { feature: "Gear rental billing", slate: "Yes", competitor: "Limited" },
      { feature: "Per diem tracking", slate: "Yes (with GSA rates)", competitor: "No" },
      { feature: "Mileage (IRS rate)", slate: "Yes", competitor: "Limited" },
      { feature: "Invoice format production cos accept", slate: "Yes (optimized for this)", competitor: "Generic" },
      { feature: "Inquiry pipeline + forms", slate: "No", competitor: "Yes (core feature)" },
      { feature: "Customizable client workflows", slate: "Limited", competitor: "Yes (strong)" },
      { feature: "Starting price", slate: "Free (10 gigs)", competitor: "~$40/mo" },
    ],
    pickSlate: [
      "Your gigs involve clocking in/out with overtime rules (A1, A2, projectionist, camera op).",
      "You bill gear rentals + per diem + mileage alongside your day rate.",
      "You need invoices that production companies actually pay without pushback.",
      "You're in the live-event or production world, not a general creative freelancer.",
    ],
    pickCompetitor: [
      "You run a client-inquiry business (planner, designer, coach) where forms and workflows are your lifeline.",
      "You need deep CRM customization with conditional logic and scheduled workflows.",
      "Your work isn't tied to specific shift times and overtime tracking doesn't matter.",
    ],
    verdict:
      "Dubsado is a powerful generalist CRM. Slate Freelance is a specialist tool for crew who work events and productions. If your life revolves around call times, per diems, and gear invoicing, Slate Freelance will feel purpose-built. If you run a service business with inquiry forms and client portals, Dubsado is the better fit.",
    ctaLabel: "Try Slate Freelance — purpose-built for call-time life.",
    ctaSubtitle: "10 gigs free — per diems, overtime, gear billing included.",
  },
}
