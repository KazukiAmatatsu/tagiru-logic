import React from 'react'
import styled from 'styled-components'

export type ModalProps = {
  className?: string
  isOpen: boolean
  closed: () => void
  size: 'small' | 'middle' | 'large'
}

const Modal: React.FC<ModalProps> = ({
  className = '',
  isOpen,
  closed,
  size,
  children,
}) => {
  if (isOpen) {
    return (
      <StyleOverlay className='fadeIn w-full h-full' onClick={closed}>
        <StyleModal
          className={`${size} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </StyleModal>
      </StyleOverlay>
    )
  } else {
    return null
  }
}

export default Modal

const StyleOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .fadeIn {
    animation: fadeIn 0.25s;
  }
`
const StyleModal = styled.div`
  display: flex;
  align-items: center;
  max-height: 90%;
  background-color: #fff;
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
  padding: 3rem;
  z-index: 99;
  &.small {
    height: 30%;
    max-height: 30%;
  }
  &.middle {
    height: 50%;
    max-height: 50%;
  }
  &.large {
    height: 70%;
    max-height: 70%;
  }
`
