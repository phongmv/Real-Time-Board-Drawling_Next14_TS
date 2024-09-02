import NewButton from '@/app/(dashboard)/_components/side-bar/new-button'
import List from '@/app/(dashboard)/_components/side-bar/list'

const SideBar = () => {
  return (
    <aside className="h-full fixed z-[1] bg-blue-950 w-[60px] flex flex-col p-3 gap-y-4">
      <List />
      <NewButton />
    </aside>
  )
}

export default SideBar
