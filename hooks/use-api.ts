import { useState } from 'react'
import { useMutation } from 'convex/react'

export const useApi = (callback: any) => {
  const [pending, setPending] = useState(false)

  const api = useMutation(callback)
  const asyncFn = (payload: any) => {
    setPending(true)
    return api(payload)
      .then((result) => result)
      .catch((err) => {
        throw err
      })
      .finally(() => setPending(false))
  }

  return {
    asyncFn,
    pending,
  }
}
