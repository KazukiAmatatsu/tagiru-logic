import { FC } from 'react'
import QuestionCard from 'src/components/Page/Room/QuestionCards/QuestionCard'
import { Dealer, Players } from 'src/components/Page/Room/NumberCards'
import { ChatList, PostForm } from 'src/components/Page/Room/Chat'
import styled from 'styled-components'

const Room: FC = () => {
  return (
    <StyledRoom>
      <QuestionCard />
      <PostForm />
      <ChatList />
      {/* <Dealer /> */}
      {/* <Players />s */}
    </StyledRoom>
  )
}

export default Room

const StyledRoom = styled.div``
