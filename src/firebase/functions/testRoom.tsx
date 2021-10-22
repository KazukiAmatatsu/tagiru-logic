import { db } from 'src/firebase/config'
import { collection, doc, setDoc } from 'firebase/firestore'
import { numberList, questionsList4Players } from 'src/components/data'
import { Hand, Room } from 'src/types'

export const testRoom = async (input: {
  name?: string
  roomName: string
  password: string
}): Promise<string> => {
  const { name, roomName, password } = input
  const roomRef = collection(db, 'rooms')
  const roomId = '3yn9OXjeFDsKF2cyFayS'
  const roomDoc = doc(roomRef, roomId)
  // /* roomIdを指定しない場合はReferenceを作成して返す */
  // const roomDoc = (roomId?: string) => {
  //   if (roomId) {
  //     return doc(roomRef, roomId)
  //   }
  //   return doc(roomRef)
  // }

  /* 数字タイル */
  let player1 = []
  let player2 = []
  let player3 = []
  let player4 = []
  let dealer = []
  // ランダムに数字タイルを振り分け
  while (numberList.length > 0) {
    const randomNum = Math.floor(Math.random() * numberList.length)
    const pushList = (player: Hand[]) => player.push(numberList[randomNum])
    if (player1.length < 4) pushList(player1)
    else if (player2.length < 4) pushList(player2)
    else if (player3.length < 4) pushList(player3)
    else if (player4.length < 4) pushList(player4)
    else if (dealer.length < 4) pushList(dealer)
    else return null
    numberList.splice(randomNum, 1)
  }
  // 数字タイルを並び替え
  const sortHands = async (player: Hand[]) => {
    player.sort((a: Hand, b: Hand) => {
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

  /* 質問カード */
  // 4人プレイの場合は質問カードリストの一部が変わる
  const questionsList = questionsList4Players
  // ランダムに並び替え
  for (let i = questionsList.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1))
    ;[questionsList[i], questionsList[random]] = [
      questionsList[random],
      questionsList[i],
    ]
  }
  // 初期値として６枚をopenする
  const openQuestionsList = questionsList.map((item, index) => {
    if (index < 6) return { ...item, open: true }
    return item
  })

  // const newRoomRef = roomDoc()
  const initialRoomState: Room = {
    roomId: '3yn9OXjeFDsKF2cyFayS',
    roomName,
    password,
    dealer: dealer,
    player: [
      {
        name: 'testUser',
        isReady: false,
        hands: player1,
      },
      {
        name: 'player1',
        isReady: false,
        hands: player2,
      },
      {
        name: 'player2',
        isReady: false,
        hands: player3,
      },
      {
        name: 'player3',
        isReady: false,
        hands: player4,
      },
    ],
    questions: openQuestionsList,
    usedCards: [],
    state: 'waiting',
  }
  await setDoc(roomDoc, initialRoomState)
  return '3yn9OXjeFDsKF2cyFayS'
}
