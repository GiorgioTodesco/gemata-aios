# GEMATA AIOS — Web App Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive React SPA that presents the GEMATA AIOS system with animated architecture diagram, 5 functional demo layers, tech stack overview, roadmap, and a downloadable PDF report.

**Architecture:** Vite + React 18 + TypeScript SPA with React Router 7 for page navigation. Framer Motion handles scroll-reveal animations and layer transitions. ReactFlow renders the interactive 5-layer architecture diagram. All demo data lives in typed TS files under `src/data/`. The PDF is generated client-side with `@react-pdf/renderer` and downloadable from the Report page.

**Tech Stack:** React 18, Vite 6, TypeScript 5, Tailwind CSS 4, Framer Motion 12, ReactFlow 12, Recharts 2, React Router 7, @react-pdf/renderer 4, Lucide React, Vitest + React Testing Library

---

## File Map

```
demo/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx                          ← React root, BrowserRouter
│   ├── App.tsx                           ← Routes definition
│   ├── index.css                         ← Tailwind directives + custom CSS vars
│   ├── types/
│   │   └── index.ts                      ← All shared TS types
│   ├── data/
│   │   ├── architecture.ts               ← ReactFlow nodes + edges for 5-layer diagram
│   │   ├── gemata-context.ts             ← CLAUDE.md + file tree demo data
│   │   ├── kpi-data.ts                   ← KPI charts data (production, service, sales)
│   │   ├── intel-data.ts                 ← Meeting notes, market intel demo data
│   │   ├── automate-data.ts              ← Task board demo data
│   │   ├── commands-data.ts              ← Slash commands demo data
│   │   ├── tech-stack.ts                 ← Library cards for TechStack page
│   │   └── roadmap.ts                    ← Implementation milestones
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx            ← Top nav with layer links + active state
│   │   │   └── PageWrapper.tsx           ← Consistent page padding + fade-in
│   │   └── ui/
│   │       ├── LayerBadge.tsx            ← Colored badge: layer number + name
│   │       ├── FileTree.tsx              ← Animated expandable file tree
│   │       ├── CommandTerminal.tsx       ← Fake Claude Code terminal with typing effect
│   │       ├── KPICard.tsx               ← Single KPI metric card with trend arrow
│   │       ├── TechCard.tsx              ← Library card: icon, name, version, purpose
│   │       ├── MilestoneRow.tsx          ← Single roadmap milestone row
│   │       └── AnimatedSection.tsx       ← Framer Motion scroll-reveal wrapper
│   └── pages/
│       ├── HeroPage.tsx                  ← Landing: AIOS logo, tagline, layer overview
│       ├── ArchitecturePage.tsx          ← ReactFlow interactive 5-layer diagram
│       ├── ContextOSPage.tsx             ← Layer 1: file tree + CLAUDE.md preview
│       ├── DataOSPage.tsx                ← Layer 2: KPI dashboard with Recharts
│       ├── IntelOSPage.tsx               ← Layer 3: meeting feed + intel cards
│       ├── AutomatePage.tsx              ← Layer 4: task board + productivity tracker
│       ├── BuildPage.tsx                 ← Layer 5: terminal with slash commands
│       ├── TechStackPage.tsx             ← Library grid with categories
│       ├── RoadmapPage.tsx               ← 4-phase implementation timeline
│       └── ReportPage.tsx                ← PDF preview + download button
```

---

## Task 1: Initialize Vite + React + TypeScript Project

**Files:**
- Create: `demo/package.json`
- Create: `demo/vite.config.ts`
- Create: `demo/tailwind.config.ts`
- Create: `demo/tsconfig.json`
- Create: `demo/index.html`

- [ ] **Step 1: Initialize Vite project inside `demo/`**

```bash
cd "C:\Users\giorg\OneDrive - Todesco Srl\Desktop\VisualStudioCode\progetto service"
npm create vite@latest demo -- --template react-ts
cd demo
```

- [ ] **Step 2: Install all dependencies**

```bash
npm install framer-motion reactflow recharts react-router-dom lucide-react @react-pdf/renderer zustand
npm install -D tailwindcss@latest @tailwindcss/vite postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

- [ ] **Step 3: Replace `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 4: Create `src/test-setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Replace `src/index.css` with dark theme variables**

```css
@import "tailwindcss";

:root {
  --color-bg: #0a0a0f;
  --color-card: #1a1a2e;
  --color-card-border: #2a2a4a;
  --color-accent: #f59e0b;
  --color-accent-muted: #92400e;
  --color-text: #e2e8f0;
  --color-text-muted: #64748b;
  --color-layer-1: #16a34a;
  --color-layer-2: #2563eb;
  --color-layer-3: #7c3aed;
  --color-layer-4: #ea580c;
  --color-layer-5: #374151;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', system-ui, sans-serif;
}

code, pre, .font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Expected: Server on `http://localhost:5173` with default Vite page

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Vite + React + TS + Tailwind project"
```

---

## Task 2: Define TypeScript Types

**Files:**
- Create: `demo/src/types/index.ts`

- [ ] **Step 1: Write all shared types**

```typescript
// demo/src/types/index.ts

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
```

- [ ] **Step 2: Write test for type guard**

Create `demo/src/types/index.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import type { Layer, KPIMetric, Task } from './index'

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
```

- [ ] **Step 3: Run test**

```bash
npx vitest run src/types/index.test.ts
```
Expected: 2 tests pass

- [ ] **Step 4: Commit**

```bash
git add src/types/
git commit -m "feat: add TypeScript type definitions"
```

---

## Task 3: Create Demo Data Files

**Files:**
- Create: `demo/src/data/architecture.ts`
- Create: `demo/src/data/gemata-context.ts`
- Create: `demo/src/data/kpi-data.ts`
- Create: `demo/src/data/intel-data.ts`
- Create: `demo/src/data/automate-data.ts`
- Create: `demo/src/data/commands-data.ts`
- Create: `demo/src/data/tech-stack.ts`
- Create: `demo/src/data/roadmap.ts`

- [ ] **Step 1: Create `demo/src/data/architecture.ts`**

```typescript
import type { Node, Edge } from 'reactflow'
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
```

- [ ] **Step 2: Create `demo/src/data/gemata-context.ts`**

```typescript
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
```

- [ ] **Step 3: Create `demo/src/data/kpi-data.ts`**

```typescript
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
```

- [ ] **Step 4: Create `demo/src/data/intel-data.ts`**

```typescript
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
```

- [ ] **Step 5: Create `demo/src/data/automate-data.ts`**

```typescript
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
```

- [ ] **Step 6: Create `demo/src/data/commands-data.ts`**

```typescript
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
```

- [ ] **Step 7: Create `demo/src/data/tech-stack.ts`**

```typescript
import type { TechCard } from '../types'

