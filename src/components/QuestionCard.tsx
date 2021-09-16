import { firebase, db } from 'src/firebase'
import { room } from 'src/recoil/atom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

const QuestionCard = () => {
  const roomInfo = useRecoilValue(room)
  const roomRef = db.collection('test').doc('2GiL17k1OYYIZb7QvSIZ')
  const queryRef = roomInfo.questions
  const usedRef = roomInfo.usedCards

  const questionsList = [
    { open: false, text: '０はどこ？' },
    {
      open: false,
      text: '１または２はどこ？\n（どちらか選ぶ）',
    },
    {
      open: false,
      text: '３または４はどこ？\n（どちらか選ぶ）',
    },
    { open: false, text: '５はどこ？' },
    {
      open: false,
      text: '６または７はどこ？\n（どちらか選ぶ）',
    },
    {
      open: false,
      text: '８または９はどこ？\n（どちらか選ぶ）',
    },
    { open: false, text: '偶数は何枚ある？\n（０も含む）' },
    { open: false, text: '奇数は何枚ある？' },
    { open: false, text: '赤の数字タイルは\n何枚ある？' },
    { open: false, text: '青の数字タイルは\n何枚ある？' },
    { open: false, text: '赤の数の合計は？' },
    { open: false, text: '青の数の合計は？' },
    { open: false, text: '小さいほうから\n３枚の合計は？' },
    { open: false, text: '中央の３枚の合計は？' },
    { open: false, text: '大きいほうから\n３枚の合計は？' },
    {
      open: false,
      text: '［共有情報カード］\n数字タイルすべての\n数の合計は？',
    },
    {
      open: false,
      text: '［共有情報カード］\n中央の数字タイルは\n５以上？４以下？',
    },
    {
      open: false,
      text: '［共有情報カード］\n数字タイルの\n最大から最小の\n数を引いた数は？',
    },
    {
      open: false,
      text: '数字が連続している\n数字タイルはどこ？',
    },
    { open: false, text: '同じ数字タイルの\nペアは何組ある？' },
    {
      open: false,
      text: '同じ色が\n隣合っている\n数字タイルはどこ？',
    },
  ]

  const setQuestionCards = () => {
    // ランダムに並び替え
    for (let i = questionsList.length - 1; i >= 0; i--) {
      const random = Math.floor(Math.random() * (i + 1))
      ;[questionsList[i], questionsList[random]] = [
        questionsList[random],
        questionsList[i],
      ]
    }
    // 初期値として６枚をopenする
    const newCards = questionsList.map((item, index) => {
      if (index < 6) return { ...item, open: true }
      return item
    })
    roomRef.update({
      questions: newCards,
      usedCards: [],
    })
  }
  const usedCards = (key: number) => {
    let usedCard = ''
    // 次の質問カードの位置を取得
    const newCard = queryRef.findIndex((item) => !item.open)
    // 新しい配列を作ってopenカードを変更
    const changeCards = queryRef.map((item, index) => {
      if (index === newCard) return { ...item, open: true }
      if (index === key) usedCard = item.text
      return item
    })
    // カードを削除
    const newCards = changeCards.filter((item, index) => {
      if (index !== key) return item
    })
    roomRef.update({
      questions: newCards,
      usedCards: firebase.firestore.FieldValue.arrayUnion(usedCard),
    })
  }

  return (
    <div>
      <button
        onClick={() => {
          setQuestionCards()
        }}
      >
        質問カードをセット
      </button>
      <StyledQuestionCards>
        <div className='usedCardList'>
          {usedRef &&
            usedRef.map((item, index) => {
              if (index === usedRef.length - 1) {
                return (
                  <div key={index} className='usedCard text_center large'>
                    {item}
                  </div>
                )
              }
              if (
                index === usedRef.length - 2 ||
                index === usedRef.length - 3
              ) {
                return (
                  <div key={index} className='usedCard text_center small'>
                    {item}
                  </div>
                )
              }
            })}
        </div>
        <div className='openCardList'>
          {queryRef &&
            queryRef.map((item, index) => {
              // indexをstring型からnumber型に変換
              const key = Number(index)
              if (item.open) {
                return (
                  <div
                    key={index}
                    onClick={() => usedCards(key)}
                    className='questionCard text_center'
                  >
                    {item.text}
                  </div>
                )
              }
              return null
            })}
        </div>
      </StyledQuestionCards>
    </div>
  )
}

export default QuestionCard

const StyledQuestionCards = styled.div`
  margin: 0 5rem;
  .openCardList {
    display: flex;
    flex-wrap: wrap;
    user-select: none; /* CSS3 */
    -moz-user-select: none; /* Firefox */
    -webkit-user-select: none; /* Safari、Chromeなど */
    -ms-user-select: none; /* IE10かららしい */
  }
  .questionCard {
    width: 20rem;
    height: 10rem;
    padding: 1rem;
    margin: 2rem;
    font-size: 2rem;
    font-weight: bold;
    white-space: pre-wrap;
    text-shadow: #fff 2px 0, #fff -2px 0, #fff 0 -2px, #fff 0 2px, #fff 2px 2px,
      #fff -2px 2px, #fff 2px -2px, #fff -2px -2px, #fff 1px 2px, #fff -1px 2px,
      #fff 1px -2px, #fff -1px -2px, #fff 2px 1px, #fff -2px 1px, #fff 2px -1px,
      #fff -2px -1px, rgba(0, 0, 0, 0.5) 3px 3px 3px;
    background-color: ${(props) => props.theme.colors.yellow};
    border: 0.8rem solid #333;
    border-radius: 0.5rem;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    transition: 0.2s;
    &:hover {
      box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.5);
      transform: translateY(-5px);
      cursor: pointer;
    }
  }

  .usedCard {
    width: 20rem;
    height: 10rem;
    padding: 1rem;
    margin: 2rem;
    font-size: 2rem;
    font-weight: bold;
    white-space: pre-wrap;
    text-shadow: #fff 2px 0, #fff -2px 0, #fff 0 -2px, #fff 0 2px, #fff 2px 2px,
      #fff -2px 2px, #fff 2px -2px, #fff -2px -2px, #fff 1px 2px, #fff -1px 2px,
      #fff 1px -2px, #fff -1px -2px, #fff 2px 1px, #fff -2px 1px, #fff 2px -1px,
      #fff -2px -1px, rgba(0, 0, 0, 0.5) 3px 3px 3px;
    background-color: ${(props) => props.theme.colors.yellow};
    border: 0.8rem solid #333;
    border-radius: 0.5rem;
  }
  .usedCardList {
    display: flex;
    align-items: flex-end;
  }
  .large {
    width: 40rem;
    height: 20rem;
    font-size: 4rem;
  }
  .small {
    width: 10rem;
    height: 5rem;
    font-size: 1rem;
    order: 1;
    opacity: 0.8;
    &:first-child {
      order: 2;
      opacity: 0.5;
    }
  }
`
