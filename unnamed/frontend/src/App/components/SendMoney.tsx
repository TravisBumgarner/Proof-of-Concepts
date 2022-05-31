import React from 'react'
import styled from 'styled-components'

import { Modal, ConfirmationModal } from 'sharedComponents'

const Input = styled.input`
    width: 100%;
    display: block;
`

type SendMoneyProps = {
    closeSendMoney: () => void
}

const SendMoney = ({ closeSendMoney }: SendMoneyProps) => {
    const [address, setAddress] = React.useState<string>('')
    const [amount, setAmount] = React.useState<number>(0)
    const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false)

    const handleClear = () => {
        setAddress('')
        setAmount(0)
    }

    const handleSend = async () => {
        await window.ethereum.request()


        handleClear()
        setShowConfirmModal(false)
        closeSendMoney()
    }

    return (
        <form>
            <div>
                <label htmlFor="amount">Enter Amount</label>
                <Input name="amount" type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
            </div>
            <div>
                <label htmlFor="address">Enter Address</label>
                <Input name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <button type="button" onClick={handleClear}>Cancel</button>
                <button type="button" onClick={() => setShowConfirmModal(true)}>Send</button>
            </div>
            <ConfirmationModal
                title="Send?"
                body="You sure?"
                showModal={showConfirmModal}
                setShowModal={setShowConfirmModal}
                confirmationCallback={
                    () => handleSend()
                }
                cancelCallback={
                    () => setShowConfirmModal(false)
                }
            />
        </form>
    )
}

export default SendMoney