import { PageWrapper } from '../components/layout/PageWrapper'
import { MilestoneRow } from '../components/ui/MilestoneRow'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { milestones } from '../data/roadmap'

export function RoadmapPage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-black text-white mb-2">Roadmap di Implementazione</h1>
      <p className="text-slate-400 mb-10">4 fasi, 12 settimane per costruire il GEMATA AIOS completo.</p>

      <div className="max-w-2xl">
        {milestones.map((m, i) => (
          <AnimatedSection key={m.phase} delay={i * 0.15}>
            <MilestoneRow milestone={m} />
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.6} className="mt-8">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 max-w-2xl">
          <h3 className="text-amber-400 font-semibold mb-2">📌 Nota sull'implementazione</h3>
          <p className="text-slate-400 text-sm">
            Ogni fase è indipendente e porta valore immediato. La Fase 1 (ContextOS) è operativa
            in 1–2 giorni e trasforma già radicalmente l'uso quotidiano di Claude Code per il Gruppo Gemata.
            Le fasi successive si aggiungono progressivamente senza interrompere il sistema.
          </p>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
