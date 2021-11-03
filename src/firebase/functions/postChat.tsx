import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

export const postChat = async (input: {
  name: string
  content: string
  roomId: string
}): Promise<string> => {
  const { name, content, roomId } = input
  const roomRef = doc(db, 'rooms', roomId)

  // サブコレクションに登録
  await updateDoc(roomRef, {
    chat: arrayUnion({
      name,
      content,
    }),
  })
  return null
}
