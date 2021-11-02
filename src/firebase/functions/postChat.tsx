import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'

export const postChat = async (input: {
  name: string
  content: string
  roomId: string
}): Promise<string> => {
  const { name, content, roomId } = input
  const roomRef = doc(db, 'rooms', roomId)

  return
}
