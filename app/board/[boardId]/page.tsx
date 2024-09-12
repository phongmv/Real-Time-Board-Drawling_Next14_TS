import Canvas from '@/app/board/[boardId]/_components/canvas'
import Room from '@/app/board/[boardId]/_components/room'
import Loading from '@/app/board/[boardId]/_components/loading'

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  )
}

export default BoardIdPage
