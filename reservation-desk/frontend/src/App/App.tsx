import * as React from 'react'
import { w3cwebsocket } from "websocket"

import { GlobalStyle } from 'theme'
import {
  Login,
} from './components'
import Context, { context, WS_CONNECTED_ACTION_TYPE } from './Context'

const App = () => {
  const { state, dispatch } = React.useContext(context)

  const client = new w3cwebsocket('ws://127.0.0.1:5000')

  client.onopen = async () => {
    dispatch({ type: WS_CONNECTED_ACTION_TYPE })
  }

  if (!state.isWSConnected) {
    return <p>Connecting to Websocket...</p>
  }

  return (
    <div>
      <GlobalStyle />
      <p>Hi.</p>
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