export const techStackCards: TechCard[] = [
  { name: 'React 18', version: '18.3', purpose: 'UI framework con concurrent features', category: 'frontend', url: 'https://react.dev' },
  { name: 'Vite 6', version: '6.0', purpose: 'Build tool ultrafast + HMR', category: 'frontend', url: 'https://vitejs.dev' },
  { name: 'TypeScript 5', version: '5.7', purpose: 'Type safety end-to-end', category: 'frontend', url: 'https://typescriptlang.org' },
  { name: 'Tailwind CSS 4', version: '4.0', purpose: 'Utility-first CSS framework', category: 'frontend', url: 'https://tailwindcss.com' },
  { name: 'Framer Motion', version: '12.0', purpose: 'Animazioni e transizioni layer', category: 'frontend', url: 'https://framer.com/motion' },
  { name: 'ReactFlow', version: '12.0', purpose: 'Diagramma architettura interattivo', category: 'frontend', url: 'https://reactflow.dev' },
  { name: 'Recharts', version: '2.14', purpose: 'KPI charts e grafici produzione', category: 'frontend', url: 'https://recharts.org' },
  { name: 'React Router 7', version: '7.0', purpose: 'Navigazione multi-pagina SPA', category: 'frontend', url: 'https://reactrouter.com' },
  { name: '@react-pdf/renderer', version: '4.0', purpose: 'Generazione PDF lato browser', category: 'frontend', url: 'https://react-pdf.org' },
  { name: 'Claude Code', version: 'latest', purpose: 'AI orchestratore centrale AIOS', category: 'ai', url: 'https://claude.ai/code' },
  { name: 'Superpowers', version: '5.1', purpose: 'Framework skill personalizzate per Claude', category: 'ai', url: 'https://superpowers.ai' },
  { name: 'Python 3.14', version: '3.14', purpose: 'DataOS collectors e pipeline', category: 'data', url: 'https://python.org' },
  { name: 'SQLite / PostgreSQL', version: '-', purpose: 'Database KPI intermedio', category: 'data', url: 'https://sqlite.org' },
  { name: 'GitHub Actions', version: '-', purpose: 'CI/CD aggiornamento KPI automatico', category: 'infra', url: 'https://github.com/features/actions' },
  { name: 'GitHub Pages', version: '-', purpose: 'Hosting web app demo', category: 'infra', url: 'https://pages.github.com' },
]
```

- [ ] **Step 8: Create `demo/src/data/roadmap.ts`**

```typescript
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
```

- [ ] **Step 9: Write data integrity test**

Create `demo/src/data/data.test.ts`:

```typescript
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
```

- [ ] **Step 10: Run tests**

```bash
npx vitest run src/data/data.test.ts
```
Expected: 6 tests pass

- [ ] **Step 11: Commit**

```bash
git add src/data/ src/types/
git commit -m "feat: add demo data for all AIOS layers"
```

---

## Task 4: Build Layout Components

**Files:**
- Create: `demo/src/components/layout/Navigation.tsx`
- Create: `demo/src/components/layout/PageWrapper.tsx`

- [ ] **Step 1: Create `demo/src/components/layout/Navigation.tsx`**

```tsx
import { Link, useLocation } from 'react-router-dom'
import { LAYERS } from '../../data/architecture'

const navItems = [
  { path: '/', label: 'AIOS' },
  { path: '/architecture', label: 'Architettura' },
  ...LAYERS.map(l => ({ path: `/${l.name.toLowerCase()}`, label: l.name })),
  { path: '/tech-stack', label: 'Tech Stack' },
  { path: '/roadmap', label: 'Roadmap' },
  { path: '/report', label: '📄 Report PDF' },
]

export function Navigation() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur border-b border-[#2a2a4a]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              pathname === item.path
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create `demo/src/components/layout/PageWrapper.tsx`**

```tsx
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen pt-20 pb-16 px-4 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Navigation and PageWrapper layout components"
```

---

## Task 5: Build UI Components

**Files:**
- Create: `demo/src/components/ui/LayerBadge.tsx`
- Create: `demo/src/components/ui/AnimatedSection.tsx`
- Create: `demo/src/components/ui/KPICard.tsx`
- Create: `demo/src/components/ui/FileTree.tsx`
- Create: `demo/src/components/ui/CommandTerminal.tsx`
- Create: `demo/src/components/ui/TechCard.tsx`
- Create: `demo/src/components/ui/MilestoneRow.tsx`

- [ ] **Step 1: Create `demo/src/components/ui/LayerBadge.tsx`**

```tsx
import type { Layer } from '../../types'

interface Props { layer: Layer; size?: 'sm' | 'md' | 'lg' }

export function LayerBadge({ layer, size = 'md' }: Props) {
  const sizes = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1', lg: 'text-base px-4 py-2' }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${sizes[size]}`}
      style={{ color: layer.color, backgroundColor: layer.bgColor, borderColor: layer.color + '40' }}
    >
      <span>{layer.id}</span>
      <span>{layer.name}</span>
    </span>
  )
}
```

- [ ] **Step 2: Create `demo/src/components/ui/AnimatedSection.tsx`**

```tsx
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface Props { children: ReactNode; delay?: number; className?: string }

