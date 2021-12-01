import { atom } from 'recoil'
import { numberList } from 'src/components/data'
import { User, Room, Rooms, Hand } from 'src/types'

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

export const numberStatus = atom<Hand[]>({
  key: 'numberCards_status',
  default: numberList,
})

export const StatusIsOpen = atom<boolean>({
  key: 'Status_Modal_isOpen',
  default: false,
})
