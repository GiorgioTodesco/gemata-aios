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
