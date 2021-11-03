import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

export const postChat = async (input: {
  name: string
  content: string
  roomId: string
}): Promise<string> => {
  const { name, content, roomId } = input
  const roomRef = doc(db, 'rooms', roomId)

  // Moment.jsなるものがあるらしい
  const dt = new Date()
  const week = ['日', '月', '火', '水', '木', '金', '土']

  const date = `
  ${('00' + (dt.getMonth() + 1)).slice(-2)}/${('00' + dt.getDate()).slice(-2)}
  (${week[dt.getDay()]})
  `

  const time = `
  ${('00' + dt.getHours()).slice(-2)}:${('00' + dt.getMinutes()).slice(-2)}
  `

  await updateDoc(roomRef, {
    chat: arrayUnion({
      name,
      content,
      date,
      time,
    }),
  })
  return null
}
