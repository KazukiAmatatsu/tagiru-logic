import { db } from 'src/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useUser } from 'src/recoil/hooks/useUser'
import styled from 'styled-components'

const ReplyQuestion = async () => {
  const room = useRoom()
  const user = useUser()
  const queryRef = room.questions
  const usedRef = room.usedCards
  const roomRef = doc(db, 'rooms', room.roomId)

  let usedCard = ''

  return (
    <StyledUseCard>
      <input type='text' />
    </StyledUseCard>
  )
}

export default ReplyQuestion

const StyledUseCard = styled.div``
