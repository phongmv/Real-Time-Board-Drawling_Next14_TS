import { RectangleLayer } from '@/types/canvas'
import { colorToCss } from '@/lib/utils'

interface RectangleProps {
  id: string
  layer: RectangleLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor: string
}

export const Rectangle = ({ id, layer, onPointerDown, selectionColor }: RectangleProps) => {
  const { x, y, width, height, fill } = layer

  return (
    <rect
      x={x}
      y={y}
      height={height}
      width={width}
      fill={fill ? colorToCss(fill) : '#000'}
      strokeWidth={1}
      stroke={selectionColor || 'transparent'}
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translateX${x}px translateY${y}px`,
      }}
    />
  )
}
