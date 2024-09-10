import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

interface ActionsProps {
  children?: React.ReactNode
  side: DropdownMenuContentProps['side']
  align: DropdownMenuContentProps['align']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import ConfirmModal from '@/app/(dashboard)/_components/confirm-modal'
import { useApi } from '@/hooks/use-api'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const copyBoardLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Failed to copy link'))
  }

  const onDelete = () => {
    asyncFn({ id })
      .then(() => toast.success('Deleted'))
      .catch(() => toast.error('Failed to delete board'))
  }

  const { asyncFn, pending } = useApi(api.board_mutation.remove)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()} side={side} sideOffset={sideOffset}>
        <DropdownMenuItem onClick={copyBoardLink}>
          <Link2 className="mr-2 w-4 h-4" /> Copy link
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will detele the board and all of its contents"
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button variant="ghost" className="text-sm w-full px-[6px] py-2 flex justify-start">
            <Trash2 className="mr-2 w-4 h-4" /> Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
