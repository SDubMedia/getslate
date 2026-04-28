// Emits one or more <script type="application/ld+json"> tags into the document.
// Vite/React renders this client-side; for marketing SEO it's enough since
// Google, Bing, and the major LLM crawlers all execute JS before parsing.

import { useEffect } from "react"

export default function JsonLd({ data }: { data: object | object[] }) {
  useEffect(() => {
    const items = Array.isArray(data) ? data : [data]
    const nodes = items.map((d) => {
      const s = document.createElement("script")
      s.type = "application/ld+json"
      s.text = JSON.stringify(d)
      s.dataset.jsonld = "1"
      document.head.appendChild(s)
      return s
    })
    return () => nodes.forEach((n) => n.remove())
  }, [data])
  return null
}
