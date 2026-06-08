import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { meetingNotes, marketIntel } from '../data/intel-data'

const layerColors: Record<string, string> = { strategy: '#f59e0b', tech: '#7c3aed', service: '#2563eb' }

export function IntelOSPage() {
  const layer = LAYERS[2]
  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2"><LayerBadge layer={layer} size="lg" /></div>
      <h1 className="text-3xl font-black text-white mb-2">Intelligence Operating System</h1>
      <p className="text-slate-400 mb-8">Meeting intelligence, comunicazioni, Telegram bot, market watch settoriale.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedSection>
          <h3 className="text-slate-300 font-semibold mb-3">📋 Meeting Notes processate da Claude</h3>
          <div className="space-y-3">
            {meetingNotes.map(note => (
              <div key={note.id} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-slate-200 text-sm font-medium">{note.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: layerColors[note.layer], backgroundColor: layerColors[note.layer] + '20' }}>{note.layer}</span>
                </div>
                <p className="text-slate-400 text-xs mb-2">{note.date} • {note.participants.join(', ')}</p>
                <p className="text-slate-300 text-xs mb-2">{note.summary}</p>
                <div className="space-y-0.5">
                  {note.actions.map((a, i) => <p key={i} className="text-slate-500 text-xs">→ {a}</p>)}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h3 className="text-slate-300 font-semibold mb-3">🌍 Market Intelligence</h3>
          <div className="space-y-3 mb-6">
            {marketIntel.map((item, i) => (
              <div key={i} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-3">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-slate-200 text-sm">{item.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.relevance === 'high' ? 'text-red-400 bg-red-900/30' : 'text-yellow-400 bg-yellow-900/30'}`}>{item.relevance}</span>
                </div>
                <p className="text-slate-500 text-xs">{item.date} • {item.source}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-950/40 border border-purple-800/40 rounded-xl p-4">
            <h4 className="text-purple-400 font-semibold text-sm mb-2">🤖 Telegram Bot AIOS</h4>
            <div className="space-y-2 font-mono text-xs">
              <p className="text-slate-400">🔵 <span className="text-slate-300">Giorgio:</span> Quanti ticket aperti questa settimana?</p>
              <p className="text-slate-400">🟢 <span className="text-green-400">AIOS:</span> 23 ticket aperti (-8% vs settimana scorsa). Top issue: Encoder KF series (38%). MTTR 4.2h.</p>
              <p className="text-slate-400">🔵 <span className="text-slate-300">Giorgio:</span> /service-report giugno</p>
              <p className="text-slate-400">🟢 <span className="text-green-400">AIOS:</span> Generando report... ✓ Inviato in PDF.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageWrapper>
  )
}
