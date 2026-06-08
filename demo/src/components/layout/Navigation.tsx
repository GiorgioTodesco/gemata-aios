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
