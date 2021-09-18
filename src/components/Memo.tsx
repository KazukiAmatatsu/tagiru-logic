import { useState } from 'react'
import styled from 'styled-components'

const Memo = () => {
  const [numCards, setNumCards] = useState([
    { number: 0, color: '#FF0000', used: false },
    { number: 1, color: '#FF0000', used: false },
    { number: 2, color: '#FF0000', used: false },
    { number: 3, color: '#FF0000', used: false },
    { number: 4, color: '#FF0000', used: false },
    { number: 5, color: '#FFFF00', used: false },
    { number: 6, color: '#FF0000', used: false },
    { number: 7, color: '#FF0000', used: false },
    { number: 8, color: '#FF0000', used: false },
    { number: 9, color: '#FF0000', used: false },
    { number: 0, color: '#0000FF', used: false },
    { number: 1, color: '#0000FF', used: false },
    { number: 2, color: '#0000FF', used: false },
    { number: 3, color: '#0000FF', used: false },
    { number: 4, color: '#0000FF', used: false },
    { number: 5, color: '#FFFF00', used: false },
    { number: 6, color: '#0000FF', used: false },
    { number: 7, color: '#0000FF', used: false },
    { number: 8, color: '#0000FF', used: false },
    { number: 9, color: '#0000FF', used: false },
  ])
  const numberUsed = (key: number) => {
    const newCards = numCards.map((item, index) => {
      if (index === key) {
        if (!item.used) return { ...item, used: true }
        else if (item.used) return { ...item, used: false }
      }
      return item
    })
    setNumCards(newCards)
  }

  return (
    <>
      <div>memo</div>
      <StyledCards>
        {Object.entries(numCards).map(([index, data]) => {
          const key = Number(index)
          return (
            <StyledCard
              yellow={data.color === '#FFFF00'}
              used={data.used}
              onClick={() => numberUsed(key)}
            >
              <div
                style={{ backgroundColor: data.color }}
                className='card_color'
              >
                <div className='card_num'>{data.number}</div>
              </div>
            </StyledCard>
          )
        })}
      </StyledCards>
    </>
  )
}

export default Memo

const StyledCards = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 70rem;
`

const StyledCard = styled.div<{ yellow: boolean; used: boolean }>`
  width: 6rem;
  height: 8rem;
  margin: 0.5rem;
  background-color: ${(props) => props.theme.color};
  position: relative;
  border-radius: 0.5rem;
  filter: grayscale(${(props) => (props.used ? '100%' : '0%')});
  opacity: ${(props) => (props.used ? '0.3' : '1')};
  .card_color {
    width: 4rem;
    height: 4rem;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 2rem;
  }
  .card_num {
    color: ${(props) => (props.yellow ? '#333' : '#fff')};
    line-height: 4rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
  }
`
