import EmptySearching from '@/app/(dashboard)/_components/empty-searching'
import EmptyFavorite from '@/app/(dashboard)/_components/empty-favorites'
import EmptyBoards from '@/app/(dashboard)/_components/empty-boards'
import { useQuery } from 'convex/react'
import BoardCard from '@/app/(dashboard)/_components/board-card/board-card'
import NewBoardButton from '@/app/(dashboard)/_components/new-board-button'
import { api } from '@/convex/_generated/api'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  console.log('@@query', query)

  const data = useQuery(api.board_query.get, { orgId, ...query })

  console.log('!!!data search', data)

  if (data === undefined)
    return (
      <div>
        <h2 className="text-3xl font-semibold">{query.favorites ? 'Favorite Boards' : 'Team Boards'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton disabled={true} orgId={orgId} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )

  if (!data?.length && query.search) {
    return <EmptySearching />
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorite />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold">{query.favorites ? 'Favorite Boards' : 'Team Boards'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            authorId={board.authorId}
            authorName={board.authorName}
            title={board.title}
            orgId={orgId}
            createdAt={board._creationTime}
            imageUrl={board.imageUrl}
            isFavorite={board.isFavorites}
          />
        ))}
      </div>
    </div>
  )
}

export default BoardList
