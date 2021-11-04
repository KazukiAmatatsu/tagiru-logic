import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useUser } from 'src/recoil/hooks/useUser'
import { ChatCard } from 'src/components/Page/Room/Chat'
import styled from 'styled-components'

const ChatList: FC = () => {
  const room = useRoom()
  const user = useUser()

  return (
    <StyledChatList>
      {room.chat.map((data, index) => {
        if (data.name === user.name)
          return <ChatCard key={index} data={data} right={true} />
        else return <ChatCard key={index} data={data} right={false} />
      })}
    </StyledChatList>
  )
}

export default ChatList

const StyledChatList = styled.div`
  background-color: ${(props) => props.theme.line.background};
  padding: 1rem 0;
  width: 30%;
  height: 50rem;
  overflow-y: scroll;
`
