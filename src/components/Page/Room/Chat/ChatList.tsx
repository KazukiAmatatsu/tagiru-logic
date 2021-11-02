import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { ChatCard } from 'src/components/Page/Room/Chat'
import styled from 'styled-components'

const ChatList: FC = () => {
  const room = useRoom()
  console.log(room.chat)

  return (
    <StyledChatList>
      {room.chat.map((data) => {
        return <ChatCard key={data.id} data={data} />
      })}
    </StyledChatList>
  )
}

export default ChatList

const StyledChatList = styled.div``
