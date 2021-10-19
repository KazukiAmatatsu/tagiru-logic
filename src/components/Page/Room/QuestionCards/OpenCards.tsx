import { FC } from 'react'
import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useRoom } from 'src/recoil/hooks/useRoom'
import styled from 'styled-components'

const OpenCards: FC = () => {
  const room = useRoom()

  const queryRef = room.questions

  const choiceCard = async (key: number) => {
    const roomRef = doc(db, 'rooms', room.roomId)
    let usedCard = ''
    // 次の質問カードの位置を取得
    const newCard = queryRef.findIndex((item) => !item.open)
    // 新しい配列を作ってopenカードを変更
    const changeCards = queryRef.map((item, index) => {
      if (index === newCard) return { ...item, open: true }
      if (index === key) usedCard = item.text
      return item
    })
    // カードを削除
    const newCards = changeCards.filter((item, index) => {
      if (index !== key) return item
    })
    await updateDoc(roomRef, {
      questions: newCards,
      [`useCards.${usedCard}`]: arrayUnion(),
    })
  }

  return (
    <StyledOpenCards>
      {queryRef &&
        queryRef.map((item, index) => {
          // indexをstring型からnumber型に変換
          const key = Number(index)
          if (item.open) {
            return (
              <div
                key={index}
                onClick={() => choiceCard(key)}
                className='questionCard center_text'
              >
                {item.text}
              </div>
            )
          }
          return null
        })}
    </StyledOpenCards>
  )
}

export default OpenCards

const StyledOpenCards = styled.div`
  .questionCard {
    width: 20rem;
    height: 10rem;
    padding: 1rem;
    margin: 2rem;
    font-size: 2rem;
    font-weight: bold;
    white-space: pre-wrap;
    text-shadow: #fff 2px 0, #fff -2px 0, #fff 0 -2px, #fff 0 2px, #fff 2px 2px,
      #fff -2px 2px, #fff 2px -2px, #fff -2px -2px, #fff 1px 2px, #fff -1px 2px,
      #fff 1px -2px, #fff -1px -2px, #fff 2px 1px, #fff -2px 1px, #fff 2px -1px,
      #fff -2px -1px, rgba(0, 0, 0, 0.5) 3px 3px 3px;
    background-color: ${(props) => props.theme.colors.yellow};
    border: 0.8rem solid #333;
    border-radius: 0.5rem;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    transition: 0.2s;
    &:hover {
      box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.5);
      transform: translateY(-5px);
      cursor: pointer;
    }
  }
`
