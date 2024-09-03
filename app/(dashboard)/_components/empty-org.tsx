import Image from 'next/image'
import { CreateOrganization } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogDescription, DialogTitle } from '@/components/ui/dialog'

const EmptyOrg = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Image width={250} height={200} src="/empty.svg" alt="empty" />
      <span className="text-2xl font-semibold mt-6">Welcome to board</span>
      <p className="text-muted-foreground text-sm mt-2 mb-3">Create an organization to get started</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-sm font-normal px-9">Create organization</Button>
        </DialogTrigger>
        <DialogContent className="p-0 rounded-2xl max-w-[432px] bg-transparent border-none">
          <DialogDescription />
          <DialogTitle />
          <CreateOrganization routing="hash" />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EmptyOrg
