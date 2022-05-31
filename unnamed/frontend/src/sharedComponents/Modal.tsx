import React from 'react'
import styled from 'styled-components'
import ReactModal from 'styled-react-modal'

type ModalProps = {
    children: any
    showModal: boolean
    closeModal: () => void
    contentLabel: string
}

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const ModalWrapper = styled.div`
    min-width: 400px;
`

const Modal = ({
    children, showModal, closeModal, contentLabel
}: ModalProps) => {
    return (
        <ReactModal
            isOpen={showModal}
            onBackgroundClick={closeModal}
            onEscapeKeydown={closeModal}
        >
            <ModalWrapper>
                <HeaderWrapper>
                    <h2>{contentLabel}</h2>
                    <button onClick={closeModal}>X</button>
                </HeaderWrapper>
                {children}
            </ModalWrapper>
        </ReactModal>
    )
}

export default Modal