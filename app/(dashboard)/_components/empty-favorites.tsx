import Image from 'next/image'

const EmptyFavorite = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <Image src="/emty-favorites.svg" alt="empty" width={140} height={140} />
      <span className="text-2xl font-semibold mt-6">No favorite boards!</span>
      <p className="text-sm text-muted-foreground mt-2">Try favoriting a board</p>
    </div>
  )
}

export default EmptyFavorite
