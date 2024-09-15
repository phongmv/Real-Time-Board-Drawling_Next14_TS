import Link from 'next/link'
import Image from 'next/image'
import OverLay from '@/app/(dashboard)/_components/board-card/over-lay'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@clerk/nextjs'
import Footer from '@/app/(dashboard)/_components/board-card/footer'
import { Skeleton } from '@/components/ui/skeleton'
import Actions from '@/app/(dashboard)/_components/actioncs'
import { MoreHorizontal } from 'lucide-react'
import { useApi } from '@/hooks/use-api'
import { api } from '@/convex/_generated/api'

interface BoardCardProps {
  id: string
  title: string
  authorId: string
  authorName: string
  imageUrl: string
  createdAt: number
  orgId: string
  isFavorite: boolean
}

const BoardCard = ({ title, authorName, authorId, imageUrl, createdAt, orgId, isFavorite, id }: BoardCardProps) => {
  const { userId } = useAuth()
  const authorLabel = userId === authorId ? 'You' : authorName

  const createAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  })

  const { asyncFn: onFavorites, pending: pendingFavorites } = useApi(api.board_mutation.favorites)
  const { asyncFn: onUnFavorites, pending: pendingUnFavorites } = useApi(api.board_mutation.unFavorites)

  const toggleFavorites = () => {
    if (isFavorite) {
      onUnFavorites({ id }).catch(() => {
        throw new Error('Failed to UnFavorites')
      })
    } else {
      onFavorites({ id, orgId }).catch(() => {
        throw new Error('Failed to favorites')
      })
    }
  }

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] flex rounded-2xl flex-col justify-between overflow-hidden border">
        <div className="relative bg-amber-50 flex-1">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <OverLay />
          <Actions isDelete={true} title={title} id={id} side="right" align="end" sideOffset={10}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="opacity-75 hover:opacity-100 text-white" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createAtLabel}
          onClick={toggleFavorites}
          disable={pendingFavorites || pendingUnFavorites}
        />
      </div>
    </Link>
  )
}

export default BoardCard

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-2xl overflow-hidden border">
      <Skeleton className="w-full h-full" />
    </div>
  )
}
