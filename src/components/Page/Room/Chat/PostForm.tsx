import { VFC } from 'react'
import { useUser } from 'src/recoil/hooks/useUser'
import { useRoom } from 'src/recoil/hooks/useRoom'
import { useForm } from 'react-hook-form'
import { postChat } from 'src/firebase/functions/postChat'
import { Send } from 'akar-icons'
import styled from 'styled-components'

type PostFormProps = {
  className?: string
}

const PostForm: VFC<PostFormProps> = ({ className }) => {
  const { register, handleSubmit, watch, reset } =
    useForm<{ content: string }>()
  const watchData = watch('content')
  const user = useUser()
  const room = useRoom()

  // console.log(watchData)

  const post = (data) => {
    // スペースのみだと送信できない
    if (!watchData.trim()) return
    postChat({
      name: user.name,
      content: data.content,
      roomId: room.roomId,
    })
    reset()
  }

  // ctrl + Enterで送信する
  const enterPost = (keyEvent: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (keyEvent.key === 'Enter' && (keyEvent.ctrlKey || keyEvent.metaKey)) {
      post({ content: watchData })
    }
  }

  return (
    <StyledPostForm
      className={`${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className='inner'>
        <textarea
          placeholder='メッセージを入力'
          name='content'
          className='inputForm'
          {...register('content', { required: true })}
          onKeyDown={enterPost}
        />
        <p className='expo'>Enterで改行　ctrl + Enterで送信</p>
      </div>
      <div className='sendBtn' onClick={handleSubmit(post)}>
        <Send size={24} />
      </div>
    </StyledPostForm>
  )
}

export default PostForm

const StyledPostForm = styled.form`
  width: 100%;
  height: 7rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  .inner {
    width: 100%;
    margin: 0 2rem;
  }
  .inputForm {
    width: 95%;
    background-color: ${(props) => props.theme.background};
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 1rem;
    caret-color: #1e90ff;
    outline: none;
    resize: none;
    /* スクロールバーを消す */
    /* overflow: hidden; */
    -ms-overflow-style: none; /* IE, Edge 対応 */
    scrollbar-width: none; /* Firefox 対応 */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari 対応 */
    }
  }
  .expo {
    font-size: 1rem;
    line-height: 0.5rem;
    text-align: right;
    color: ${(props) => props.theme.colors.gray};
  }
  .sendBtn {
    margin-right: 2rem;
  }
`
