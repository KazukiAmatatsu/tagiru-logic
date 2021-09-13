import { atom } from 'recoil'
import { Room } from 'src/type'

export const room = atom<Room>({
  key: 'room_state',
  default: {
    roomId: '',
    inviteCode: '',
    player1: {
      name: '',
      isReady: false,
      hands: null,
    },
    player2: {
      name: '',
      isReady: false,
      hands: null,
    },
    player3: {
      name: '',
      isReady: false,
      hands: null,
    },
    player4: {
      name: '',
      isReady: false,
      hands: null,
    },
    questions: [
      {
        used: false,
        open: false,
        text: '',
      },
    ],
    isGaming: false,
    finished: false,
    loading: false,
  },
})
