import { db } from 'src/firebase'
import { room } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'

const QuestionCard = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(room)
  const roomRef = db.collection('test').doc('2GiL17k1OYYIZb7QvSIZ')
  const queryRef = roomInfo.questions

  const questionsList = [
    { used: false, open: false, text: '０はどこ？' },
    {
      used: false,
      open: false,
      text: '１または２はどこ？（どちらかひとつ選ぶ）',
    },
    {
      used: false,
      open: false,
      text: '３または４はどこ？（どちらかひとつ選ぶ）',
    },
    { used: false, open: false, text: '５はどこ？' },
    {
      used: false,
      open: false,
      text: '６または７はどこ？（どちらかひとつ選ぶ）',
    },
    {
      used: false,
      open: false,
      text: '８または９はどこ？（どちらかひとつ選ぶ）',
    },
    { used: false, open: false, text: '偶数は何枚ある？（０も含む）' },
    { used: false, open: false, text: '奇数は何枚ある？' },
    { used: false, open: false, text: '赤の数字タイルは何枚ある？' },
    { used: false, open: false, text: '青の数字タイルは何枚ある？' },
    { used: false, open: false, text: '赤の数の合計は？' },
    { used: false, open: false, text: '青の数の合計は？' },
    { used: false, open: false, text: '小さいほうから３枚の合計は？' },
    { used: false, open: false, text: '中央の３枚の合計は？' },
    { used: false, open: false, text: '大きいほうから３枚の合計は？' },
    {
      used: false,
      open: false,
      text: '［共有情報カード］数字タイルすべての数の合計は？',
    },
    {
      used: false,
      open: false,
      text: '［共有情報カード］中央の数字タイルは５以上？４以下？',
    },
    {
      used: false,
      open: false,
      text: '［共有情報カード］数字タイルの最大の数から、最小の数を引いた数は？',
    },
    { used: false, open: false, text: '数字が連続している数字タイルはどこ？' },
    { used: false, open: false, text: '同じ数字タイルのペアは何組ある？' },
    {
      used: false,
      open: false,
      text: '同じ色がとなり合っている数字タイルはどこ？',
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
      <ul>
        {queryRef &&
          queryRef.map((item, index) => {
            // indexをstring型からnumber型に変換
            const key = Number(index)
            if (item.open === true && item.used === false) {
              return (
                <li key={index} onClick={() => usedCards(key)}>
                  {item.text}
                </li>
              )
            }
            return null
          })}
      </ul>
    </div>
  )
}

export default QuestionCard
