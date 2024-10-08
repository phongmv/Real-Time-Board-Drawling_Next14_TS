import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Hint from '@/app/(dashboard)/_components/side-bar/hint'

interface ItemsProps {
  id: string
  name: string
  imageUrl: string
}

const Item = ({ id, name, imageUrl }: ItemsProps) => {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()
  const isActive = organization?.id === id

  const onClick = () => {
    if (!setActive) return
    setActive({ organization: id })
  }

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" sideOffset={18}>
        <Image
          onClick={onClick}
          src={imageUrl}
          width={36}
          height={36}
          alt={name}
          className={cn(
            'h-full w-full object-fit rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
            isActive && 'opacity-100'
          )}
        />
      </Hint>
    </div>
  )
}
export default Item
