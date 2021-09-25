import { db } from 'src/firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export const joinRoom = async (input: {
  name: string
  roomId: string
}): Promise<string> => {
  const { name, roomId } = input
  const roomRef = doc(db, 'rooms', roomId)
  const roomDoc = await getDoc(roomRef)
  const playerRef = roomDoc.data().player

  const key = playerRef.findIndex((item) => item.name === '')

  const changeArr = playerRef.map((item, index) => {
    if (index === key) return { ...item, name: name }
    return item
  })

  await updateDoc(roomRef, {
    player: changeArr,
  })
  return key
}
