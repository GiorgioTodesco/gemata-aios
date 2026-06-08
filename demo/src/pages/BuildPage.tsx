import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { CommandTerminal } from '../components/ui/CommandTerminal'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { slashCommands } from '../data/commands-data'

const buildFlow = [
  { step: '/brainstorm', desc: 'Ideazione strutturata su un tema', color: '#7c3aed' },
  { step: '/explore', desc: 'Approfondimento e analisi', color: '#2563eb' },
  { step: '/spec', desc: 'Specifica tecnica completa', color: '#16a34a' },
  { step: '/implement', desc: 'Generazione codice/documento', color: '#f59e0b' },
]

export function BuildPage() {
  const layer = LAYERS[4]
  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2"><LayerBadge layer={layer} size="lg" /></div>
      <h1 className="text-3xl font-black text-white mb-2">Build System</h1>
      <p className="text-slate-400 mb-8">Comandi slash per costruire: brainstorming → esplorazione → specifica → implementazione.</p>

      <AnimatedSection>
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {buildFlow.map((item, i) => (
            <div key={item.step} className="flex items-center gap-2">
              <div className="px-3 py-2 rounded-lg border text-sm font-mono font-medium" style={{ color: item.color, borderColor: item.color + '50', backgroundColor: item.color + '15' }}>
                {item.step}
              </div>
              <p className="text-slate-500 text-xs hidden md:block">{item.desc}</p>
              {i < buildFlow.length - 1 && <span className="text-slate-600 text-lg">→</span>}
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <CommandTerminal commands={slashCommands} />
      </AnimatedSection>
    </PageWrapper>
  )
}
