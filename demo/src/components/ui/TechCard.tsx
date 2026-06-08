import type { TechCard as TechCardType } from '../../types'

const categoryColors = {
  frontend: { bg: '#1e3a8a', border: '#2563eb', text: '#bfdbfe' },
  data: { bg: '#052e16', border: '#16a34a', text: '#bbf7d0' },
  ai: { bg: '#3b0764', border: '#7c3aed', text: '#e9d5ff' },
  infra: { bg: '#431407', border: '#ea580c', text: '#fed7aa' },
}

interface Props { card: TechCardType }

export function TechCard({ card }: Props) {
  const colors = categoryColors[card.category]
  return (
    <div
      className="rounded-xl p-4 border transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: colors.bg + '80', borderColor: colors.border + '60' }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-bold text-sm" style={{ color: colors.text }}>{card.name}</span>
        {card.version !== '-' && (
          <span className="text-xs text-slate-500 font-mono">v{card.version}</span>
        )}
      </div>
      <p className="text-slate-400 text-xs leading-relaxed">{card.purpose}</p>
    </div>
  )
}
