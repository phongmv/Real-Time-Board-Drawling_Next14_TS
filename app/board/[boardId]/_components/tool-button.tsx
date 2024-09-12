import { LucideIcon } from 'lucide-react'
import Hint from '@/app/(dashboard)/_components/side-bar/hint'
import { Button } from '@/components/ui/button'

interface ToolButtonProps {
  label: string
  icon: LucideIcon
  isActive?: boolean
  isDisabled?: boolean
  onClick: () => void
}

export const ToolButton = ({ label, icon: Icon, isActive, isDisabled, onClick }: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button onClick={onClick} size="icon" disabled={isDisabled} variant={isActive ? 'boardActive' : 'board'}>
        <Icon />
      </Button>
    </Hint>
  )
}
