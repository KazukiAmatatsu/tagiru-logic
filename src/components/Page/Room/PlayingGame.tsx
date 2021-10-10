import React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import QuestionCard from 'src/components/Page/Room/QuestionCards/QuestionCard'
import Dealer from 'src/components/Page/Room/NumberCards/Dealer'
import { useRoom } from 'src/recoil/hooks/useRoom'
import Players from 'src/components/Page/Room/NumberCards/Players'

const PlayingGame: FC = () => {
  const room = useRoom()
  return (
    <StyledPlayingGame>
      {/* <QuestionCard /> */}
      <Dealer />
      <Players />
    </StyledPlayingGame>
  )
}

export default PlayingGame

const StyledPlayingGame = styled.div``
