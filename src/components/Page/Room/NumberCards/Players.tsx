import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import NumberCard from 'src/components/Page/Room/NumberCards/NumberCard'
// import { useUser } from 'src/recoil/hooks/useUser'
import styled from 'styled-components'

const Players: FC = () => {
  const room = useRoom()
  // const user = useUser()
  const user = {
    name: 'テストさん',
    key: 0,
  }
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
    <>
      {handsList &&
        Object.entries(handsList).map(([key, player]) => {
          return (
            <StyledPlayers key={key}>
              <NumberCard hands={player.hands} />
              <div className='center_text playerName '>{player.name}</div>
            </StyledPlayers>
          )
        })}
    </>
  )
}

export default Players

const StyledPlayers = styled.div`
  width: 30rem;
  padding: 2rem;
  margin: 1rem;
  background-color: ${(props) => props.theme.background};
  .playerName {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-top: 1rem;
  }
`
