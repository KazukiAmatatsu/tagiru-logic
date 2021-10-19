import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import styled from 'styled-components'

const UsedCards: FC = () => {
  const room = useRoom()
  const usedCards = room.usedCards
  return (
    <StyledUsedCards>
      {usedCards &&
        Object.entries(usedCards).map(([key, data]) => {
          console.log(key)
          console.log(data)
        })}
    </StyledUsedCards>
  )
}

export default UsedCards

const StyledUsedCards = styled.div``
