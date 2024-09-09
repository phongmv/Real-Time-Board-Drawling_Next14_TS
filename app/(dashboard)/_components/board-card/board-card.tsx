import Link from 'next/link'
import Image from 'next/image'
import OverLay from '@/app/(dashboard)/_components/board-card/over-lay'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@clerk/nextjs'
import Footer from '@/app/(dashboard)/_components/board-card/footer'
import { Skeleton } from '@/components/ui/skeleton'

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

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] flex rounded-2xl flex-col justify-between overflow-hidden border">
        <div className="relative bg-amber-50 flex-1">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <OverLay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createAtLabel}
          onClick={() => {}}
          disable={false}
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
