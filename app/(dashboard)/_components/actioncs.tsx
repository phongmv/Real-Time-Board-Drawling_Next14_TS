import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

interface ActionsProps {
  children?: React.ReactNode
  side: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Link2 } from 'lucide-react'
import { toast } from 'sonner'

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const copyBoardLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Failed to copy link'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()} side={side} sideOffset={sideOffset}>
        <DropdownMenuItem onClick={copyBoardLink}>
          <Link2 className="mr-2 w-4 h-4" /> Copy board link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
