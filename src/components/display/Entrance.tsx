import { useState } from 'react'
import { createRoom } from 'src/firebase/functions/createRoom'
import { userState } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Entrance = () => {
  const [password, setPassword] = useState<string>()
  const [user, setUser] = useRecoilState(userState)
  const router = useRouter()

  const createRoomHandler = async () => {
    const roomId = await createRoom({
      name: user.name,
      password: Number(password),
    })
    router.push({ pathname: `/${roomId}` })
  }
  return (
    <>
      <label htmlFor='name'>なまえ：</label>
      <input
        id='name'
        type='text'
        placeholder='あなたの名前を入力'
        value={user?.name || ''}
        onChange={(e) => setUser({ ...user, name: e.currentTarget.value })}
      />
      <input
        id='password'
        type='text'
        placeholder='部屋のパスワードを設定'
        // value={user?.name || ''}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button onClick={createRoomHandler}>部屋を作る</button>
    </>
  )
}

export default Entrance
