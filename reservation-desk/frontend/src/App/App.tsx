import * as React from 'react'
import { IMessageEvent, w3cwebsocket } from "websocket"

import { GlobalStyle } from 'theme'
import {
  Login,
  Logout,
  ActiveUsers
} from './components'
import Context, { Action, context, FRONTEND_NEW_USER_CONNECTED_ACTION_TYPE, FRONTEND_WS_CONNECTED_ACTION_TYPE, FRONTEND_FETCH_ACTIVE_USERS_ACTION_TYPE } from './Context'
import { WebsocketsAction, WEBSOCKETS_ACTIVE_USERS_ACTION_TYPE, WEBSOCKETS_USER_CONNECTED_ACTION_TYPE } from '../../../types/websockets'

const websocketsHandler = (message: IMessageEvent, dispatch: React.Dispatch<Action>) => {
  if (typeof message.data !== "string") {
    throw Error("Invalid WS message received.")
  }

  const parsedMesssage = JSON.parse(message.data)
  console.log('NEW MESSAGE:', parsedMesssage)
  if (!parsedMesssage.type) {
    throw Error("Invalid WS message type.")
  }
  switch (parsedMesssage.type) {
    case WEBSOCKETS_USER_CONNECTED_ACTION_TYPE:
      dispatch({
        type: FRONTEND_NEW_USER_CONNECTED_ACTION_TYPE,
        user: parsedMesssage.user
      })
      break

    case WEBSOCKETS_ACTIVE_USERS_ACTION_TYPE:
      dispatch({
        type: FRONTEND_FETCH_ACTIVE_USERS_ACTION_TYPE,
        activeUsers: parsedMesssage.activeUsers
      })
      break
  }
}

let client: w3cwebsocket
const App = () => {
  const { state, dispatch } = React.useContext(context)

  React.useEffect(() => {
    client = new w3cwebsocket('ws://127.0.0.1:5000')
    client.onopen = async () => {
      dispatch({ type: FRONTEND_WS_CONNECTED_ACTION_TYPE })
      client.onmessage = message => websocketsHandler(message, dispatch)
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
      <ActiveUsers />
      <Logout client={client} />
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
