import { atom } from 'recoil'
import { Room } from 'src/type'

export const room = atom<Room>({
  key: 'room_state',
  default: {
    roomId: '',
    inviteCode: '',
    dealer: null,
    player: {},
    questions: [
      {
        open: false,
        text: '',
      },
    ],
    usedCards: [],
    isGaming: false,
    finished: false,
    loading: false,
  },
})
