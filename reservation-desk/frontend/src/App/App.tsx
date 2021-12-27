import * as React from 'react'
import { w3cwebsocket } from "websocket"

import { GlobalStyle } from 'theme'
import {
  // Reservations,
  Login,
  // Chat
} from './components'
import Context, { context } from './Context'
import { LoginAction, LogoutAction, ACTIONS } from '../../../types/websockets'


const App = () => {
  const [hasConnected, setHasConnected] = React.useState<boolean>(false)
  const [hasDisconnected, setHasDisconnected] = React.useState<boolean>(false)
  const { state, dispatch } = React.useContext(context)

  const client = new w3cwebsocket('ws://127.0.0.1:5000')

  if (hasDisconnected) {
    return <p>Goodbye.</p>
  }

  if (state.user && !hasConnected) {
    client.onopen = async () => {
      const payload: LoginAction = {
        user: state.user,
        desk: state.desk,
        type: ACTIONS.LOGIN
      }
      console.log('coneccted to server')
      client.send(JSON.stringify(payload))
      setHasConnected(true)
    }
    return <p>Loading</p>
  }

  const logout = () => {
    const payload: LogoutAction = {
      user: state.user,
      desk: state.desk,
      type: ACTIONS.LOGOUT
    }
    console.log('disconnected to server')
    client.send(JSON.stringify(payload))
    setHasDisconnected(true)
  }

  client.onmessage = (message: { data: string }) => {
    const parsedMessage: any = JSON.parse(message.data) //Todo: fix this
    console.log("message received", parsedMessage)
    dispatch(parsedMessage)
  }

  return (
    <div>
      <GlobalStyle />
      {
        !state.user.length
          ? <Login />
          : (
            <>
              <h2>Hello, {state.user}</h2>
              <button onClick={logout}>Logout</button>
              {/* <Reservations />
              <Chat /> */}
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
