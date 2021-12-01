import { useState } from 'react'
import { createRoom } from 'src/firebase/functions/createRoom'
import { joinRoom } from 'src/firebase/functions/joinRoom'
import { userState } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { roomList } from 'src/recoil/hooks/roomList'
import styled from 'styled-components'

const Waiting = () => {
  const [newRoom, setNewRoom] =
    useState<{ roomName: string; password: string }>()
  const [password, setPassword] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(userState)
  const router = useRouter()

  const createRoomHandler = async () => {
    const roomId = await createRoom({
      name: user.name,
      roomName: newRoom.roomName,
      password: newRoom.password,
    })
    setUser({ ...user, name: user.name, key: 0 })
    router.push({ pathname: `/${roomId}`, query: { key: 0 } })
  }
  const waitingRoom = roomList()
  const joinRoomHandler = async (roomId: string) => {
    const key = await joinRoom({
      name: user.name,
      roomId: roomId,
    })
    setUser({ ...user, name: user.name, key: Number(key) })
    router.push({ pathname: `/${roomId}`, query: { key: key } })
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
      <br />
      <input
        id='roomName'
        type='text'
        placeholder='部屋の名前を入力'
        onChange={(e) =>
          setNewRoom({ ...newRoom, roomName: e.currentTarget.value })
        }
      />
      <input
        id='password'
        type='password'
        placeholder='部屋のパスワードを設定'
        onChange={(e) =>
          setNewRoom({ ...newRoom, password: e.currentTarget.value })
        }
      />
      <button onClick={createRoomHandler}>部屋を作る</button>
      <br />
      <br />
      <input
        id='joinPassword'
        type='password'
        placeholder='パスワードを入力'
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      {waitingRoom &&
        waitingRoom.map((item, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
              >
                {item.roomName}
              </div>
              {item.password === password ? (
                <button onClick={() => joinRoomHandler(item.roomId)}>
                  ルームに入る
                </button>
              ) : (
                <></>
              )}
            </div>
          )
        })}
    </>
  )
}

export default Waiting
