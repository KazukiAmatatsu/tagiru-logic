import { NextPage } from 'next'
import PlayingGame from 'src/components/Page/Room/PlayingGame'
import { testRoom } from 'src/firebase/functions/testRoom'
import styled from 'styled-components'

type PlayingRoomPageProps = {
  className?: string
}

const RoomPage: NextPage<PlayingRoomPageProps> = ({ className }) => {
  return (
    <StyledPlayingRoomPage className={`${className}`}>
      <h1>PlayingRoom</h1>
      <button
        onClick={() => testRoom({ roomName: 'テストルーム', password: '1111' })}
      >
        部屋リセット
      </button>
      <PlayingGame />
    </StyledPlayingRoomPage>
  )
}

const StyledPlayingRoomPage = styled.div``

export default RoomPage
