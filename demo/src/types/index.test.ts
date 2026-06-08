import type { Layer, KPIMetric } from './index'

describe('Types smoke test', () => {
  it('Layer type has required fields', () => {
    const layer: Layer = {
      id: 1,
      name: 'ContextOS',
      fullName: 'Context Operating System',
      color: '#16a34a',
      bgColor: '#052e16',
      description: 'Business context loader',
      icon: 'Database',
    }
    expect(layer.id).toBe(1)
    expect(layer.name).toBe('ContextOS')
  })

  it('KPIMetric trend values are valid', () => {
    const kpi: KPIMetric = {
      label: 'Produzione mensile',
      value: 142,
      unit: 'macchine',
      trend: 'up',
      trendValue: 12,
      color: '#16a34a',
    }
    expect(['up', 'down', 'stable']).toContain(kpi.trend)
  })
})
