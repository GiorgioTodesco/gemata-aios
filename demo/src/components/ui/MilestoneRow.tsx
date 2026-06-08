import { CheckCircle, Clock, Circle } from 'lucide-react'
import type { Milestone } from '../../types'

interface Props { milestone: Milestone }

const StatusIcon = ({ status }: { status: Milestone['status'] }) => {
  if (status === 'done') return <CheckCircle size={20} className="text-green-400 shrink-0" />
  if (status === 'in-progress') return <Clock size={20} className="text-amber-400 shrink-0 animate-pulse" />
  return <Circle size={20} className="text-slate-600 shrink-0" />
}

export function MilestoneRow({ milestone }: Props) {
  return (
    <div className="flex gap-4 pb-8 last:pb-0 relative">
      <div className="flex flex-col items-center">
        <StatusIcon status={milestone.status} />
        <div className="w-px flex-1 mt-2" style={{ backgroundColor: milestone.color + '40' }} />
      </div>
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="font-bold text-base" style={{ color: milestone.color }}>Fase {milestone.phase}: {milestone.title}</span>
            <p className="text-slate-500 text-xs mt-0.5">{milestone.weeks}</p>
          </div>
        </div>
        <ul className="space-y-1">
          {milestone.items.map((item, i) => (
            <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
              <span style={{ color: milestone.color }} className="mt-0.5 shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
