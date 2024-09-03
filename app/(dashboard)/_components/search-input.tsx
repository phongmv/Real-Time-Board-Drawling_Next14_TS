'use client'
import qs from 'query-string'
import { Search } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'

const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const debounceValue = useDebounceValue(value, 500)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: debounceValue[0],
        },
      },
      { skipEmptyString: true, skipNull: true }
    )
    router.push(url)
  }, [debounceValue, router])

  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
      <Input onChange={handleChange} value={value} className="pl-9 max-w-[500px]" placeholder="Search boards" />
    </div>
  )
}

export default SearchInput
