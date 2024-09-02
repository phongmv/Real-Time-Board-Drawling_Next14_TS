import NewButton from '@/app/(dashboard)/_components/side-bar/new-button'
import List from '@/app/(dashboard)/_components/side-bar/list'
import Hint from '@/app/(dashboard)/_components/side-bar/hint'

const SideBar = () => {
  return (
    <aside className="h-full fixed z-[1] bg-blue-950 w-[60px] flex flex-col p-3 gap-y-4">
      <List />
      <Hint label="Create organization" side="right" sideOffset={18}>
        <NewButton />
      </Hint>
    </aside>
  )
}

export default SideBar
