import { FC } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import NumberCard from 'src/components/Page/Room/NumberCards/NumberCard'
import styled from 'styled-components'

const Dealer: FC = () => {
  const room = useRoom()
  return (
    <StyledDealer>
      <div className='center_text title'>このカードを当ててください</div>
      <NumberCard hands={room.dealer} />
    </StyledDealer>
  )
}

export default Dealer

const StyledDealer = styled.div`
  width: 30rem;
  padding: 2rem;
  margin: 1rem;
  background-color: ${(props) => props.theme.colors.yellow};
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`
