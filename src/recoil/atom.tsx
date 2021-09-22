import { atom } from 'recoil'
import { User, Room } from 'src/type'

export const userState = atom<User>({
  key: 'user_state',
  default: {
    name: '',
    playerId: '',
  },
})

export const roomState = atom<Room>({
  key: 'room_state',
  default: {
    roomId: '',
    password: undefined,
    dealer: undefined,
    player: undefined,
    questions: undefined,
    usedCards: [],
    isGaming: false,
    finished: false,
    loading: false,
  },
})
