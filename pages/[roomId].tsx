import { NextPage } from 'next'
import PlayingGame from 'src/components/Page/Room/PlayingGame'
import styled from 'styled-components'

type PlayingRoomPageProps = {
  className?: string
}

const RoomPage: NextPage<PlayingRoomPageProps> = ({ className }) => {
  return (
    <StyledPlayingRoomPage className={`${className}`}>
      <h1>PlayingRoom</h1>
      <PlayingGame />
    </StyledPlayingRoomPage>
  )
}

const StyledPlayingRoomPage = styled.div``

export default RoomPage
