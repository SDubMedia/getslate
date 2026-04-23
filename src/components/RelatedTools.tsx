import { relatedTools } from "../toolRegistry"

interface Props {
  slug: string
  limit?: number
}

export default function RelatedTools({ slug, limit = 3 }: Props) {
  const related = relatedTools(slug, limit)
  if (related.length === 0) return null

  return (
    <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Pair this with
        </h3>
        <a href="/tools" className="text-[11px] font-semibold text-[#0088ff] hover:text-[#00d4ff]">All 31 tools →</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {related.map((t) => (
          <a
            key={t.slug}
            href={t.href}
            className="group rounded-lg border border-white/10 bg-[#0a0e17]/60 hover:bg-[#0a0e17] hover:border-[#0088ff]/40 transition-colors p-4 flex flex-col"
          >
            <div className="text-2xl mb-2">{t.emoji}</div>
            <div className="text-sm font-semibold text-white mb-1">{t.title}</div>
            <div className="text-[11px] text-slate-400 leading-relaxed flex-1">{t.short}</div>
            <span className="text-[11px] font-semibold text-[#0088ff] group-hover:text-[#00d4ff] mt-2">Open →</span>
          </a>
        ))}
      </div>
    </div>
  )
}
