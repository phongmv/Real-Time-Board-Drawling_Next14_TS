import { Poppins } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { OrganizationSwitcher } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Heart } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const font = Poppins({
  subsets: ['latin'],
  weight: '600',
})

const OrgSideBar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  return (
    <div className="hidden lg:flex flex-col w-[206px] h-full space-y-6 pt-5 pl-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <span className={cn('font-semibold text-2xl', font.className)}>Board</span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              width: '100%',
              padding: '6px',
              borderRadius: '8px',
              border: '1px solid #E3E5EB',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? 'ghost' : 'secondary'}
          asChild
          size="lg"
          className="font-normal w-full justify-start px-2"
        >
          <Link href="/">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Team boards
          </Link>
        </Button>
      </div>

      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? 'secondary' : 'ghost'}
          asChild
          size="lg"
          className="font-normal w-full justify-start px-2"
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: true },
            }}
          >
            <Heart className="w-4 h-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default OrgSideBar
