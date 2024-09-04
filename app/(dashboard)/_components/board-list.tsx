import EmptySearching from '@/app/(dashboard)/_components/empty-searching'
import EmptyFavorite from '@/app/(dashboard)/_components/empty-favorites'
import EmptyBoards from '@/app/(dashboard)/_components/empty-boards'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []
  if (!data?.length && query.search) {
    return <EmptySearching />
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorite />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return <div>{JSON.stringify(query)}</div>
}

export default BoardList
