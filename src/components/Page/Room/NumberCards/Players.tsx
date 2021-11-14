import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useUser } from 'src/recoil/hooks/useUser'
import { NumberCard } from 'src/components/Page/Room/NumberCards'
import { useRecoilState } from 'recoil'
import { numberStatus } from 'src/recoil/atom'
import styled from 'styled-components'

const Players: FC = () => {
  const room = useRoom()
  const user = useUser()
  const playerRef = room.player

  const [numCards, setNumCards] = useRecoilState(numberStatus)

  // 自分のカードだけ表示する&自分のカードをStatusから使用済みにする
  const handsList =
    playerRef &&
    Object.entries(playerRef).map(([key, player]) => {
      if (Number(key) === user.key) {
        const newArr = Object.values(player.hands).map((data) => {
          // 自分のカードをnumCardsで使用済みにする
          const newStatus = Object.values(numCards).map((item) => {
            if (data === item) return { ...item, open: true }
            return item
          })
          // setNumCards(newStatus)
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
