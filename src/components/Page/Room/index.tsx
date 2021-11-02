import { FC } from 'react'
import { OpenCards } from 'src/components/Page/Room/QuestionCards'
import { Dealer, Players } from 'src/components/Page/Room/NumberCards'
import { ChatList, PostForm } from 'src/components/Page/Room/Chat'
import styled from 'styled-components'

const Room: FC = () => {
  return (
    <StyledRoom>
      <PostForm />
      <ChatList />
      {/* <OpenCards /> */}
      {/* <Dealer /> */}
      {/* <Players />s */}
    </StyledRoom>
  )
}

export default Room

const StyledRoom = styled.div``
