import * as React from 'react'

import { Chat, Reservations, Login } from './components'
import { GlobalStyle } from 'theme'
import { w3cwebsocket } from "websocket"

const App = () => {
  const [hasConnected, setHasConnected] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<string>('Bob')
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
        !user
          ? <Login setUser={setUser} />
          : (
            <>
              <h2>Hello, {user}</h2>
              <Reservations />
              <Chat client={client} user={user} />
            </>)
      }
    </ div>
  )
}

export default App
