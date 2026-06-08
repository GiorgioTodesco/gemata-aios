import { describe, it, expect } from 'vitest'
import { LAYERS } from './architecture'
import { kpiMetrics, monthlyChartData } from './kpi-data'
import { milestones } from './roadmap'
import { slashCommands } from './commands-data'
import { techStackCards } from './tech-stack'

describe('Data integrity', () => {
  it('LAYERS has exactly 5 items', () => {
    expect(LAYERS).toHaveLength(5)
    LAYERS.forEach((l, i) => expect(l.id).toBe(i + 1))
  })

  it('kpiMetrics all have valid trend values', () => {
    kpiMetrics.forEach(k => {
      expect(['up', 'down', 'stable']).toContain(k.trend)
    })
  })

  it('monthlyChartData has 6 months', () => {
    expect(monthlyChartData).toHaveLength(6)
  })

  it('milestones has 4 phases in order', () => {
    expect(milestones).toHaveLength(4)
    milestones.forEach((m, i) => expect(m.phase).toBe(i + 1))
  })

  it('slashCommands all have non-empty output', () => {
    slashCommands.forEach(c => {
      expect(c.output.length).toBeGreaterThan(10)
    })
  })

  it('techStackCards have valid categories', () => {
    const validCats = ['frontend', 'data', 'ai', 'infra']
    techStackCards.forEach(c => expect(validCats).toContain(c.category))
  })
})
