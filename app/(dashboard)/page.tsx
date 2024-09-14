'use client'
import { useOrganization } from '@clerk/nextjs'
import EmptyOrg from '@/app/(dashboard)/_components/empty-org'
import BoardList from '@/app/(dashboard)/_components/board-list'

interface DashboardPageProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  console.log('searchParams', searchParams)
  const { organization } = useOrganization()
  return (
    <div className="p-6 flex-1 h-[calc(100%-80px)]">
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} query={searchParams} />}
    </div>
  )
}
