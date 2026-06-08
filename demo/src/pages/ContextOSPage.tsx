import { useState } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { FileTree } from '../components/ui/FileTree'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { contextFileTree, claudeMdPreview } from '../data/gemata-context'
import type { FileNode } from '../types'

export function ContextOSPage() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const layer = LAYERS[0]

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2">
        <LayerBadge layer={layer} size="lg" />
      </div>
      <h1 className="text-3xl font-black text-white mb-2">Context Operating System</h1>
      <p className="text-slate-400 mb-8">
        La conoscenza del Gruppo Gemata caricata automaticamente in ogni sessione Claude Code.
        Ad ogni conversazione, Claude conosce già: prodotti, team, priorità, metriche service.
      </p>

      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* File Tree */}
          <div className="bg-[#0d0d1a] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-3 font-mono">📁 context/ — clicca per vedere il contenuto</p>
            <FileTree node={contextFileTree} onSelect={setSelectedFile} />
          </div>
          {/* File Preview */}
          <div className="bg-[#0d0d1a] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-3 font-mono">
              {selectedFile ? `📄 ${selectedFile.name}` : '📄 CLAUDE.md (preview)'}
            </p>
            <pre className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-72">
              {selectedFile?.content ?? claudeMdPreview}
            </pre>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="bg-green-950/40 border border-green-800/40 rounded-xl p-5">
          <h3 className="text-green-400 font-semibold mb-3">Come funziona il ContextOS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'CLAUDE.md caricato', desc: "Claude Code legge automaticamente CLAUDE.md all'avvio di ogni sessione" },
              { step: '2', title: 'Contesto iniettato', desc: 'Tutti i file context/ vengono inseriti nel contesto: prodotti, KPI, procedure service' },
              { step: '3', title: 'Claude conosce il business', desc: 'Ogni risposta è contestualizzata al Gruppo Gemata — zero ripetizioni session to session' },
            ].map(item => (
              <div key={item.step} className="flex gap-3">
                <span className="text-green-400 font-black text-lg shrink-0">{item.step}</span>
                <div>
                  <p className="text-slate-200 font-medium text-sm">{item.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
