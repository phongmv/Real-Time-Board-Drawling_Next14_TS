'use client'
import { useMutation } from '@liveblocks/react/suspense'
import { Camera, Color } from '@/types/canvas'
import { memo } from 'react'
import { useSelf } from '@liveblocks/react/suspense'
import { useSelectionBounds } from '@/hooks/use-selection-bound'
import { ColorPicker } from '@/app/board/[boardId]/_components/color-picker'
import { useDeleteLayer } from '@/hooks/use-delete-layer'
import Hint from '@/app/(dashboard)/_components/side-bar/hint'
import { Button } from '@/components/ui/button'
import { BringToFront, SendToBack, Trash2 } from 'lucide-react'

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
}

export const SelectionTool = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {
  const selection = useSelf((me) => me.presence.selection)

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get('layers')
      setLastUsedColor(fill)
      selection.forEach((id) => {
        liveLayers.get(id)?.set('fill', fill)
      })
    },
    [selection, setLastUsedColor]
  )

  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get('layerIds')
      const indices: number[] = []

      const arr = liveLayerIds.toArray()
      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i)
        }
      }

      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i)
      }
    },
    [selection]
  )

  const moveToFont = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get('layerIds')
      const indices: number[] = []

      const arr = liveLayerIds.toArray()
      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i)
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
      }
    },
    [selection]
  )

  const deleteLayers = useDeleteLayer()

  const selectionBounds = useSelectionBounds()
  if (!selectionBounds) return null
  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
  const y = selectionBounds.y + camera.y

  return (
    <div
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}
      className="absolute p-3 rounded-md bg-white shadow-md border flex select-none"
    >
      <ColorPicker onChange={setFill} />
      <div className="flex flex-col gap-y-0.5 border-neutral-200">
        <Hint label="Bring to front" side="left">
          <Button onClick={moveToFont} size="icon" variant="board">
            <BringToFront />
          </Button>
        </Hint>
        <Hint label="Send to back" side="left">
          <Button onClick={moveToBack} size="icon" variant="board">
            <SendToBack />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button onClick={deleteLayers} size="icon" variant="board">
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  )
})

SelectionTool.displayName = 'SelectionTool'
