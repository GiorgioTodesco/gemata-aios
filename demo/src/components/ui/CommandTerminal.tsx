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
