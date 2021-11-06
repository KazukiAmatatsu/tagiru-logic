import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import NumberCard from 'src/components/Page/Room/NumberCards/NumberCard'
import { useUser } from 'src/recoil/hooks/useUser'
import styled from 'styled-components'

const Players: FC = () => {
  const room = useRoom()
  const user = useUser()
  const playerRef = room.player

  // 自分のカードだけ表示する
  const handsList =
    playerRef &&
    Object.entries(playerRef).map(([key, player]) => {
      if (Number(key) === user.key) {
        const newArr = Object.values(player.hands).map((data) => {
          return { ...data, open: true }
        })
        return { ...player, hands: newArr }
      }
      return player
    })

  return (
    <StyledPlayers>
      {handsList &&
        Object.entries(handsList).map(([key, player]) => {
          return (
            <div
              className='playerCard'
              key={key}
              style={{ backgroundColor: player.color }}
            >
              <div className='playerCard_name center_text'>{player.name}</div>
              <NumberCard hands={player.hands} />
            </div>
          )
        })}
    </StyledPlayers>
  )
}

export default Players

const StyledPlayers = styled.div`
  width: 66rem;
  padding: 2rem;
  /* background-color: ${(props) => props.theme.background}; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .playerCard {
    width: 26rem;
    padding: 2rem;
    margin: 1rem;
    background-color: #fff;
  }
  .playerCard_name {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }
`
