'use client'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Participants } from '@/app/board/[boardId]/_components/participants'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useSelf } from '@liveblocks/react/suspense'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Camera, CanvasMode, CanvasState, Color, Layer, LayerType, Point, Side, XYWH } from '@/types/canvas'
import { CursorPresence } from '@/app/board/[boardId]/_components/cursor-presence'
import {
  colorToCss,
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  penPointToPathLayer,
  pointerEventToCanvasPoint,
  resizeBound,
} from '@/lib/utils'
import { useStorage } from '@liveblocks/react'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from '@/app/board/[boardId]/_components/layer-preview'
import { SelectionBox } from '@/app/board/[boardId]/_components/selection-box'
import { SelectionTool } from '@/app/board/[boardId]/_components/selection-tools'
import { Path } from '@/app/board/[boardId]/_components/path'
import { useDisableScrollBounce } from '@/hooks/use-disbale-scroll-boundce'
import { useDeleteLayer } from '@/hooks/use-delete-layer'

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const layerIds = useStorage((root) => root.layerIds)
  const pencilDraft = useSelf((me) => me.presence.pencilDraft)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    b: 0,
    g: 0,
  })
  useDisableScrollBounce()
  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get('layers')
      const { pencilDraft } = self.presence
      if (pencilDraft === null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
        setMyPresence({ pencilDraft: null })
        return
      }

      const id = nanoid()
      liveLayers.set(id, new LiveObject(penPointToPathLayer(pencilDraft, lastUsedColor)))
      const liveLayerIds = storage.get('layerIds')
      liveLayerIds.push(id)

      setMyPresence({ pencilDraft: null })
      setCanvasState({ mode: CanvasMode.Pencil })
    },
    [lastUsedColor]
  )

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Path | LayerType.Note | LayerType.Text | LayerType.Rectangle,
      position: Point
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

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause()
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      })
    },
    [history]
  )

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      }

      const liveLayers = storage.get('layers')
      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id)

        if (layer) {
          layer.update({
            x: layer.get('x') + offset.x,
            y: layer.get('y') + offset.y,
          })
        }

        setCanvasState({ mode: CanvasMode.Translating, current: point })
      }
    },
    [canvasState]
  )

  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get('layers').toImmutable()
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current })

      const ids = findIntersectingLayersWithRectangle(layerIds as string[], layers, origin, current)

      setMyPresence({ selection: ids })
    },
    [layerIds]
  )

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current })
    }
  }, [])

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence

      if (canvasState.mode !== CanvasMode.Pencil || pencilDraft == null || e.buttons !== 1) {
        return
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      })
    },
    [canvasState.mode]
  )

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      })
    },
    [lastUsedColor]
  )

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return

      const bound = resizeBound(canvasState.initialBounds, canvasState.corner, point)
      const liveLayers = storage.get('layers')
      const layer = liveLayers.get(self.presence.selection[0])

      if (layer) {
        layer.update(bound)
      }
    },
    [canvasState]
  )

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()
      const current = pointerEventToCanvasPoint(e, camera)
      // console.log('current', current)
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin)
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin)
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current)
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e)
      }

      setMyPresence({ cursor: current })
    },
    [canvasState, resizeSelectedLayer, camera, translateSelectedLayers, updateSelectionNet, continueDrawing]
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera)
      if (canvasState.mode == CanvasMode.Inserting) return
      // TO DO case for drawing
      else if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure)
        return
        console.log('pencil')
      }
      setCanvasState({
        mode: CanvasMode.Pressing,
        origin: point,
      })
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  )

  const onPointerUp = useMutation(
    ({ setMyPresence }, e) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
        //unselect layer
        unselectLayer()
        setCanvasState({ mode: CanvasMode.None })
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath()
      } else {
        setCanvasState({ mode: CanvasMode.None })
      }
      history.resume()
    },
    [setCanvasState, camera, canvasState, history, insertLayer, insertPath]
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

  const deletedLayer = useDeleteLayer()
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'z': {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo()
            } else {
              history.undo()
            }
          }
          break
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [deletedLayer, history])

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
      <SelectionTool camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
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
              onLayerPointerDown={onPointerLayerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
            <rect
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              className="fill-blue-500/50 stroke-blue-500 stroke-1"
            />
          )}
          <CursorPresence />
          {pencilDraft !== null && pencilDraft.length > 0 && (
            <Path fill={colorToCss(lastUsedColor)} x={0} y={0} points={pencilDraft} />
          )}
        </g>
      </svg>
    </main>
  )
}
export default Canvas
