import React, { VFC } from 'react'
import { User, Chat } from 'src/types'
import styled from 'styled-components'

type ChatCardProps = {
  className?: string
  data: Chat
  user: User
}

const ChatCard: VFC<ChatCardProps> = ({ className, data, user }) => {
  const { name, content, question, date, time } = data

  // 改行コードを変換
  const indentConversion = content.split('\n').map((str, index) => {
    return (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    )
  })

  // 質問カードなら質問カードを表示する
  const textData = question ? (
    <div className='questionCard center_text'>{content}</div>
  ) : (
    <p className='content'>{indentConversion}</p>
  )

  return (
    <StyledChatCard className={`${className}`} right={name === user.name}>
      {name === user.name ? (
        <div className='right'>
          <div className='wrapper'>
            <p className='name'>{name}</p>
            <div className='inner'>
              {textData}
              <p className='time'>{time}</p>
            </div>
          </div>
          <div className='icon'></div>
        </div>
      ) : (
        <div className='left'>
          <div className='icon'></div>
          <div className='wrapper'>
            <p className='name'>{name}</p>
            <div className='inner'>
              {textData}
              <p className='time'>{time}</p>
            </div>
          </div>
        </div>
      )}
    </StyledChatCard>
  )
}

export default ChatCard

const StyledChatCard = styled.li<{ right: boolean }>`
  .left,
  .right {
    display: flex;
    margin-top: 2rem;
  }
  .right {
    justify-content: flex-end;
  }
  .icon {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: green;
    margin: 0 0.5rem;
  }
  .wrapper {
    margin: 0 0.5rem;
    .name {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      ${(props) => (props.right ? 'text-align: right' : '')}
    }
    .inner {
      display: flex;
      position: relative;
      .content {
        max-width: 18rem;
        padding: 1rem;
        border-radius: 2rem;
        background-color: ${(props) => (props.right ? '#06c755' : '#fff')};
        position: relative;
        overflow-wrap: break-word;
        /* white-space: pre-wrap; */
        &:after {
          content: '';
          position: absolute;
          top: 0;
          ${(props) => (props.right ? 'right: -5px;' : 'left: -5px;')}
          width: 1.5rem;
          height: 0.5rem;
          border-bottom: 1rem solid
            ${(props) => (props.right ? '#06c755' : '#fff')};
          border-radius: ${(props) =>
            props.right
              ? '0 0 100px 0 / 0 0 100px 0;'
              : '0 0 0 100px / 0 0 0 100px;'};
        }
      }
      .time {
        position: absolute;
        bottom: 0.2rem;
        ${(props) => (props.right ? 'left: -3.2rem;' : 'right: -3.2rem;')}
        font-size: 1.2rem;
      }
    }
    .questionCard {
      width: 16rem;
      height: 10rem;
      padding: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      white-space: pre-wrap;
      text-shadow: #fff 2px 0, #fff -2px 0, #fff 0 -2px, #fff 0 2px,
        #fff 2px 2px, #fff -2px 2px, #fff 2px -2px, #fff -2px -2px, #fff 1px 2px,
        #fff -1px 2px, #fff 1px -2px, #fff -1px -2px, #fff 2px 1px,
        #fff -2px 1px, #fff 2px -1px, #fff -2px -1px,
        rgba(0, 0, 0, 0.5) 3px 3px 3px;
      background-color: ${(props) => props.theme.colors.yellow};
      border: 0.8rem solid #333;
      border-radius: 0.5rem;
      /* box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5); */
    }
  }
`
