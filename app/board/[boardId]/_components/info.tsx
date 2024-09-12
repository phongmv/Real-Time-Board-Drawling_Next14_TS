'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Poppins } from 'next/font/google'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRenameModal } from '@/store/use-rename-modal'
import Hint from '@/app/(dashboard)/_components/side-bar/hint'
import Actioncs from '@/app/(dashboard)/_components/actioncs'
import { Menu } from 'lucide-react'
interface InfoProps {
  boardId: string
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const TapSeparator = () => {
  return <div className="text-neutral-300 p-1.5">|</div>
}

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal()

  const data = useQuery(api.board_query.get_detail, {
    id: boardId as Id<'boards'>,
  })

  if (!data) return <InfoSkeleton></InfoSkeleton>

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md p-1.5 h-12 flex items-center justify-around  w-[300px] shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span className={cn('font-semibold text-sm text-white', font.className)}>Board</span>
          </Link>
        </Button>
      </Hint>
      <TapSeparator />
      <Hint label="Edit name" side="bottom" sideOffset={10}>
        <Button onClick={() => onOpen(data._id, data.title)} className="font-semibold text-sm px-2" variant="ghost">
          {data.title}
        </Button>
      </Hint>
      <TapSeparator />
      <Actioncs side="bottom" sideOffset={10} id={data._id} title={data.title}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="ghost">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actioncs>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md h-12  shadow-lg w-[280px]">
      <Skeleton className="h-full w-full bg-muted " />
    </div>
  )
}
