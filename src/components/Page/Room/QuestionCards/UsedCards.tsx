import { FC, useState } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import AnswerQuestion from 'src/components/Page/Room/QuestionCards/AnswerQuestion'
import styled from 'styled-components'

/*
  チャット形式で表示させる
*/

const UsedCards: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const room = useRoom()
  const usedCards = room.usedCards
  return (
    <StyledUsedCards>
      {usedCards &&
        Object.entries(usedCards).map(([text, data]) => {
          console.log(text)
          console.log(data)
          return (
            <div>
              <div onClick={() => setIsOpen(!isOpen)}>{text}</div>
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    {item.name}:{item.answer}
                  </div>
                )
              })}
              {/* {isOpen ? <AnswerQuestion cardText={text} /> : <></>} */}
              <br />
            </div>
          )
        })}
    </StyledUsedCards>
  )
}

export default UsedCards

const StyledUsedCards = styled.div``
