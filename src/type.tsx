export type Hands = [{ number: number; color: string }]

export type Player = {
  name: string
  isReady: boolean
  hands: Hands | undefined
}

export type Room = {
  readonly roomId: string
  readonly inviteCode: string
  player1: Player
  player2: Player
  player3: Player
  player4: Player
  isGaming: boolean
  finished: boolean
  loading: boolean
}
