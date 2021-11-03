import { useEffect } from 'react'
import { userState } from 'src/recoil/atom'
import { useRecoilState } from 'recoil'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { User } from 'src/types'
import { useRouter } from 'next/router'

export const useUser = (): User => {
  // const [user, setUser] = useRecoilState(userState)
  // const room = useRoom()
  // const router = useRouter()
  // const roomId = router.asPath.split('/')[1].split('?')[0]
  // const key = Number(router.query?.key)
  const user = {
    name: 'testUser',
    key: 0,
  }

  // useEffect(() => {
  //   // if (roomId === '[roomId]') return
  //   setUser({
  //     ...user,
  //     key: key,
  //   })
  // }, [key])

  return user
}
