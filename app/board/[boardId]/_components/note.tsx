import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { cn, colorToCss, getContrastingTextColor } from '@/lib/utils'
import { NoteLayer } from '@/types/canvas'
import { useMutation } from '@liveblocks/react/suspense'

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
})

interface NoteProps {
  id: string
  layer: NoteLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

const calculateFontsize = (width: number, height: number) => {
  const maxFontSize = 96
  const scaleFactor = 0.15
  const fontSizeBaseOnHeight = height * scaleFactor
  const fontSizeBaseOnWidth = width * scaleFactor

  return Math.min(fontSizeBaseOnHeight, fontSizeBaseOnWidth, maxFontSize)
}

export const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
  const { x, y, width, height, fill, value } = layer

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers')
    liveLayers?.get(id)?.set('value', newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCss(fill) : '#000',
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        className={cn('w-full h-full flex justify-center items-center text-center outline-none', font.className)}
        style={{
          color: fill ? getContrastingTextColor(fill) : '#000',
          fontSize: calculateFontsize(width, height),
        }}
        html={value || 'Note'}
        onChange={handleContentChange}
      />
    </foreignObject>
  )
}
