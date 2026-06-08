import { PageWrapper } from '../components/layout/PageWrapper'
import { TechCard } from '../components/ui/TechCard'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { techStackCards } from '../data/tech-stack'

const categories = [
  { key: 'frontend' as const, label: '🖥 Frontend', color: '#2563eb' },
  { key: 'ai' as const, label: '🤖 AI & Orchestration', color: '#7c3aed' },
  { key: 'data' as const, label: '📊 Data Pipeline', color: '#16a34a' },
  { key: 'infra' as const, label: '⚙️ Infrastructure', color: '#ea580c' },
]

export function TechStackPage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-black text-white mb-2">Tech Stack</h1>
      <p className="text-slate-400 mb-10">Tutte le librerie e tecnologie consigliate per costruire GEMATA AIOS.</p>

      {categories.map((cat, ci) => {
        const cards = techStackCards.filter(c => c.category === cat.key)
        return (
          <AnimatedSection key={cat.key} delay={ci * 0.1} className="mb-8">
            <h2 className="text-lg font-bold mb-4" style={{ color: cat.color }}>{cat.label}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cards.map(card => <TechCard key={card.name} card={card} />)}
            </div>
          </AnimatedSection>
        )
      })}
    </PageWrapper>
  )
}
