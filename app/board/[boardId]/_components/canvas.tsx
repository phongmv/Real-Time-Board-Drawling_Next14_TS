import { Info } from '@/app/board/[boardId]/_components/info'
import { Participants } from '@/app/board/[boardId]/_components/participants'
import Toolbar from '@/app/board/[boardId]/_components/toolbar'
interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
export default Canvas
