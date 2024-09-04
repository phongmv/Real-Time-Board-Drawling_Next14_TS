import Image from 'next/image'
import { Button } from '@/components/ui/button'

const EmptyBoards = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <Image src="/empty-boards.svg" alt="empty" width={140} height={140} />
      <span className="text-2xl font-semibold mt-6">Create first your board</span>
      <p className="text-sm text-muted-foreground mt-2">Start by creating a board for you organization</p>
      <div className="mt-6">
        <Button size="lg">Create board</Button>
      </div>
    </div>
  )
}

export default EmptyBoards
