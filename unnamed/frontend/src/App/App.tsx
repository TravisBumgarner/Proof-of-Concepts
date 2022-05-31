import * as React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import { Wallet, Balance } from './components'

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
        </>
    )
}

const WrappedApp = () => {
    return (
        < Web3ReactProvider getLibrary={getLibrary} >
            <App />
        </Web3ReactProvider >
    )

}

export default WrappedApp
