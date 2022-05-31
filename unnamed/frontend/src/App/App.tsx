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
  const { data: balance } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library),
  })
  if (!balance) {
    return <div>...</div>
  }
  return <div>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</div>
}

const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>()

  const onClick = () => {
    activate(injectedConnector)
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  )
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
      <Balance />
    </Web3ReactProvider>
  )
}

export default App
