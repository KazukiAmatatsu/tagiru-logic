export type Hands = [{ number: number; color: string }]

export type Player = {
  [id: string]: {
    name: string
    isReady: boolean
    hands: Hands | undefined
  }
}

export type Dealer = {
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
  dealer: Hands | undefined
  player: Player
  questions: Question
  usedCards: []
  isGaming: boolean
  finished: boolean
  loading: boolean
}
