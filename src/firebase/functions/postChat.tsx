import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import moment from 'moment'
import 'moment/locale/ja'

export const postChat = async (input: {
  name: string
  content: string
  roomId: string
}): Promise<string> => {
  const { name, content, roomId } = input
  const roomRef = doc(db, 'rooms', roomId)

  const now = moment()
  const date = now.format('MM/DD(dd)')
  const time = now.format('HH:mm')

  await updateDoc(roomRef, {
    chat: arrayUnion({
      name,
      content,
      question: false,
      date,
      time,
    }),
  })
  return null
}
