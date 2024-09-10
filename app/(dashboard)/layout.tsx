'use client'
import SideBar from '@/app/(dashboard)/_components/side-bar'
import OrgSideBar from '@/app/(dashboard)/_components/org-side-bar'
import Navbar from '@/app/(dashboard)/_components/navbar'
import { Toaster } from '@/components/ui/sonner'
import ModalProvider from '@/providers/modal-provider'

interface DashBoardLayoutProps {
  children: React.ReactNode
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <>
      <main className="h-full">
        <SideBar />
        <div className="pl-[60px] h-full">
          <div className="flex gap-x-3 h-full">
            <OrgSideBar />
            <div className="h-full flex-1">
              <Navbar />
              {children}
            </div>
          </div>
        </div>
      </main>
      <ModalProvider />
      <Toaster />
    </>
  )
}
export default DashBoardLayout
