import { db } from 'src/firebase'
import { room } from 'src/recoil/atom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

const QuestionCard = () => {
  const roomInfo = useRecoilValue(room)
  const roomRef = db.collection('test').doc('2GiL17k1OYYIZb7QvSIZ')
  const queryRef = roomInfo.questions

  const questionsList = [
    { used: false, open: false, text: '０はどこ？' },
    {
      used: false,
      open: false,
      text: '１または２はどこ？\n（どちらか選ぶ）',
    },
    {
      used: false,
      open: false,
      text: '３または４はどこ？\n（どちらか選ぶ）',
    },
    { used: false, open: false, text: '５はどこ？' },
    {
      used: false,
      open: false,
      text: '６または７はどこ？\n（どちらか選ぶ）',
    },
    {
      used: false,
      open: false,
      text: '８または９はどこ？\n（どちらか選ぶ）',
    },
    { used: false, open: false, text: '偶数は何枚ある？\n（０も含む）' },
    { used: false, open: false, text: '奇数は何枚ある？' },
    { used: false, open: false, text: '赤の数字タイルは\n何枚ある？' },
    { used: false, open: false, text: '青の数字タイルは\n何枚ある？' },
    { used: false, open: false, text: '赤の数の合計は？' },
    { used: false, open: false, text: '青の数の合計は？' },
    { used: false, open: false, text: '小さいほうから\n３枚の合計は？' },
    { used: false, open: false, text: '中央の３枚の合計は？' },
    { used: false, open: false, text: '大きいほうから\n３枚の合計は？' },
    {
      used: false,
      open: false,
      text: '［共有情報カード］\n数字タイルすべての\n数の合計は？',
    },
    {
      used: false,
      open: false,
      text: '［共有情報カード］\n中央の数字タイルは\n５以上？４以下？',
    },
    {
      used: false,
      open: false,
      text: '［共有情報カード］\n数字タイルの\n最大から最小の\n数を引いた数は？',
    },
    {
      used: false,
      open: false,
      text: '数字が連続している\n数字タイルはどこ？',
    },
    { used: false, open: false, text: '同じ数字タイルの\nペアは何組ある？' },
    {
      used: false,
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
    })
  }

  const usedCards = (key: number) => {
    // 次の質問カードの位置を取得
    const newCard = queryRef.findIndex((item) => !item.open && !item.used)
    // 新しい配列を作ってデータを書き換え
    const newCards = queryRef.map((item, index) => {
      if (index === key) return { ...item, used: true, open: false }
      if (index === newCard) return { ...item, open: true }
      return item
    })
    roomRef.update({
      questions: newCards,
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
      <StyledCardList>
        {queryRef &&
          queryRef.map((item, index) => {
            // indexをstring型からnumber型に変換
            const key = Number(index)
            if (item.open === true && item.used === false) {
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
      </StyledCardList>
    </div>
  )
}

export default QuestionCard

const StyledCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 5rem;
  user-select: none; /* CSS3 */
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Safari、Chromeなど */
  -ms-user-select: none; /* IE10かららしい */
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
  }
`
