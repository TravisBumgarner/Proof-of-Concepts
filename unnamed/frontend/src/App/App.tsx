import * as React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ModalProvider } from 'styled-react-modal'
import { InjectedConnector } from '@web3-react/injected-connector'
import styled from 'styled-components'

import { Wallet, Balance, SendMoney } from './components'
import { Modal } from 'sharedComponents'

const ModalBackground = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 30;
    background-color: white;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    > div {
        padding: 2rem;
        position: static;
        max-width: 80vw;
        max-height: 80vh;
        overflow-y: auto;
        background-color: black;
        color: white;
    }
`


export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        4, // Rinkeby
    ],
})

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

const App = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [hasErrored, setHasErrored] = React.useState<boolean>(false)
    const [showSendMoneyModal, setShowSendMoneyModal] = React.useState<boolean>(false)
    const { activate, active } = useWeb3React<Web3Provider>()

    React.useEffect(() => {
        activate(injectedConnector)
            .then(() => {
                console.log('success')
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                setHasErrored(true)
            })
    }, [])

    React.useEffect(() => {
        if (!window.ethereum) {
            alert("You need to install Metamask")
        }
    }, [])

    if (isLoading) {
        return <p>One sec...</p>
    }

    if (hasErrored) {
        return <p>Something went wrong...</p>
    }

    return (
        <>
            <Wallet />
            <Balance />
            <button onClick={() => setShowSendMoneyModal(true)}>Send Money</button>
            <Modal
                showModal={showSendMoneyModal}
                closeModal={() => setShowSendMoneyModal(false)}
                contentLabel="Send Money"
            >
                <SendMoney closeSendMoney={() => setShowSendMoneyModal(false)} />
            </Modal>
        </>
    )
}

const WrappedApp = () => {
    return (
        < Web3ReactProvider getLibrary={getLibrary} >
            <ModalProvider backgroundComponent={ModalBackground}>
                <App />
            </ModalProvider>
        </Web3ReactProvider >
    )

}

export default WrappedApp
