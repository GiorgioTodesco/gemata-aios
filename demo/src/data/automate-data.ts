import type { Task } from '../types'

export const taskBoard: Task[] = [
  { id: 't1', title: 'Preventivo cliente Fintex Turkey', priority: 'high', status: 'in-progress', assignee: 'Giorgio', layer: 'AutomateOS' },
  { id: 't2', title: 'Update firmware KF-2200 Couro Brasil', priority: 'high', status: 'todo', assignee: 'Luca', layer: 'AutomateOS' },
  { id: 't3', title: 'Schema OpenAPI Statwatch v3.0', priority: 'medium', status: 'in-progress', assignee: 'Dev Team', layer: 'Build' },
  { id: 't4', title: 'Report mensile produzione Giugno', priority: 'medium', status: 'done', assignee: 'Giorgio', layer: 'AutomateOS' },
  { id: 't5', title: 'Analisi mercato tessile Asia Q3', priority: 'low', status: 'todo', assignee: 'Giorgio', layer: 'IntelOS' },
  { id: 't6', title: 'Aggiornare catalogo Innover v4', priority: 'low', status: 'todo', assignee: 'Marketing', layer: 'ContextOS' },
]

export const productivityStats = {
  totalTasks: 24,
  automated: 14,
  automationRate: 58,
  hoursSaved: 12.5,
  highImpactTasks: 5,
}
