import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { ChatCard } from 'src/components/Page/Room/Chat'
import styled from 'styled-components'

const ChatList: FC = () => {
  const room = useRoom()

  return (
    <StyledChatList>
      {room.chat.map((data, index) => (
        <ChatCard key={index} data={data} />
      ))}
    </StyledChatList>
  )
}

export default ChatList

const StyledChatList = styled.div``
