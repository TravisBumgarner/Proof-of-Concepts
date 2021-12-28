import * as React from 'react'
import { w3cwebsocket } from "websocket"

import { GlobalStyle } from 'theme'
import {
  Login,
} from './components'
import Context, { context, FRONTEND_WS_CONNECTED_ACTION_TYPE } from './Context'

let client: w3cwebsocket
const App = () => {
  const { state, dispatch } = React.useContext(context)

  React.useEffect(() => {
    client = new w3cwebsocket('ws://127.0.0.1:5000')
    client.onopen = async () => {
      dispatch({ type: FRONTEND_WS_CONNECTED_ACTION_TYPE })
    }
  }, [])

  if (!state.isWSConnected) {
    return <p>Connecting to Websocket...</p>
  }
  
  if (!state.isUserConnected) {
    return <Login client={client} />
  }

  return (
    <div>
      <GlobalStyle />
      <p>Hi, {state.user} at desk {state.desk}.</p>
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
