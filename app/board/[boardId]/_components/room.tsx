'use client'

import { ReactNode } from 'react'
import { RoomProvider, ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense'

interface RoomProps {
  children: ReactNode
  roomId: string
  fallback: NonNullable<ReactNode> | null
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider publicApiKey="pk_dev_3xda1imGr6I6xnfjvQzmIdtCre3l3MNedAmq5DhMU5hy2Q9WzOj3Yv1uavBO-6l1">
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}

export default Room
