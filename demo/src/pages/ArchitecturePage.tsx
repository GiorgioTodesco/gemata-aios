import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { PageWrapper } from '../components/layout/PageWrapper'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LayerBadge } from '../components/ui/LayerBadge'
import { architectureNodes, architectureEdges, LAYERS } from '../data/architecture'

export function ArchitecturePage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-black text-white mb-2">Architettura AIOS</h1>
      <p className="text-slate-400 mb-8">5 layer orchestrati da Claude Code — clicca sui nodi per esplorare</p>

      {/* ReactFlow Diagram */}
      <AnimatedSection>
        <div className="h-96 rounded-xl border border-[#2a2a4a] bg-[#0d0d1a] overflow-hidden mb-10">
          <ReactFlow
            nodes={architectureNodes}
            edges={architectureEdges}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#2a2a4a" gap={20} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </AnimatedSection>

      {/* Layer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {LAYERS.map((layer, i) => (
          <AnimatedSection key={layer.id} delay={i * 0.1}>
            <div
              className="rounded-xl p-5 border h-full"
              style={{ backgroundColor: layer.bgColor + 'aa', borderColor: layer.color + '60' }}
            >
              <LayerBadge layer={layer} size="sm" />
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">{layer.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Automation Layer Banner */}
      <AnimatedSection delay={0.5} className="mt-6">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">
          <span className="text-amber-400 font-semibold">⚡ AUTOMATION LAYER</span>
          <p className="text-slate-400 text-sm mt-1">Cron jobs Python • Sync KPI giornaliero • Trigger meeting • Aggiornamento automatico ContextOS</p>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
