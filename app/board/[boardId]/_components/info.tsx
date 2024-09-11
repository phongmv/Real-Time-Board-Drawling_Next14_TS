import { Skeleton } from '@/components/ui/skeleton'

export const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md p-1.5 h-12 flex items-center shadow-md">
      TODO: information about board
    </div>
  )
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md p-1.5 h-12 flex items-center shadow-md w-[280px]">
      <Skeleton className="h-full w-full bg-muted " />
    </div>
  )
}
