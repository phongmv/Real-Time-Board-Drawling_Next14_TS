import { Loader } from 'lucide-react'
import { Info } from '@/app/board/[boardId]/_components/info'
import { Participants } from '@/app/board/[boardId]/_components/participants'

const Loading = () => {
  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Participants.Skeleton />
      <Info.Skeleton />
    </main>
  )
}

export default Loading
