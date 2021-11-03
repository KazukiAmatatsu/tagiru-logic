import { FC } from 'react'
import { useUser } from 'src/recoil/hooks/useUser'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useForm } from 'react-hook-form'
import { postChat } from 'src/firebase/functions/postChat'
import styled from 'styled-components'

const PostForm: FC = () => {
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ content: string }>()
  const user = useUser()
  const room = useRoom()

  const post = handleSubmit((data) => {
    postChat({
      name: user.name,
      content: data.content,
      roomId: room.roomId,
    }),
      reset()
  })

  return (
    <StyledPostForm onSubmit={post}>
      <input
        type='text'
        placeholder='メッセージを入力'
        {...register('content', { required: true })}
      />
      {errors.content && (
        <span className='em'>メッセージを入力してください</span>
      )}
      <input type='submit' />
    </StyledPostForm>
  )
}

export default PostForm

const StyledPostForm = styled.form``
