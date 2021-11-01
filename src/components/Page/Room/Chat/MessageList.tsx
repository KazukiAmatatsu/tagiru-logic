import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import styled from 'styled-components'

const MessageList: FC = () => {
  const room = useRoom()
  return <StyledMessageList></StyledMessageList>
}

export default MessageList

const StyledMessageList = styled.div``
