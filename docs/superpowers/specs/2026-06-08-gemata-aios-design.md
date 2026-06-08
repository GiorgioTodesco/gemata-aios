# GEMATA AIOS — Design Specification
**Data:** 2026-06-08  
**Autore:** Giorgio (Todesco Srl / Gemata Group)  
**Versione:** 1.0

---

## 1. Obiettivo

Costruire **GEMATA AIOS** (AI Operating System) — un sistema multi-agente basato su Claude Code che trasforma l'AI da semplice assistente in un vero sistema operativo aziendale per il Gruppo Gemata (Gemata SpA + Todesco Srl + Rollmac + COS.T.A.).

Il sistema replica e adatta l'architettura "AIOS" di dariofontanel.ai al contesto industriale del Gruppo Gemata, specializzato in tecnologie di finitura superficiale (leather, textile, wood, glass).

**Due deliverable:**
1. **Web App Demo** — SPA React interattiva che presenta il sistema, mostra i 5 layer funzionanti con dati demo del Gruppo Gemata
2. **PDF Report** — Relazione strategica completa con architettura, roadmap, stack tecnologico, analisi costi/benefici

---

## 2. Contesto Aziendale

### Gruppo Gemata
- **Sede:** Trissino/Creazzo, Veneto, Italia
- **Fondazione:** 1972
- **Posizionamento:** Leader globale in tecnologie di finitura superficiale
- **Aziende:** Gemata SpA, Todesco Srl, Rollmac, COS.T.A., Gemata do Brasil

### Todesco Srl
- **Focus:** Spraying Innovation per finitura industriale
- **Prodotti chiave:** Linee complete (Innover, Kingsfisher), spray guns (HV-02, HV-03), Speedster 2.0 (color management), Statwatch MES (software), sistemi di essiccazione, purificazione fumi
- **Mercati:** Pelle, tessile, sintetici, legno

### Use Case Principali per AIOS
- Analisi dati KPI produzione e service
- Documentazione tecnica (manuali, schede prodotto, offerte)
- Strategia aziendale e decisioni
- Service e controllo macchine (supporto diagnostico)

---

## 3. Architettura AIOS Gemata

### Orchestratore Centrale
**Claude Code** con framework **Superpowers** — gestisce tutti i layer tramite comandi slash personalizzati.

### I 5 Layer

#### Layer 1 — ContextOS (Verde)
*La conoscenza dell'azienda caricata in ogni sessione*

```
context/
├── CLAUDE.md                  ← Entry point: istruzioni globali per Claude
├── group-overview.md          ← Struttura Gruppo Gemata, mission, mercati
├── companies/
│   ├── todesco.md             ← Prodotti, team, focus, KPI
│   ├── gemata-spa.md          ← Prodotti, mercati, clienti chiave
│   ├── rollmac.md             ← Tecnologie vetro/materiali tecnici
│   └── costa.md               ← Soluzioni custom
├── service/
│   ├── machines-catalog.md    ← Catalogo macchine con codici
│   ├── error-codes.md         ← Codici errore e procedure diagnostiche
│   └── maintenance-guide.md   ← Guide manutenzione
├── strategy/
│   ├── priorities.md          ← Priorità strategiche 2026
│   └── roadmap.md             ← Roadmap prodotti/mercati
└── kpi/
    └── current-metrics.md     ← KPI aggiornati (generati da DataOS)
```

**Funzionamento:** Ad ogni sessione Claude Code, il CLAUDE.md carica automaticamente tutto il contesto. Claude conosce già prodotti, mercati, team, KPI, procedure service — senza ripetere ogni volta.

#### Layer 2 — DataOS (Blu)
*Pipeline dati: da sorgenti aziendali a insights markdown*

```
data-pipeline/
├── collectors/
│   ├── statwatch_collector.py  ← Legge Statwatch MES via API/DB
│   ├── erp_collector.py        ← Dati produzione, ordini, magazzino
│   └── service_collector.py    ← Ticket service, MTTR, MTBF
├── processors/
│   ├── kpi_calculator.py       ← Calcola KPI aggregati
│   └── trend_analyzer.py       ← Trend e anomalie
├── outputs/
│   ├── key-metrics.md          ← KPI pronti per Claude
│   ├── service-dashboard.md    ← Stato macchine installate
│   └── production-report.md    ← Report produzione
└── scheduler/
    └── daily_update.py         ← Aggiornamento automatico ogni mattina
```

**Flusso:** Python collectors → SQLite/PostgreSQL → markdown files → letti da Claude in ogni sessione

#### Layer 3 — IntelOS (Viola)
*Intelligenza operativa: meetings, comunicazioni, insights*

```
intel/
├── meeting-notes/              ← Note riunioni elaborate da Claude
├── email-summaries/            ← Riassunti email importanti
├── market-intelligence/        ← Notizie settore tanning/textile
├── commands/
│   ├── summarize-meeting.md    ← Skill: analizza trascrizione meeting
│   ├── competitor-watch.md     ← Skill: monitora competitor
│   └── client-brief.md        ← Skill: prepara brief cliente
└── telegram-bot/               ← Bot Telegram per query veloci da mobile
```

#### Layer 4 — AutomateOS (Arancione)
*Automazione task e produttività*

