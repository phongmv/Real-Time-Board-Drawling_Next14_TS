'use client'
import { useOrganization } from '@clerk/nextjs'
import EmptyOrg from '@/app/(dashboard)/_components/empty-org'

export default function DashboardPage() {
  const { organization } = useOrganization()
  return <div className="p-6 flex-1 h-[calc(100%-80px)]">{!organization ? <EmptyOrg /> : <p>Board list!</p>}</div>
}
