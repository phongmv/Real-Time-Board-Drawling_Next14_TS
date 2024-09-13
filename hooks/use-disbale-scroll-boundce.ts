import { useEffect } from 'react'

export const useDisableScrollBounce = () => {
  useEffect(() => {
    document.body.classList.add('over-flow-hidden', 'overscroll-none')
    return () => {
      document.body.classList.remove('over-flow-hidden', 'overscroll-none')
    }
  }, [])
}