```
automate/
├── skills/
│   ├── task-audit.md           ← /task-audit: mappa e prioritizza task
│   ├── weekly-review.md        ← /weekly-review: review settimanale
│   ├── project-tracker.md      ← /track: stato progetti
│   └── service-report.md      ← /service-report: report service automatico
├── workflows/
│   ├── morning-briefing.py     ← Brief mattutino automatico
│   └── end-of-week-report.py   ← Report fine settimana
└── productivity/
    └── 80-20-tracker.md        ← Traccia task ad alto impatto
```

#### Layer 5 — Build (Scuro)
*Costruzione: brainstorming → spec → implementazione*

```
build/
├── skills/
│   ├── brainstorm.md           ← /brainstorm: ideazione strutturata
│   ├── explore.md              ← /explore: analisi approfondita
│   ├── create-spec.md          ← /spec: specifica tecnica
│   └── implement.md            ← /implement: generazione codice
└── templates/
    ├── product-spec-template.md
    ├── offer-template.md
    └── technical-doc-template.md
```

### Automation Layer (Base)
Cron jobs Python che girano in background:
- `daily-kpi-update` — ogni mattina alle 7:00
- `weekly-service-digest` — ogni lunedì
- `meeting-processor` — dopo ogni riunione
- `market-intel-scraper` — ogni giorno

---

## 4. Web App Demo

### Pagine e Componenti

| Pagina | Componenti | Dati Demo |
|--------|-----------|-----------|
| **Hero** | Animazione AIOS logo, tagline, CTA | Testo fisso |
| **Architecture** | ReactFlow diagram interattivo 5 layer | JSON architettura |
| **ContextOS** | FileTree animato, CLAUDE.md viewer | Context Gemata simulato |
| **DataOS** | KPI dashboard con Recharts (bar, line, pie) | KPI Todesco simulati |
| **IntelOS** | Feed meeting notes, Telegram chat mock | Meeting demo |
| **AutomateOS** | Task board, produttività tracker | Task demo |
| **Build** | Terminal Claude Code simulato, comandi | Slash commands demo |
| **TechStack** | Card griglia librerie consigliate | Dati statici |
| **Roadmap** | Timeline implementazione | Milestones |
| **Report** | Bottone genera PDF | Genera da template |

### Design System
- **Tema:** Dark (`#0a0a0f` background, `#1a1a2e` card, `#f59e0b` amber accent)
- **Font:** Inter (testo) + JetBrains Mono (codice)
- **Animazioni:** Framer Motion — scroll reveal, layer transitions, typing effect
- **Responsive:** Mobile-first, funziona su tablet/desktop

### Stack Completo

```json
{
  "framework": "React 18 + Vite 6 + TypeScript 5",
  "styling": "Tailwind CSS 4",
  "animations": "Framer Motion 12",
  "charts": "Recharts 2",
  "diagrams": "ReactFlow 12",
  "routing": "React Router 7",
  "pdf": "@react-pdf/renderer 4",
  "icons": "Lucide React",
  "state": "Zustand (per navigazione layer)",
  "dev": "ESLint + Prettier"
}
```

---

## 5. PDF Report — Struttura

1. **Executive Summary** — AIOS per il Gruppo Gemata in 1 pagina
2. **Analisi Business** — Contesto Gruppo Gemata, sfide attuali, opportunità AI
3. **Architettura AIOS** — I 5 layer con diagrammi
4. **Stack Tecnologico** — Tabella completa con rationale
5. **Roadmap di Implementazione** — 4 fasi, 12 settimane
6. **KPI e Metriche di Successo** — Come misurare il ROI
7. **Analisi Costi/Benefici** — Investimento vs risparmio ore
8. **Rischi e Mitigazioni** — Principali rischi tecnici e organizzativi
9. **Appendice** — Struttura file, esempi CLAUDE.md, snippet Python

---

## 6. Roadmap di Implementazione

| Fase | Settimane | Contenuto |
|------|-----------|-----------|
| **Fase 1** | 1-2 | Setup repo GitHub + ContextOS (CLAUDE.md Gemata Group completo) |
| **Fase 2** | 3-5 | DataOS: collectors Python, integrazione Statwatch MES |
| **Fase 3** | 6-8 | IntelOS: meeting processor, Telegram bot, market intel |
| **Fase 4** | 9-12 | AutomateOS + Build layer + skill personalizzate |

*La Web App Demo viene costruita in parallelo alla Fase 1-2*

---

## 7. Struttura Repository GitHub

```
gemata-aios/
├── README.md                   ← Panoramica progetto
├── demo/                       ← Web App React
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/
│   ├── gemata-aios-report.pdf  ← Relazione finale
│   └── superpowers/specs/      ← Questa specifica
├── context/                    ← Layer 1: ContextOS
├── data-pipeline/              ← Layer 2: DataOS
├── intel/                      ← Layer 3: IntelOS
├── automate/                   ← Layer 4: AutomateOS
├── build/                      ← Layer 5: Build
├── .claude/
│   └── CLAUDE.md               ← Entry point Claude Code
└── .github/
    └── workflows/              ← CI/CD per aggiornamento KPI automatico
```

---

## 8. Vincoli e Assunzioni

- Claude Code con abbonamento attivo (richiesto per Superpowers + Agent Teams)
- Python 3.14 disponibile sulla macchina (già verificato)
- Statwatch MES accessibile via API o database locale (da verificare in Fase 2)
- GitHub repository pubblico o privato a scelta
- Il PDF viene generato lato browser tramite `@react-pdf/renderer` (nessun server backend necessario) e salvato anche come file statico in `/docs/gemata-aios-report.pdf`
