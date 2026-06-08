import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { KPICard } from '../components/ui/KPICard'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { kpiMetrics, monthlyChartData, serviceByMachine } from '../data/kpi-data'

export function DataOSPage() {
  const layer = LAYERS[1]
  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2">
        <LayerBadge layer={layer} size="lg" />
      </div>
      <h1 className="text-3xl font-black text-white mb-2">Data Operating System</h1>
      <p className="text-slate-400 mb-8">
        Pipeline Python → SQL → Markdown. I KPI del Gruppo Gemata aggiornati ogni mattina,
        disponibili per Claude come file markdown strutturati.
      </p>

      {/* KPI Cards */}
      <AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {kpiMetrics.map(m => <KPICard key={m.label} metric={m} />)}
        </div>
      </AnimatedSection>

      {/* Charts */}
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Bar chart */}
          <div className="md:col-span-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-4">Produzione mensile (macchine)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 8, color: '#e2e8f0' }} />
                <Bar dataKey="produzione" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie chart */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-4">Service per linea</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={serviceByMachine} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {serviceByMachine.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 8, color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {serviceByMachine.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <span style={{ background: d.fill }} className="w-2 h-2 rounded-full inline-block" />
                    <span className="text-slate-400">{d.name}</span>
                  </span>
                  <span className="text-slate-300">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pipeline diagram */}
      <AnimatedSection delay={0.3}>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <p className="text-slate-400 text-sm mb-4">Pipeline DataOS — flusso dati</p>
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { label: 'Statwatch MES', color: '#2563eb' },
              { label: '→' },
              { label: 'Python Collector', color: '#7c3aed' },
              { label: '→' },
              { label: 'SQLite DB', color: '#16a34a' },
              { label: '→' },
              { label: 'key-metrics.md', color: '#f59e0b' },
              { label: '→' },
              { label: 'Claude Context', color: '#ea580c' },
            ].map((item, i) => (
              item.label === '→'
                ? <span key={i} className="text-slate-600 text-lg">→</span>
                : <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium border" style={{ color: item.color, borderColor: item.color + '50', backgroundColor: item.color + '15' }}>{item.label}</span>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-3">⏰ Aggiornamento automatico ogni mattina alle 07:00 via cron job Python</p>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
