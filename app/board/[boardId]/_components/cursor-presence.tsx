'use client'
import { memo } from 'react'
import { useOthersConnectionIds, useOthersMapped } from '@liveblocks/react/suspense'
import { Cursor } from '@/app/board/[boardId]/_components/cursor'
import { shallow } from '@liveblocks/core'
import { Path } from '@/app/board/[boardId]/_components/path'
import { colorToCss } from '@/lib/utils'

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

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  )
  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              fill={other.penColor ? colorToCss(other.penColor) : '#000'}
              x={0}
              y={0}
              points={other.pencilDraft}
            />
          )
        }
      })}
    </>
  )
}

export const CursorPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  )
})

CursorPresence.displayName = 'CursorPresence'
