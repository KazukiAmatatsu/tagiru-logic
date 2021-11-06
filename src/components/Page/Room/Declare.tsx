import { useState } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { numberList } from 'src/components/data'
import { Hand } from 'src/types'
import styled from 'styled-components'

const Declare = () => {
  const [numCards, setNumCards] = useState(numberList)
  const [declareCards, setDeclareCards] = useState<Hand[]>()
  const room = useRoom()

  const numberOpen = (key: number) => {
    const newCards = numCards.map((item, index) => {
      if (index === key) {
        if (!item.open) {
          return { ...item, open: true }
        } else if (item.open) {
          return { ...item, open: false }
        }
      }
      return item
    })
    setNumCards(newCards)
  }

  const checkAnswer = (a: Hand[], b: Hand[]) => {
    let i = a.length
    if (i !== b.length) return false
    while (i--) {
      if (a[i].number !== b[i].number) return false
    }
    while (i--) {
      if (a[i].color !== b[i].color) return false
    }
    return true
  }

  const result = () => {
    const openCards = numCards.filter((item) => item.open === true)
    openCards.sort((a: Hand, b: Hand) => {
      if (a.number !== b.number) {
        if (a.number < b.number) return -1
        if (a.number > b.number) return 1
      }
      if (a.number === b.number) {
        if (a.color === '#FF0000') return -1
        if (a.color === '#0000FF') return 1
      }
      return 0
    })
    setDeclareCards(openCards)
    console.log(checkAnswer(declareCards, room.dealer))
  }

  return (
    <>
      <StyledCards>
        {Object.entries(numCards).map(([index, data]) => {
          const key = Number(index)
          return (
            <StyledCard
              key={index}
              yellow={data.color === '#FFFF00'}
              open={data.open}
              onClick={() => numberOpen(key)}
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
      <button onClick={() => result()}>答え合わせ</button>
    </>
  )
}

export default Declare

const StyledCards = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 70rem;
`

const StyledCard = styled.div<{ yellow: boolean; open: boolean }>`
  width: 6rem;
  height: 8rem;
  margin: 0.5rem;
  background-color: ${(props) => props.theme.color};
  position: relative;
  border-radius: 0.5rem;
  filter: grayscale(${(props) => (props.open ? '100%' : '0%')});
  opacity: ${(props) => (props.open ? '0.3' : '1')};
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
