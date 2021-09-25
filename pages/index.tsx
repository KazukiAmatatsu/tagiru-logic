import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { userState } from 'src/recoil/atom'

const Home: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useRecoilState(userState)
  const handleStart = () => {
    if (!user?.name) return alert('⚠️ゲームに使用する名前を決めてください')
    setUser(user)
    router.push({ pathname: '/entrance' })
  }
  return (
    <div>
      <Head>
        <title>タギロン−たぎる論理−</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <input
          type='text'
          placeholder='あなたの名前を入力'
          value={user?.name || ''}
          onChange={(e) => setUser({ ...user, name: e.currentTarget.value })}
          onKeyDown={(e) => {
            if (
              ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) &&
              e.key === 'Enter'
            )
              return handleStart()
          }}
        />
        <button onClick={handleStart}>始める</button>
      </main>

      <footer></footer>
    </div>
  )
}

export default Home
