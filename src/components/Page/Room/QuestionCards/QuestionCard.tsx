import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { selectQuestion } from 'src/firebase/functions/selectQuestion'
import styled from 'styled-components'

const QuestionCard: FC = () => {
  const room = useRoom()
  const queryRef = room.questions

  return (
    <StyledQuestionCard>
      {queryRef &&
        queryRef.map((item, index) => {
          // indexをstring型からnumber型に変換
          const key = Number(index)
          if (item.open) {
            return (
              <div
                key={key}
                onClick={() =>
                  selectQuestion({
                    key,
                    questions: queryRef,
                    roomId: room.roomId,
                  })
                }
                className='questionCard center_text'
              >
                {item.text}
              </div>
            )
          }
          return null
        })}
    </StyledQuestionCard>
  )
}

export default QuestionCard

const StyledQuestionCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  width: 76.8rem; // questionCard1枚のwidthが256 * 3
  .questionCard {
    width: 20rem;
    height: 10rem;
    padding: 1rem;
    margin: 1rem;
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
