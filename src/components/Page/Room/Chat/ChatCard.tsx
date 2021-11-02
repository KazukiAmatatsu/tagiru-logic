import { VFC } from 'react'
import { Chat } from 'src/types'
import styled from 'styled-components'

type ChatCardProps = {
  className?: string
  data: Chat
}

export const ChatCard: VFC<ChatCardProps> = ({ className, data }) => {
  const { id, name, content, sendTime } = data
  return (
    <StyledChatCard className={`${className}`}>
      {name}:{content}
    </StyledChatCard>
  )
}

const StyledChatCard = styled.div``
