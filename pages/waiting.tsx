import { NextPage } from 'next'
import Waiting from 'src/components/Page/Waiting'
import styled from 'styled-components'

type WaitingPageProps = {
  className?: string
}

const WaitingPage: NextPage<WaitingPageProps> = ({ className }) => {
  return (
    <StyledWaitingPage className={`${className}`}>
      <h1>Waiting</h1>
      <Waiting />
    </StyledWaitingPage>
  )
}

const StyledWaitingPage = styled.div``

export default WaitingPage
