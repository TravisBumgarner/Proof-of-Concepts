import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import { ConfirmationModal } from 'sharedComponents'

const Input = styled.input`
    width: 100%;
    display: block;
`

type SendMoneyProps = {
    closeSendMoney: () => void
}

const fetcher = (library: any) => (...args: any) => {
    const [method, ...params] = args
    console.log(method, params)
    return library[method](...params)
}

const SendMoney = ({ closeSendMoney }: SendMoneyProps) => {
    const [toAddress, setToAddress] = React.useState<string>('')
    const [amount, setAmount] = React.useState<number>(0)
    const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false)
    const { account: fromAddress, library } = useWeb3React<Web3Provider>()
    const { data: balance, mutate } = useSWR(['getBalance', fromAddress, 'latest'], {
        fetcher: fetcher(library),
    })

    React.useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for blocks...`)
        library.on('block', () => {
            console.log('update balance...')
            mutate(undefined, true)
        })
        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners('block')
        }
        // trigger the effect only on component mount
    }, [])

    const handleClear = () => {
        setToAddress('')
        setAmount(0)
    }

    const handleSend = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const signer = provider.getSigner()
        try {
            ethers.utils.getAddress(toAddress)
        } catch (error) {
            console.log(error)
            alert('invalid ether address')
        }
        const tx = await signer.sendTransaction({
            to: toAddress,
            value: amount
        })
        console.log('tx', tx)
        handleClear()
        setShowConfirmModal(false)
        closeSendMoney()
    }

    return (
        <form>
            <div>
                <label htmlFor="from">From</label>
                <Input name="from" disabled={true} type="text" value={fromAddress} />
            </div>
            <div>
                <label htmlFor="to">To</label>
                <Input name="to" type="text" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
            </div>
            <div>
                <label htmlFor="amount">Enter Amount</label>
                <Input name="amount" type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
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