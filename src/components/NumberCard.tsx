import { useEffect } from 'react'
import { db } from 'src/firebase'
import { room } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { Room } from 'src/type'
import styled from 'styled-components'

const NumberCard = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  const handsRef = roomInfo.player1.hands
  const roomId = db.collection('test').doc().id
  const numberList = [
    { number: 0, color: 'red' },
    { number: 0, color: 'blue' },
    { number: 1, color: 'red' },
    { number: 1, color: 'blue' },
    { number: 2, color: 'red' },
    { number: 2, color: 'blue' },
    { number: 3, color: 'red' },
    { number: 3, color: 'blue' },
    { number: 4, color: 'red' },
    { number: 4, color: 'blue' },
    { number: 5, color: 'yellow' },
    { number: 5, color: 'yellow' },
    { number: 6, color: 'red' },
    { number: 6, color: 'blue' },
    { number: 7, color: 'red' },
    { number: 7, color: 'blue' },
    { number: 8, color: 'red' },
    { number: 8, color: 'blue' },
    { number: 9, color: 'red' },
    { number: 9, color: 'blue' },
  ]

  let player1 = []
  let player2 = []
  let player3 = []
  let player4 = []

  const setNumberCard = async (numberList: any) => {
    while (numberList.length > 0) {
      // 配列からランダムに取得
      const random = Math.floor(Math.random() * numberList.length)
      // それぞれのPlayerに数字カードを配る
      const pushList = (player: any) => player.push(numberList[random])
      if (player1.length < 5) pushList(player1)
      else if (player2.length < 5) pushList(player2)
      else if (player3.length < 5) pushList(player3)
      else if (player4.length < 5) pushList(player4)
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
          if (a.color === 'red') return -1
          if (a.color === 'blue') return 1
        }
        return 0
      })
    }
    await sortHands(player1)
    await sortHands(player2)
    await sortHands(player3)
    await sortHands(player4)
    await testCards()
  }

  const testCards = async () => {
    await db
      .collection('test')
      .doc('2GiL17k1OYYIZb7QvSIZ')
      .set({
        player1: {
          name: '',
          isReady: false,
          hands: player1,
        },
        player2: {
          name: '',
          isReady: false,
          hands: player2,
        },
        player3: {
          name: '',
          isReady: false,
          hands: player3,
        },
        player4: {
          name: '',
          isReady: false,
          hands: player4,
        },
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
      <StyledBox>
        {handsRef &&
          Object.entries(handsRef).map(([key, data]) => {
            return (
              <StyledCard key={key} style={{ backgroundColor: data.color }}>
                <div>{data.number}</div>
              </StyledCard>
            )
          })}
        <br />
        {roomInfo.player2.hands &&
          Object.entries(roomInfo.player2.hands).map(([key, data]) => {
            return (
              <StyledCard key={key} style={{ backgroundColor: data.color }}>
                <div>{data.number}</div>
              </StyledCard>
            )
          })}
        <br />
        {roomInfo.player3.hands &&
          Object.entries(roomInfo.player3.hands).map(([key, data]) => {
            return (
              <StyledCard key={key} style={{ backgroundColor: data.color }}>
                <div>{data.number}</div>
              </StyledCard>
            )
          })}
        <br />
        {roomInfo.player4.hands &&
          Object.entries(roomInfo.player4.hands).map(([key, data]) => {
            return (
              <StyledCard key={key} style={{ backgroundColor: data.color }}>
                <div>{data.number}</div>
              </StyledCard>
            )
          })}
      </StyledBox>
    </>
  )
}

export default NumberCard

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background-color: #f0f0f0;
`

const StyledCard = styled.div`
  width: 30px;
  height: 30px;
  color: #fff;
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
`
