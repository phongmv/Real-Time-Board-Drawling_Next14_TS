import { useState } from 'react'
import { useMutation } from 'convex/react'

export const useApiMutation = (mutationFn: any) => {
  const [pending, setPending] = useState(false)

  const apiMutation = useMutation(mutationFn)
  const mutate = (payload: any) => {
    setPending(true)
    return apiMutation(payload)
      .then((result) => result)
      .catch((err) => {
        throw err
      })
      .finally(() => setPending(false))
  }

  return {
    mutate,
    pending,
  }
}
