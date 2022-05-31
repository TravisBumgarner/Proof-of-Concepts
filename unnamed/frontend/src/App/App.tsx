import * as React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import useSWR from 'swr'
import { formatEther } from '@ethersproject/units'

import { Body, Title } from 'sharedComponents'

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

const fetcher = (library: any) => (...args: any) => {
  const [method, ...params] = args
  console.log(method, params)
  return library[method](...params)
}

export const Balance = () => {
  const { account, library } = useWeb3React<Web3Provider>()
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
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

  if (!balance) {
    return <div>...</div>
  }
  return <div>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</div>
}


const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>()

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
    </div>
  )
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
