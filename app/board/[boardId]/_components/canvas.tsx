'use client'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Participants } from '@/app/board/[boardId]/_components/participants'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped } from '@liveblocks/react/suspense'
import React, { useCallback, useMemo, useState } from 'react'
import { Camera, CanvasMode, CanvasState, Color, Layer, LayerType, Points } from '@/types/canvas'
import { CursorPresence } from '@/app/board/[boardId]/_components/cursor-presence'
import { connectionIdToColor, pointerEventToCanvasPoint } from '@/lib/utils'
import { useStorage } from '@liveblocks/react'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from '@/app/board/[boardId]/_components/layer-preview'

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const layerIds = useStorage((root) => root.layerIds)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    b: 255,
    g: 255,
  })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Path | LayerType.Note | LayerType.Text | LayerType.Rectangle,
      position: Points
    ) => {
      const liveLayers = storage.get('layers')
      if (liveLayers.size >= MAX_LAYERS) {
        return
      }

      const liveLayerIds = storage.get('layerIds')
      const layerId = nanoid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      } as Layer)

      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)

      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
    },
    [lastUsedColor]
  )

  const onWheel = useCallback((e: React.WheelEvent) => {
    // console.log('wheel', {
    //   x: e.deltaX,
    //   y: e.deltaY,
    // })

    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault()
    const current = pointerEventToCanvasPoint(e, camera)
    // console.log('current', current)
    setMyPresence({ cursor: current })
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerUp = useMutation(
    ({ setMyPresence }, e) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else {
        setCanvasState({ mode: CanvasMode.None })
      }
      history.resume()
    },
    [camera, canvasState, history, insertLayer]
  )

  const onPointerLayerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (canvasState.mode === CanvasMode.Inserting || canvasState.mode === CanvasMode.Pencil) {
        return
      }

      history.pause()
      e.stopPropagation()

      const point = pointerEventToCanvasPoint(e, camera)

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      })
    },
    [canvasState, camera, history, canvasState.mode]
  )

  const selections = useOthersMapped((other) => other.presence.selection)

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsSelection: Record<string, string> = {}
    for (const user of selections) {
      const [connectionId, selection] = user
      for (const layerId of selection) {
        layerIdsSelection[layerId] = connectionIdToColor(connectionId)
      }
    }
    return layerIdsSelection
  }, [selections])

  return (
    <main className="w-full h-full relative bg-neutral-200/50 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        className="h-[100vh] w-[100vw]"
      >
        <g
          style={{
            transform: `translateX${camera.x}px translateY${camera.y}`,
          }}
        >
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onPointerLayerDown={onPointerLayerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <CursorPresence />
        </g>
      </svg>
    </main>
  )
}
export default Canvas
