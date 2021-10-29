import { VFC, useState } from 'react'
import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useUser } from 'src/recoil/hooks/useUser'
import styled from 'styled-components'

type AnswerQuestionProps = {
  cardText: string
}

/*
  モーダルにする
  カードテキストを受け取って入力できるフォーム
*/
const AnswerQuestion: VFC<AnswerQuestionProps> = ({ cardText }) => {
  const [answer, setAnswer] = useState<string>('')
  const room = useRoom()
  // const user = useUser()
  const user = {
    name: 'テストさん',
    key: 0,
  }
  const queryRef = room.questions
  const usedRef = room.usedCards
  const roomRef = doc(db, 'rooms', room.roomId)

  console.log(usedRef)
  const answerHandler = async () => {
    console.log('投稿した')

    // await updateDoc(roomRef, {
    //   [`usedCards.${cardText}`]: [
    //     {}
    //   ],
    // })
  }

  return (
    <StyledAnswerQuestion>
      <form>
        <label htmlFor='answer'>あなたの回答は？</label>
        <input
          id='answer'
          type='text'
          placeholder='回答する'
          onChange={(e) => setAnswer(e.currentTarget.value)}
        />
        <button onClick={() => answerHandler()}>送信</button>
        {/* <input type='submit' /> */}
      </form>
    </StyledAnswerQuestion>
  )
}

export default AnswerQuestion

const StyledAnswerQuestion = styled.div``
