import { FC } from 'react'
import QuestionCard from 'src/components/Page/Room/QuestionCards'
import { Dealer, Players } from 'src/components/Page/Room/NumberCards'
import Chat from 'src/components/Page/Room/Chat'
import styled from 'styled-components'

const Room: FC = () => {
  return (
    <StyledRoom>
      <div className='gameBoard'>
        <div className='inner'>
          <Players />
          <QuestionCard />
        </div>
        <div className='inner'>
          <Dealer />
          <Chat />
        </div>
      </div>
    </StyledRoom>
  )
}

export default Room

const StyledRoom = styled.div`
  .gameBoard {
    display: flex;
    justify-content: center;
  }
  /* margin: 0 auto; */
`
