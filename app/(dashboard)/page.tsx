'use client'
import { useOrganization } from '@clerk/nextjs'
import EmptyOrg from '@/app/(dashboard)/_components/empty-org'
import BoardList from '@/app/(dashboard)/_components/board-list'
import { useSearchParams } from 'next/navigation'

export default function DashboardPage() {
  const { organization } = useOrganization()
  const searchParams = useSearchParams()
  console.log('searchParams', searchParams)

  const search = searchParams.get('search') || ''
  const favorites = searchParams.get('favorites') || ''
  return (
    <div className="p-6 flex-1 h-[calc(100%-80px)]">
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} query={{ search, favorites }} />}
    </div>
  )
}
