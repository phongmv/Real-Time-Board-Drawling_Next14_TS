'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useOrganization } from '@clerk/nextjs'
import { api } from '@/convex/_generated/api'
import { useApi } from '@/hooks/use-api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { asyncFn, pending } = useApi(api.board_mutation.create)
  const router = useRouter()

  const onClick = () => {
    if (!organization?.id) return
    asyncFn({
      title: 'Untitled',
      orgId: organization.id,
    })
      .then((id) => {
        toast.success(`Created Board`)
        router.push(`/board/${id}`)
      })
      .catch(() => {
        toast.error('Failed to create board')
      })
  }
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <Image src="/empty-boards.svg" alt="empty" width={140} height={140} />
      <span className="text-2xl font-semibold mt-6">Create first your board</span>
      <p className="text-sm text-muted-foreground mt-2">Start by creating a board for you organization</p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create board
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoards
