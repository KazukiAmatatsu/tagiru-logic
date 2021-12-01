import { FC, useState } from 'react'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useUser } from 'src/recoil/hooks/useUser'
import { useRecoilState } from 'recoil'
import { numberStatus, StatusIsOpen } from 'src/recoil/atom'
import { Modal } from 'src/components/templates'
import { Hand } from 'src/types'
import styled from 'styled-components'

const NumberStatus: FC = () => {
  const room = useRoom()
  const user = useUser()
  const playerRef = room.player[user.key]
  const [numCards, setNumCards] = useRecoilState(numberStatus)
  const [isOpen, setIsOpen] = useRecoilState(StatusIsOpen)
  const [card, setCard] = useState<Hand>({
    number: 0,
    color: '',
    open: false,
  })

  // const defaultOpen = () => {
  //   const newCards = numCards.map((item) => {
  //     playerRef &&
  //       Object.values(playerRef.hands).map((data) => {
  //         if (item === data) {
  //           console.log('aa')
  //           console.log(data)

  //           if (!item.open) return { ...item, open: true }
  //           return { ...item, open: false }
  //         }
  //       })
  //     return item
  //   })
  //   console.log(newCards)
  // }

  // console.log(defaultOpen())

  const numberOpen = (key: number) => {
    const newCards = numCards.map((item, index) => {
      if (index === key) {
        if (!item.open) return { ...item, open: true }
        return { ...item, open: false }
      }
      return item
    })
    setNumCards(newCards)
    // setIsOpen(false)
  }

  return (
    <StyledNumberStatus>
      {isOpen ? (
        <Modal
          size='small'
          isOpen={isOpen}
          closed={() => setIsOpen(false)}
          className='numCards'
        >
          {Object.entries(numCards).map(([index, data]) => {
            const key = Number(index)
            return (
              <StyledCard
                key={key}
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
        </Modal>
      ) : (
        <></>
      )}
    </StyledNumberStatus>
  )
}

export default NumberStatus

const StyledNumberStatus = styled.div`
  .numCards {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 70rem;
  }
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
`
