import { useEffect } from 'react'
import { roomState } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from 'src/firebase/config'
import { Room } from 'src/type'
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
