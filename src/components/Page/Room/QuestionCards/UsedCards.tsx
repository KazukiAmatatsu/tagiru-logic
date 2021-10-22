import { FC, useState } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import AnswerQuestion from 'src/components/Page/Room/QuestionCards/AnswerQuestion'
import styled from 'styled-components'

const UsedCards: FC = () => {
  const room = useRoom()
  const usedCards = room.usedCards
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <StyledUsedCards>
      {usedCards &&
        Object.entries(usedCards).map(([key, data]) => {
          console.log(key)
          console.log(data)
          return (
            <>
              <div onClick={() => setIsOpen(!isOpen)}>{key}</div>
              {isOpen ? <AnswerQuestion cardText={key} /> : <></>}
              {/* <div>{data.name}</div>
              <div>{data.answer}</div> */}
            </>
          )
        })}
    </StyledUsedCards>
  )
}

export default UsedCards

const StyledUsedCards = styled.div``
