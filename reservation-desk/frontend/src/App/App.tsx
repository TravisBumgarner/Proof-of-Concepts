import * as React from 'react'
import { w3cwebsocket } from "websocket"

import { GlobalStyle } from 'theme'
import { Reservations, Login, Chat } from './components'
import Context, { context } from './Context'
import { Message } from '../../../types/websockets'


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

  client.onmessage = (message: { data: string }) => {
    const parsedMessage: Message = JSON.parse(message.data)
    dispatch(parsedMessage)
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
              <Reservations />
              <Chat />
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
