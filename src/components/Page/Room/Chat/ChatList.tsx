import { FC, useRef, useEffect } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useUser } from 'src/recoil/hooks/useUser'
import ChatCard from 'src/components/Page/Room/Chat/ChatCard'
import { ArrowDown } from 'akar-icons'
import styled from 'styled-components'

const ChatList: FC = () => {
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  const room = useRoom()
  const user = useUser()

  useEffect(() => {
    scrollBottom()
  }, [room.chat])

  const scrollBottom = () => {
    scrollBottomRef?.current?.scrollIntoView()
  }

  return (
    <StyledChatList>
      <div className='scrollBody'>
        {room.chat.map((data, index) => {
          return <ChatCard key={index} data={data} user={user} />
        })}
        <div ref={scrollBottomRef} />
      </div>
      <div className='stickyContainer'>
        <div className='scrollBtn' onClick={() => scrollBottom()}>
          <ArrowDown size={24} />
        </div>
      </div>
    </StyledChatList>
  )
}

export default ChatList

const StyledChatList = styled.ul`
  background-color: ${(props) => props.theme.line.background};
  height: 100%;
  overflow-y: scroll;
  position: relative;

  .scrollBody {
    width: 100%;
    padding: 1rem 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }

  .stickyContainer {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    & > * {
      pointer-events: auto;
    }
  }
  .scrollBtn {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0 0.5rem 0.5rem auto;

    width: 3rem;
    height: 3rem;
    background-color: #fff;
    border-radius: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
  }
`
