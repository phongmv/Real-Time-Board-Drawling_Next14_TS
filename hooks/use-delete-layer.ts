'use client'
import { useSelf, useMutation } from '@liveblocks/react/suspense'

export const useDeleteLayer = () => {
  const selection = useSelf((me) => me.presence.selection)

  return useMutation(
    ({ storage, setMyPresence }) => {
      const livelayers = storage.get('layers')
      const livelayerIds = storage.get('layerIds')

      for (const id of selection) {
        livelayers.delete(id)
        const index = livelayerIds.indexOf(id)
        if (index !== -1) {
          livelayerIds.delete(index)
        }
      }

      setMyPresence({ selection: [] }, { addToHistory: true })
    },
    [selection]
  )
}
