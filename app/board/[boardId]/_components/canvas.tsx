'use client'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Participants } from '@/app/board/[boardId]/_components/participants'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { useHistory, useCanRedo, useCanUndo, useMutation } from '@liveblocks/react/suspense'
import React, { useCallback, useState } from 'react'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { CursorPresence } from '@/app/board/[boardId]/_components/cursor-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

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

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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
        className="h-[100vh] w-[100vw]"
      >
        <g>
          <CursorPresence />
        </g>
      </svg>
    </main>
  )
}
export default Canvas
