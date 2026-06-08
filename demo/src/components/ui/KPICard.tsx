import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { KPIMetric } from '../../types'

interface Props { metric: KPIMetric }

export function KPICard({ metric }: Props) {
  const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus
  const trendColor = metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 hover:border-[#3a3a5a] transition-colors">
      <p className="text-slate-400 text-xs mb-1">{metric.label}</p>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</span>
          <span className="text-slate-500 text-sm ml-1">{metric.unit}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
          <TrendIcon size={14} />
          <span>{metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%</span>
        </div>
      </div>
    </div>
  )
}
