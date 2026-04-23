// Narrative content for each workflow landing page. These are SEO
// hub pages that walk a user through a job-to-be-done and link into
// the individual tools inline.

import type { ToolCluster } from "../toolRegistry"

export interface WorkflowStep {
  tool: string                 // slug from toolRegistry
  heading: string
  body: string
}

export interface WorkflowMeta {
  id: ToolCluster
  slug: string                 // URL slug (same as id for now)
  title: string                // page <h1>
  pageTitle: string            // <title> for SEO
  metaDescription: string
  tagline: string
  intro: string
  icp: "production" | "freelance" | "both"
  steps: WorkflowStep[]
  closer: string
}

export const WORKFLOWS: WorkflowMeta[] = [
  {
    id: "booking-new-client",
    slug: "booking-a-new-client",
    title: "How to book a new video production client (start to signed)",
    pageTitle: "Booking a new video production client — from inquiry to signed contract",
    metaDescription: "The exact steps — and free templates — to take a production inquiry from first email to signed contract with deposit in the bank.",
    tagline: "From first email to money in the bank.",
    intro:
      "Most production companies lose deals in the gap between 'we're interested' and 'we're signed.' The fix is a clear, repeatable flow — same steps, same documents, every time. Here's the workflow and the free tools to run it.",
    icp: "production",
    steps: [
      { tool: "client-intake", heading: "1. Qualify the lead", body: "Send a short intake questionnaire to any new inquiry before jumping on a call. Filters out tire-kickers, gives you the info you need to walk into the call prepared, and starts you signaling pro from minute one." },
      { tool: "creative-brief", heading: "2. Run a discovery call, write the brief", body: "Fill out the creative brief on the call. Background, objective, audience, key message, deliverables, tone, references. Having this written together beats anything produced in isolation." },
      { tool: "rate-card", heading: "3. Send a rate card if needed", body: "Some clients want to see your rates before a proposal. A clean rate-card PDF sets anchor pricing and filters out people outside your budget band." },
      { tool: "proposal", heading: "4. Send the proposal", body: "A proposal is what you send BEFORE the contract. Scope + deliverables + timeline + line-item pricing + validity date. If they say yes, you move to contract. If not, you have a clear record of what changed." },
      { tool: "contract", heading: "5. Convert to contract", body: "Proposal says yes → send the contract. Same scope, same deliverables, now binding. Include cancellation policy, usage rights, revision count." },
      { tool: "deposit-receipt", heading: "6. Collect the deposit, send the receipt", body: "50% deposit is standard. The deposit receipt is what some clients' bookkeeping will ask for. Sending it proactively makes you look organized." },
      { tool: "change-order", heading: "7. Bonus: defend against scope creep", body: "Scope will change. A signed change order makes that a line item in your invoice instead of an argument over drinks three months from now." },
    ],
    closer:
      "Seven steps. Seven free templates. The pattern is what separates production companies that grow from ones that stall. If you want all of this plus project tracking, invoice generation, and profit visibility in one tool — Slate.",
  },

  {
    id: "shoot-day",
    slug: "shoot-day",
    title: "Shoot day: every document your crew needs before the call",
    pageTitle: "Shoot day checklist for video production — free call sheet, shot list, releases",
    metaDescription: "Free call sheets, shot lists, model + location releases, crew deal memos, and drone logs. Every document you need for a production shoot day.",
    tagline: "Walk onto set with every form signed.",
    intro:
      "A pro shoot isn't about the camera — it's about being the person who thought ahead. Crew knows where to be, talent signed the release, the house owner knows you're coming, everyone's got a call sheet. Here's the workflow + free templates.",
    icp: "both",
    steps: [
      { tool: "crew-deal-memo", heading: "1. Lock in crew before the day", body: "One-page deal memo per crew member: role, day rate, call time, location, cancellation policy. Signed before gear is packed." },
      { tool: "call-sheet", heading: "2. Build + send the call sheet", body: "Crew, call times, location, parking, weather, sunrise/sunset, nearest hospital, emergency contact, schedule. Send 24h before. Not optional." },
      { tool: "shot-list", heading: "3. Write the shot list", body: "Scene-by-scene breakdown with type (wide / med / CU) and lens notes. Print one, clip to the slate, check shots off as you go." },
      { tool: "model-release", heading: "4. Get releases signed — adults", body: "Anyone on camera who isn't crew signs before cameras roll. Without it you can't use the footage commercially." },
      { tool: "minor-release", heading: "5. Minors need parental sign-off", body: "A regular model release isn't enough for anyone under 18. Parent or guardian signs, on site, before the shoot." },
      { tool: "location-release", heading: "6. Shooting on private property", body: "If you're not at a studio or rental, the property owner signs a location release. Covers you for claims + damage expectations." },
      { tool: "equipment-rental", heading: "7. Renting gear?", body: "If you're renting gear to or from another crew, the rental agreement covers replacement value + insurance requirements." },
      { tool: "drone-log", heading: "8. Flying a drone (Part 107)", body: "Every Part 107 flight has to be logged for FAA + tax records. Do it on the day — details slip otherwise." },
    ],
    closer:
      "Print one folder for every shoot day. Take it on set. Everything signed, everything tracked, everyone home safe. Slate bundles all of this per-project so you can't show up unprepared.",
  },

  {
    id: "getting-paid",
    slug: "getting-paid",
    title: "Getting paid: invoicing, chasing, and not losing money",
    pageTitle: "Invoicing + getting paid for video production work — free tools",
    metaDescription: "Free invoice generator, late payment letters, payment plans, late fee addendums, W-9 requests, and Schedule C expense sorter for production pros.",
    tagline: "Invoice, chase, track, deposit.",
    intro:
      "Most production companies do everything right up to the shoot, then lose money in the billing cycle — slow invoices, soft follow-ups, late crew payments, unsorted receipts at tax time. Here's the full post-production workflow for getting paid.",
    icp: "both",
    steps: [
      { tool: "invoice-generator", heading: "1. Send the invoice", body: "Clean, itemized PDF. Payment terms. Due date. Send it the same day the final is delivered — not a week later." },
      { tool: "calculator", heading: "2. Know if the project was profitable", body: "Before you even send the invoice: run the profit calculator with the real crew hours and overhead. Spot the margin leaks before they become a pattern." },
      { tool: "late-payment", heading: "3. Follow up when it's overdue", body: "Three escalating tones — friendly, firm, final. Pick one, fill in the details, send. Skip the 'sorry to bother you' preamble." },
      { tool: "late-fee-addendum", heading: "4. Add teeth for next time", body: "Amend your contract template to include a late fee clause. 1.5%/mo compounding is standard. Most clients will never trigger it — it's there for the ones who test it." },
      { tool: "payment-plan", heading: "5. Client can't pay in one go?", body: "Map out installments, get it signed, keep the deal. A signed payment plan beats a missed invoice every time." },
      { tool: "deposit-receipt", heading: "6. Formal receipts when money arrives", body: "Some clients' bookkeeping requires them. Sending unprompted = looking pro + avoiding future disputes." },
      { tool: "w9-request", heading: "7. Ask contractors for W-9s early", body: "If you paid a 1099 contractor > $600 this year, you need their W-9 before January 31 to issue a 1099-NEC. Ask in December, not April." },
      { tool: "timesheet", heading: "8. Hourly crew? Time cards with client sign-off", body: "Hourly work without a signed timesheet = write-off waiting to happen. Have the client approve hours on site." },
      { tool: "expenses", heading: "9. Tax-prep: sort a year of expenses in 10 minutes", body: "Export your business account CSV, drop it in, let keyword rules bucket everything into Schedule C categories. Your CPA will thank you." },
    ],
    closer:
      "If this feels like a lot — it is. That's why Slate automates the whole cycle: invoices auto-generate from project data, late payments flag themselves, expense imports run continuously, and your P&L stays current. Free up to 10 projects.",
  },

  {
    id: "closing-out",
    slug: "closing-out",
    title: "Closing out a project: wrap, testimonial, case study, press",
    pageTitle: "How to close out a video production project — wrap report, case study, testimonial",
    metaDescription: "Free templates for the final steps of every project: wrap report, testimonial request, case study structure, and press release.",
    tagline: "Don't leave the compound interest on the table.",
    intro:
      "The work's done, the client's happy, the money's in. Most production companies move on. The pros use this moment to generate three assets that feed every future pitch: a testimonial, a case study, and a press release. Here's how.",
    icp: "production",
    steps: [
      { tool: "wrap-report", heading: "1. Send a wrap report with the final invoice", body: "A one-pager that recaps what was delivered, hours logged, deliverable links. Makes the last touchpoint feel professional — and gives the client something to forward internally." },
      { tool: "testimonial-request", heading: "2. Ask for a testimonial while the memory's fresh", body: "Within 7 days of delivery, not three months later. Short, human ask — no 'please provide a formal quote' — with optional guiding questions. 1 in 3 will send something usable." },
      { tool: "case-study", heading: "3. Turn the project into a case study", body: "Goals → approach → deliverables → results → quote. With metrics if you can get them. Every future prospect will ask 'what have you done like this before?' — case studies are the answer." },
      { tool: "press-release", heading: "4. If it's newsworthy, write the release", body: "Big brand client? Viral campaign? Unique production method? Write the AP-style release for your client to distribute. You save them a chore AND get the credit." },
      { tool: "usage-license", heading: "5. Clarify usage rights if you didn't upfront", body: "If your original contract didn't specify granular rights, send a usage license that defines what the client can use the footage for and for how long. Any use beyond that scope = additional license fee." },
    ],
    closer:
      "Five steps turn every project from a transaction into an asset. Your portfolio grows. Your testimonials compound. Your case studies become the reason your next pitch wins. Slate auto-prompts you through this flow when each invoice is marked paid.",
  },

  {
    id: "legal-stack",
    slug: "legal-stack",
    title: "Legal stack: every contract + release a production company needs",
    pageTitle: "Free video production legal templates — contracts, NDAs, releases, licenses",
    metaDescription: "Free legal templates for production companies: client contract, independent contractor agreement, NDA, model + location releases, usage license.",
    tagline: "Every document. Fillable. Free. Not legal advice.",
    intro:
      "A production company's legal stack doesn't have to be complicated — it has to exist. Here are the documents you'll reach for across the life of a project, with fillable templates for each. Everything below is a starting point; have your lawyer review before any material deal.",
    icp: "both",
    steps: [
      { tool: "contract", heading: "Client contract", body: "The master agreement for a paid production. Scope, deliverables, fee, cancellation, usage rights. Starting point for simple commercial work." },
      { tool: "nda", heading: "Mutual NDA", body: "Both parties protect what they share during pre-production conversations. Short-form, standard." },
      { tool: "ic-agreement", heading: "Independent contractor agreement", body: "When YOU hire a 1099 — editor, PA, DP. Critical: includes IP assignment clause. Without it, the editor technically owns their edit." },
      { tool: "model-release", heading: "Adult model release", body: "Anyone on camera (not crew) signs. Grants use rights." },
      { tool: "minor-release", heading: "Minor model release", body: "For subjects under 18. Parental consent required — a regular model release is legally insufficient." },
      { tool: "location-release", heading: "Location release", body: "Shooting on private property (not a studio). Covers entry, use, and damage expectations." },
      { tool: "usage-license", heading: "Usage license / rights grant", body: "Granular rights grant — media, territory, term, exclusivity. Use this to license finished work with specific terms instead of giving away unlimited rights." },
      { tool: "music-license", heading: "Music license request", body: "Asking musicians or composers for sync rights. Clean template to send when you want a specific track." },
    ],
    closer:
      "Having these on file in a clearly-named Drive folder beats every last-minute scramble you've ever done. Slate's Contracts feature generates + tracks signatures on all of these per-project.",
  },
]

export function getWorkflow(slug: string): WorkflowMeta | undefined {
  return WORKFLOWS.find(w => w.slug === slug)
}
