export type Hands = [{ number: number; color: string }]

export type Player = {
  name: string
  isReady: boolean
  hands: Hands | undefined
}
export type Question = [
  {
    open: boolean
    text: string | any
  }
]

export type Room = {
  readonly roomId: string
  readonly inviteCode: string
  player1: Player
  player2: Player
  player3: Player
  player4: Player
  questions: Question
  usedCards: []
  isGaming: boolean
  finished: boolean
  loading: boolean
}
