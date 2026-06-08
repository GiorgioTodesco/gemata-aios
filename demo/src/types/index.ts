export interface Layer {
  id: number
  name: string
  fullName: string
  color: string
  bgColor: string
  description: string
  icon: string
}

export interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  content?: string
}

export interface KPIMetric {
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  trendValue: number
  color: string
}

export interface ChartDataPoint {
  month: string
  produzione: number
  service: number
  qualita: number
}

export interface MeetingNote {
  id: string
  date: string
  title: string
  participants: string[]
  summary: string
  actions: string[]
  layer: 'strategy' | 'tech' | 'service'
}

export interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'done'
  assignee: string
  layer: string
}

export interface SlashCommand {
  command: string
  description: string
  example: string
  output: string
  layer: number
}

export interface TechCard {
  name: string
  version: string
  purpose: string
  category: 'frontend' | 'data' | 'ai' | 'infra'
  url: string
}

export interface Milestone {
  phase: number
  title: string
  weeks: string
  items: string[]
  status: 'planned' | 'in-progress' | 'done'
  color: string
}
