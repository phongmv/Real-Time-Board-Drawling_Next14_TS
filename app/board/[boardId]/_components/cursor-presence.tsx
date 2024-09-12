'use client'
import { memo } from 'react'
import { useOthersConnectionIds } from '@liveblocks/react/suspense'
import { Cursor } from '@/app/board/[boardId]/_components/cursor'

export const Cursors = () => {
  const ids = useOthersConnectionIds()
  // console.log('ids', ids)
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  )
}

export const CursorPresence = memo(() => {
  return <Cursors />
})

CursorPresence.displayName = 'CursorPresence'
