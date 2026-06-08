import type { Node, Edge } from '@xyflow/react'
import type { Layer } from '../types'

export const LAYERS: Layer[] = [
  { id: 1, name: 'ContextOS', fullName: 'Context Operating System', color: '#16a34a', bgColor: '#052e16', description: 'La conoscenza del Gruppo Gemata caricata in ogni sessione Claude', icon: 'Database' },
  { id: 2, name: 'DataOS', fullName: 'Data Operating System', color: '#2563eb', bgColor: '#1e3a8a', description: 'Pipeline Python → SQL → Markdown per KPI aggiornati in tempo reale', icon: 'BarChart3' },
  { id: 3, name: 'IntelOS', fullName: 'Intelligence Operating System', color: '#7c3aed', bgColor: '#3b0764', description: 'Meeting intelligence, comunicazioni, Telegram bot, market watch', icon: 'Brain' },
  { id: 4, name: 'AutomateOS', fullName: 'Automation Operating System', color: '#ea580c', bgColor: '#431407', description: 'Task audit, produttività 80/20, workflow automatici', icon: 'Zap' },
  { id: 5, name: 'Build', fullName: 'Build System', color: '#6b7280', bgColor: '#111827', description: 'Brainstorm → Explore → Spec → Implement con comandi slash', icon: 'Hammer' },
]

export const architectureNodes: Node[] = [
  {
    id: 'claude',
    type: 'default',
    position: { x: 340, y: 20 },
    data: { label: '🤖 CLAUDE CODE\nOrchestrator' },
    style: { background: '#1e1b4b', border: '2px solid #7c3aed', color: '#e2e8f0', borderRadius: 12, padding: 16, fontSize: 13, fontWeight: 700, width: 160 },
  },
  { id: 'l1', type: 'default', position: { x: 0, y: 140 }, data: { label: '🟢 Layer 1\nContextOS' }, style: { background: '#052e16', border: '2px solid #16a34a', color: '#bbf7d0', borderRadius: 10, padding: 12, fontSize: 12, width: 130 } },
  { id: 'l2', type: 'default', position: { x: 170, y: 140 }, data: { label: '🔵 Layer 2\nDataOS' }, style: { background: '#1e3a8a', border: '2px solid #2563eb', color: '#bfdbfe', borderRadius: 10, padding: 12, fontSize: 12, width: 130 } },
  { id: 'l3', type: 'default', position: { x: 340, y: 140 }, data: { label: '🟣 Layer 3\nIntelOS' }, style: { background: '#3b0764', border: '2px solid #7c3aed', color: '#e9d5ff', borderRadius: 10, padding: 12, fontSize: 12, width: 130 } },
  { id: 'l4', type: 'default', position: { x: 510, y: 140 }, data: { label: '🟠 Layer 4\nAutomate' }, style: { background: '#431407', border: '2px solid #ea580c', color: '#fed7aa', borderRadius: 10, padding: 12, fontSize: 12, width: 130 } },
  { id: 'l5', type: 'default', position: { x: 680, y: 140 }, data: { label: '⚫ Layer 5\nBuild' }, style: { background: '#111827', border: '2px solid #6b7280', color: '#d1d5db', borderRadius: 10, padding: 12, fontSize: 12, width: 130 } },
  { id: 'auto', type: 'default', position: { x: 170, y: 290 }, data: { label: '⚡ AUTOMATION LAYER\nCron jobs + Triggers' }, style: { background: '#1a1a2e', border: '1px solid #f59e0b', color: '#fcd34d', borderRadius: 8, padding: 10, fontSize: 11, width: 500 } },
]

export const architectureEdges: Edge[] = [
  { id: 'c-l1', source: 'claude', target: 'l1', animated: true, style: { stroke: '#16a34a' } },
  { id: 'c-l2', source: 'claude', target: 'l2', animated: true, style: { stroke: '#2563eb' } },
  { id: 'c-l3', source: 'claude', target: 'l3', animated: true, style: { stroke: '#7c3aed' } },
  { id: 'c-l4', source: 'claude', target: 'l4', animated: true, style: { stroke: '#ea580c' } },
  { id: 'c-l5', source: 'claude', target: 'l5', animated: true, style: { stroke: '#6b7280' } },
  { id: 'l1-auto', source: 'l1', target: 'auto', style: { stroke: '#374151' } },
  { id: 'l2-auto', source: 'l2', target: 'auto', style: { stroke: '#374151' } },
  { id: 'l4-auto', source: 'l4', target: 'auto', style: { stroke: '#374151' } },
]
