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
