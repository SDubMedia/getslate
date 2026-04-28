// JSON-LD schema builders + shared FAQ content. Single source of truth so the
// visible FAQ HTML and the FAQPage structured data can never drift.

import { TOOLS } from "../toolRegistry"

export const SITE_URL = "https://getslate.net"
export const APP_URL = "https://slate.sdubmedia.com"
export const FREELANCE_URL = "https://freelance.sdubmedia.com"

export interface Faq {
  q: string
  a: string
  /** Hide on the visible FAQ when ICP picker is set to this value. JSON-LD always includes everything. */
  hideWhen?: "production" | "freelance"
}

// Homepage FAQ — feeds both the visible <details> list and the FAQPage JSON-LD.
export const HOME_FAQS: Faq[] = [
  {
    q: "Do I have to quit QuickBooks?",
    a: "No. Slate isn't accounting software — it's the operations layer that feeds your accounting. Keep QuickBooks for books and taxes; use Slate for scheduling, crew pay, invoicing, and profitability. Export CSVs any time.",
  },
  {
    q: "What's included in the free tier?",
    a: "Both apps are free up to 10 projects (Slate) or 10 gigs (Freelance), with core features unlocked — calendar, clients, invoicing, reports, and more. When you hit the cap, upgrade to Basic ($9.99/mo) for unlimited work or Pro ($19.99/mo) to add AI scanning, P&L, and advanced tools.",
  },
  {
    q: "Can I invite my crew? What can they see?",
    a: "Yes. Four roles: Owner (you), Partner (co-owner access), Staff (their schedule + their pay), Client (their projects only). Per-user feature overrides if the defaults don't fit.",
  },
  {
    q: "Is my data safe? Where does it live?",
    a: "Postgres on Supabase, encrypted in transit and at rest. Row-level security scopes every query to your org — nobody else can see your data, not even other Slate customers. We never sell your data and never train AI models on it.",
  },
  {
    q: "Can I export my data?",
    a: "Yes. CSV export on reports, invoices, billing summaries, and mileage. On account deletion, we remove your data within 30 days. Your data is yours.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep access through the end of your current billing period. Your data stays — nothing is deleted. If you come back, everything's right where you left it. Pro-only features hide on free/Basic, but the underlying records are preserved.",
  },
  {
    q: "Can I switch between Basic and Pro?",
    a: "Any time, from the Subscription link in the sidebar. Stripe handles proration automatically — no double-charging.",
  },
  {
    q: "I'm a freelancer, not a company. Is Slate for me?",
    a: "Not Slate — but Slate Freelance is. It's a separate app tuned for live-event freelancers (clock in/out, overtime, gear billing, mileage, per diem). Same team. freelance.sdubmedia.com.",
    hideWhen: "production",
  },
]

// Tools-index FAQ — short, AEO-style "what / who / cost / how" coverage.
export const TOOLS_FAQS: Faq[] = [
  {
    q: "What free templates does Slate offer?",
    a: `Slate hosts ${TOOLS.length} free production-industry tools and templates: invoices, contracts, model and location releases, call sheets, shot lists, NDAs, expense categorizers, profit calculators, and more. Each one is fillable in the browser and downloadable as a clean PDF.`,
  },
  {
    q: "Who are these templates for?",
    a: "Independent video production companies, freelance video crew, directors of photography, camera operators, editors, and drone pilots. The /tools page filters by role and by ICP (production company vs freelance crew) so you only see what's relevant.",
  },
  {
    q: "Are the tools really free?",
    a: "Yes. Every template, calculator, and form on getslate.net is free to use and download with no signup required. The paid product (Slate or Slate Freelance) is the full operations app — projects, clients, invoicing, profitability — and is optional.",
  },
  {
    q: "How do the tools work?",
    a: "Open a tool, fill in your details (the form is client-side — your data never leaves your browser unless you submit something to us), then click Download PDF. The PDF is print-ready and uses your filled-in values. No watermarks, no email gates, no upsell.",
  },
]

// JSON-LD builders ----------------------------------------------------------

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Slate",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS",
    description:
      "Production management for creative teams. Track projects, pay crew, send invoices, and see your real profit per project.",
    url: SITE_URL,
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description: "Up to 10 projects, full Basic features.",
      },
      {
        "@type": "Offer",
        name: "Basic",
        price: "9.99",
        priceCurrency: "USD",
        description: "Unlimited projects, calendar, invoicing, reports.",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "19.99",
        priceCurrency: "USD",
        description: "Everything in Basic + AI receipt scanning, P&L, advanced reports.",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "SDub Media LLC",
      url: SITE_URL,
    },
  }
}

export function faqPageSchema(faqs: ReadonlyArray<Faq>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

export function howToSchema(args: {
  name: string
  description: string
  url: string
  steps: { name: string; text: string; url?: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name,
    description: args.description,
    url: args.url,
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  }
}

export function templateSchema(args: {
  name: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: args.name,
    description: args.description,
    url: args.url,
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: "Slate", url: SITE_URL },
  }
}

export function itemListSchema(args: { name: string; items: { url: string; name: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: args.name,
    itemListElement: args.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.name,
    })),
  }
}
