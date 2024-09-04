import Image from 'next/image'

const EmptySearching = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <Image src="/empty-searching.svg" alt="empty" width={140} height={140} />
      <span className="text-2xl font-semibold mt-6">No results found!</span>
      <p className="text-sm text-muted-foreground mt-2">Try search for something else!</p>
    </div>
  )
}

export default EmptySearching
