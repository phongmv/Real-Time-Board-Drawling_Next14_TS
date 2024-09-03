'use client'

import { UserButton } from '@clerk/nextjs'
import SearchInput from '@/app/(dashboard)/_components/search-input'
import { OrganizationSwitcher, useOrganization } from '@clerk/clerk-react'
import InviteButton from '@/app/(dashboard)/_components/invite-button'

const Navbar = () => {
  const { organization } = useOrganization()
  return (
    <div className="flex items-center p-5 gap-x-3">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block flex-1 lg:hidden">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '370px',
              },
              organizationSwitcherTrigger: {
                width: '100%',
                padding: '6px',
                borderRadius: '8px',
                border: '1px solid #E3E5EB',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                height: '36px',
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  )
}

export default Navbar
