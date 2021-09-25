import { useEffect } from 'react'
import { db } from 'src/firebase/config'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { rooms } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { Rooms } from 'src/types'

export const roomList = (): Rooms[] => {
  const [roomsList, setRoomsList] = useRecoilState<Rooms[]>(rooms)
  const roomRef = query(
    collection(db, 'rooms'),
    where('state', '==', 'waiting')
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(roomRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return {
          roomId: doc.id,
          roomName: doc.data().roomName,
          password: doc.data().password,
        }
      })
      setRoomsList(data)
    })
    return () => {
      unsubscribe()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return roomsList
}
