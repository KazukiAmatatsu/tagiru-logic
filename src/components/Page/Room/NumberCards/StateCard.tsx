import { FC, useState } from 'react'
import styled from 'styled-components'

const StateCard: FC = () => {
  const [number, setNumber] = useState<number>(0)
  const [key, setKey] = useState<number>(0)
  const colors = ['', '#FF3300', '#0000FF', '#FFFF00']
  const color = colors[key]

  const changeColor = () => {
    if (key === 3) setKey(0)
    else setKey(key + 1)
  }

  // 数字どう変化させる？

  return (
    <StyledStateCard yellow={color === '#FFFF00'} onClick={() => changeColor()}>
      {color !== '' ? (
        <div style={{ backgroundColor: color }} className='card_color'>
          <div className='card_num'>{number}</div>
        </div>
      ) : (
        <div className='text'>TAGIRON</div>
      )}
    </StyledStateCard>
  )
}

export default StateCard

const StyledStateCard = styled.div<{ yellow: boolean }>`
  width: 6rem;
  height: 8rem;
  background-color: ${(props) => props.theme.color};
  position: relative;
  border-radius: 0.5rem;
  .card_color {
    width: 5rem;
    height: 5rem;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
  }
  .card_num {
    color: ${(props) => (props.yellow ? '#333' : '#fff')};
    line-height: 5rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
  }
  .text {
    color: #fff;
    font-size: 0.1rem;
    line-height: 8rem;
    font-weight: bold;
    text-align: center;
    user-select: none;
  }
`
