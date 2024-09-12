'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ToolButton } from '@/app/board/[boardId]/_components/tool-button'
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from 'lucide-react'
import { CanvasMode, CanvasState, LayerType } from '@/types/canvas'

interface ToolBarProps {
  canvasState: CanvasState
  setCanvasState: (newCanvasState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

export const Toolbar = ({ canvasState, setCanvasState, undo, redo, canRedo, canUndo }: ToolBarProps) => {
  return (
    <div className="absolute rounded-md top-[50%] -translate-y-[50%] right-2  gap-y-4 flex flex-col bg-neutral-200/50 p-1">
      <div className="bg-white flex flex-col gap-1 rounded-md items-center p-1">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Translating
          }
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
        />
        <ToolButton
          label="Text"
          icon={Type}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text}
          onClick={() =>
            setCanvasState({
              layerType: LayerType.Text,
              mode: CanvasMode.Inserting,
            })
          }
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          isActive={canvasState.mode === CanvasMode.Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
        />
      </div>
      <div className="bg-white flex flex-col gap-1 rounded-md items-center p-1">
        <ToolButton label="Undo" icon={Undo2} isDisabled={!canUndo} onClick={undo} />
        <ToolButton label="Redo" icon={Redo2} isDisabled={!canRedo} onClick={redo} />
      </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute rounded-md top-[50%] -translate-y-[50%] right-2 shadow-lg gap-y-4 flex flex-col w-[56px] h-[384px] bg-neutral-200/50 p-1">
      <Skeleton className="w-full h-full bg-muted p-1" />
    </div>
  )
}