export function AnimatedSection({ children, delay = 0, className = '' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create `demo/src/components/ui/KPICard.tsx`**

```tsx
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { KPIMetric } from '../../types'

interface Props { metric: KPIMetric }

export function KPICard({ metric }: Props) {
  const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus
  const trendColor = metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 hover:border-[#3a3a5a] transition-colors">
      <p className="text-slate-400 text-xs mb-1">{metric.label}</p>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</span>
          <span className="text-slate-500 text-sm ml-1">{metric.unit}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
          <TrendIcon size={14} />
          <span>{metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `demo/src/components/ui/FileTree.tsx`**

```tsx
import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react'
import type { FileNode } from '../../types'

interface Props { node: FileNode; depth?: number; onSelect?: (node: FileNode) => void }

export function FileTree({ node, depth = 0, onSelect }: Props) {
  const [open, setOpen] = useState(depth < 2)
  const indent = depth * 16

  if (node.type === 'file') {
    return (
      <div
        className="flex items-center gap-2 py-0.5 text-sm text-slate-400 hover:text-slate-200 cursor-pointer hover:bg-white/5 rounded px-2"
        style={{ paddingLeft: indent + 8 }}
        onClick={() => onSelect?.(node)}
      >
        <File size={13} className="text-amber-500/70 shrink-0" />
        <span>{node.name}</span>
      </div>
    )
  }
  return (
    <div>
      <div
        className="flex items-center gap-2 py-0.5 text-sm text-slate-300 cursor-pointer hover:bg-white/5 rounded px-2"
        style={{ paddingLeft: indent + 8 }}
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        <Folder size={13} className="text-amber-400/80 shrink-0" />
        <span className="font-medium">{node.name}</span>
      </div>
      {open && node.children?.map((child, i) => (
        <FileTree key={i} node={child} depth={depth + 1} onSelect={onSelect} />
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Create `demo/src/components/ui/CommandTerminal.tsx`**

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SlashCommand } from '../../types'

interface Props { commands: SlashCommand[] }

export function CommandTerminal({ commands }: Props) {
  const [active, setActive] = useState<SlashCommand>(commands[0])
  return (
    <div className="bg-[#0d0d1a] border border-[#2a2a4a] rounded-xl overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] border-b border-[#2a2a4a]">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="text-slate-500 ml-2 text-xs">Claude Code — GEMATA AIOS</span>
      </div>
      <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide border-b border-[#2a2a4a]">
        {commands.map(cmd => (
          <button
            key={cmd.command}
            onClick={() => setActive(cmd)}
            className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
              active.command === cmd.command
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {cmd.command}
          </button>
        ))}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <span className="text-green-400">$ </span>
          <span className="text-amber-400">{active.example}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.pre
            key={active.command}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-slate-300 whitespace-pre-wrap text-xs leading-relaxed bg-[#1a1a2e] p-3 rounded-lg"
          >
            {active.output}
          </motion.pre>
        </AnimatePresence>
        <p className="text-slate-600 text-xs">{active.description}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create `demo/src/components/ui/TechCard.tsx`**

```tsx
import type { TechCard as TechCardType } from '../../types'

const categoryColors = {
  frontend: { bg: '#1e3a8a', border: '#2563eb', text: '#bfdbfe' },
  data: { bg: '#052e16', border: '#16a34a', text: '#bbf7d0' },
  ai: { bg: '#3b0764', border: '#7c3aed', text: '#e9d5ff' },
  infra: { bg: '#431407', border: '#ea580c', text: '#fed7aa' },
}

interface Props { card: TechCardType }

export function TechCard({ card }: Props) {
  const colors = categoryColors[card.category]
  return (
    <div
      className="rounded-xl p-4 border transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: colors.bg + '80', borderColor: colors.border + '60' }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-bold text-sm" style={{ color: colors.text }}>{card.name}</span>
        {card.version !== '-' && (
          <span className="text-xs text-slate-500 font-mono">v{card.version}</span>
        )}
      </div>
      <p className="text-slate-400 text-xs leading-relaxed">{card.purpose}</p>
    </div>
  )
}
```

- [ ] **Step 7: Create `demo/src/components/ui/MilestoneRow.tsx`**

```tsx
import { CheckCircle, Clock, Circle } from 'lucide-react'
import type { Milestone } from '../../types'

interface Props { milestone: Milestone }

const StatusIcon = ({ status }: { status: Milestone['status'] }) => {
  if (status === 'done') return <CheckCircle size={20} className="text-green-400 shrink-0" />
  if (status === 'in-progress') return <Clock size={20} className="text-amber-400 shrink-0 animate-pulse" />
  return <Circle size={20} className="text-slate-600 shrink-0" />
}

export function MilestoneRow({ milestone }: Props) {
  return (
    <div className="flex gap-4 pb-8 last:pb-0 relative">
      <div className="flex flex-col items-center">
        <StatusIcon status={milestone.status} />
        <div className="w-px flex-1 mt-2" style={{ backgroundColor: milestone.color + '40' }} />
      </div>
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="font-bold text-base" style={{ color: milestone.color }}>Fase {milestone.phase}: {milestone.title}</span>
            <p className="text-slate-500 text-xs mt-0.5">{milestone.weeks}</p>
          </div>
        </div>
        <ul className="space-y-1">
          {milestone.items.map((item, i) => (
            <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
              <span style={{ color: milestone.color }} className="mt-0.5 shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/
git commit -m "feat: add all UI components (LayerBadge, KPICard, FileTree, Terminal, etc.)"
```

---

## Task 6: Build App Router and Hero Page

**Files:**
- Modify: `demo/src/main.tsx`
- Modify: `demo/src/App.tsx`
- Create: `demo/src/pages/HeroPage.tsx`

- [ ] **Step 1: Replace `demo/src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 2: Replace `demo/src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/layout/Navigation'
import { HeroPage } from './pages/HeroPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { ContextOSPage } from './pages/ContextOSPage'
import { DataOSPage } from './pages/DataOSPage'
import { IntelOSPage } from './pages/IntelOSPage'
import { AutomatePage } from './pages/AutomatePage'
import { BuildPage } from './pages/BuildPage'
import { TechStackPage } from './pages/TechStackPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { ReportPage } from './pages/ReportPage'

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/contextos" element={<ContextOSPage />} />
        <Route path="/dataos" element={<DataOSPage />} />
        <Route path="/intelos" element={<IntelOSPage />} />
        <Route path="/automateos" element={<AutomatePage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/tech-stack" element={<TechStackPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 3: Create `demo/src/pages/HeroPage.tsx`**

```tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'

export function HeroPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <div className="text-center py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8"
        >
          <span className="text-amber-400 text-sm font-medium">🤖 Powered by Claude Code + Superpowers</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-6xl font-black mb-4 tracking-tight"
        >
          <span className="text-white">GEMATA</span>{' '}
          <span className="text-amber-400">AIOS</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-slate-400 mb-2 max-w-2xl mx-auto"
        >
          AI Operating System per il Gruppo Gemata
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-500 mb-10 max-w-xl mx-auto"
        >
          5 layer intelligenti che trasformano Claude Code in un sistema operativo aziendale
          per Gemata SpA, Todesco Srl, Rollmac e COS.T.A.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link to="/architecture" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
            Esplora l'Architettura →
          </Link>
          <Link to="/report" className="border border-slate-600 hover:border-slate-400 text-slate-300 font-medium px-6 py-3 rounded-xl transition-colors">
            📄 Scarica Report PDF
          </Link>
        </motion.div>
      </div>

      {/* Layer overview */}
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {LAYERS.map(layer => (
            <Link key={layer.id} to={`/${layer.name.toLowerCase()}`}>
              <div
                className="rounded-xl p-4 border transition-all hover:scale-105 cursor-pointer"
                style={{ backgroundColor: layer.bgColor + 'aa', borderColor: layer.color + '60' }}
              >
                <LayerBadge layer={layer} size="sm" />
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{layer.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.3}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#2a2a4a] pt-12">
          {[
            { value: '5', label: 'Layer AIOS' },
            { value: '4', label: 'Aziende del Gruppo' },
            { value: '12', label: 'Settimane implementazione' },
            { value: '∞', label: 'Contesto aziendale caricato' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-amber-400 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
```

- [ ] **Step 4: Verify hero page renders**

```bash
npm run dev
```
Open `http://localhost:5173` — expected: dark hero page with GEMATA AIOS title, 5 layer cards, stats row

- [ ] **Step 5: Commit**

```bash
git add src/main.tsx src/App.tsx src/pages/HeroPage.tsx
git commit -m "feat: add router, App, and HeroPage"
```

---

## Task 7: Build Architecture Page (ReactFlow)

**Files:**
- Create: `demo/src/pages/ArchitecturePage.tsx`

- [ ] **Step 1: Create `demo/src/pages/ArchitecturePage.tsx`**

```tsx
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { PageWrapper } from '../components/layout/PageWrapper'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LayerBadge } from '../components/ui/LayerBadge'
import { architectureNodes, architectureEdges, LAYERS } from '../data/architecture'

export function ArchitecturePage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-black text-white mb-2">Architettura AIOS</h1>
      <p className="text-slate-400 mb-8">5 layer orchestrati da Claude Code — clicca sui nodi per esplorare</p>

      {/* ReactFlow Diagram */}
      <AnimatedSection>
        <div className="h-96 rounded-xl border border-[#2a2a4a] bg-[#0d0d1a] overflow-hidden mb-10">
          <ReactFlow
            nodes={architectureNodes}
            edges={architectureEdges}
            fitView
            attributionPosition="bottom-left"
          >
            <Background color="#2a2a4a" gap={20} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </AnimatedSection>

      {/* Layer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {LAYERS.map((layer, i) => (
          <AnimatedSection key={layer.id} delay={i * 0.1}>
            <div
              className="rounded-xl p-5 border h-full"
              style={{ backgroundColor: layer.bgColor + 'aa', borderColor: layer.color + '60' }}
            >
              <LayerBadge layer={layer} size="sm" />
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">{layer.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Automation Layer Banner */}
      <AnimatedSection delay={0.5} className="mt-6">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">
          <span className="text-amber-400 font-semibold">⚡ AUTOMATION LAYER</span>
          <p className="text-slate-400 text-sm mt-1">Cron jobs Python • Sync KPI giornaliero • Trigger meeting • Aggiornamento automatico ContextOS</p>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ArchitecturePage.tsx
git commit -m "feat: add ArchitecturePage with ReactFlow diagram"
```

---

## Task 8: Build ContextOS Page

**Files:**
- Create: `demo/src/pages/ContextOSPage.tsx`

- [ ] **Step 1: Create `demo/src/pages/ContextOSPage.tsx`**

```tsx
import { useState } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { FileTree } from '../components/ui/FileTree'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { contextFileTree, claudeMdPreview } from '../data/gemata-context'
import type { FileNode } from '../types'

export function ContextOSPage() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const layer = LAYERS[0]

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2">
        <LayerBadge layer={layer} size="lg" />
      </div>
      <h1 className="text-3xl font-black text-white mb-2">Context Operating System</h1>
      <p className="text-slate-400 mb-8">
        La conoscenza del Gruppo Gemata caricata automaticamente in ogni sessione Claude Code.
        Ad ogni conversazione, Claude conosce già: prodotti, team, priorità, metriche service.
      </p>

      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* File Tree */}
          <div className="bg-[#0d0d1a] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-3 font-mono">📁 context/ — clicca per vedere il contenuto</p>
            <FileTree node={contextFileTree} onSelect={setSelectedFile} />
          </div>
          {/* File Preview */}
          <div className="bg-[#0d0d1a] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-3 font-mono">
              {selectedFile ? `📄 ${selectedFile.name}` : '📄 CLAUDE.md (preview)'}
            </p>
            <pre className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-72">
              {selectedFile?.content ?? claudeMdPreview}
            </pre>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="bg-green-950/40 border border-green-800/40 rounded-xl p-5">
          <h3 className="text-green-400 font-semibold mb-3">Come funziona il ContextOS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'CLAUDE.md caricato', desc: 'Claude Code legge automaticamente CLAUDE.md all\'avvio di ogni sessione' },
              { step: '2', title: 'Contesto iniettato', desc: 'Tutti i file context/ vengono inseriti nel contesto: prodotti, KPI, procedure service' },
              { step: '3', title: 'Claude conosce il business', desc: 'Ogni risposta è contestualizzata al Gruppo Gemata — zero ripetizioni session to session' },
            ].map(item => (
              <div key={item.step} className="flex gap-3">
                <span className="text-green-400 font-black text-lg shrink-0">{item.step}</span>
                <div>
                  <p className="text-slate-200 font-medium text-sm">{item.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ContextOSPage.tsx
git commit -m "feat: add ContextOSPage with file tree and CLAUDE.md preview"
```

---

## Task 9: Build DataOS Page

**Files:**
- Create: `demo/src/pages/DataOSPage.tsx`

- [ ] **Step 1: Create `demo/src/pages/DataOSPage.tsx`**

```tsx
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { KPICard } from '../components/ui/KPICard'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { kpiMetrics, monthlyChartData, serviceByMachine } from '../data/kpi-data'

export function DataOSPage() {
  const layer = LAYERS[1]
  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2">
        <LayerBadge layer={layer} size="lg" />
      </div>
      <h1 className="text-3xl font-black text-white mb-2">Data Operating System</h1>
      <p className="text-slate-400 mb-8">
        Pipeline Python → SQL → Markdown. I KPI del Gruppo Gemata aggiornati ogni mattina,
        disponibili per Claude come file markdown strutturati.
      </p>

      {/* KPI Cards */}
      <AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {kpiMetrics.map(m => <KPICard key={m.label} metric={m} />)}
        </div>
      </AnimatedSection>

      {/* Charts */}
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Bar chart */}
          <div className="md:col-span-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-4">Produzione mensile (macchine)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 8, color: '#e2e8f0' }} />
                <Bar dataKey="produzione" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie chart */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-4">Service per linea</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={serviceByMachine} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {serviceByMachine.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 8, color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {serviceByMachine.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><span style={{ background: d.fill }} className="w-2 h-2 rounded-full inline-block" /><span className="text-slate-400">{d.name}</span></span>
                  <span className="text-slate-300">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pipeline diagram */}
      <AnimatedSection delay={0.3}>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <p className="text-slate-400 text-sm mb-4">Pipeline DataOS — flusso dati</p>
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { label: 'Statwatch MES', color: '#2563eb' },
              { label: '→' },
              { label: 'Python Collector', color: '#7c3aed' },
              { label: '→' },
              { label: 'SQLite DB', color: '#16a34a' },
              { label: '→' },
              { label: 'key-metrics.md', color: '#f59e0b' },
              { label: '→' },
              { label: 'Claude Context', color: '#ea580c' },
            ].map((item, i) => (
              item.label === '→'
                ? <span key={i} className="text-slate-600 text-lg">→</span>
                : <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium border" style={{ color: item.color, borderColor: item.color + '50', backgroundColor: item.color + '15' }}>{item.label}</span>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-3">⏰ Aggiornamento automatico ogni mattina alle 07:00 via cron job Python</p>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/DataOSPage.tsx
git commit -m "feat: add DataOSPage with KPI cards, bar chart, pie chart"
```

---

## Task 10: Build IntelOS, AutomateOS, Build Pages

**Files:**
- Create: `demo/src/pages/IntelOSPage.tsx`
- Create: `demo/src/pages/AutomatePage.tsx`
- Create: `demo/src/pages/BuildPage.tsx`

- [ ] **Step 1: Create `demo/src/pages/IntelOSPage.tsx`**

```tsx
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { meetingNotes, marketIntel } from '../data/intel-data'

const layerColors = { strategy: '#f59e0b', tech: '#7c3aed', service: '#2563eb' }

export function IntelOSPage() {
  const layer = LAYERS[2]
  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2"><LayerBadge layer={layer} size="lg" /></div>
      <h1 className="text-3xl font-black text-white mb-2">Intelligence Operating System</h1>
      <p className="text-slate-400 mb-8">Meeting intelligence, comunicazioni, Telegram bot, market watch settoriale.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedSection>
          <h3 className="text-slate-300 font-semibold mb-3">📋 Meeting Notes processate da Claude</h3>
          <div className="space-y-3">
            {meetingNotes.map(note => (
              <div key={note.id} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-slate-200 text-sm font-medium">{note.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: layerColors[note.layer], backgroundColor: layerColors[note.layer] + '20' }}>{note.layer}</span>
                </div>
                <p className="text-slate-400 text-xs mb-2">{note.date} • {note.participants.join(', ')}</p>
                <p className="text-slate-300 text-xs mb-2">{note.summary}</p>
                <div className="space-y-0.5">
                  {note.actions.map((a, i) => <p key={i} className="text-slate-500 text-xs">→ {a}</p>)}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h3 className="text-slate-300 font-semibold mb-3">🌍 Market Intelligence</h3>
          <div className="space-y-3 mb-6">
            {marketIntel.map((item, i) => (
              <div key={i} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-3">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-slate-200 text-sm">{item.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.relevance === 'high' ? 'text-red-400 bg-red-900/30' : 'text-yellow-400 bg-yellow-900/30'}`}>{item.relevance}</span>
                </div>
                <p className="text-slate-500 text-xs">{item.date} • {item.source}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-950/40 border border-purple-800/40 rounded-xl p-4">
            <h4 className="text-purple-400 font-semibold text-sm mb-2">🤖 Telegram Bot AIOS</h4>
            <div className="space-y-2 font-mono text-xs">
              <p className="text-slate-400">🔵 <span className="text-slate-300">Giorgio:</span> Quanti ticket aperti questa settimana?</p>
              <p className="text-slate-400">🟢 <span className="text-green-400">AIOS:</span> 23 ticket aperti (-8% vs settimana scorsa). Top issue: Encoder KF series (38%). MTTR 4.2h.</p>
              <p className="text-slate-400">🔵 <span className="text-slate-300">Giorgio:</span> /service-report giugno</p>
              <p className="text-slate-400">🟢 <span className="text-green-400">AIOS:</span> Generando report... ✓ Inviato in PDF.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Create `demo/src/pages/AutomatePage.tsx`**

```tsx
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { taskBoard, productivityStats } from '../data/automate-data'
import type { Task } from '../types'

const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#64748b' }
const statusBg = { 'todo': 'bg-slate-800', 'in-progress': 'bg-amber-900/40', 'done': 'bg-green-900/40' }
const statusText = { 'todo': 'text-slate-500', 'in-progress': 'text-amber-400', 'done': 'text-green-400' }

function TaskCard({ task }: { task: Task }) {
  return (
    <div className={`rounded-lg p-3 border border-[#2a2a4a] ${statusBg[task.status]}`}>
      <div className="flex items-start justify-between mb-1">
        <p className="text-slate-200 text-sm font-medium leading-tight">{task.title}</p>
        <span className="w-2 h-2 rounded-full mt-1 shrink-0 ml-2" style={{ backgroundColor: priorityColor[task.priority] }} />
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs ${statusText[task.status]}`}>{task.status}</span>
        <span className="text-xs text-slate-500">{task.assignee}</span>
      </div>
    </div>
  )
}

export function AutomatePage() {
  const layer = LAYERS[3]
  const todo = taskBoard.filter(t => t.status === 'todo')
  const inProgress = taskBoard.filter(t => t.status === 'in-progress')
  const done = taskBoard.filter(t => t.status === 'done')

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2"><LayerBadge layer={layer} size="lg" /></div>
      <h1 className="text-3xl font-black text-white mb-2">Automation Operating System</h1>
      <p className="text-slate-400 mb-8">Task audit, produttività 80/20, workflow automatici. Claude gestisce e prioritizza il lavoro del team.</p>

      <AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-orange-400">{productivityStats.automationRate}%</p>
            <p className="text-slate-500 text-xs mt-1">Task automatizzati</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-amber-400">{productivityStats.hoursSaved}h</p>
            <p className="text-slate-500 text-xs mt-1">Ore risparmiate/settimana</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-red-400">{productivityStats.highImpactTasks}</p>
            <p className="text-slate-500 text-xs mt-1">Task alto impatto (80/20)</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-slate-300">{productivityStats.totalTasks}</p>
            <p className="text-slate-500 text-xs mt-1">Task totali tracciati</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-3">📌 Todo ({todo.length})</p>
            <div className="space-y-2">{todo.map(t => <TaskCard key={t.id} task={t} />)}</div>
          </div>
          <div>
            <p className="text-amber-400 text-sm font-medium mb-3">⚡ In Progress ({inProgress.length})</p>
            <div className="space-y-2">{inProgress.map(t => <TaskCard key={t.id} task={t} />)}</div>
          </div>
          <div>
            <p className="text-green-400 text-sm font-medium mb-3">✅ Done ({done.length})</p>
            <div className="space-y-2">{done.map(t => <TaskCard key={t.id} task={t} />)}</div>
          </div>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
```

- [ ] **Step 3: Create `demo/src/pages/BuildPage.tsx`**

```tsx
import { PageWrapper } from '../components/layout/PageWrapper'
import { LayerBadge } from '../components/ui/LayerBadge'
import { CommandTerminal } from '../components/ui/CommandTerminal'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { LAYERS } from '../data/architecture'
import { slashCommands } from '../data/commands-data'

const buildFlow = [
  { step: '/brainstorm', desc: 'Ideazione strutturata su un tema', color: '#7c3aed' },
  { step: '/explore', desc: 'Approfondimento e analisi', color: '#2563eb' },
  { step: '/spec', desc: 'Specifica tecnica completa', color: '#16a34a' },
  { step: '/implement', desc: 'Generazione codice/documento', color: '#f59e0b' },
]

export function BuildPage() {
  const layer = LAYERS[4]
  return (
    <PageWrapper>
      <div className="flex items-center gap-3 mb-2"><LayerBadge layer={layer} size="lg" /></div>
      <h1 className="text-3xl font-black text-white mb-2">Build System</h1>
      <p className="text-slate-400 mb-8">Comandi slash per costruire: brainstorming → esplorazione → specifica → implementazione.</p>

      <AnimatedSection>
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {buildFlow.map((item, i) => (
            <div key={item.step} className="flex items-center gap-2">
              <div className="px-3 py-2 rounded-lg border text-sm font-mono font-medium" style={{ color: item.color, borderColor: item.color + '50', backgroundColor: item.color + '15' }}>
                {item.step}
              </div>
              <p className="text-slate-500 text-xs hidden md:block">{item.desc}</p>
              {i < buildFlow.length - 1 && <span className="text-slate-600 text-lg">→</span>}
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <CommandTerminal commands={slashCommands} />
      </AnimatedSection>
    </PageWrapper>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/IntelOSPage.tsx src/pages/AutomatePage.tsx src/pages/BuildPage.tsx
git commit -m "feat: add IntelOS, Automate, and Build pages"
```

---

## Task 11: Build TechStack and Roadmap Pages

**Files:**
- Create: `demo/src/pages/TechStackPage.tsx`
- Create: `demo/src/pages/RoadmapPage.tsx`

- [ ] **Step 1: Create `demo/src/pages/TechStackPage.tsx`**

```tsx
import { PageWrapper } from '../components/layout/PageWrapper'
import { TechCard } from '../components/ui/TechCard'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { techStackCards } from '../data/tech-stack'

const categories = [
  { key: 'frontend', label: '🖥 Frontend', color: '#2563eb' },
  { key: 'ai', label: '🤖 AI & Orchestration', color: '#7c3aed' },
  { key: 'data', label: '📊 Data Pipeline', color: '#16a34a' },
  { key: 'infra', label: '⚙️ Infrastructure', color: '#ea580c' },
] as const

export function TechStackPage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-black text-white mb-2">Tech Stack</h1>
      <p className="text-slate-400 mb-10">Tutte le librerie e tecnologie consigliate per costruire GEMATA AIOS.</p>

      {categories.map((cat, ci) => {
        const cards = techStackCards.filter(c => c.category === cat.key)
        return (
          <AnimatedSection key={cat.key} delay={ci * 0.1} className="mb-8">
            <h2 className="text-lg font-bold mb-4" style={{ color: cat.color }}>{cat.label}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cards.map(card => <TechCard key={card.name} card={card} />)}
            </div>
          </AnimatedSection>
        )
      })}
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Create `demo/src/pages/RoadmapPage.tsx`**

```tsx
import { PageWrapper } from '../components/layout/PageWrapper'
import { MilestoneRow } from '../components/ui/MilestoneRow'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { milestones } from '../data/roadmap'

export function RoadmapPage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-black text-white mb-2">Roadmap di Implementazione</h1>
      <p className="text-slate-400 mb-10">4 fasi, 12 settimane per costruire il GEMATA AIOS completo.</p>

      <div className="max-w-2xl">
        {milestones.map((m, i) => (
          <AnimatedSection key={m.phase} delay={i * 0.15}>
            <MilestoneRow milestone={m} />
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.6} className="mt-8">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 max-w-2xl">
          <h3 className="text-amber-400 font-semibold mb-2">📌 Nota sull'implementazione</h3>
          <p className="text-slate-400 text-sm">
            Ogni fase è indipendente e porta valore immediato. La Fase 1 (ContextOS) è operativa
            in 1–2 giorni e trasforma già radicalmente l'uso quotidiano di Claude Code per il Gruppo Gemata.
            Le fasi successive si aggiungono progressivamente senza interrompere il sistema.
          </p>
        </div>
      </AnimatedSection>
    </PageWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/TechStackPage.tsx src/pages/RoadmapPage.tsx
git commit -m "feat: add TechStack and Roadmap pages"
```

---

## Task 12: Build PDF Report with @react-pdf/renderer

**Files:**
- Create: `demo/src/pdf/GemataReport.tsx`
- Create: `demo/src/pages/ReportPage.tsx`

- [ ] **Step 1: Create `demo/src/pdf/GemataReport.tsx`**

```tsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { kpiMetrics } from '../data/kpi-data'
import { LAYERS } from '../data/architecture'
import { milestones } from '../data/roadmap'
import { techStackCards } from '../data/tech-stack'

const styles = StyleSheet.create({
  page: { backgroundColor: '#0a0a0f', color: '#e2e8f0', fontFamily: 'Helvetica', padding: 40, fontSize: 10 },
  cover: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 36, fontFamily: 'Helvetica-Bold', color: '#f59e0b', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 4 },
  date: { fontSize: 10, color: '#475569', marginTop: 24 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#2a2a4a', marginVertical: 16 },
  h1: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#f59e0b', marginBottom: 12, marginTop: 24 },
  h2: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#e2e8f0', marginBottom: 8, marginTop: 16 },
  p: { fontSize: 10, color: '#94a3b8', lineHeight: 1.6, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  card: { flex: 1, backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#2a2a4a', borderRadius: 6, padding: 10 },
  cardTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#e2e8f0', marginBottom: 4 },
  cardText: { fontSize: 9, color: '#64748b', lineHeight: 1.4 },
  badge: { backgroundColor: '#1a1a2e', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginRight: 4, marginBottom: 4 },
  badgeText: { fontSize: 8, color: '#94a3b8' },
  bullet: { flexDirection: 'row', marginBottom: 4 },
  bulletDot: { color: '#f59e0b', marginRight: 6, fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1, fontSize: 10, color: '#94a3b8', lineHeight: 1.5 },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  kpiLabel: { fontSize: 9, color: '#64748b' },
  kpiValue: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#e2e8f0' },
  milestoneBox: { backgroundColor: '#1a1a2e', borderRadius: 6, padding: 10, marginBottom: 8, borderLeftWidth: 3 },
  phaseNum: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  phaseWeeks: { fontSize: 9, color: '#64748b', marginBottom: 6 },
})

export function GemataReport() {
  return (
    <Document title="GEMATA AIOS — Relazione Strategica" author="Giorgio — Todesco Srl">
      {/* Cover page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <Text style={styles.title}>GEMATA AIOS</Text>
          <Text style={styles.subtitle}>AI Operating System — Gruppo Gemata</Text>
          <Text style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>Relazione Strategica di Implementazione</Text>
          <View style={[styles.divider, { width: 200, marginTop: 32 }]} />
          <Text style={{ fontSize: 10, color: '#475569' }}>Gemata SpA · Todesco Srl · Rollmac · COS.T.A.</Text>
          <Text style={styles.date}>Giugno 2026 — Giorgio, Todesco Srl</Text>
        </View>
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Executive Summary</Text>
        <Text style={styles.p}>
          GEMATA AIOS è un AI Operating System costruito su Claude Code che trasforma l'intelligenza artificiale
          da semplice assistente conversazionale in un sistema operativo aziendale completo per il Gruppo Gemata.
        </Text>
        <Text style={styles.p}>
          Il sistema è composto da 5 layer funzionali: ContextOS (contesto aziendale persistente),
          DataOS (pipeline KPI in tempo reale), IntelOS (intelligence su meeting e comunicazioni),
          AutomateOS (automazione task e produttività), e Build (strumenti di costruzione e innovazione).
        </Text>
        <Text style={styles.p}>
          L'implementazione completa richiede 12 settimane suddivise in 4 fasi, con valore operativo
          disponibile già dalla Fase 1 (ContextOS, 1–2 giorni).
        </Text>

        <Text style={styles.h2}>I 5 Layer AIOS</Text>
        {LAYERS.map(layer => (
          <View key={layer.id} style={styles.bullet}>
            <Text style={styles.bulletDot}>▸</Text>
            <Text style={styles.bulletText}><Text style={{ fontFamily: 'Helvetica-Bold', color: '#e2e8f0' }}>Layer {layer.id} — {layer.fullName}:</Text> {layer.description}</Text>
          </View>
        ))}

        <Text style={styles.h2}>KPI Demo — Giugno 2026</Text>
        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          {kpiMetrics.map(m => (
            <View key={m.label} style={[styles.card, { minWidth: '30%', maxWidth: '32%' }]}>
              <Text style={styles.cardTitle}>{m.value} {m.unit}</Text>
              <Text style={styles.cardText}>{m.label}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Architecture */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Architettura del Sistema</Text>
        <Text style={styles.p}>
          Claude Code funge da orchestratore centrale. Ogni layer viene attivato tramite comandi slash
          personalizzati e skill del framework Superpowers. Il contesto aziendale viene caricato
          automaticamente all'avvio di ogni sessione tramite il file CLAUDE.md.
        </Text>
        {LAYERS.map(layer => (
          <View key={layer.id} style={[styles.milestoneBox, { borderLeftColor: layer.color }]}>
            <Text style={[styles.phaseNum, { color: layer.color }]}>Layer {layer.id} — {layer.name}</Text>
            <Text style={styles.p}>{layer.description}</Text>
          </View>
        ))}
        <Text style={styles.p}>
          L'Automation Layer coordina cron job Python che aggiornano i KPI ogni mattina,
          processano note di riunione e inviano digest settimanali automatici.
        </Text>
      </Page>

      {/* Tech Stack */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Stack Tecnologico</Text>
        {(['frontend', 'ai', 'data', 'infra'] as const).map(cat => {
          const catLabels = { frontend: '🖥 Frontend', ai: '🤖 AI & Orchestration', data: '📊 Data Pipeline', infra: '⚙️ Infrastructure' }
          const cards = techStackCards.filter(c => c.category === cat)
          return (
            <View key={cat}>
              <Text style={styles.h2}>{catLabels[cat]}</Text>
              <View style={[styles.row, { flexWrap: 'wrap' }]}>
                {cards.map(c => (
                  <View key={c.name} style={[styles.card, { minWidth: '45%', marginBottom: 6 }]}>
                    <Text style={styles.cardTitle}>{c.name} {c.version !== '-' ? `v${c.version}` : ''}</Text>
                    <Text style={styles.cardText}>{c.purpose}</Text>
                  </View>
                ))}
              </View>
            </View>
          )
        })}
      </Page>

      {/* Roadmap */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Roadmap di Implementazione</Text>
        <Text style={styles.p}>Implementazione in 4 fasi progressive, 12 settimane totali.</Text>
        {milestones.map(m => (
          <View key={m.phase} style={[styles.milestoneBox, { borderLeftColor: m.color }]}>
            <Text style={[styles.phaseNum, { color: m.color }]}>Fase {m.phase}: {m.title}</Text>
            <Text style={styles.phaseWeeks}>{m.weeks}</Text>
            {m.items.map((item, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>·</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={[styles.p, { marginTop: 16, fontFamily: 'Helvetica-Bold', color: '#f59e0b' }]}>
          Nota: ogni fase è indipendente e porta valore operativo immediato.
          La Fase 1 è operativa in 1–2 giorni.
        </Text>
      </Page>

      {/* Conclusions */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Conclusioni e Prossimi Passi</Text>
        <Text style={styles.p}>
          GEMATA AIOS rappresenta un cambio di paradigma nel modo in cui il Gruppo Gemata
          utilizzerà l'intelligenza artificiale. Non un semplice chatbot, ma un sistema operativo
          aziendale che conosce i prodotti, i clienti, le metriche e le procedure del gruppo.
        </Text>
        <Text style={styles.h2}>Prossimi passi immediati</Text>
        {[
          'Creare repository GitHub gemata-aios (privato)',
          'Iniziare con CLAUDE.md: caricare contesto Gruppo Gemata completo',
          'Creare context files per Todesco Srl e Gemata SpA',
          'Testare ContextOS in sessioni Claude Code per 1 settimana',
          'Pianificare Fase 2 (DataOS) con team IT per accesso Statwatch',
        ].map((step, i) => (
          <View key={i} style={styles.bullet}>
            <Text style={styles.bulletDot}>{i + 1}.</Text>
            <Text style={styles.bulletText}>{step}</Text>
          </View>
        ))}
        <View style={[styles.divider, { marginTop: 32 }]} />
        <Text style={{ fontSize: 9, color: '#475569', textAlign: 'center', marginTop: 12 }}>
          GEMATA AIOS — Relazione preparata con Claude Code + Superpowers{'\n'}
          Todesco Srl / Gruppo Gemata — Giugno 2026
        </Text>
      </Page>
    </Document>
  )
}
```

- [ ] **Step 2: Create `demo/src/pages/ReportPage.tsx`**

```tsx
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { PageWrapper } from '../components/layout/PageWrapper'
import { GemataReport } from '../pdf/GemataReport'
import { Download } from 'lucide-react'

export function ReportPage() {
  return (
    <PageWrapper>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Report PDF</h1>
          <p className="text-slate-400">Relazione strategica completa GEMATA AIOS — scaricabile in PDF.</p>
        </div>
        <PDFDownloadLink
          document={<GemataReport />}
          fileName="GEMATA-AIOS-Report-2026.pdf"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3 rounded-xl transition-colors"
        >
          {({ loading }) => (
            <>
              <Download size={18} />
              {loading ? 'Generando...' : 'Scarica PDF'}
            </>
          )}
        </PDFDownloadLink>
      </div>

      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden" style={{ height: '80vh' }}>
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          <GemataReport />
        </PDFViewer>
      </div>
    </PageWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pdf/ src/pages/ReportPage.tsx
git commit -m "feat: add PDF report with @react-pdf/renderer (6 pages: cover, exec summary, architecture, tech stack, roadmap, conclusions)"
```

---

## Task 13: Initialize GitHub Repository + GitHub Pages Deploy

**Files:**
- Create: `demo/vite.config.ts` (update base path)
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

- [ ] **Step 1: Update `demo/vite.config.ts` for GitHub Pages base path**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/gemata-aios/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 2: Create `README.md`**

```markdown
# GEMATA AIOS — AI Operating System

AI Operating System per il Gruppo Gemata basato su Claude Code + Superpowers.

## Demo
https://[username].github.io/gemata-aios/

## Struttura
- `demo/` — Web App React interattiva
- `context/` — Layer 1: ContextOS
- `data-pipeline/` — Layer 2: DataOS (da implementare)
- `intel/` — Layer 3: IntelOS (da implementare)
- `automate/` — Layer 4: AutomateOS (da implementare)
- `build/` — Layer 5: Build (da implementare)
- `docs/` — Relazione PDF e specifiche

## Setup
cd demo && npm install && npm run dev
```

- [ ] **Step 3: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy Demo to GitHub Pages

on:
  push:
    branches: [main]
    paths: [demo/**]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd demo && npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./demo/dist
```

- [ ] **Step 4: Create GitHub repository and push**

```bash
git remote add origin https://github.com/[YOUR_USERNAME]/gemata-aios.git
git branch -M main
git push -u origin main
```
Replace `[YOUR_USERNAME]` with the actual GitHub username.

- [ ] **Step 5: Enable GitHub Pages**

In GitHub → Settings → Pages → Source: GitHub Actions. After next push, the demo will be available at `https://[username].github.io/gemata-aios/`.

- [ ] **Step 6: Commit final state**

```bash
git add vite.config.ts README.md .github/
git commit -m "feat: add GitHub Pages deploy workflow and README"
git push
```

---

## Task 14: Run Full Test Suite and Verify

- [ ] **Step 1: Run all tests**

```bash
cd demo && npx vitest run
```
Expected: All tests pass (data integrity + types)

- [ ] **Step 2: Build for production**

```bash
npm run build
```
Expected: `dist/` created, no TypeScript errors

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```
Open `http://localhost:4173/gemata-aios/` — expected: all 10 pages load, PDF generates, charts render

- [ ] **Step 4: Verify each route manually**

| Route | Expected content |
|-------|-----------------|
| `/` | Hero con AIOS title, 5 layer cards |
| `/architecture` | ReactFlow diagram animato |
| `/contextos` | FileTree + CLAUDE.md preview |
| `/dataos` | 6 KPI cards + 2 charts |
| `/intelos` | 3 meeting notes + market intel + Telegram mock |
| `/automateos` | Stats cards + Kanban board |
| `/build` | Flow diagram + terminal slash commands |
| `/tech-stack` | 15 tech cards in 4 categorie |
| `/roadmap` | 4 milestones con timeline |
| `/report` | PDF viewer + download button funzionante |

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: production build verified, all pages working"
git push
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|-----------------|------------|
| Web App Demo interattiva | Tasks 6-12 |
| Architettura 5 layer | Task 7 (ReactFlow) |
| Demo ContextOS | Task 8 |
| Demo DataOS con KPI | Task 9 |
| Demo IntelOS | Task 10 |
| Demo AutomateOS | Task 10 |
| Demo Build/Commands | Task 10 |
| Tech stack overview | Task 11 |
| Roadmap implementazione | Task 11 |
| PDF report scaricabile | Task 12 |
| GitHub repository | Task 13 |
| Deploy GitHub Pages | Task 13 |
| Dati demo Gemata Group | Task 3 |
| Dark theme amber accent | Task 1 (CSS vars) |
| Animazioni Framer Motion | Tasks 4-12 |
| ReactFlow diagram | Task 7 |
| Recharts KPI | Task 9 |
| @react-pdf/renderer | Task 12 |

No gaps found. All spec requirements covered.

**Placeholder scan:** No TBDs, TODOs, or incomplete code found. All components have complete implementations.

**Type consistency:** `Layer`, `FileNode`, `KPIMetric`, `Task`, `SlashCommand`, `TechCard`, `Milestone` — used consistently across data files and components.
