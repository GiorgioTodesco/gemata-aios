import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { taskBoard, productivityStats } from '../data/automate-data'
import type { Task } from '../types'

const priorityColor: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#64748b' }
const statusBg: Record<string, string> = { 'todo': 'bg-slate-800', 'in-progress': 'bg-amber-900/40', 'done': 'bg-green-900/40' }
const statusText: Record<string, string> = { 'todo': 'text-slate-500', 'in-progress': 'text-amber-400', 'done': 'text-green-400' }

function TaskCard({ task }: { task: Task }) {
  return (
    <div className={`rounded-lg p-3 border border-[#2a2a4a] ${statusBg[task.status]}`}>
      <div className="flex items-start justify-between mb-1">
        <p className="text-slate-200 text-sm font-medium leading-tight">{task.title}</p>
        <span className="w-2 h-2 rounded-full mt-1 shrink-0 ml-2" style={{ backgroundColor: priorityColor[task.priority] }} />
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs ${statusText[task.status]}`}>{task.status}</span>
        <span className="text-xs text-slate-500">{task.assignee}</span>
      </div>
    </div>
  )
}

export function AutomatePage() {
  const layer = LAYERS[3]
  const todo = taskBoard.filter(t => t.status === 'todo')
  const inProgress = taskBoard.filter(t => t.status === 'in-progress')
  const done = taskBoard.filter(t => t.status === 'done')

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2"><LayerBadge layer={layer} size="lg" /></div>
      <h1 className="text-3xl font-black text-white mb-2">Automation Operating System</h1>
      <p className="text-slate-400 mb-8">Task audit, produttività 80/20, workflow automatici. Claude gestisce e prioritizza il lavoro del team.</p>

      <AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-orange-400">{productivityStats.automationRate}%</p>
            <p className="text-slate-500 text-xs mt-1">Task automatizzati</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-amber-400">{productivityStats.hoursSaved}h</p>
            <p className="text-slate-500 text-xs mt-1">Ore risparmiate/settimana</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-red-400">{productivityStats.highImpactTasks}</p>
            <p className="text-slate-500 text-xs mt-1">Task alto impatto (80/20)</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-slate-300">{productivityStats.totalTasks}</p>
            <p className="text-slate-500 text-xs mt-1">Task totali tracciati</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-3">📌 Todo ({todo.length})</p>
            <div className="space-y-2">{todo.map(t => <TaskCard key={t.id} task={t} />)}</div>
          </div>
          <div>
            <p className="text-amber-400 text-sm font-medium mb-3">⚡ In Progress ({inProgress.length})</p>
            <div className="space-y-2">{inProgress.map(t => <TaskCard key={t.id} task={t} />)}</div>
          </div>
          <div>
            <p className="text-green-400 text-sm font-medium mb-3">✅ Done ({done.length})</p>
            <div className="space-y-2">{done.map(t => <TaskCard key={t.id} task={t} />)}</div>
          </div>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
