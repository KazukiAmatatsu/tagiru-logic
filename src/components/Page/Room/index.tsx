import { FC } from 'react'
import {
  OpenCards,
  UsedCards,
  QuestionCard,
} from 'src/components/Page/Room/QuestionCards'
import { Dealer, Players } from 'src/components/Page/Room/NumberCards'
import { MessageList, MessageCard } from 'src/components/Page/Room/Chat'
import styled from 'styled-components'

const Room: FC = () => {
  return (
    <StyledRoom>
      <MessageList />
      <MessageCard />
      {/* <QuestionCard /> */}
      {/* <OpenCards /> */}
      {/* <UsedCards /> */}
      {/* <Dealer /> */}
      {/* <Players />s */}
    </StyledRoom>
  )
}

export default Room

const StyledRoom = styled.div``
