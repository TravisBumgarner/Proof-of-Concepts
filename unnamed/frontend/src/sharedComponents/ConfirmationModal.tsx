import React from 'react'

import Modal from './Modal'

type ConfirmationModalProps = {
    title: string
    body: string
    confirmationCallback?: () => void
    cancelCallback?: () => void
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}

const ConfirmationModal = ({ title, body, confirmationCallback, cancelCallback, showModal, setShowModal }: ConfirmationModalProps) => {
    const Buttons = []

    if (cancelCallback) Buttons.push(<button key="cancel" onClick={cancelCallback}>Cancel</button>)
    if (confirmationCallback) Buttons.push(<button key="confirm" onClick={confirmationCallback}>Continue</button>)

    return (
        <Modal
            contentLabel={title}
            showModal={showModal}
            closeModal={() => setShowModal(false)}
        >
            <p>{body}</p>
            {Buttons}
        </Modal>
    )
}

export default ConfirmationModal