'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Hint from '@/app/(dashboard)/_components/side-bar/hint'

interface AvatarProps {
  name?: string
  src?: string
  fallback?: string
  borderColor?: string
}

export const UserAvatar = ({ name, src, fallback, borderColor }: AvatarProps) => {
  return (
    <Hint label={name || 'Teammate'} side="bottom" sideOffset={10}>
      <Avatar className="w-8 h-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-sm font-semibold">{fallback}</AvatarFallback>
      </Avatar>
    </Hint>
  )
}
