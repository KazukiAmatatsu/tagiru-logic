import { useRoom } from 'src/recoil/hooks/useRoom'
import { useUser } from 'src/recoil/hooks/useUser'
import styled from 'styled-components'

const NumberCard = () => {
  const room = useRoom()
  const user = useUser()
  const playerRef = room.player

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
      <StyledDealer>
        {room.dealer &&
          Object.entries(room.dealer).map(([key, data]) => {
            return (
              <StyledCard key={key} yellow={data.color === '#FFFF00'}>
                {data.open ? (
                  <div
                    style={{ backgroundColor: data.color }}
                    className='card_color'
                  >
                    <div className='card_num'>{data.number}</div>
                  </div>
                ) : (
                  <div key={key} className='text'>
                    TAGIRON
                  </div>
                )}
              </StyledCard>
            )
          })}
      </StyledDealer>
      <div>このカードを当ててください</div>

      {handsList &&
        Object.entries(handsList).map(([key, player]) => {
          return (
            <StyledPlayerCards key={key}>
              <div className='Cards'>
                {Object.entries(player.hands).map(([key, data]) => {
                  return (
                    <StyledCard key={key} yellow={data.color === '#FFFF00'}>
                      {data.open ? (
                        <div
                          style={{ backgroundColor: data.color }}
                          className='card_color'
                        >
                          <div className='card_num'>{data.number}</div>
                        </div>
                      ) : (
                        <div key={key} className='text'>
                          TAGIRON
                        </div>
                      )}
                    </StyledCard>
                  )
                })}
              </div>
              <div className='playerName text_center'>{player.name}</div>
            </StyledPlayerCards>
          )
        })}
    </>
  )
}

export default NumberCard

const StyledDealer = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: space-between;
  width: 30rem;
  padding: 2rem;
  margin: 1rem;
  background-color: ${(props) => props.theme.colors.yellow};
  /* background-color: ${(props) => props.theme.background}; */
`

const StyledPlayerCards = styled.div`
  padding: 2rem;
  width: 30rem;
  background-color: ${(props) => props.theme.background};
  margin: 1rem;
  .playerName {
    font-size: 3rem;
    color: #333;
    margin-top: 1rem;
  }
  .Cards {
    display: flex;
    justify-content: space-between;
  }
`

const StyledCard = styled.div<{ yellow: boolean }>`
  width: 6rem;
  height: 8rem;
  background-color: ${(props) => props.theme.color};
  position: relative;
  border-radius: 0.5rem;
  .card_color {
    width: 4rem;
    height: 4rem;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 2rem;
  }
  .card_num {
    color: ${(props) => (props.yellow ? '#333' : '#fff')};
    line-height: 4rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
  }
  .text {
    font-size: 0.1rem;
    color: #fff;
    line-height: 8rem;
    text-align: center;
  }
`
