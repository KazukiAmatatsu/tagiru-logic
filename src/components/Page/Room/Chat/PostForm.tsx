import { FC, useState } from 'react'
import { useUser } from 'src/recoil/hooks/useUser'
import { Chat } from 'src/types'
import styled from 'styled-components'

const PostForm: FC = () => {
  const [content, setContent] = useState<string>('')
  const user = useUser()
  console.log(content)

  return (
    <StyledPostForm>
      <input
        id='content'
        type='text'
        placeholder='メッセージを入力'
        // value={ || ''}
        onChange={(e) => setContent(e.currentTarget.value)}
      />
    </StyledPostForm>
  )
}

export default PostForm

const StyledPostForm = styled.div``
