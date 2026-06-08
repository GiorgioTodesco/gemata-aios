import type { KPIMetric, ChartDataPoint } from '../types'

export const kpiMetrics: KPIMetric[] = [
  { label: 'Macchine prodotte/mese', value: 142, unit: 'unità', trend: 'up', trendValue: 12, color: '#16a34a' },
  { label: 'Ticket service aperti', value: 23, unit: 'ticket', trend: 'down', trendValue: -8, color: '#2563eb' },
  { label: 'MTTR (tempo risoluzione)', value: 4.2, unit: 'ore', trend: 'down', trendValue: -15, color: '#7c3aed' },
  { label: 'Clienti attivi', value: 87, unit: 'aziende', trend: 'up', trendValue: 5, color: '#f59e0b' },
  { label: 'Fatturato YTD', value: 8.4, unit: 'M€', trend: 'up', trendValue: 18, color: '#ea580c' },
  { label: 'NPS score', value: 74, unit: 'punti', trend: 'stable', trendValue: 0, color: '#6b7280' },
]

export const monthlyChartData: ChartDataPoint[] = [
  { month: 'Gen', produzione: 118, service: 31, qualita: 96 },
  { month: 'Feb', produzione: 125, service: 28, qualita: 97 },
  { month: 'Mar', produzione: 134, service: 25, qualita: 97 },
  { month: 'Apr', produzione: 128, service: 29, qualita: 96 },
  { month: 'Mag', produzione: 138, service: 24, qualita: 98 },
  { month: 'Giu', produzione: 142, service: 23, qualita: 98 },
]

export const serviceByMachine = [
  { name: 'Innover Line', value: 38, fill: '#16a34a' },
  { name: 'Kingsfisher', value: 27, fill: '#2563eb' },
  { name: 'HV Series', value: 19, fill: '#7c3aed' },
  { name: 'Altro', value: 16, fill: '#6b7280' },
]
