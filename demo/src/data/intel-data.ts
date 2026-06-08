import type { MeetingNote } from '../types'

export const meetingNotes: MeetingNote[] = [
  {
    id: 'm1',
    date: '2026-06-06',
    title: 'Review Q2 Produzione — Todesco',
    participants: ['Giorgio', 'Marco (Ops)', 'Sara (QA)'],
    summary: 'Produzione Giugno sopra target +12%. Linea Innover ha raggiunto capacità massima. Discusso investimento nuova pressa per Q3.',
    actions: ['Valutare preventivo pressa entro 15/06', 'Aggiornare forecast Q3 in Statwatch', 'Meeting follow-up il 20/06'],
    layer: 'strategy',
  },
  {
    id: 'm2',
    date: '2026-06-04',
    title: 'Service Review — Cliente Couro Brasil',
    participants: ['Giorgio', 'Luca (Service)', 'Carlos (BR)'],
    summary: 'MTTR migliorato a 4.2h. Cliente soddisfatto dell\'intervento remoto su KF-2200. Richiesta upgrade firmware per 3 macchine.',
    actions: ['Preparare pacchetto firmware v2.4.1', 'Schedulare update remoto settimana prossima', 'Aggiornare SLA nel contratto'],
    layer: 'service',
  },
  {
    id: 'm3',
    date: '2026-06-02',
    title: 'Roadmap Statwatch MES v3.0',
    participants: ['Giorgio', 'Dev Team (3)', 'PM'],
    summary: 'Definite features prioritarie: dashboard real-time, API REST pubblica, integrazione Power BI. Sprint 1 inizia il 10/06.',
    actions: ['Setup repo GitHub per API', 'Definire schema OpenAPI 3.0', 'Demo prototipo dashboard entro 30/06'],
    layer: 'tech',
  },
]

export const marketIntel = [
  { date: '2026-06-07', source: 'APLF Hong Kong', title: 'Mercato pelle sintetica +23% in Asia nel 2026', relevance: 'high' },
  { date: '2026-06-05', source: 'UNIC Italy', title: 'Nuovi standard sostenibilità tanning EU — impatto produttori', relevance: 'medium' },
  { date: '2026-06-03', source: 'Lineapelle Preview', title: 'Tendenza: finitura effetto naturale in crescita per F/W 2027', relevance: 'medium' },
]
