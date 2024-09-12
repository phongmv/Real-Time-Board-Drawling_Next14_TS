'use client'
import { memo } from 'react'
import { useStorage } from '@liveblocks/react'
import { LayerType } from '@/types/canvas'
import { Rectangle } from '@/app/board/[boardId]/_components/rectangle'

interface LayerPreviewProps {
  id: string
  onPointerLayerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor: string
}

export const LayerPreview = memo(({ id, selectionColor, onPointerLayerDown }: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id))

  if (!layer) return null

  switch (layer.type) {
    case LayerType.Rectangle:
      return <Rectangle id={id} layer={layer} onPointerDown={onPointerLayerDown} selectionColor={selectionColor} />
    default:
      console.warn('Unknown layer type')
      return null
  }

  return <></>
})

LayerPreview.displayName = 'LayerPreview'
