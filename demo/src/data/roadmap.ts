import type { Milestone } from '../types'

export const milestones: Milestone[] = [
  {
    phase: 1,
    title: 'ContextOS + Web App Demo',
    weeks: 'Settimane 1–2',
    items: [
      'Setup repository GitHub gemata-aios',
      'CLAUDE.md Gemata Group completo',
      'Context files per tutte le aziende del gruppo',
      'Catalogo macchine e codici errore service',
      'Web App Demo (questo sito) — deploy su GitHub Pages',
    ],
    status: 'in-progress',
    color: '#16a34a',
  },
  {
    phase: 2,
    title: 'DataOS — Pipeline KPI',
    weeks: 'Settimane 3–5',
    items: [
      'Python collectors per Statwatch MES',
      'Aggregazione KPI produzione e service',
      'Database SQLite intermedio',
      'Export automatico markdown per Claude',
      'Scheduler giornaliero (cron job)',
    ],
    status: 'planned',
    color: '#2563eb',
  },
  {
    phase: 3,
    title: 'IntelOS — Intelligence Layer',
    weeks: 'Settimane 6–8',
    items: [
      'Meeting notes processor (Whisper + Claude)',
      'Telegram bot per query veloci da mobile',
      'Market intelligence scraper (tanning/textile)',
      'Skill personalizzate: summarize-meeting, competitor-watch',
    ],
    status: 'planned',
    color: '#7c3aed',
  },
  {
    phase: 4,
    title: 'AutomateOS + Build Layer',
    weeks: 'Settimane 9–12',
    items: [
      'Slash commands: /task-audit, /weekly-review, /service-report',
      'ProductivityOS 80/20 tracker',
      'Template engine documenti tecnici',
      'Build skill: /brainstorm, /spec, /implement',
      'Full integration test multi-layer',
    ],
    status: 'planned',
    color: '#ea580c',
  },
]
