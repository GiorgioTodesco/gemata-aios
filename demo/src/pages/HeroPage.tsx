import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'

export function HeroPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <div className="text-center py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8"
        >
          <span className="text-amber-400 text-sm font-medium">🤖 Powered by Claude Code + Superpowers</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-6xl font-black mb-4 tracking-tight"
        >
          <span className="text-white">GEMATA</span>{' '}
          <span className="text-amber-400">AIOS</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-slate-400 mb-2 max-w-2xl mx-auto"
        >
          AI Operating System per il Gruppo Gemata
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-500 mb-10 max-w-xl mx-auto"
        >
          5 layer intelligenti che trasformano Claude Code in un sistema operativo aziendale
          per Gemata SpA, Todesco Srl, Rollmac e COS.T.A.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link to="/architecture" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
            Esplora l'Architettura →
          </Link>
          <Link to="/report" className="border border-slate-600 hover:border-slate-400 text-slate-300 font-medium px-6 py-3 rounded-xl transition-colors">
            📄 Scarica Report PDF
          </Link>
        </motion.div>
      </div>

      {/* Layer overview */}
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {LAYERS.map(layer => (
            <Link key={layer.id} to={`/${layer.name.toLowerCase()}`}>
              <div
                className="rounded-xl p-4 border transition-all hover:scale-105 cursor-pointer"
                style={{ backgroundColor: layer.bgColor + 'aa', borderColor: layer.color + '60' }}
              >
                <LayerBadge layer={layer} size="sm" />
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{layer.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.3}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#2a2a4a] pt-12">
          {[
            { value: '5', label: 'Layer AIOS' },
            { value: '4', label: 'Aziende del Gruppo' },
            { value: '12', label: 'Settimane implementazione' },
            { value: '∞', label: 'Contesto aziendale caricato' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-amber-400 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
