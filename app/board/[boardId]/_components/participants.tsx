'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useSelf, useOthers } from '@liveblocks/react/suspense'
import { UserAvatar } from '@/app/board/[boardId]/_components/user-avatar'
import { connectionIdToColor } from '@/lib/utils'

const MAX_SHOW_USERS = 2

export const Participants = () => {
  const users = useOthers()
  const currUser = useSelf()
  const hasMoreUser = users.length > MAX_SHOW_USERS

  // console.log('users', users)

  return (
    <div className="absolute top-2 right-2 h-12 bg-white rounded-md p-1.5 shadow-md flex items-center">
      <div className="flex gap-x-2">
        {currUser && (
          <UserAvatar
            src={currUser?.info?.picture}
            name={`${currUser?.info?.name} (You)`}
            fallback={currUser?.info?.name?.[0]}
            borderColor={connectionIdToColor(currUser.connectionId)}
          />
        )}

        {users.slice(0, MAX_SHOW_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || 'T'}
              borderColor={connectionIdToColor(connectionId)}
            />
          )
        })}

        {hasMoreUser && (
          <UserAvatar name={`${users?.length - MAX_SHOW_USERS} more`} fallback={`+${users.length - MAX_SHOW_USERS}`} />
        )}
      </div>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute top-2 right-2 h-12 bg-white rounded-md shadow-lg w-[100px]">
      <Skeleton className="w-full h-full bg-muted" />
    </div>
  )
}
