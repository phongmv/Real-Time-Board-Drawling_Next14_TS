import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export interface HintProps {
  children: React.ReactNode
  label: string
  side?: 'top' | 'left' | 'right' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
}

const Hint = ({ children, label, sideOffset, side, align, alignOffset }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="bg-black text-white"
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint
