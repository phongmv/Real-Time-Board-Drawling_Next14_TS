import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { OrganizationProfile } from '@clerk/nextjs'
const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="mr-1" />
          <span>Invite members</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex p-0 border-none bg-transparent max-w-[880px] max-h-[700px]">
        <DialogDescription />
        <DialogTitle />
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  )
}

export default InviteButton
