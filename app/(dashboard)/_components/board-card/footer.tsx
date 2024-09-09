import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterProps {
  title: string
  isFavorite: boolean
  disable: boolean
  authorLabel: string
  createdAtLabel: string
  onClick: () => void
}
const Footer = ({ title, isFavorite, disable, authorLabel, createdAtLabel, onClick }: FooterProps) => {
  return (
    <div className="bg-white p-3 relative">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-50 truncate text-[11px] transition-opacity text-muted-foreground">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disable}
        onClick={onClick}
        className={cn(
          'absolute opacity-0 group-hover:opacity-100 transition top-3 right-3 text-muted-foreground hover:text-red-500',
          disable && 'cursor-not-allowed opacity-75'
        )}
      >
        <Heart className={cn('h-4 w-4', isFavorite && 'fill-red-500 text-red-500')} />
      </button>
    </div>
  )
}

export default Footer
