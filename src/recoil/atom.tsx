import { atom } from 'recoil'
import { User, Room, Rooms } from 'src/types'

export const userState = atom<User>({
  key: 'user_state',
  default: {
    name: '',
    key: null,
  },
})

export const roomState = atom<Room>({
  key: 'room_state',
  default: {
    roomId: '',
    roomName: '',
    password: '',
    dealer: [],
    player: [],
    questions: [],
    chat: [],
    state: 'waiting',
  },
})

export const rooms = atom<Rooms[]>({
  key: 'roomsList',
  default: [
    {
      roomId: '',
      roomName: '',
      password: '',
    },
  ],
})
