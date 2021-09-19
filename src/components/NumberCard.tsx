import { useEffect } from 'react'
import { db } from 'src/firebase'
import { room } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { Room } from 'src/type'
import styled from 'styled-components'

export const numberList = [
  { number: 0, color: '#FF0000', open: false },
  { number: 1, color: '#FF0000', open: false },
  { number: 2, color: '#FF0000', open: false },
  { number: 3, color: '#FF0000', open: false },
  { number: 4, color: '#FF0000', open: false },
  { number: 5, color: '#FFFF00', open: false },
  { number: 6, color: '#FF0000', open: false },
  { number: 7, color: '#FF0000', open: false },
  { number: 8, color: '#FF0000', open: false },
  { number: 9, color: '#FF0000', open: false },
  { number: 0, color: '#0000FF', open: false },
  { number: 1, color: '#0000FF', open: false },
  { number: 2, color: '#0000FF', open: false },
  { number: 3, color: '#0000FF', open: false },
  { number: 4, color: '#0000FF', open: false },
  { number: 5, color: '#FFFF00', open: false },
  { number: 6, color: '#0000FF', open: false },
  { number: 7, color: '#0000FF', open: false },
  { number: 8, color: '#0000FF', open: false },
  { number: 9, color: '#0000FF', open: false },
]

const NumberCard = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  const roomId = db.collection('test').doc().id

  let player1 = []
  let player2 = []
  let player3 = []
  let player4 = []
  let dealer = []

  const setNumberCard = async (numberList: any) => {
    while (numberList.length > 0) {
      // 配列からランダムに取得
      const random = Math.floor(Math.random() * numberList.length)
      // それぞれのPlayerに数字カードを配る
      const pushList = (player: any) => player.push(numberList[random])
      if (player1.length < 4) pushList(player1)
      else if (player2.length < 4) pushList(player2)
      else if (player3.length < 4) pushList(player3)
      else if (player4.length < 4) pushList(player4)
      else if (dealer.length < 4) pushList(dealer)
      else return null
      // 配列から削除する
      numberList.splice(random, 1)
    }
    // 数字の順番に並び替える
    const sortHands = async (player: any) => {
      await player.sort((a, b) => {
        if (a.number !== b.number) {
          if (a.number < b.number) return -1
          if (a.number > b.number) return 1
        }
        if (a.number === b.number) {
          if (a.color === '#FF0000') return -1
          if (a.color === '#0000FF') return 1
        }
        return 0
      })
    }
    await sortHands(player1)
    await sortHands(player2)
    await sortHands(player3)
    await sortHands(player4)
    await sortHands(dealer)
    await testCards()
  }

  const testCards = async () => {
    await db
      .collection('test')
      .doc('2GiL17k1OYYIZb7QvSIZ')
      .set({
        dealer: dealer,
        player: {
          p1: {
            name: 'aaa',
            isReady: false,
            hands: player1,
          },
          p2: {
            name: 'bbb',
            isReady: false,
            hands: player2,
          },
          p3: {
            name: 'ccc',
            isReady: false,
            hands: player3,
          },
          p4: {
            name: 'ddd',
            isReady: false,
            hands: player4,
          },
        },
      })
  }

  const cardOpen = () => {
    const newArr =
      roomInfo.dealer &&
      Object.values(roomInfo.dealer).map((data) => {
        return { ...data, open: true }
      })
    db.collection('test')
      .doc('2GiL17k1OYYIZb7QvSIZ')
      .set({
        ...roomInfo,
        dealer: newArr,
      })
  }

  useEffect(() => {
    db.collection('test')
      .doc('2GiL17k1OYYIZb7QvSIZ')
      .onSnapshot((doc) => {
        const roomDoc = doc.data() as Room
        setRoomInfo(roomDoc)
      })
  }, [])

  return (
    <>
      <button onClick={() => setNumberCard(numberList.slice())}>
        カードを配る
      </button>
      <button onClick={() => cardOpen()}>カードオープン</button>
      <StyledDealer>
        {roomInfo.dealer &&
          Object.entries(roomInfo.dealer).map(([key, data]) => {
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

      {roomInfo.player &&
        Object.entries(roomInfo.player).map(([key, player]) => {
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
  background-color: ${(props) => props.theme.background};
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
