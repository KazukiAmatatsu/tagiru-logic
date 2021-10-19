import React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { OpenCards } from 'src/components/Page/Room/QuestionCards'
import { Dealer, Players } from 'src/components/Page/Room/NumberCards'

const PlayingGame: FC = () => {
  return (
    <StyledPlayingGame>
      {/* <QuestionCard /> */}
      {/* <Dealer /> */}
      {/* <Players /> */}
    </StyledPlayingGame>
  )
}

export default PlayingGame

const StyledPlayingGame = styled.div``
