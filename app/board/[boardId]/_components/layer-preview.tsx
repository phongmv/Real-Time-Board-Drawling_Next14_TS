'use client'
import { memo } from 'react'
import { useStorage } from '@liveblocks/react'
import { LayerType } from '@/types/canvas'
import { Rectangle } from '@/app/board/[boardId]/_components/rectangle'
import { Ellipse } from '@/app/board/[boardId]/_components/ellipse'
import { Text } from '@/app/board/[boardId]/_components/text'
import { Note } from '@/app/board/[boardId]/_components/note'
import { Path } from '@/app/board/[boardId]/_components/path'
import { colorToCss } from '@/lib/utils'

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor: string
}

export const LayerPreview = memo(({ id, selectionColor, onLayerPointerDown }: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id))

  if (!layer) return null

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          stroke={selectionColor}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : '#000'}
        />
      )
    case LayerType.Text:
      return <Text id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
    case LayerType.Note:
      return <Note id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
    case LayerType.Rectangle:
      return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
    case LayerType.Ellipse:
      return <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
    default:
      console.warn('Unknown layer type')
      return null
  }
})

LayerPreview.displayName = 'LayerPreview'
