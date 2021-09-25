import { useEffect } from 'react'
import { db } from 'src/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { roomState } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { Room } from 'src/types'
import { useRouter } from 'next/router'

export const useRoom = (): Room => {
  const router = useRouter()
  const [room, setRoom] = useRecoilState<Room>(roomState)
  const roomId = router.asPath.split('/')[1].split('?')[0]

  useEffect(() => {
    if (roomId === '[roomId]') return
    const unsubscribe = onSnapshot(doc(db, 'rooms', roomId), (doc) => {
      const data = doc.data() as Room
      setRoom(data)
    })
    return () => {
      unsubscribe()
    }
  }, [roomId]) // eslint-disable-line react-hooks/exhaustive-deps

  return room
}
