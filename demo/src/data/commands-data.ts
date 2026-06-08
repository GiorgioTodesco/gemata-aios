import type { SlashCommand } from '../types'

export const slashCommands: SlashCommand[] = [
  {
    command: '/brainstorm',
    description: 'Ideazione strutturata su un tema aziendale',
    example: '/brainstorm "espansione mercato tessile Asia"',
    output: '**Analisi mercato:** Asia-Pacific rappresenta il 34% della crescita...\n**3 opzioni strategiche:**\n1. Partnership con distributore locale...\n2. Ufficio vendite Singapore...\n3. Agente esclusivo per paese...',
    layer: 5,
  },
  {
    command: '/service-report',
    description: 'Genera report service automatico da DataOS',
    example: '/service-report --period=giugno2026',
    output: '# Report Service — Giugno 2026\n\n**Ticket aperti:** 23 (-8% vs maggio)\n**MTTR medio:** 4.2h\n**Top issue:** Encoder KF series (38%)\n**Azioni consigliate:** Aggiornare firmware v2.4.1...',
    layer: 4,
  },
  {
    command: '/task-audit',
    description: 'Mappa e prioritizza tutti i task aperti',
    example: '/task-audit --week=current',
    output: '**Alta priorità (2):** Preventivo Fintex, Firmware KF-2200\n**Media priorità (2):** OpenAPI schema, Report mensile\n**80/20:** Focus sui 2 task ad alto impatto = 80% del valore questa settimana',
    layer: 4,
  },
  {
    command: '/spec',
    description: 'Crea specifica tecnica per un nuovo prodotto/feature',
    example: '/spec "Statwatch MES API REST v1"',
    output: '# Spec: Statwatch MES API REST v1\n\n**Obiettivo:** Esporre dati produzione via REST...\n**Endpoints:** GET /machines, GET /kpis, POST /alerts...\n**Auth:** Bearer token + rate limiting...',
    layer: 5,
  },
  {
    command: '/context-update',
    description: 'Aggiorna un file del ContextOS con nuove informazioni',
    example: '/context-update kpi/current-metrics.md',
    output: 'Leggo DataOS... ✓\nAggiorno metriche Giugno 2026... ✓\nFile salvato: context/kpi/current-metrics.md ✓\nCommit: "chore: update KPI metrics June 2026"',
    layer: 1,
  },
]
