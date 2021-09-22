export type User = {
  name: string
  playerId: string
}

export type Hand = {
  number: number
  color: string
  open: boolean
}

export type Player = {
  name: string
  isReady: boolean
  hands: Hand[] | undefined
}

export type Question = {
  open: boolean
  text: any
}

export type Room = {
  readonly roomId: string
  password: number
  dealer: Hand[] | undefined
  player: Player[]
  questions: Question[]
  usedCards: []
  isGaming: boolean
  finished: boolean
  loading: boolean
}
