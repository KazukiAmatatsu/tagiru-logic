import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useRoom } from 'src/recoil/hooks/useRoom'
import styled from 'styled-components'

const QuestionCard = () => {
  const room = useRoom()

  const queryRef = room.questions
  const usedRef = room.usedCards

  const useCard = async (key: number) => {
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
      usedCards: arrayUnion(usedCard),
    })
  }

  return (
    <StyledQuestionCard>
      <div className='usedCardList'>
        {usedRef &&
          usedRef.map((item, index) => {
            if (index === usedRef.length - 1) {
              return (
                <div key={index} className='usedCard text_center large'>
                  {item}
                </div>
              )
            }
            if (index === usedRef.length - 2 || index === usedRef.length - 3) {
              return (
                <div key={index} className='usedCard text_center small'>
                  {item}
                </div>
              )
            }
          })}
      </div>
      <div className='openCardList'>
        {queryRef &&
          queryRef.map((item, index) => {
            // indexをstring型からnumber型に変換
            const key = Number(index)
            if (item.open) {
              return (
                <div
                  key={index}
                  onClick={() => useCard(key)}
                  className='questionCard text_center'
                >
                  {item.text}
                </div>
              )
            }
            return null
          })}
      </div>
    </StyledQuestionCard>
  )
}

export default QuestionCard

const StyledQuestionCard = styled.div`
  margin: 0 5rem;
  .openCardList {
    display: flex;
    flex-wrap: wrap;
    user-select: none;
  }
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

  .usedCard {
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
  }
  .usedCardList {
    display: flex;
    align-items: flex-end;
  }
  .large {
    width: 40rem;
    height: 20rem;
    font-size: 4rem;
  }
  .small {
    width: 10rem;
    height: 5rem;
    font-size: 1rem;
    order: 1;
    opacity: 0.8;
    &:first-child {
      order: 2;
      opacity: 0.5;
    }
  }
`
