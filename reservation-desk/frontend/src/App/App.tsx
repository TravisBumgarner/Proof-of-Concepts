import * as React from 'react'

import { Chat, Reservations, Login } from './components'
import { GlobalStyle } from 'theme'

const App = () => {
  const [user, setUser] = React.useState<string>('Bob')

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
              <Chat user={user} />
            </>)
      }
    </ div>
  )
}

export default App
