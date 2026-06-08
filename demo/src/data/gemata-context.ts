import type { FileNode } from '../types'

export const contextFileTree: FileNode = {
  name: 'context/',
  type: 'folder',
  children: [
    { name: 'CLAUDE.md', type: 'file', content: '# GEMATA GROUP — AI Operating System\n\nSei l\'AI strategico del Gruppo Gemata...' },
    { name: 'group-overview.md', type: 'file', content: '# Gruppo Gemata\n\n**Fondato:** 1972\n**Sede:** Trissino, Vicenza\n**Aziende:** Gemata SpA, Todesco Srl, Rollmac, COS.T.A., Gemata do Brasil...' },
    {
      name: 'companies/',
      type: 'folder',
      children: [
        { name: 'todesco.md', type: 'file', content: '# Todesco Srl\n\n**Focus:** Spraying Innovation\n**Prodotti:** Innover, Kingsfisher, HV-02, HV-03, Speedster 2.0, Statwatch MES' },
        { name: 'gemata-spa.md', type: 'file', content: '# Gemata SpA\n\n**Focus:** Leather finishing\n**Mercati:** Tanning globale, synthetics, textile' },
        { name: 'rollmac.md', type: 'file' },
        { name: 'costa.md', type: 'file' },
      ],
    },
    {
      name: 'service/',
      type: 'folder',
      children: [
        { name: 'machines-catalog.md', type: 'file' },
        { name: 'error-codes.md', type: 'file' },
        { name: 'maintenance-guide.md', type: 'file' },
      ],
    },
    {
      name: 'kpi/',
      type: 'folder',
      children: [
        { name: 'current-metrics.md', type: 'file', content: '# KPI Aggiornati — Giugno 2026\n\n**Produzione:** 142 macchine/mese\n**Service MTTR:** 4.2h\n**Clienti attivi:** 87' },
      ],
    },
  ],
}

export const claudeMdPreview = `# GEMATA GROUP — AI Operating System

> Ad ogni sessione conosci già: prodotti, team, priorità, metriche.

## Chi sei
Sei l'AI strategico del Gruppo Gemata — leader globale nelle tecnologie
di finitura superficiale (pelle, tessile, vetro, legno).

## Aziende del Gruppo
- **Gemata SpA** — Leather finishing systems (dal 1972)
- **Todesco Srl** — Spraying Innovation (Innover, Kingsfisher, Statwatch)
- **Rollmac** — Glass & technical materials finishing
- **COS.T.A.** — Custom finishing solutions

## Priorità Strategiche 2026
1. Integrazione AI nel workflow operativo (questo sistema)
2. Espansione mercato Asia-Pacific (tessile tecnico)
3. Sviluppo Statwatch MES v3.0

## Come rispondere
- Usa sempre il contesto aziendale caricato
- Per dati KPI, leggi \`/kpi/current-metrics.md\`
- Per service, consulta \`/service/error-codes.md\``
