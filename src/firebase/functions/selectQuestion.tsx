import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { Question } from 'src/types'
import moment from 'moment'
import 'moment/locale/ja'

export const selectQuestion = async (input: {
  key: number
  questions: Question[]
  roomId: string
}): Promise<string> => {
  const { key, questions, roomId } = input
  const roomRef = doc(db, 'rooms', roomId)

  const now = moment()
  const date = now.format('MM/DD(dd)')
  const time = now.format('HH:mm')

  let cardText = ''
  // 次の質問カードの位置を取得
  const newCard = questions.findIndex((item) => !item.open)
  // 新しい配列を作ってopenカードを変更
  const changeCards = questions.map((item, index) => {
    if (index === newCard) return { ...item, open: true }
    if (index === key) cardText = item.text.replace(/\r?\n/g, '')
    return item
  })
  // カードを削除
  const newCards = changeCards.filter((item, index) => {
    if (index !== key) return item
  })
  await updateDoc(roomRef, {
    questions: newCards,
    chat: arrayUnion({
      name: '質問カード',
      content: cardText,
      date,
      time,
    }),
  })
  return null
}
