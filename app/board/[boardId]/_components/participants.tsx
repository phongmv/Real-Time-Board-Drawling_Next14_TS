import { Skeleton } from '@/components/ui/skeleton'

export const Participants = () => {
  return (
    <div className="absolute top-2 right-2 h-12 bg-white rounded-md p-1.5 shadow-md flex items-center">
      Participants
    </div>
  )
}

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 right-2 h-12 bg-white rounded-md p-1.5 shadow-md flex items-center w-[100px]">
      <Skeleton className="w-full h-full bg-muted" />
    </div>
  )
}
