import { Plus } from 'lucide-react'
import { CreateOrganization } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <div className="bg-white/25 w-full h-full rounded-md grid place-content-center opacity-60 hover:opacity-100 transition">
            <Plus className="text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-2xl max-w-[432px] bg-transparent border-none">
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  )
}
export default NewButton
