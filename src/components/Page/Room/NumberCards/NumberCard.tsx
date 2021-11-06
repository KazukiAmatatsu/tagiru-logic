import { VFC } from 'react'
import { Hand } from 'src/types'
import styled from 'styled-components'

type NumberCardProps = {
  hands: Hand[]
}

const NumberCard: VFC<NumberCardProps> = ({ hands }) => {
  return (
    <div className='jcsb'>
      {hands &&
        Object.entries(hands).map(([key, data]) => {
          return (
            <StyledNumberCard key={key} yellow={data.color === '#FFFF00'}>
              {data.open ? (
                <div
                  style={{ backgroundColor: data.color }}
                  className='card_color'
                >
                  <div className='card_num'>{data.number}</div>
                </div>
              ) : (
                <div key={key} className='text'>
                  TAGIRON
                </div>
              )}
            </StyledNumberCard>
          )
        })}
    </div>
  )
}

export default NumberCard

const StyledNumberCard = styled.div<{ yellow: boolean }>`
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
  }
`
