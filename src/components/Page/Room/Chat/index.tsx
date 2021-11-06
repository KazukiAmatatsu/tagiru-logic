import { FC } from 'react'
import ChatList from 'src/components/Page/Room/Chat/ChatList'
import PostForm from 'src/components/Page/Room/Chat/PostForm'
import styled from 'styled-components'

const Chat: FC = () => {
  return (
    <StyledChat>
      <ChatList />
      <PostForm />
    </StyledChat>
  )
}

export default Chat

const StyledChat = styled.div`
  width: 31.5rem; /* 300pxにスクロールバーの15pxを足した */
  height: calc(100vh - 28rem);
  /* 最後に100vhからヘッダーのheightを引く */
`
