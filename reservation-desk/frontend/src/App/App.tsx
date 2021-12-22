import * as React from 'react'
import { w3cwebsocket } from "websocket"

import { GlobalStyle } from 'theme'
import { Chat, Reservations, Login } from './components'
import Context, { Action, context } from './Context'

const App = () => {
  const [hasConnected, setHasConnected] = React.useState<boolean>(false)
  const { state, dispatch } = React.useContext(context)

  const client = new w3cwebsocket('ws://127.0.0.1:5000')

  if (!hasConnected) {
    client.onopen = () => {
      setHasConnected(true)
    }
    return <p>Loading</p>
  }

  return (
    <div>
      <GlobalStyle />
      {
        !state.user
          ? <Login />
          : (
            <>
              <h2>Hello, {state.user}</h2>
              <Reservations client={client} />
              {/* <Chat client={client}/> */}
            </>)
      }
    </ div>
  )
}

const AppWithContext = () => {
  return (
    <Context>
      <App />
    </Context>
  )
}

export default AppWithContext
