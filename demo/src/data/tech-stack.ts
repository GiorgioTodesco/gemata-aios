import type { TechCard } from '../types'

export const techStackCards: TechCard[] = [
  { name: 'React 19', version: '19.2', purpose: 'UI framework con concurrent features', category: 'frontend', url: 'https://react.dev' },
  { name: 'Vite 8', version: '8.0', purpose: 'Build tool ultrafast + HMR', category: 'frontend', url: 'https://vitejs.dev' },
  { name: 'TypeScript 5', version: '5.7', purpose: 'Type safety end-to-end', category: 'frontend', url: 'https://typescriptlang.org' },
  { name: 'Tailwind CSS 4', version: '4.0', purpose: 'Utility-first CSS framework', category: 'frontend', url: 'https://tailwindcss.com' },
  { name: 'Framer Motion', version: '12.0', purpose: 'Animazioni e transizioni layer', category: 'frontend', url: 'https://framer.com/motion' },
  { name: '@xyflow/react', version: '12.0', purpose: 'Diagramma architettura interattivo', category: 'frontend', url: 'https://reactflow.dev' },
  { name: 'Recharts', version: '3.8', purpose: 'KPI charts e grafici produzione', category: 'frontend', url: 'https://recharts.org' },
  { name: 'React Router 7', version: '7.0', purpose: 'Navigazione multi-pagina SPA', category: 'frontend', url: 'https://reactrouter.com' },
  { name: '@react-pdf/renderer', version: '4.0', purpose: 'Generazione PDF lato browser', category: 'frontend', url: 'https://react-pdf.org' },
  { name: 'Claude Code', version: 'latest', purpose: 'AI orchestratore centrale AIOS', category: 'ai', url: 'https://claude.ai/code' },
  { name: 'Superpowers', version: '5.1', purpose: 'Framework skill personalizzate per Claude', category: 'ai', url: 'https://superpowers.ai' },
  { name: 'Python 3.14', version: '3.14', purpose: 'DataOS collectors e pipeline', category: 'data', url: 'https://python.org' },
  { name: 'SQLite / PostgreSQL', version: '-', purpose: 'Database KPI intermedio', category: 'data', url: 'https://sqlite.org' },
  { name: 'GitHub Actions', version: '-', purpose: 'CI/CD aggiornamento KPI automatico', category: 'infra', url: 'https://github.com/features/actions' },
  { name: 'GitHub Pages', version: '-', purpose: 'Hosting web app demo', category: 'infra', url: 'https://pages.github.com' },
]
