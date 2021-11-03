import { VFC } from 'react'
import { Chat } from 'src/types'
import styled from 'styled-components'

type ChatCardProps = {
  className?: string
  data: Chat
}

const ChatCard: VFC<ChatCardProps> = ({ className, data }) => {
  const { name, content, date, time } = data

  return (
    <StyledChatCard className={`${className}`}>
      {name}：{content}
      {date} {time}
    </StyledChatCard>
  )
}

export default ChatCard

const StyledChatCard = styled.div``
