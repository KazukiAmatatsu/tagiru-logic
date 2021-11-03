export type User = {
  name: string
  key: number
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

export type Answer = {
  name: string
  answer: string
}

export type Chat = {
  name: string
  content: string
}

export type Phase = 'waiting' | 'playing' | 'finish'

export type Room = {
  readonly roomId: string
  readonly roomName: string
  readonly password: string
  dealer: Hand[]
  player: Player[]
  questions: Question[]
  chat: Chat[]
  state: Phase
}

export type Rooms = {
  roomId: string
  roomName: string
  password: string
}
